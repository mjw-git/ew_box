import { prismaInstance } from '@main/utils/init'
import Router from 'koa-router'
import { Workbook } from 'exceljs'
import fs from 'fs'
import { dialog } from 'electron'
const router = new Router()
router.prefix('/api/v1')
router.get('/system/export', async (ctx) => {
  const workbook = new Workbook()
  const worksheet = workbook.addWorksheet('book')
  const todoWorksheet = workbook.addWorksheet('todo')
  worksheet.columns = [
    { header: 'id', key: 'id', width: 32 },
    { header: 'unix', key: 'unix', width: 32 },
    { header: 'create_tm', key: 'create_tm', width: 32 },
    { header: 'desc', key: 'desc', width: 32 },
    { header: 'type', key: 'type', width: 32 },
    { header: 'price', key: 'price', width: 32 },
    { header: 'tag', key: 'tag', width: 32 },
  ]
  const books = await prismaInstance.book.findMany()
  books.forEach((book) => {
    worksheet.addRow({
      id: book.id,
      price: book.price,
      unix: book.unix,
      create_tm: book.create_tm,
      desc: book.desc,
      type: book.type,
      tag: book.tag,
    })
  })
  const todo = await prismaInstance.todo.findMany()
  todoWorksheet.columns = [
    { header: 'id', key: 'id', width: 32 },
    { header: 'todo', key: 'todo', width: 32 },
    { header: 'start_tm', key: 'start_tm', width: 32 },
    { header: 'is_star', key: 'is_star', width: 32 },
    { header: 'create_tm', key: 'create_tm', width: 32 },
    { header: 'status', key: 'status', width: 32 },
    { header: 'type', key: 'type', width: 32 },
    { header: 'finished_tm', key: 'finished_tm', width: 32 },
  ]
  todo.forEach((todo) => {
    todoWorksheet.addRow({
      id: todo.id,
      todo: todo.todo,
      start_tm: todo.start_tm,
      is_star: todo.is_star,
      create_tm: todo.create_tm,
      status: todo.status,
      type: todo.type,
      finished_tm: todo.finished_tm,
    })
  })
  const excelBuffer = await workbook.xlsx.writeBuffer()
  ctx.attachment('export.xlsx') // 设置下载文件的名称
  const result = await dialog.showSaveDialog({
    title: '保存文件',
    defaultPath: 'export.xlsx',
    filters: [{ name: 'Excel Files', extensions: ['xlsx'] }],
  })

  if (result.canceled) {
    ctx.body = { code: 200 }
  }
  fs.writeFileSync(result.filePath, Buffer.from(excelBuffer))
  ctx.body = {
    code: 200,
    data: result.filePath,
  }
})
router.post('/system/import', async (ctx) => {
  const { filename } = ctx.request.body as { filename: string }
  if (!filename) {
    throw new Error('filename is empty!')
  }

  const workbook = new Workbook()
  const result = await workbook.xlsx.readFile(filename)
  const bookSheet = result.getWorksheet('book')
  const todoSheet = result.getWorksheet('todo')
  console.log(todoSheet, bookSheet)
  console.log(bookSheet.columns)
  if (!bookSheet && !todoSheet) {
    throw new Error('bookSheet or todoSheet is empty!')
  }
  if (bookSheet) {
    bookSheet.eachRow(async (row) => {
      const rowData: { [key: string]: any } = {} // 创建一个对象来存储行数据

      row.eachCell((cell, colNumber) => {
        const columnHeader = bookSheet.getRow(1).getCell(colNumber).value // 获取列标题
        rowData[columnHeader as string] = cell.value // 将列标题和单元格值存入对象
      })
      await prismaInstance.book.create({
        data: {
          ...(rowData as any),
        },
      })
      console.log(rowData) // 输出每一行的数据对象
    })
  }
  if (todoSheet) {
    todoSheet.eachRow(async (row) => {
      const rowData: { [key: string]: any } = {} // 创建一个对象来存储行数据

      row.eachCell((cell, colNumber) => {
        const columnHeader = todoSheet.getRow(1).getCell(colNumber).value // 获取列标题
        rowData[columnHeader as string] = cell.value // 将列标题和单元格值存入对象
      })
      await prismaInstance.todo.create({
        data: {
          ...(rowData as any),
        },
      })
    })
  }
  ctx.body = {
    code: 200,
  }
})

export default router

import React, { forwardRef, useImperativeHandle } from 'react'
import { useRequest } from 'ahooks'
import { getIndexDBData } from '@/indexdb/operate'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import BaseElliTip from '@/components/BaseElliTip'
export interface TaskRefType {
  getList?: () => void
}

const Task = (_: any, ref: React.Ref<TaskRefType>) => {
  const { toast } = useToast()
  const { data: tableData = [], run: getRun } = useRequest(() =>
    getIndexDBData<Schema.CompressTask[]>('task').then((res) => {
      return (res ?? []).sort((pre, next) => next.create_tm - pre.create_tm)
    }),
  )
  useImperativeHandle(ref, () => {
    return {
      getList: getRun,
    }
  }, [])
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Name</TableHead>
          <TableHead>Create_tm</TableHead>
          <TableHead className='w-[120px]'>Operator</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((i) => {
          return (
            <TableRow key={i.path}>
              <TableCell className='w-[150px]'>
                <BaseElliTip text={i.task_name} />
              </TableCell>
              <TableCell>
                <BaseElliTip text={i.path} />
              </TableCell>
              <TableCell className='text-primary cursor-pointer'>
                <span
                  onClick={async () => {
                    const result = await window.systemApi.openPath(i.path)
                    if (result === 'error') {
                      toast({
                        description: 'fold not exits',
                      })
                    }
                  }}>
                  open
                </span>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default forwardRef(Task)

import React, { forwardRef, useImperativeHandle } from 'react'
import { useRequest } from 'ahooks'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import BaseElliTip from '@/components/BaseElliTip'
import { getTaskList } from '@/services/sharp'
import dayjs from 'dayjs'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import './index.css'
import SvgIcon from '@/components/SvgIcon'
import { convertBytes } from '@/utils'
import { Button } from '@/components/ui/button'
import Empty from '@/components/Empty'
export interface TaskRefType {
  getList?: () => void
}

const Task = (_, ref: React.Ref<TaskRefType>) => {
  const { toast } = useToast()
  const { data: taskList, run: getList } = useRequest(getTaskList, {
    onSuccess: (res) => {
      const processItem = res
        .map((i) => i.items)
        .flat()
        .find((i) => i.status === 'processing')
      if (processItem) {
        let timer = setTimeout(() => {
          getList()
          clearTimeout(timer)
        }, 2000)
      }
    },
  })

  useImperativeHandle(ref, () => {
    return {
      getList: getList,
    }
  }, [])
  return (taskList ?? []).length === 0 ? (
    <Empty />
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>id</TableHead>
          <TableHead>Create_tm</TableHead>
          <TableHead className='w-[120px]'>Operator</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {(taskList ?? []).map((i) => {
          return (
            <TableRow key={i.path}>
              <TableCell className='w-[150px] flex items-center gap-1'>
                {i.id}
                <HoverCard openDelay={0}>
                  <HoverCardTrigger>
                    <SvgIcon name='tip' className='w-[16px] h-[16px]' />
                  </HoverCardTrigger>
                  <HoverCardContent className='w-[400px]' side='right'>
                    <Table className='w-[100%]'>
                      <TableHeader>
                        <TableRow>
                          <TableHead className='w-[160px]'>img</TableHead>
                          <TableHead className='w-[160px]'>size</TableHead>
                          <TableHead className='w-[260px]'>compressed_size</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {i.items.map((i) => {
                          return (
                            <TableRow key={i.id}>
                              <TableCell>
                                <BaseElliTip text={i.img_name} />
                              </TableCell>
                              <TableCell>{convertBytes(i.size)}</TableCell>
                              <TableCell>{convertBytes(i.compressed_size)}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell>
                <BaseElliTip text={dayjs(i.create_tm * 1000).format('YYYY-MM-DD HH:mm:ss')} />
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

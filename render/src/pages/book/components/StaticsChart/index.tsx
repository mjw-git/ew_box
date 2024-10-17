import SvgIcon from '@/components/SvgIcon'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getBookAverage, getBookTrend } from '@/services/book'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts'

const chartConfig = {
  key: {
    label: 'key',
    color: '#2563eb',
  },
} satisfies ChartConfig

const StaticsChart = (_, ref: React.Ref<{ runGetTrendData: () => void }>) => {
  const [value, setValue] = useState('day')
  const { data: trendData, run: runGetTrendData } = useRequest(() => getBookTrend({ type: value }), {
    refreshDeps: [value],
  })
  const { data: averageData, run: runGetAverageData } = useRequest(() => getBookAverage(), {
    // refreshDeps: [],
  })
  useImperativeHandle(
    ref,
    () => ({
      runGetTrendData: () => {
        runGetTrendData()
        runGetAverageData()
      },
    }),
    [],
  )
  return (
    <>
      <div className='text-[20px] font-bold'>Trend</div>
      <div className='flex justify-end'>
        <Select
          value={value}
          onValueChange={(e) => {
            setValue(e)
          }}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select a type' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='day'>Day</SelectItem>
              <SelectItem value='month'>Month</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className='px-4'>
        <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
          <LineChart
            accessibilityLayer
            data={trendData?.result ?? []}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey='key' tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value: string) => dayjs(value).format('MM.DD')} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey='value' type='linear' stroke='#000' strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
        <div className='text-[20px] flex gap-1 font-bold'>
          <div className='w-1/3 p-1 border-border rounded-sm border-[1px]'>
            <div className='flex items-center gap-1'>
              <span>Average</span>
            </div>
            <div>{averageData?.average}</div>
          </div>
          <div className='w-1/3 p-1 border-border rounded-sm border-[1px]'>
            <div className='flex items-center gap-1'>
              highest
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger className='w-full'>
                    <span>
                      <SvgIcon width={12} height={12} name='tip' />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className='text-sm'>
                      <div>Desc: {averageData?.gFrom.desc}</div>
                      <div>Tm: {dayjs.unix(averageData?.gFrom.unix || 0).format('YYYY-MM-DD')}</div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='text-red-600'>{averageData?.g}</div>
          </div>
          <div className='w-1/3 p-1  border-border rounded-sm border-[1px]'>
            <div className='flex items-center gap-1'>
              lowest
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger className='w-full'>
                    <span>
                      <SvgIcon width={12} height={12} name='tip' />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className='text-sm'>
                      <div>Desc: {averageData?.lFrom.desc}</div>
                      <div>Tm: {dayjs.unix(averageData?.lFrom.unix || 0).format('YYYY-MM-DD')}</div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='text-red-500'>{averageData?.l}</div>
          </div>
        </div>
        {/* {averageData?.average} */}
      </div>
    </>
  )
}

export default forwardRef(StaticsChart)

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getBookTrend } from '@/services/book'
import { useRequest } from 'ahooks'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

const chartConfig = {
  key: {
    label: 'Key',
    color: '#2563eb',
  },
} satisfies ChartConfig
const StaticsChart = (_, ref: React.Ref<{ runGetTrendData: () => void }>) => {
  const [value, setValue] = useState('day')
  const { data: trendData, run: runGetTrendData } = useRequest(() => getBookTrend({ type: value }), {
    refreshDeps: [value],
  })
  useImperativeHandle(
    ref,
    () => ({
      runGetTrendData: () => {
        runGetTrendData()
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
      <div>
        <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
          <BarChart accessibilityLayer data={trendData?.result ?? []}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey='key' tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
            <Bar dataKey='value' fill='skyblue' radius={4} />
            {/* <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} /> */}
          </BarChart>
        </ChartContainer>
      </div>
    </>
  )
}

export default forwardRef(StaticsChart)

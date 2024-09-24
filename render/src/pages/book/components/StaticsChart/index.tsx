import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
} satisfies ChartConfig
const StaticsChart = () => {
  return (
    <>
      <div className='text-[20px] font-bold'>Trend</div>
      <div className='flex justify-end'>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select a type' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='days'>Days</SelectItem>
              <SelectItem value='month'>Month</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey='month' tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
            <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
            {/* <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} /> */}
          </BarChart>
        </ChartContainer>
      </div>
    </>
  )
}

export default StaticsChart

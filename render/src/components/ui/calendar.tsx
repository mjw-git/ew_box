import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { zhCN } from 'date-fns/locale'
import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      locale={zhCN}
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn('h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-slate-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative hover:bg-yellow rounded-md',
        day: cn('h-9 w-9 p-0 font-normal aria-selected:opacity-100'),
        day_range_end: 'day-range-end',
        day_selected: 'bg-yellow rounded-md',
        day_today: 'text-slate-900 dark:text-slate-50',
        day_outside: 'day-outside text-slate-500 opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400',
        day_disabled: 'text-slate-500 opacity-50 dark:text-slate-400',
        day_range_middle: 'aria-selected:bg-slate-100 aria-selected:text-slate-900  dark:aria-selected:text-slate-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className='h-4 w-4' />,
        IconRight: ({ ...props }) => <ChevronRight className='h-4 w-4' />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }

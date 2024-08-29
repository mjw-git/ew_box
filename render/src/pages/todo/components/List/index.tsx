import Empty from '@/components/Empty'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

const List = () => {
  const [collapsed, setCollapsed] = useState('today')
  return (
    <div>
      <input placeholder='Please Enter To Add TODO' className='w-96 bg-border outline-none placeholder:text-slate-500 placeholder:text-sm h-8 rounded-sm px-2 focus:border-border focus:border-[1px] focus:bg-white' />
      <div className='mt-2'></div>
      <div className='grid w-full grid-cols-2 mt-4 gap-5'>
        <div>
          <div className='font-bold'>Unfinished</div>
          <Accordion
            onValueChange={(e) => {
              setCollapsed(e)
            }}
            type='single'
            value={collapsed}
            collapsible
            className='w-full'>
            <AccordionItem value='today'>
              <AccordionTrigger className='flex'>
                <span className='bg-green-400 px-2 rounded-sm'>Today</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center space-x-2 pb-1'>
                    <Checkbox onCheckedChange={(e) => {}} id='terms' />
                    <label htmlFor='terms' className='text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      Accept terms and conditions
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='yesterday'>
              <AccordionTrigger>
                <span className='bg-yellow-400 px-2 rounded-sm'>Yesterday</span>
              </AccordionTrigger>
              <AccordionContent>Yes. It comes with default styles that matches the other components&apos; aesthetic.</AccordionContent>
            </AccordionItem>
            <AccordionItem value='earlier'>
              <AccordionTrigger>
                <span className='bg-slate-400 px-2 rounded-sm'>Earlier</span>
              </AccordionTrigger>
              <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
            </AccordionItem>
          </Accordion>
          <Empty />
        </div>
        <div>
          <div className='font-bold'>Finished</div>
        </div>
      </div>
    </div>
  )
}
export default List

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import List from './components/List'
import CalendarContent from './components/CalendarContent'
import EventBook from './components/EventBook'

const Todo = () => {
  const [currentValue, setCurrentValue] = useState('list')
  return (
    <div className='w-full'>
      <Tabs
        defaultValue='list'
        value={currentValue}
        onValueChange={(e) => {
          setCurrentValue(e)
        }}>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='list'>List</TabsTrigger>
          <TabsTrigger value='calendar'>Calendar</TabsTrigger>
          <TabsTrigger value='event'>Event Book</TabsTrigger>
        </TabsList>
        <TabsContent value='list'>
          <List />
        </TabsContent>
        <TabsContent value='calendar'>
          <CalendarContent />
        </TabsContent>
        <TabsContent value='event'>
          <EventBook />
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default Todo

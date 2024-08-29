import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import List from './components/List'

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
          <TabsTrigger value='plan'>Plan</TabsTrigger>
        </TabsList>
        <TabsContent value='list'>
          <List />
        </TabsContent>
        <TabsContent value='calendar'>Calendar</TabsContent>
        <TabsContent value='plan'>Plan</TabsContent>
      </Tabs>
    </div>
  )
}
export default Todo
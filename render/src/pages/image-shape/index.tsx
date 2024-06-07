import { Tabs, Tab, styled } from '@mui/material'
import TaskIcon from '@mui/icons-material/Task'
import CompressIcon from '@mui/icons-material/Compress'
import { useState } from 'react'
import TabPanel from '../../components/TabPanel'
import Compress from './components/compress'
import Task from './components/task'
const PlutoTabs = styled(Tabs)({
  minHeight: '35px',
  paddingLeft: 20,
  '& .MuiTabs-indicator': {
    backgroundColor: '#389e0d',
  },
  '& .MuiTab-root': {
    minHeight: '35px',
  },
})
const PlutoTab = styled(Tab)({
  color: '#3d3d3d',
  '&.Mui-selected': {
    color: '#389e0d',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
})
const ImageShape = () => {
  const [value, setValue] = useState(0)
  return (
    <>
      <PlutoTabs
        value={value}
        onChange={(_, newVal: number) => {
          setValue(newVal)
        }}>
        <PlutoTab iconPosition='start' icon={<CompressIcon />} label='COMPRESS' />
        <PlutoTab iconPosition='start' icon={<TaskIcon />} label='TASK' />
      </PlutoTabs>
      <TabPanel index={0} value={value}>
        <Compress
          onTabChange={(e) => {
            setValue(e)
          }}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Task />
      </TabPanel>
    </>
  )
}

export default ImageShape

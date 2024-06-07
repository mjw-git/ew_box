import { Collapse, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, styled } from '@mui/material'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import React, { useContext } from 'react'
import { useRequest } from 'ahooks'
import styles from './index.module.less'
import { getIndexDBData, getIndexDBDataByIndex } from '@/indexdb/operate'
import { COMPRESS_STATUS } from '../../../../../../main/ipc/sharp/type'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SnackerBarContext from '@/context/snackerBarContext'
import dayjs from 'dayjs'
import copy from 'copy-to-clipboard'
import { convertBytes } from '@/utils'
const TaskTableCell = styled(TableCell)({
  borderBottom: 'none',
  padding: '8px',
})
function Row(props: { row: Schema.CompressTask }) {
  const { show } = useContext(SnackerBarContext)
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const { data, cancel } = useRequest(
    () =>
      getIndexDBDataByIndex<Schema.CompressTaskItem[]>('task_img_item', 'task_id', row.task_id).then((res) => {
        return res
      }),
    {
      onSuccess: (list) => {
        if (!list.some((i) => i.status === COMPRESS_STATUS.PROCESSING)) {
          cancel()
        }
      },
      pollingInterval: 1000,
      refreshDeps: [open],
      ready: !!open,
    },
  )
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TaskTableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TaskTableCell>
        <TaskTableCell component='th' scope='row'>
          <Typography variant='body2' gutterBottom>
            {row.task_name}
          </Typography>
        </TaskTableCell>
        <TaskTableCell align='center'>
          <Typography variant='body2'>{dayjs(row.create_tm).format('YYYY-MM-DD HH:mm:ss')}</Typography>
        </TaskTableCell>
        <TaskTableCell align='center'>
          <Tooltip title={row.path}>
            <Typography sx={{ color: '#4f8d6f', cursor: 'pointer' }} variant='body2'>
              <span
                onClick={() => {
                  copy(row.path)
                  show('copy success')
                }}>
                copy path
              </span>
            </Typography>
          </Tooltip>
        </TaskTableCell>

        <TaskTableCell align='center'>
          <Typography
            onClick={async () => {
              const result = await window.systemApi.openPath(row.path)
              if (result === 'error') {
                show('file is not exits')
              }
            }}
            className={styles.link_text}
            variant='caption'
            display='block'
            gutterBottom>
            open
          </Typography>
        </TaskTableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <TableContainer sx={{ margin: 1, maxHeight: 300 }}>
              <Table stickyHeader size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Path</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Compressed Size</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(data ?? []).map((item) => (
                    <TableRow key={item.path}>
                      <TableCell sx={{ maxWidth: 120, padding: 1 }} component='th' scope='row'>
                        <Typography variant='caption' display='block' gutterBottom>
                          {item.basename}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 120, padding: 1 }} component='th' scope='row'>
                        <Typography variant='caption' display='block' gutterBottom>
                          {convertBytes(item.size)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 120, padding: 1 }} component='th' scope='row'>
                        {item.status === COMPRESS_STATUS.SUCCESS ? (
                          <Stack direction='row' alignItems='center' gap={1}>
                            <Typography variant='caption' display='block' gutterBottom>
                              {convertBytes(item.compressed_size)}
                            </Typography>
                            <Stack direction='column' justifyContent='center'>
                              <ArrowDownwardIcon fontSize='small' sx={{ color: 'green', fontSize: 12 }} />
                              <span style={{ fontSize: 12, color: 'green' }}>{(((item.size - item.compressed_size) * 100) / item.size).toFixed(1) + '%'}</span>
                            </Stack>
                          </Stack>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ color: item.status === 'success' ? 'green' : 'rebeccapurple' }} variant='caption' display='block' gutterBottom>
                          {item.status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
const Task = () => {
  const { data: tableData = [] } = useRequest(() => getIndexDBData<Schema.CompressTask[]>('task'))

  return (
    <TableContainer>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 30 }} />
            <TableCell>Task Name</TableCell>
            <TableCell align='center'>Create Time</TableCell>
            <TableCell align='center'>Save Path</TableCell>
            <TableCell align='center'>Operate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <Row key={row.task_id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default Task

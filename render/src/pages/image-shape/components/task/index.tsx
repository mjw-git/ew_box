import { Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import React, { useContext, useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import PlutoIndexDb from '../../../../indexdb'
import styles from './index.module.less'
import { getIndexDBDataByIndex } from '../../../../indexdb/operate'
import { COMPRESS_STATUS } from '../../../../../../main/ipc/sharp/type'
import OverflowText from '../../../../components/OverflowText'
import SnackerBarContext from '../../../../context/snackerBarContext'
import dayjs from 'dayjs'
function Row(props: { row: Schema.CompressTask }) {
  const { show } = useContext(SnackerBarContext)
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const { data, cancel } = useRequest(
    () =>
      getIndexDBDataByIndex<Schema.CompressTaskItem[]>('task_img_item', 'task_id', row.task_id).then((res) => {
        console.log(res)

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
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          <Typography variant='body2' gutterBottom>
            {row.task_name}
          </Typography>
        </TableCell>
        <TableCell align='center'>
          <Typography variant='body2'>{dayjs(row.create_tm).format('YYYY-MM-DD HH:mm:ss')}</Typography>
        </TableCell>
        <TableCell align='right'>
          <Tooltip title={row.path}>
            <Typography sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: 350 }} variant='body2'>
              {row.path}
            </Typography>
          </Tooltip>
        </TableCell>

        <TableCell align='center'>
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
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <TableContainer sx={{ margin: 1, maxHeight: 300 }}>
              <Table stickyHeader size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Path</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ border: '1px solid red' }}>
                  {(data ?? []).map((historyRow) => (
                    <TableRow key={historyRow.path}>
                      <TableCell sx={{ maxWidth: 120 }} component='th' scope='row'>
                        <Typography variant='caption' display='block' gutterBottom>
                          {historyRow.path}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ color: historyRow.status === 'success' ? 'green' : 'rebeccapurple' }} variant='caption' display='block' gutterBottom>
                          {historyRow.status}
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
  const [tableData, setTableData] = useState<any[]>([])
  useEffect(() => {
    const request = PlutoIndexDb.db.transaction(['task'], 'readonly').objectStore('task').getAll()
    request.onsuccess = (e) => {
      setTableData(request.result.sort((a, b) => a.create_tm - b.create_tm) as any)
    }
    // console.log(temp.result)
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
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

import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import React, { useEffect, useState } from 'react'
import PlutoIndexDb from '../../../../indexdb'
function createData(name: string, calories: number, fat: number, carbs: number, protein: number, price: number) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  }
}
function Row(props: { row: any }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const [imgList, setImgList] = useState()
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='center'>{row.create_time}</TableCell>
        <TableCell align='center'>
          <Typography sx={{ color: 'red' }} component='a'>
            open folder
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                History
              </Typography>
              {/* <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align='right'>Amount</TableCell>
                    <TableCell align='right'>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>
                      <TableCell align='right'>{Math.round(historyRow.amount * row.price * 100) / 100}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
const rows = [createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99), createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99), createData('Eclair', 262, 16.0, 24, 6.0, 3.79), createData('Cupcake', 305, 3.7, 67, 4.3, 2.5), createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)]
const Task = () => {
  const [tableData, setTableData] = useState<any[]>([])
  useEffect(() => {
    const request = PlutoIndexDb.db.transaction(['task'], 'readonly').objectStore('task').getAll()
    request.onsuccess = (e) => {
      setTableData(request.result as any)
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
            <TableCell align='center'>Operate</TableCell>
            {/* <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
            <TableCell align='right'>Protein&nbsp;(g)</TableCell> */}
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

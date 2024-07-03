import { Select, SelectProps, Tabs, styled } from '@mui/material'
const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: 'rgb(52, 199, 89)',
  },
})
const PSelect = styled(Select)({
  '.MuiSelect-icon': {
    color: 'rgb(52, 199, 89)',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: '0px !important',
    borderColor: 'rgb(52,199,89) !important',
  },
  '& .MuiSelect-select': {
    color: 'rgb(52,199,89)',
    width: 120,
    padding: '4px 4px',
    border: '2px solid rgb(52, 199, 89);',
  },

  '&:hover .MuiSelect-select': {
    border: '2px solid rgb(52, 199, 89);',
  },
})

const PlutoSelect = (props: SelectProps) => {
  const { children, ...rest } = props
  return <PSelect {...rest}>{children}</PSelect>
}
export default PlutoSelect

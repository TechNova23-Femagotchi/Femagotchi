
import {Box, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import { pink } from '@mui/material/colors';

const Hygeine = () => {

    const hygeineItems = [ "Wash Face", "Brush Teeth", "Take a Shower", "Wash Hair", "Deodorize"]
  return (
    <Box sx={{padding:"3rem"}}>
      <h1>Daily Checklist</h1>
        <FormGroup>
        {hygeineItems.map((item, index) => (
            <FormControlLabel key={index} control={<Checkbox  sx={{
                color: pink[800],
                '&.Mui-checked': {
                  color: pink[600],
                },}}/>} label={item} />
      ))}


        </FormGroup>
  </Box>
  )
}

export default Hygeine
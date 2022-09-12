import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography} from '@mui/material'
import React from 'react';
import "../styles/header.css";


import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../Context';


const Header = () => {

  const{currency,setCurrency} = CryptoState()

  const navigate = useNavigate();
  const dark = createTheme({
    palette:{
      primary:{
        main:"#fff",
      },
      mode:"dark"
    }
  })

  return (
  
      <ThemeProvider theme={dark}>
      <AppBar color="transparent" position="static" >
        <Container>
          <Toolbar>
            <Typography className='title'
            onClick={()=>navigate('/')}
            variant="h5" >
              Crypto Hunter
              </Typography>
              <Select variant='outlined'
              defaultValue={"USD"}
              value={currency}
              onChange={(e)=>{setCurrency(e.target.value)}}
              style={{
                width:100,
                height:40,
                marginLeft:15,
                

              }} >
                <MenuItem value={"USD"} >USD</MenuItem>
                <MenuItem value={"INR"} >INR</MenuItem>
              </Select>
           
          </Toolbar>
        </Container>
      </AppBar>
      </ThemeProvider>
  
  )
}

export default Header
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { CoinList } from '../config/api'
import {CryptoState} from "../Context";
import "../styles/coinsTable.css"
import { useNavigate } from 'react-router-dom';
import { Container,
   Typography,
   ThemeProvider,
   createTheme,
   TextField,
   TableContainer, 
   Table, 
   TableHead, 
   TableRow, 
   TableCell,
   LinearProgress,
   TableBody,
   Pagination

   } 
   from '@mui/material';
   

import millify from 'millify';


const CoinsTable = () => {
 
    const {currency,symbol} = CryptoState()
    const[coins,setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const[search,setSearch] = useState("")
    const[page,setPage] = useState(1)

    const fetchCoins = async() =>{
        
        setLoading(true)
        const{data} = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }

    useEffect(() => {
      
    fetchCoins()
     
    }, [currency])
    
    const dark = createTheme({
        palette:{
          primary:{
            main:"#fff",
          },
          mode:"dark"
        }
      })
     
      const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };
     
      const navigate = useNavigate() 

  return (
   

      <ThemeProvider theme={dark} >
       <Container style={{textAlign:"center"}} >
         <Typography 
         variant='h4'
         style={{margin:18,fontFamily:"Montserrat"}}
         >
         Cryptocurrency Prices by Market Cap
         </Typography>
         <TextField
          variant='outlined'
          label="Search For a Crypto Currency.."
          style={{width:"100%",marginBottom:10}}
          onChange={(e)=>setSearch(e.target.value)}
          />
          <TableContainer>
          {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ):(
            <Table>
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Montserrat",
                        fontSize:18
                      }}
                      key={head}
                       align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              
              <TableBody>{handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map(row=>{
                const profit = row.price_change_percentage_24h > 0;
                      return(
                        <TableRow
                        className='table-row'
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}>
                          <TableCell
                          component="th"
                          scope="row"
                          style={{
                            marginBottom:10
                          }}
                          >
                            <img 
                            src={row.image}
                            height="40"
                            style={{marginBottom:10}}
                            />
                            <div style={{display:"flex",
                                        flexDirection:"column" }} >
                              <span style={{textTransform:"uppercase",
                                            fontSize:22}} >{row.symbol}</span>            
                              <span style={{color:"darkgrey"}}>{row.name}</span>   
                            </div>
                          </TableCell>
                          <TableCell
                          align="right"
                          >
                            {symbol}{""}
                            {millify(row.current_price)}

                          </TableCell>
                          <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" >
                                  {symbol}{""}{millify(row.market_cap)}     
                        </TableCell>
                     </TableRow>
                      ) 
                      

              })}</TableBody>
            </Table>
            )}
          </TableContainer>
          <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
       </Container>
       </ThemeProvider>
    
    
  )
}

export default CoinsTable
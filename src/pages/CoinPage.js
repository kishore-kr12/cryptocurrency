
import { Typography,LinearProgress } from '@mui/material'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import "../styles/coinPage.css"
import millify from 'millify'
import reactParser from "html-react-parser"
import { CryptoState } from '../Context'



const CoinPage = () => {


const {currency} = CryptoState


 const {id}=useParams();

 const[coin,setCoin]=useState()

 const fetchSingleCoin = async()=>{

         const {data}=  await axios.get(SingleCoin(id));
          setCoin(data);
 }



 useEffect(() => {
   
    fetchSingleCoin()

 }, [])

 console.log(coin)


 if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className="container">

     <div className='side-bar' >
     
        
     <Typography variant='h3' className='heading' >
          {coin?.name }
        </Typography>
        
        
        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{marginBottom:20}}>
              Rank :
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex",marginBottom:20 }} >
            <Typography variant="h5" >
             Subscriber :
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.developer_data.subscribers}
            </Typography>
          </span>
          <span style={{ display: "flex",marginBottom:20 }} >
            <Typography variant="h5" >
             Supply :
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {millify(coin?.market_data.total_supply)}
            </Typography>
          </span>
         
          <span style={{ marginBottom:20 }} >
            <Typography variant="h5" >
             About :
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="subtitle2"
              style={{
                fontFamily: "Montserrat",
                fontSize:20
              }}
            >
              {reactParser(coin?.description.en.split(". ")[0]) }
            </Typography>
          </span>
          
        
        </div> 

         
     </div>
           
      <div className='content' >

      
            
         <img
        src={coin?.image.large}
        height="200"
        style={{marginBottom:20,}}
        />

        </div>        
          
            
    </div>
  )
}

export default CoinPage
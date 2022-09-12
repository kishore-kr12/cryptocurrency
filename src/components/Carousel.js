import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import "../styles/banner.css"
import { TrendingCoins } from '../config/api'
import {CryptoState} from "../Context"
import AliceCarousel from 'react-alice-carousel'
import { Link,useNavigate } from 'react-router-dom'
import millify from 'millify'



const Carousel = () => {

    const{currency,symbol} = CryptoState()
    const [trending, setTrending] = useState([])

 const fetchTrendingCoins =async()=>{

     const {data}=  await axios.get(TrendingCoins(currency))
     setTrending(data)

 }  
 
    useEffect(()=>{

    fetchTrendingCoins()
    
   }, [currency])  

   const navigate = useNavigate()


   const items = trending.map((coin)=>{
  
     const profit = coin.price_change_percentage_24h >=0;

    return(
    <Link className='carouselItem'
    to={`/coins/${coin.id}`} >
        <img
        src={coin?.image}
        height="80"
        style={{marginBottom:40}}
        onClick={() => navigate(`/coins/${coin.id}`)}
        />
        <span>{coin?.symbol}
         &nbsp;
          <span style={{
            color:profit>0 ?"green" :"red",
            fontWeight:400
          }} >
            {profit && "+"} {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        
        <span style={{fontWeight:400,fontSize:22}}>
          {symbol} {millify(coin?.current_price)} 
        </span>

      </Link>   
    )
   })
  
  
  const responsive = {
    0: {
        items: 1,
    },
    512: {
        items: 3
    }
  }
  console.log(trending)


  return (
    <div className='carousel'>
        <AliceCarousel
         mouseTracking
         infinite
         autoPlayInterval={1000}
         animationDuration={1500}
         disableDotsControls
         disableButtonsControls
         responsive={responsive}
         autoPlay
         items={items}
        >

        </AliceCarousel>
    </div>
  )
}

export default Carousel
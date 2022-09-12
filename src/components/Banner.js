import { Container, Typography } from '@mui/material'
import React from 'react'
import "../styles/banner.css";
import Carousel from './Carousel';

const Banner = () => {
  return (
    <div  className='banner'>
        <Container className='banner-content' >
           <div className="tag-line">
             <Typography variant='h2'
             style={{fontWeight:"bold",
                    fontFamily:"Montserrat",
                    marginBottom:15,}} >
              Crypto Hunter
             </Typography>
             <Typography variant='subtitle2'
             style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
             }} >
                   Get all the Info regarding your favorite Crypto Currency
             </Typography>
           </div>
          <Carousel/>
        </Container>
    </div>
  )
}

export default Banner
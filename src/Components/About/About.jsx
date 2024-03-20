import React from 'react'
import './AboutPage.css';
import FineMan from '../../img/Img-Apart-1/Lifestyle and Personal Branding Photography Ideas for Realtors or Mortgage Lenders - The Stylish Lender.jfif'

function About() {
  return (
    <div  className='container-fluid bg-white'>

      <div className=''>
             <p className='text-center mt-3 fs-3 fw-bold text-secondary'>Welcome To AccessLite Real Estate Dapp</p> 
      </div>

      <div className='mt-4 d-flex gap-5'>
        <img src={FineMan} alt="" className='imgg'/>
        <div>
          <p className='text-secondary fs-5 fw-bold'>Project Overview</p>
          <p></p>
        </div>
      </div>
    
    </div>
  )
}

export default About
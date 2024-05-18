import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div>
<div className="hero min-h-screen " style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Welcome to <span className='text-teal-400'>MileStones</span></h1>
      <p className="mb-5">
      Track your journey, celebrate your achievements, and plan your future with Milestones. Whether personal, professional, or life milestones, our app helps you stay organized, motivated, and inspired every step of the way.
      </p>
      <Link to="/user " className="btn btn-outline btn-accent">Be A User</Link> <br />
      <Link  to= "/creator" className="btn btn-outline btn-accent mt-[7px]">Be A Milestone Creator</Link>
    </div>
  </div>
</div>
    </div>
  )
}

export default Hero
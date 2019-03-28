import React from 'react'
import Tilt from 'react-tilt'
import logo from '../../images/logo1.png'

import './Logo.css'

const Logo = () =>{
  return(
    <div className='logo'>
      <Tilt className="Tilt br2 ma5" options={{ max : 50 }} style={{ height: 180, width: 180 }} >
       <div className="Tilt-inner"><img src={logo} alt='logo'/></div>
      </Tilt>

    </div>
  )
}

export default Logo;

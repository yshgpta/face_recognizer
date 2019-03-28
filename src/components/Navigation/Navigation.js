import React from 'react';

import './Navigation.css'

const Navigation = ({onRouteChange,isSignedIn}) =>{
  if(isSignedIn){
    return(
      <nav style={{display:'flex',justifyContent:'flex-end'}}>
        <p onClick={()=>onRouteChange('signout')} className="f2 nav-item">Sign Out</p>
      </nav>
    )
  } else {
    return(
      <nav style={{display:'flex',justifyContent:'flex-end'}}>
        <p onClick={()=>onRouteChange('signin')} className="f2 nav-item">Sign In</p>
        <p onClick={()=>onRouteChange('register')} className="f2 nav-item">Register</p>
      </nav>
    )
  }


}
export default Navigation;

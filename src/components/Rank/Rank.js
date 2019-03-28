import React from 'react';

import './Rank.css'

const Rank = ({name, entries}) =>{
  return(
    <div className='rank tc'>
      <p className='rank-welcome'>Welcome <span className='rank-name'>{name}</span></p>
      <p className='rank-count'>Your current count is {entries}</p>
    </div>
  )
}
export default Rank;

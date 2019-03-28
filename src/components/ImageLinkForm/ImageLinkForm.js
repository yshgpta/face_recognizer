import React from 'react';

import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
  return(
    <div className='body-imagelinkform tc'>
      <p className='input-header'>This magic brain will detect faces. Give it a try...</p>
      <div>
        <input className='input-image' type='text' onChange={onInputChange} placeholder='Paste the image link here..'/>
        <button className='btn-detect' onClick={onButtonSubmit}>Detect</button>
      </div>
    </div>
  )
}
export default ImageLinkForm;

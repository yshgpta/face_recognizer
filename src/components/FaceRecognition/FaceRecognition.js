import React from 'react';
import './FaceRecognition.css'


const FaceRecognition = ({imageUrl, box, info}) =>{
  if(imageUrl){
  return(
    <div className='tc body-facerecognition'>
    <div className='body-facerecognition-img'>
    <img id='inputimage' src={imageUrl} alt='' width='auto' height='350px'/>
    <div className='bounding_box' style={{top:box.top_row, right:box.right_col, bottom:box.bottom_row, left:box.left_col}}></div>
    </div>
    <div className='body-facerecognition-info'>
      <div className='body-center'>
      <div><span className='key'>Gender Appearance: </span><span className='value'>{info.gender}</span></div><hr/>
      <div><span className='key'>Age Appearance: </span><span className='value'>{info.age}</span></div><hr/>
      <div><span className='key'>Regional Appearance: </span><span className='value'>{info.location}</span></div>
      </div>
    </div>
    </div>
  )
  }else{
    return <div></div>
  }
}
export default FaceRecognition;

import React from 'react'

export const Complexities = ({complexities}) => {
  return (
    <div>
      {complexities?.length>0?
      complexities.map((comp,index)=><span key={index}>{comp} </span>
      ):
      <p>No Complexities</p>
      }
    </div>
  )
}

import React from 'react'

export const Solutions = ({solutions}) => {
  return (
    <div>
      {
        solutions?.length>0?
        solutions.map((solution,index)=>
          <a key={index} href={solution} target="_blank" rel="noreferrer" className="badge bg-success me-2">Solution-{index+1}</a>):
        <p>No solutions</p>
      }
    </div>
  )
}

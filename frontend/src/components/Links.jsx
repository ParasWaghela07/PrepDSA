import React from 'react'

export const Links = ({links}) => {
  return (
    <div>
      {
        links?.length>0?links.map((link,index)=>
          <a key={index} href={link.link} target="_blank" rel="noreferrer" className="badge bg-primary me-2">Link-{index+1}</a>
        ):<p>No links found</p>
      }
    </div>
  )
}

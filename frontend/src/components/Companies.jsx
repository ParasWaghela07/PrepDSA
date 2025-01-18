import React from 'react'

export const Companies = ({companies}) => {
  return (
    <div>
      {companies?.length>0?companies.map((company,index)=>
        <span key={index} className="badge bg-secondary me-2">{company.company_name}</span>
      ):<p>No companies found</p>}
    </div>
  )
}

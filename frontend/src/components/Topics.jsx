import React from 'react'

export const Topics = ({topics}) => {
  return (
    <div>
      {topics?.length>0 ?
      topics.map((topic,index)=><span key={index}>{topic.topic_name} </span>)
    :<p>No topics</p>}
    </div>
  )
}

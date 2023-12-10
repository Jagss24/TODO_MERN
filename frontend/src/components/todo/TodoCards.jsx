import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {GrDocumentUpdate} from 'react-icons/gr'
import "./todo.css"
const TodoCards = ({title,body,listid,delid,display,updateId,toBeUpdate}) => {
  return (
    <div className='p-3 todo-card'>
        <div>
            <h5>{title}</h5>
            <p className='todo-card-p'>{body}   </p>
        </div>
        <div className='d-flex justify-content-around'>
        <div className='card-icon-head px-2 py-1' 
        onClick={()=>{
          display("block")
          toBeUpdate(updateId)
          }} >
            <GrDocumentUpdate className='card-icons update'/> Update
        </div>
        <div className='card-icon-head px-2 py-1 del-head' onClick={()=>{delid(listid)}}>
            <AiFillDelete className='card-icons del'/> Delete
        </div>
        </div>
        
    </div>
  )
}

export default TodoCards
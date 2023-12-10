import React, {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./todo.css"
import TodoCards from './TodoCards'
import Update from './Update';
import axios from 'axios'
let toUpdateArray = []

const Todo = () => {
    const id = sessionStorage.getItem("id")
    const [inputs, setinputs] = useState({title: "", body: ""})
    const [array, setarray] = useState([])
    const show =() =>{
        const textarea = document.getElementById("textarea")
        textarea.style.display = "block"
    }

    const change =(e) =>{
        const {name,value} = e.target
        setinputs({...inputs, [name]: value})
    }

    const submit = async() =>{
        try{
            if(inputs.title=== "" || inputs.body=== "")
                throw Error

            if(id){
                await axios.post(`${window.location.origin}/api/v2/addTask`,{title: inputs.title,body: inputs.body, id:id})
                .then((res) => console.log(res.data))
                setinputs({title:"", body: ""})
                toast.success('Your Task is added')
            }
            else{
               setarray([...array,inputs])
               setinputs({title:"", body: ""})
               toast.info('Your Task is added but not saved. Please Signin to save it')
            }
            
        }
        catch(err){
            if(inputs.title === "" && inputs.body === "")
            toast.info('Please add the title and body');
            else if(inputs.title === "")
            toast.info("Please Add the Title")
            else if(inputs.body === "")
            toast.info("Please Add the Body")
            else
            toast.info("Something went wrong")
        }
         
    }
    
    const update =(value,listid) => {
        toUpdateArray =  array[value]
    }

    const del =async(listid) =>{
        if(id){
        await axios.delete(`${window.location.origin}/api/v2/deleteTask/${listid}`,{data: {id:id}})
        .then((res) => toast.success("Your Task is Deleted Successfully"))
        }
        else{
            toast.error("Please Signup First")
        }
    }

    useEffect(() => {
        if(id){
            const fetch = async() => {
                await axios.get(`${window.location.origin}/api/v2/getTasks/${id}`).then((res) => setarray(res.data.list))
            }
            fetch();    
        }
          
    },[submit])
    
const dis = (value) =>{
        document.getElementById("todo-update").style.display= `${value}`
    }
  return (
    <>
    <div className='todo'>
        <div className='todo-main container d-flex justify-content-center align-items-center  my-4 flex-column'>
            <div className='d-flex flex-column todo-inputs-div w-lg-50 w-100 p-1'>
            <input type="text" placeholder='TITLE' className='my-2 p-2 todo-inputs' onClick={show} name='title' value={inputs.title} onChange={change}/>
            <textarea id="textarea" type="text" placeholder='BODY' className='pb-3 p-2 todo-inputs' name='body' value={inputs.body}  onChange={change} />
            </div>
            <div className='d-flex justify-content-end w-lg-50 w-100 '>
                <button className='home-btn px-2 py-1 my-3 ' onClick={submit}>Add</button>
                <ToastContainer />
            </div>
            
        </div>
        <div className="todo-body">
            <div className="container-fluid" >
                <div className="row">
                {array && array.map((item,index) => (
                    <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2 " key={index}>
                    <TodoCards title={item.title} body={item.body} listid={item._id} delid={del} display={dis} updateId={index} toBeUpdate={update}/>
                </div>
                ))}
                   
                </div>
                
            </div>
        </div>
    </div>
    <div  id="todo-update">
        <div className="container update" >
            <Update display={dis} update={toUpdateArray} key={toUpdateArray}/>
        </div>    
    </div>
    </>
  )
}

export default Todo
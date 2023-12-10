import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Update = ({display,update}) => {
  const id = sessionStorage.getItem("id")
  const [inputs, setinputs] = useState({title: update.title, body: update.body})

  
  const change = (e) => {
    const { name, value } = e.target;
    setinputs({...inputs,[name]:value});
  }
  
  
  const submit = async() => {
    if(id){
      await axios.put(`${window.location.origin}/api/v2/updateTask/${update._id}`,{title:inputs.title,body:inputs.body,id:id})
    .then((res) => toast.success(res.data.message))

    display("none")
    }
    else{
      toast.error("Please Signup First")
    }
  }

  const close = () => {
    setinputs({title: update.title ,body: update.body})
    display("none")
  }

  useEffect(() => {
    setinputs({ title: update.title, body: update.body });
  }, [update]);
  return (
    <div  className='bg-secondary p-5 d-flex justify-content-center align-items-start flex-column'>
        <h3>Update Your Task</h3>
        <input type="text" className='todo-inputs w-100 p-3 my-5' placeholder='Title'  name='title'  value={inputs.title} onChange={change}/>
        <textarea className='todo-inputs w-100 p-3' placeholder='Body' name='body'  value={inputs.body}  onChange={change}></textarea>
        <div>
        <button className='btn btn-dark my-4' onClick={submit}>Update</button>
        <button className='btn btn-danger my-4 mx-3' onClick={close}>Close</button>
        </div>
    </div>
  )
}
 
export default Update
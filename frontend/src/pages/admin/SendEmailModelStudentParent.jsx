import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddButton from './common/AddButton';

const SendEmailModelStudentParent = ({
    apiEndpoints: {
        getEndpoint1,
        getEndpoint2,
        sendEndpoint
      },
      entityId,
      title,
      fields,
      onClose
}) => {
   
    const[student,setStudent] = useState({})
    const[parent,setParent] = useState({})

    useEffect(()=>{
        loadStudent();
        loadParent();
      },[]);
    
      const loadStudent = async()=>{
        const result = await axios.get(
            `${getEndpoint1}/${entityId}`);
            setStudent(result.data);   
      }
      const loadParent = async()=>{
        const result = await axios.get(
            `${getEndpoint2}/${entityId}`);
            setParent(result.data);   
      }
      const handleStudentInputChange = (e)=>{
        setStudent({...student,[e.target.name] : e.target.value});   
      }
      const handleParentInputChange = (e)=>{
        setParent({...parent,[e.target.name] : e.target.value});
      }
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        await Promise.all([
         axios.post(`${sendEndpoint}/${parent.user.userId}`, {
            toMail: parent[fields[1].name],
          }),
         axios.post(`${sendEndpoint}/${student.user.userId}`, {
            toMail: student[fields[0].name],
          }),
        ]);
          onClose();
        
       
      };
      

      const handleClose = (e) =>{
        if(e.target.id === 'wrapper') onClose();
      }

    
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
        <div className='w-1/3 bg-white  rounded-2xl'>
            <header className='flex justify-between items-center p-3 bg-gray-950  rounded-t-2xl border'>
                <span className='text-2xl text-white'>{title}</span>
            </header>

            <form className='p-6 space-y-3 text-sm' onSubmit={handleSubmit}>
                <div className='space-y-1'>
                {fields.map((field,index)=>(
                    <div key={field.name}>
                      <label className='block text-gray-700' htmlFor={field.name}>
                      {field.label}
                      </label>
                      <input className='w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm'
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      required={field.required}
                      value={
                        index === 0 
                            ? student[field.name] || '' 
                            : parent[field.name] || ''
                        }
                      onChange={
                        index === 0 
                            ? handleStudentInputChange 
                            : handleParentInputChange
                            }
                        />
                    
                    </div>
                      ))}
                </div>
                <div className='px-1 flex justify-between py-1 mr-5'>
                <div className='col-sm-2'>
                <AddButton btnname='Send' className='flex items-end bg-gray-950 pb-2.5 w-48 h-12' type='submit'/>
                </div>
                 <div className='col-sm-2'>
                    <button
                      type='button'
                      onClick={onClose}
                      className='btn btn-outline-warning btn-lg'
                    >
                      Cancel
                    </button>
                </div> 
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default SendEmailModelStudentParent
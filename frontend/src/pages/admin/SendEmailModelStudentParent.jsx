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
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

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
        setIsLoading(true);
        await Promise.all([
         axios.post(`${sendEndpoint}/${parent.userId}`, {
            toMail: parent[fields[1].name],
          }),
         axios.post(`${sendEndpoint}/${student.userId}`, {
            toMail: student[fields[0].name],
          }),
        ]);
          setIsSent(true);
          setTimeout(() => onClose(true), 1000)
          onClose();
          setIsLoading(false);
      };
      

      const handleClose = (e) =>{
        if(e.target.id === 'wrapper') onClose();
      }

    
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
        <div className='w-1/3 bg-white  rounded-2xl'>
            <header className='flex justify-between items-center p-3 bg-indigo-800  rounded-t-2xl border'>
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
                <AddButton 
                   btnname={isLoading ? 'Sending...' : isSent ? 'Sent' : 'Send'}
                   className={`flex items-center justify-center text-white w-48 h-12 rounded-lg ${
                    isSent ? 'bg-blue-600' : 'bg-indigo-500'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type='submit' disabled={isLoading || isSent}
                  >
                  {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : isSent ? 'Sent' : 'Send'}
                </AddButton>
                </div>
                 <div className='col-sm-2'>
                    <button
                      type='button'
                      onClick={onClose}
                      className='btn btn-secondary btn-lg'
                      disabled={isLoading}
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
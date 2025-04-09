import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddButton from './common/AddButton';


const SendEmailModel = ({
  apiEndpoints: {
    getEndpoint,
    sendEndpoint
  },
  entityId,
  title,
  fields,
  onClose
}) => {

    const[entity,setEntity] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    useEffect(()=>{
        loadEntity();
      },[]);
    
      const loadEntity = async()=>{
        const result = await axios.get(
            `${getEndpoint}/${entityId}`);
            setEntity(result.data);   
      }
      const handleInputChange = (e)=>{
        setEntity({...entity,[e.target.name] : e.target.value});
      }

    const sendUserCredentials = async(e)=>{
 
        e.preventDefault();
        setIsLoading(true);
        await axios.post(`${sendEndpoint}/${entity.user.userId}`,

           {toMail:entity[fields[0].name]}
        );
        setIsSent(true);
        setTimeout(() => onClose(true), 1000)
        onClose();
        setIsLoading(false);
      }

      const handleClose = (e) =>{
        if(e.target.id === 'wrapper') onClose();
      }

  return ( 
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
        <div className='w-1/3 bg-white  rounded-2xl'>
            <header className='flex justify-between items-center p-3 bg-indigo-800  rounded-t-2xl border'>
                <span className='text-2xl text-white'>{title}</span>
            </header>

            <form className='p-6 space-y-3 text-sm' onSubmit={(e)=>sendUserCredentials(e)}>
                <div className='space-y-1'>
                {fields.map((field)=>(
                    <div>
                      <label className='block text-gray-700' htmlFor={field.name}>
                      {field.label}
                      </label>
                      <input className='w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm'
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      required={field.required}
                      value={entity[field.name] || ''}
                      onChange={handleInputChange}
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

export default SendEmailModel
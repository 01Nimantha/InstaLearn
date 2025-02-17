import React, { useEffect, useState } from 'react'
import axios from 'axios';

const EditModel = ({
  apiEndpoints: {
    getEndpoint,
    updateEndpoint
  },
  fields,
  onClose,
  entityId,
  title
}) => {

  const[entity,setEntity] = useState({})

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

const handleSubmit = async(e)=>{
  e.preventDefault();
  await axios.put(`${updateEndpoint}/${entityId}`, entity);
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

            <form className='p-6 space-y-3 text-sm' onSubmit={(e)=>handleSubmit(e)}>
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
                    <button
                        className='btn btn-outline-success btn-lg'
                        type='submit'>
                        Save
                    </button>
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

export default EditModel
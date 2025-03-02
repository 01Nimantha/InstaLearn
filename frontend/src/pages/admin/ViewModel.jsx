import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ViewModel = ({
  apiEndpoints: {
    getEndpoint,
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

const handleClose = (e) =>{
  if(e.target.id === 'wrapper') onClose();
}

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
        <div className='w-1/3 bg-white  rounded-2xl'>
            <header className='flex justify-between items-center p-3 bg-gray-950  rounded-t-2xl border'>
                <span className='text-2xl text-white'>{title}</span>
            </header>

            <div className="p-6 space-y-3 text-sm">
                <div className="space-y-2">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-gray-700 font-bold">
                        {field.label}:
                      </label>
                      <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                        {typeof entity[field.name] === "boolean" ? (
                            entity[field.name] ? "Yes" : "No"
                          ) : (
                            entity[field.name] || "Not Available"
                          )}
                      </div>
                    </div>
                  ))}
                </div>
            </div>
             
            <div className="flex justify-center mb-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline-warning btn-lg"
            >
              Close
            </button>
          </div>
    
            
        </div>
    </div>
  )
}

export default ViewModel

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddButton from './common/AddButton';

const EditModel = ({
  apiEndpoints: {
    getEndpoint,
    updateEndpoint
  },
  fields,
  onClose,
  entityId,
  title,
  includeSwitch
}) => {

  const[isSwitchOn, setIsSwitchOn] = useState(false);
  const[entity,setEntity] = useState({})

  useEffect(()=>{
    loadEntity();
  },[]);

  const handleSwitchChange = (e) => {
    setIsSwitchOn(!isSwitchOn);
  };

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
  const finalFormData = includeSwitch ? { ...entity, freeCard:isSwitchOn } : entity;
  await axios.put(`${updateEndpoint}/${entityId}`, finalFormData);
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
                {includeSwitch && (
                    <div className="flex items-center gap-3 mt-4">
                    <span className="text-sm">Enable Free Card:</span>
                    <label className="relative inline-flex items-center cursor-pointer" htmlFor='freeCard'>
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            id="freeCard"
                            name='freeCard'
                            checked={isSwitchOn}
                            onChange={handleSwitchChange}
                        />
                        <div className="w-14 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-950"></div>
                    </label>
                </div>
                )}
                <div className='px-1 flex justify-between py-1 mr-5'>
                <div className='col-sm-2'>
                <AddButton btnname='Update' className='flex items-end bg-gray-950 pb-2.5 w-48 h-12' type='submit'/>
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
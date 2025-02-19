import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddButton from './common/AddButton';

const prepareForm = (fields) => {
    return fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
};

    const AddDetailsFormModel = ({
        apiEndpoints: {
            getEndpoint,
            saveEndpoint
          },
        onClose,
        title,
        btnTitle,
        fields,
        includeSwitch
    }) => {

        const initialForm = prepareForm(fields);
        const[form,setForm] = useState(initialForm);
        const[isSwitchOn,setIsSwitchOn] = useState(false);


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [id]: value,
        }));
    };

    const handleSwitchChange = (e) => {
        setIsSwitchOn(!isSwitchOn);
      };

      useEffect(()=>{
        loadEntity();
      },[]);
    
    const loadEntity = async()=>{
      const result = await axios.get(
          getEndpoint,{
            validateStatus:()=>{
                return true;
            }
        }
        );
        if(result.status == 302){
            setForm(result.data); 
        }    
                
        }

        const saveUser = async(formData)=>{
        const response = await axios.post(
            saveEndpoint, formData);
            return response.data;
        };
    const handleSubmit = (e) => {
        e.preventDefault();
        const finalFormData = includeSwitch ? { ...form, isSwitchOn } : form;
        saveUser(finalFormData);
        window.location.reload(); 
        
      };
      

        const handleClose = (e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
        <div className='w-1/3 bg-white  rounded-2xl'>
            <header className='flex justify-between items-center p-3 bg-gray-950  rounded-t-2xl border'>
                <span className='text-2xl text-white'>{title}</span>
            </header>

            <form className='p-6 space-y-3 text-sm' onSubmit={handleSubmit}>
                
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
                      placeholder={field.placeholder}
                      required={field.required}
                      value={form[field.name]}
                      onChange={handleInputChange}
                  />
              </div>
                  ))}
                </div>
                {includeSwitch && (
                    <div className="flex items-center gap-3 mt-4">
                    <span className="text-sm">Enable Free Card:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            id="Free_Card"
                            checked={isSwitchOn}
                            onChange={handleSwitchChange}
                        />
                        <div className="w-14 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-950"></div>
                    </label>
                </div>
                )}
                
                <div className='px-1 flex justify-between py-1 mr-5'>
                <div>
                    <AddButton btnname={btnTitle} className='flex items-end bg-gray-950 pb-2.5 w-48 h-12' type='submit'/>
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
};


export default AddDetailsFormModel

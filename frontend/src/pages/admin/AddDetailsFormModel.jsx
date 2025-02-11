import React, { useState } from 'react'
import Label from './common/formComponents/Label';
import SubmitButton from './common/formComponents/SubmitButton';

const prepareForm = (formArr) => {
    return formArr.reduce((r, v) => ({ ...r, [v.inputid]: "" }), {});
};

    const AddDetailsFormModel = ({isvisible,onClose,title,formArr,button,includeSwitch}) => {

        const initialForm = prepareForm(formArr);
        const[form,setForm] = useState(initialForm);
        const[isSwitchOn,setIsSwitchOn] = useState(false);

    if(!isvisible) return null;
    const handleClose = (e) =>{
        if(e.target.id === 'wrapper') onClose();
    }

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalFormData = includeSwitch ? { ...form, isSwitchOn } : form;
        if (button.onClick) {
          button.onClick(finalFormData);
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
                {formArr.map(({labelName,inputtype,inputid,inputplaceholder},index)=>(
                    <Label 
                        key={index} 
                        labelName={labelName} 
                        inputtype={inputtype} 
                        inputid={inputid} 
                        inputplaceholder={inputplaceholder}
                        inputvalue={form[inputid]}

                        onChange={(e)=>handleInputChange(e)}/>
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
                
                <SubmitButton btnname={button.btnname}/>
                
            </form>
            
        </div>
    </div>
  )
};


export default AddDetailsFormModel
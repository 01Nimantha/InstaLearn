import React, { useState } from 'react'
import Label from './common/formComponents/Label';
import SubmitButton from './common/formComponents/SubmitButton';


const prepareForm = (formArr) => {
    return formArr.reduce((r, v) => ({ ...r, [v.inputid]: "" }), {});
};

    const AddDetailsFormModel = ({isvisible,onClose,title,formArr,button}) => {

        const initialForm = prepareForm(formArr);
        const[form,setForm] = useState(initialForm);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (button.onClick) {
          button.onClick(form);
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
                <SubmitButton btnname={button.btnname}/>
                
            </form>
            
        </div>
    </div>
  )
};


export default AddDetailsFormModel
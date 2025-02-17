import React, { useEffect, useState } from 'react'
import LabeledInput from './common/formComponents/LabeledInput';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const SendEmailModel = () => {

    const {adminId} = useParams();

    let navigate = useNavigate();

    const[admin, setAdmin] = useState({
        adminName:'',
        adminEmail:'',
        adminContactno:'',
        adminAddress:'',
        user:{}
      });
    
    const{adminEmail} = admin;

    useEffect(()=>{
        loadAdmin();
      },[]);
    
    const loadAdmin = async()=>{
      const result = await axios.get(
          `http://localhost:8085/api/v1/admin/get-admin-by/${adminId}`);
          setAdmin(result.data);   
    }
    
    const handleInputChange = (e)=>{
      setAdmin({...admin,[e.target.name] : e.target.value});
    }

    const sendAdminCredentials = async(e)=>{
 
        e.preventDefault();
        await axios.post(`http://localhost:8085/api/v1/mail/send-teacher-credentials/${admin.user.userId}`,
           {toMail:adminEmail}
        );
        navigate('/admins-view');
      }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id="wrapper">
        <div className='w-1/3 bg-white  rounded-2xl'>
            <header className='flex justify-between items-center p-3 bg-gray-950  rounded-t-2xl border'>
                {/* <span className='text-2xl text-white'>Email</span> */}
            </header>

            <form className='p-6 space-y-3 text-sm' onSubmit={(e)=>sendAdminCredentials(e)}>
                <div className='space-y-1'>
                <div className='input-group mb-5'>
                  <label className='input-group-text' htmlFor='adminEmail'>
                  Admin Email
                  </label>
                  <input className='form-control col-sm-6'
                  type='email'
                  name='adminEmail'
                  id='adminEmail'
                  required
                  value={adminEmail}
                  onChange={(e)=>handleInputChange(e)}/>
                </div>

                </div>
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" 
                >
                Send Email
                </button>
            </form>
            
        </div>
    </div>
  )
}

export default SendEmailModel


import React, { useEffect } from 'react'
import SearchBar from './common/SearchBar'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddButton from './common/AddButton';
import AddDetailsFormModel from './AddDetailsFormModel';

const AdminsView = () => {

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [admins, setadmins] = useState([]);

  useEffect(()=>{
    loadadmins();
  },[]);
 
const loadadmins = async()=>{
    const result = await axios.get(
        "http://localhost:8085/api/v1/admin/get-all-admins",{
            validateStatus:()=>{
                return true;
            }
        }
    );
    if(result.status == 302){
        setadmins(result.data);
    }    
}
const handleDelete = async(adminId)=>{
  await axios.delete(`http://localhost:8085/api/v1/admin/delete/${adminId}`);
  loadadmins();
}

const updateAdmin = async(formData)=>{
  await axios.post('http://localhost:8085/api/v1/admin/save', formData);
      setShowModal(false);
      loadadmins();   
};

  return (
    <div className=' min-h-screen bg-[#D9D9D9]'>
      <header className="flex items-center justify-between bg-black text-white h-[150px]">
              <div className='pl-10'>
                <h1 className="text-2xl font-bold leading-8">Admin</h1>
              </div>
              <div className='pr-10'>
                <Link to={'/'}className="bg-red-600 hover:bg-red-700 rounded w-48 h-10 flex justify-center items-center gap-[10px] text-decoration-none">
                  <span className='text-white font-bold font-Nunito text-xl '>Home</span>
                </Link>
              </div>
      </header>
      <div className='mx-10'>
            <div className='flex justify-between items-center w-full py-5'>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <AddButton btnname='Add Admin' className='flex items-end bg-gray-950 pb-2.5 w-48 h-12' onClick={()=>setShowModal(true)}/>
              <AddDetailsFormModel 
                  isvisible={showModal} 
                  onClose={() => setShowModal(false)} 
                  title="Add Admin"
                  formArr={[
                    { labelName: 'Full Name', 
                      inputtype: 'text', 
                      inputid: 'adminName', 
                      inputplaceholder: 'Full Name' 
                    },
                    { labelName: 'Email', 
                      inputtype: 'email', 
                      inputid: 'adminEmail', 
                      inputplaceholder: 'Email' 
                    },
                    { labelName: 'Contact no', 
                      inputtype: 'text', 
                      inputid: 'adminContactno', 
                      inputplaceholder: 'Contact no' 
                    },
                    { labelName: 'Address', 
                      inputtype: 'text', 
                      inputid: 'adminAddress', 
                      inputplaceholder: 'Address' 
                    }
                  ]}
                  button={{ btnname: 'Add Admin', onClick: updateAdmin }}
        />
            </div>
            
 
            <section>
            <table className='shadow  w-full'>
              <thead className='bg-[#EBEBEB] h-16'>
                <tr className='text-center'>
                  <th>Admin_id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th colSpan={3}>Actions</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {admins.map((admin,index)=>(
                    <tr key={admin.adminId} className='h-16 bg-[#FFFFFF] hover:bg-gray-100 border' >
                      <td>{admin.adminId}</td>
                      <td>{admin.adminName}</td>
                      <td>{admin.adminEmail}</td>
                      <td>
                      <Link to={`/admin-profile/${admin.adminId}`} className='btn btn-info w-24 shadow'>
                            View
                        </Link>
                        </td>
                      
                      <td>
                      <Link to={`/edit-admin/${admin.adminId}`} className='btn btn-warning w-24 shadow'>
                            Update
                        </Link>
                      </td>
                      <td >
                      <button 
                        className='btn btn-danger w-24 flex justify-center items-center shadow'
                        onClick={()=>handleDelete(admin.adminId)}>
                       Delete
                        </button>
                    </td>
                      
                    </tr>
                ))}
                
              </tbody>
            </table>
          </section>
      </div>
    </div>
  )
}

export default AdminsView

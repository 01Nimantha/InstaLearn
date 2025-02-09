import React, { useEffect } from 'react'
import SearchBar from './common/SearchBar'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
    const [admins, setadmins] = useState([]);

  useEffect(()=>{
    loadadmins();
  },[]);

// 
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

  return (
    <div className=' min-h-screen bg-[#D9D9D9]'>
      <header className="flex items-center justify-between bg-black text-white h-[150px]">
              <div className='pl-10'>
                <h1 className="text-2xl font-bold leading-8">Admin</h1>
              </div>
              <div className='pr-10'>
                <Link to={'/'}className="bg-red-600 hover:bg-red-700 rounded w-48 h-10 flex justify-center items-center gap-[10px] mr-[50px] text-decoration-none">
                  <span className='text-white font-bold font-Nunito text-xl '>Home</span>
                </Link>
              </div>
      </header>
      <div className='mx-10'>
            <div className='flex justify-between items-center w-full'>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            
 
            <section>
            <table className='shadow mt-10 w-full'>
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

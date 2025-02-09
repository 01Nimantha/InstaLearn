import React, { useEffect } from 'react'
import SearchBar from './common/SearchBar'
import { useState } from 'react';
import AddButton from './common/AddButton';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';

const AttendanceOfficerView = () => {

      const [searchTerm, setSearchTerm] = useState('');
      const [aOfficers, setaOfficer] = useState([]);
    
      useEffect(()=>{
        loadaOfficer();
    },[]);
    
    // 
    const loadaOfficer = async()=>{
        const result = await axios.get(
            "http://localhost:8085/api/v1/attendanceOfficer/get-all-aOfficers",{
                validateStatus:()=>{
                    return true;
                }
            }
        );
        if(result.status == 302){
            setaOfficer(result.data);
        }    
    }
    
    const handleDelete = async(attendanceOfficerId)=>{
      await axios.delete(`http://localhost:8085/api/v1/attendanceOfficer/delete/${attendanceOfficerId}`);
      loadaOfficer();
    }
    
      return (
        <div className=' min-h-screen bg-[#D9D9D9]'>
          <header className="flex items-center justify-between bg-black text-white h-[150px]">
                  <div className='pl-10'>
                    <h1 className="text-2xl font-bold leading-8">Attendance Officer</h1>
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
                  <AddButton btnname='Add aOfficer' className='flex items-end'/>
                </div>
                
     
                <section>
                <table className='shadow mt-10 w-full'>
                  <thead className='bg-[#EBEBEB] h-16'>
                    <tr className='text-center'>
                      <th>attendanceOfficer_id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th colSpan={3}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    {aOfficers.map((aOfficer,index)=>(
                        <tr key={aOfficer.attendanceOfficerId} className='h-16 bg-[#FFFFFF] hover:bg-gray-100 border' >
                          <td>{aOfficer.attendanceOfficerId}</td>
                          <td>{aOfficer.attendanceOfficerName}</td>
                          <td>{aOfficer.attendanceOfficerEmail}</td>
                          <td>
                          <Link to={`/attendanceOfficer-profile/${aOfficer.attendanceOfficerId}`} className='btn btn-info w-24 shadow'>
                                View
                            </Link>
                            </td>
                          
                          <td>
                          <Link to={`/edit-attendanceOfficer/${aOfficer.attendanceOfficerId}`} className='btn btn-warning w-24 shadow'>
                                Update
                            </Link>
                          </td>
                          <td >
                          <button 
                            className='btn btn-danger w-24 flex justify-center items-center shadow'
                            onClick={()=>handleDelete(aOfficer.attendanceOfficerId)}>
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

export default AttendanceOfficerView
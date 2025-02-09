import React, { useEffect } from 'react'
import SearchBar from './common/SearchBar'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AttendanceOfficerView from './AttendanceOfficerView';

const ParentsView = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [parents, setParents] = useState([]);

  useEffect(()=>{
    loadParents();
  },[]);

// 
const loadParents = async()=>{
    const result = await axios.get(
        "http://localhost:8085/api/v1/parent/get-all-parents",{
            validateStatus:()=>{
                return true;
            }
        }
    );
    if(result.status == 302){
        setParents(result.data);
    }    
}

  return (
    <div className=' min-h-screen bg-[#D9D9D9]'>
      <header className="flex items-center justify-between bg-black text-white h-[150px]">
              <div className='pl-10'>
                <h1 className="text-2xl font-bold leading-8">Parent</h1>
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
                  <th>Parent_id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {parents.map((parent,index)=>(
                    <tr key={parent.parentId} className='h-16 bg-[#FFFFFF] hover:bg-gray-100 border' >
                      <td>{parent.parentId}</td>
                      <td>{parent.parentName}</td>
                      <td>{parent.parentEmail}</td>
                      <td>
                      <Link to={`/parent-profile/${parent.parentId}`} className='btn btn-info w-24 shadow'>
                            View
                        </Link>
                        </td>
                      
                      <td>
                      <Link to={`/edit-parent/${parent.parentId}`} className='btn btn-warning w-24 shadow'>
                            Update
                        </Link>
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

export default ParentsView


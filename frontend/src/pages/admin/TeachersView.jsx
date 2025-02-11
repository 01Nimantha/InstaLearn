import React, { useEffect } from 'react'
import SearchBar from './common/SearchBar'
import { useState } from 'react';
import AddButton from './common/AddButton';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';

const TeachersView = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeacher] = useState([]);

  useEffect(()=>{
    loadTeachers();
},[]);

// 
const loadTeachers = async()=>{
    const result = await axios.get(
        "http://localhost:8085/api/v1/teacher/get-all-teachers",{
            validateStatus:()=>{
                return true;
            }
        }
    );
    if(result.status == 302){
        setTeacher(result.data);
    }    
}

const handleDelete = async(teacherId)=>{
  await axios.delete(`http://localhost:8085/api/v1/teacher/delete-teacher/${teacherId}`);
  loadTeachers();
}

  return (
    <div className=' min-h-screen bg-[#D9D9D9]'>
      <header className="flex items-center justify-between bg-black text-white h-[150px]">
              <div className='pl-10'>
                <h1 className="text-2xl font-bold leading-8">Teacher</h1>
              </div>
              <div className='pr-10'>
                <Link to={'/'}className="bg-red-600 hover:bg-red-700 rounded w-48 h-10 flex justify-center items-center gap-[10px] mr-[50px] text-decoration-none">
                  <span className='text-white font-bold font-Nunito text-xl '>Home</span>
                </Link>
              </div>
      </header>
      <div className='mx-10'>
            <div className='flex justify-between items-center w-full py-5'>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <AddButton btnname='Add Teacher' className='flex items-end bg-gray-950 pb-2.5 w-48 h-12' path='/add-teacher'/>
            </div>
            
 
            <section>
            <table className='shadow w-full'>
              <thead className='bg-[#EBEBEB] h-16'>
                <tr className='text-center'>
                  <th>Teacher_id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th colSpan={3}>Actions</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {teachers.map((teacher,index)=>(
                    <tr key={teacher.teacherId} className='h-16 bg-[#FFFFFF] hover:bg-gray-100 border' >
                      <td>{teacher.teacherId}</td>
                      <td>{teacher.teacherName}</td>
                      <td>{teacher.teacherEmail}</td>
                      <td>
                      <Link to={`/teacher-profile/${teacher.teacherId}`} className='btn btn-info w-24 shadow'>
                            View
                        </Link>
                        </td>
                      
                      <td>
                      <Link to={`/edit-teacher/${teacher.teacherId}`} className='btn btn-warning w-24 shadow'>
                            Update
                        </Link>
                      </td>
                      <td >
                      <button 
                        className='btn btn-danger w-24 flex justify-center items-center shadow'
                        onClick={()=>handleDelete(teacher.teacherId)}>
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

export default TeachersView
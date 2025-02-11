import React, { useEffect } from 'react'
import SearchBar from './common/SearchBar'
import { useState } from 'react';
import AddButton from './common/AddButton';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddDetailsFormModel from './AddDetailsFormModel';

const StudentsView = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(()=>{
    loadStudents();
},[]);

// 
const loadStudents = async()=>{
    const result = await axios.get(
        'http://localhost:8085/api/v1/student/get-all-students',{
            validateStatus:()=>{
                return true;
            }
        }
    );
    if(result.status == 302){
        setStudents(result.data);
    }    
}

const handleDelete = async(studentId)=>{
  await axios.delete(`http://localhost:8085/api/v1/student/delete/${studentId}`);
  loadStudents();
}

const updateStudentAndParent = async(formData)=>{
  await axios.post('http://localhost:8085/api/v1/student/save-student-and-parent', formData);
  setShowModal(false);
  loadStudents();   
};

  return (
    <div className=' min-h-screen bg-[#D9D9D9]'>
      <header className="flex items-center justify-between bg-black text-white h-[150px]">
              <div className='pl-10'>
                <h1 className="text-2xl font-bold leading-8">Student</h1>
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
              <AddButton  btnname='Add Student' className='flex items-end bg-gray-950 pb-2.5 w-48 h-12' onClick={()=>setShowModal(true)}/>
              <AddDetailsFormModel 
                  isvisible={showModal} 
                  onClose={() => setShowModal(false)} 
                  title="Add Student"
                  formArr={[
                    { labelName: 'Full Name', 
                      inputtype: 'text', 
                      inputid: 'studentName', 
                      inputplaceholder: 'Full Name' 
                    },
                    { labelName: 'Email', 
                      inputtype: 'email', 
                      inputid: 'studentEmail', 
                      inputplaceholder: 'Email' 
                    },
                    { labelName: 'Contact no', 
                      inputtype: 'text', 
                      inputid: 'studentContactno', 
                      inputplaceholder: 'Contact no' 
                    },
                    { labelName: 'Address', 
                      inputtype: 'text', 
                      inputid: 'studentAddress', 
                      inputplaceholder: 'Address' 
                    },
                    { labelName: 'Parent Name', 
                      inputtype: 'text', 
                      inputid: 'studentParentName', 
                      inputplaceholder: 'Parent Name' 
                    },
                    { labelName: 'Parent Email', 
                      inputtype: 'email', 
                      inputid: 'studentParentEmail', 
                      inputplaceholder: 'Parent Email' 
                    },
                    { labelName: 'Parent Contact no', 
                      inputtype: 'text', 
                      inputid: 'studentParentContactno', 
                      inputplaceholder: 'Parent Contact no' 
                    }

                  ]}
                  includeSwitch={true}
                  button={{ btnname: 'Add Student', onClick: updateStudentAndParent }}/>
            </div>
            
 
            <section>
            <table className='shadow w-full'>
              <thead className='bg-[#EBEBEB] h-16'>
                <tr className='text-center'>
                  <th>Student_id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th colSpan={3}>Actions</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {students.map((student,index)=>(
                    <tr key={student.studentId} className='h-16 bg-[#FFFFFF] hover:bg-gray-100 border' >
                      <td>{student.studentId}</td>
                      <td>{student.studentName}</td>
                      <td>{student.studentEmail}</td>
                      <td>
                      <Link to={`/student-profile/${student.studentId}`} className='btn btn-info w-24 shadow'>
                            View
                        </Link>
                        </td>
                      
                      <td>
                      <Link to={`/edit-student/${student.studentId}`} className='btn btn-warning w-24 shadow'>
                            Update
                        </Link>
                      </td>
                      <td >
                      <button 
                        className='btn btn-danger w-24 flex justify-center items-center shadow'
                        onClick={()=>handleDelete(student.studentId)}>
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

export default StudentsView
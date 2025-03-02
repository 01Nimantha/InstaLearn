import React, { useEffect } from 'react'
import SearchBar from './common/SearchBar'
import { useState } from 'react';
import AddButton from './common/AddButton';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddDetailsFormModel from './AddDetailsFormModel';
import EditModel from './EditModel';
import SendEmailModel from './SendEmailModel';
import ViewModel from './ViewModel';
import DeleteModel from './common/DeleteModel';

const TeacherEditModel = ({ onClose,teacherId }) => (
  <EditModel
    title="Update Teacher"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/teacher/get-teacher-by',
      updateEndpoint: 'http://localhost:8085/api/v1/teacher/update'
    }}
    fields={[
      { label: 'Teacher Name', name: 'teacherName', type: 'text', required: true },
      { label: 'Teacher Email', name: 'teacherEmail', type: 'email', required: true },
      { label: 'Contact No', name: 'teacherContactno', type: 'text', required: true },
      { label: 'Address', name: 'teacherAddress', type: 'text', required: true }
    ]}
    onClose={onClose}
    entityId={teacherId}
  />
)
const TeacherViewModel = ({ onClose,teacherId }) => (
  <ViewModel
    title="Teacher Profile"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/teacher/get-teacher-by'
    }}
    fields={[
      {label: 'Teacher Id', name: 'teacherId'},
      { label: 'Teacher Name', name: 'teacherName'},
      { label: 'Teacher Email', name: 'teacherEmail'},
      { label: 'Contact No', name: 'teacherContactno'},
      { label: 'Address', name: 'teacherAddress' }
    ]}
    onClose={onClose}
    entityId={teacherId}
  />
  )

const TeacherSendEmailModel = ({ onClose,teacherId }) => (
  <SendEmailModel
    title="Send Teacher Credentials"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/teacher/get-teacher-by',
      sendEndpoint: 'http://localhost:8085/api/v1/mail/send-user-credentials'
    }}
    fields={[
      { label: 'Teacher Email', name: 'teacherEmail', type: 'email', required: true }
    ]}
    onClose={onClose}
    entityId={teacherId}
  />
)
const TeacherAddDetailsFormModel = ({ onClose }) => (
  <AddDetailsFormModel 
          
    title="Add Teacher"
    btnTitle='Add Teacher'
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/teacher/get-all-teachers',
      saveEndpoint: 'http://localhost:8085/api/v1/teacher/save'
    }}
    fields={[
      { label: 'Full Name',type: 'text', name: 'teacherName', placeholder: 'Full Name',required: true},
      { label: 'Email', type: 'email', name: 'teacherEmail', placeholder: 'Email' ,required: true},
      { label: 'Contact no', type: 'text',  name: 'teacherContactno',  placeholder: 'Contact no' ,required: true},
      { label: 'Address', type: 'text', name: 'teacherAddress', placeholder: 'Address' ,required: true}
          ]}
    onClose={onClose}
    />
)

const TeachersView = () => {

  const [activeModal,setActiveModal] = useState(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null)
  const [showModal, setShowModal] = useState(false);
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
const TeacherDeleteModel = ({ onClose,teacherId }) => (
  <DeleteModel
    title="Delete Teacher"
    apiEndpoints={{
      deleteEndpoint: 'http://localhost:8085/api/v1/teacher/delete-teacher'
    }}
    onClose={onClose}
    entityId={teacherId}
  /> 
)

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
                <Link to={'/admin-dashboard'}className="bg-red-600 hover:bg-red-700 rounded w-48 h-10 flex justify-center items-center gap-[10px] text-decoration-none">
                  <span className='text-white font-bold font-Nunito text-xl '>Home</span>
                </Link>
              </div>
      </header>
      <div className='mx-10'>
            <div className='flex justify-between items-center w-full py-5'>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <AddButton btnname='Add Teacher' className='flex items-end bg-gray-950 pb-2.5 w-48 h-12' onClick={()=>setActiveModal('add')}/>
            </div>
            
 
            <section>
            <table className='shadow w-full'>
              <thead className='bg-[#EBEBEB] h-16'>
                <tr className='text-center'>
                  <th>Teacher_id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th colSpan={4}>Actions</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {teachers.filter((teacher) => 
                  teacher.teacherId
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()))
                .map((teacher,index)=>(
                    <tr key={teacher.teacherId} className='h-16 bg-[#FFFFFF] hover:bg-gray-100 border' >
                      <td>{teacher.teacherId}</td>
                      <td>{teacher.teacherName}</td>
                      <td>{teacher.teacherEmail}</td>
                      <td>
                      <button className='btn btn-info w-24 shadow' 
                        onClick={() => {
                          setSelectedTeacherId(teacher.teacherId);
                          setActiveModal('view');
                          }} >
                            View
                        </button>
                        </td>
                      
                      <td>
                      <button className='btn btn-warning w-24 shadow' 
                        onClick={() => {
                          setSelectedTeacherId(teacher.teacherId);
                          setActiveModal('edit');
                          }} >
                            Update
                        </button>
                      </td>
                      <td>
                      <button className='btn btn-success w-24 shadow' 
                        onClick={() => {
                          setSelectedTeacherId(teacher.teacherId);
                          setActiveModal('email');
                          }} >
                           Email
                        </button>
                      </td>
                      <td >
                      <button 
                        className='btn btn-danger w-24 flex justify-center items-center shadow'
                        onClick={() => {
                          setSelectedTeacherId(teacher.teacherId);
                          setActiveModal('delete');
                          }}>
                       Delete
                        </button>
                    </td>
                      
                    </tr>
                ))}
                
              </tbody>
            </table>
          </section>
          {activeModal == 'add'&&(
          <TeacherAddDetailsFormModel
            onClose={() => {
              setActiveModal(null);
              loadTeachers();
            }

            }
          />
        )}
          {activeModal == 'edit' && selectedTeacherId && (
          <TeacherEditModel
            teacherId={selectedTeacherId}
            onClose={() => {
              setSelectedTeacherId(null)
              setActiveModal(null);
              loadTeachers()
            }

            }
          />
        )}
        {activeModal == 'email' && selectedTeacherId && (
          <TeacherSendEmailModel
            teacherId={selectedTeacherId}
            onClose={() => {
              setSelectedTeacherId(null);
              setActiveModal(null);
              loadTeachers();
            }

            }
          />
        )}
        {activeModal == 'view' && selectedTeacherId && (
          <TeacherViewModel
            teacherId={selectedTeacherId}
            onClose={() => {
              setSelectedTeacherId(null);
              setActiveModal(null);
              loadTeachers();
            }

            }
          />
        )}
        {activeModal == 'delete' && selectedTeacherId && (
          <TeacherDeleteModel
            teacherId={selectedTeacherId}
            onClose={() => {
              setSelectedTeacherId(null);
              setActiveModal(null);
              loadTeachers();
            }

            }
          />
        )}
      </div>
    </div>
  )
}

export default TeachersView
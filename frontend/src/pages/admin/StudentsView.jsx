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
import SendEmailModelStudentParent from './SendEmailModelStudentParent';

const StudentEditModel = ({ onClose,studentId }) => (
  <EditModel
    title="Update Student"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/student/get-student-by',
      updateEndpoint: 'http://localhost:8085/api/v1/student/update'
    }}
    fields={[
      { label: 'Student Name', name: 'studentName', type: 'text', required: true },
      { label: 'Student Email', name: 'studentEmail', type: 'email', required: true },
      { label: 'Contact No', name: 'studentContactno', type: 'text', required: true },
      { label: 'Address', name: 'studentAddress', type: 'text', required: true }
    ]}
    onClose={onClose}
    entityId={studentId}
  />
)
const StudentSendEmailModel = ({ onClose,studentId }) => (
  <SendEmailModelStudentParent
    title="Send student Credentials"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/student/get-student-by',
      sendEndpoint: 'http://localhost:8085/api/v1/mail/send-user-credentials'
    }}
    fields={[
      { label: 'Student Email', name: 'studentEmail', type: 'email', required: true },
      { label: 'Parent Email', name: 'studentParentEmail', type: 'email', required: true }
      
    ]}
    onClose={onClose}
    entityId={studentId}
  />
)
const StudentViewModel = ({ onClose,studentId }) => (
  <ViewModel
    title="Student Profile"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/student/get-student-by'
    }}
    fields={[
      {label: 'Student Id', name: 'studentId'},
      { label: 'Student Name', name: 'studentName'},
      { label: 'Student Email', name: 'studentEmail'},
      { label: 'Contact No', name: 'studentContactno'},
      { label: 'Address', name: 'studentAddress' },
      {label: 'Parent Name', name: 'studentParentName' },
      {label: 'Parent Email', name: 'studentParentEmail' },
      {label: 'Parent Contact No', name: 'studentParentContactno' },
      {label:'Free Card', name: 'freeCard' }
    ]}
    onClose={onClose}
    entityId={studentId}
  />
)
const StudentAddDetailsFormModel = ({ onClose }) => (
  <AddDetailsFormModel 
          
    title="Add Student"
    btnTitle='Add Student'
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/student/get-all-students',
      saveEndpoint: 'http://localhost:8085/api/v1/student/save-student-and-parent'
    }}
    fields={[
      { label: 'Full Name',type: 'text', name: 'studentName', placeholder: 'Full Name',required: true},
      { label: 'Email',type: 'email',name: 'studentEmail', placeholder: 'Email',required: true },
      { label: 'Contact no',type: 'text',name: 'studentContactno',  placeholder: 'Contact no',required: true},
      { label: 'Address', type: 'text', name: 'studentAddress',placeholder: 'Address',required: true},
      { label: 'Parent Name',type: 'text',name: 'studentParentName',placeholder: 'Parent Name',required: true},
      { label: 'Parent Email',type: 'email',name: 'studentParentEmail',placeholder: 'Parent Email',required: true},
      { label: 'Parent Contact no',type: 'text',name: 'studentParentContactno',placeholder: 'Parent Contact no',required: true}
          ]}
    includeSwitch={true}
    onClose={onClose}
    />
)
const StudentsView = () => {
  
  const [activeModal,setActiveModal] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null)
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

const saveStudentAndParent = async(formData)=>{
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
                <Link to={'/admin-dashboard'}className="bg-red-600 hover:bg-red-700 rounded w-48 h-10 flex justify-center items-center gap-[10px] text-decoration-none">
                    <span className='text-white font-bold font-Nunito text-xl '>Home</span>
                </Link>
              </div>
      </header>
      <div className='mx-10'>
            <div className='flex justify-between items-center w-full py-5'>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <AddButton  btnname='Add Student' className='flex items-end bg-gray-950 pb-2.5 w-48 h-12' onClick={()=>setActiveModal('add')}/>
            </div>
            
 
            <section>
            <table className='shadow w-full'>
              <thead className='bg-[#EBEBEB] h-16'>
                <tr className='text-center'>
                  <th>Student_id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th colSpan={4}>Actions</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {students.filter((student) => 
                  student.studentId 
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()))
                .map((student,index)=>(
                    <tr key={student.studentId} className='h-16 bg-[#FFFFFF] hover:bg-gray-100 border' >
                      <td>{student.studentId}</td>
                      <td>{student.studentName}</td>
                      <td>{student.studentEmail}</td>
                      <td>
                      <button className='btn btn-info w-24 shadow' 
                        onClick={() => {
                          setSelectedStudentId(student.studentId);
                          setActiveModal('view');
                          }} >
                            View
                        </button>
                        </td>
                      <td>
                      <button className='btn btn-warning w-24 shadow' 
                        onClick={() => {
                          setSelectedStudentId(student.studentId);
                          setActiveModal('edit');
                          }} >
                            Update
                        </button>
                      </td>
                      <td>
                      <button className='btn btn-success w-24 shadow' 
                        onClick={() => {
                          setSelectedStudentId(student.studentId);
                          setActiveModal('email');
                          }} >
                           Email
                        </button>
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
          {activeModal == 'add' && (
          <StudentAddDetailsFormModel
            onClose={() => {
              setActiveModal(null);
              loadStudents();
            }

            }

          />
        )}
          {activeModal == 'edit' && selectedStudentId && (
          <StudentEditModel
            studentId={selectedStudentId}
            onClose={() => {
              setSelectedStudentId(null);
              setActiveModal(null);
              loadStudents();
            }

            }

          />
        )}
        {activeModal == 'email' && selectedStudentId && (
          <StudentSendEmailModel
            studentId={selectedStudentId}
            onClose={() => {
              setSelectedStudentId(null);
              setActiveModal(null);
              loadStudents();
            }

            }
          />
        )}
        {activeModal == 'view' && selectedStudentId && (
          <StudentViewModel
            studentId={selectedStudentId}
            onClose={() => {
              setSelectedStudentId(null);
              setActiveModal(null);
              loadStudents();
            }

            }

          />
        )}
      </div>
    </div>
  )
}

export default StudentsView
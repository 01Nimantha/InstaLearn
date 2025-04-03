import React, { useEffect, useState } from 'react';
import SearchBar from './common/SearchBar';
import AddButton from './common/AddButton';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddDetailsFormModel from './AddDetailsFormModel';
import EditModel from './EditModel';
import SendEmailModel from './SendEmailModel';
import ViewModel from './ViewModel';
import DeleteModel from './common/DeleteModel';

const TeacherEditModel = ({ onClose, teacherId }) => (
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
);

const TeacherViewModel = ({ onClose, teacherId }) => (
  <ViewModel
    title="Teacher Profile"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/teacher/get-teacher-by'
    }}
    fields={[
      { label: 'Teacher Id', name: 'teacherId' },
      { label: 'Teacher Name', name: 'teacherName' },
      { label: 'Teacher Email', name: 'teacherEmail' },
      { label: 'Contact No', name: 'teacherContactno' },
      { label: 'Address', name: 'teacherAddress' }
    ]}
    onClose={onClose}
    entityId={teacherId}
  />
);

const TeacherSendEmailModel = ({ onClose, teacherId }) => (
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
);

const TeacherAddDetailsFormModel = ({ onClose }) => (
  <AddDetailsFormModel
    title="Add Teacher"
    btnTitle='Add Teacher'
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/teacher/get-all-teachers',
      saveEndpoint: 'http://localhost:8085/api/v1/teacher/save'
    }}
    fields={[
      { label: 'Full Name', type: 'text', name: 'teacherName', placeholder: 'Full Name', required: true },
      { label: 'Email', type: 'email', name: 'teacherEmail', placeholder: 'Email', required: true },
      { label: 'Contact no', type: 'text', name: 'teacherContactno', placeholder: 'Contact no', required: true },
      { label: 'Address', type: 'text', name: 'teacherAddress', placeholder: 'Address', required: true }
    ]}
    onClose={onClose}
  />
);

const TeacherDeleteModel = ({ onClose, teacherId }) => (
  <DeleteModel
    title="Delete Teacher"
    apiEndpoints={{
      deleteEndpoint: 'http://localhost:8085/api/v1/teacher/delete-teacher'
    }}
    onClose={onClose}
    entityId={teacherId}
  />
);

const TeachersView = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState([]); // Fixed variable name from setTeacher to setTeachers
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5);

  useEffect(() => {
    loadTeachers();
  }, [currentPage, searchTerm]); // Added searchTerm as a dependency

  const loadTeachers = async () => {
    try {
      const url = `http://localhost:8085/api/v1/teacher/get-all-teachers?page=${currentPage}&size=${pageSize}${
        searchTerm ? `&searchTerm=${encodeURIComponent(searchTerm)}` : ''
      }`;
      const result = await axios.get(url, { validateStatus: () => true });
      if (result.status === 200) {
        setTeachers(result.data.content);
        setTotalPages(result.data.totalPages);
      }
    } catch (error) {
      console.error('Error loading teachers:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(0); // Reset to first page on new search
  };

  return (
    <div className='min-h-screen bg-[#D9D9D9]'>
      <header className="flex flex-col sm:flex-row items-center justify-between bg-black text-white h-auto sm:h-[150px] p-4 sm:p-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold leading-8 text-center sm:text-left">Teacher</h1>
        </div>
        <div>
          <Link to={'/admin-dashboard'} className="bg-red-600 hover:bg-red-700 rounded w-full sm:w-48 h-10 flex justify-center items-center gap-[10px] text-decoration-none">
            <span className='text-white font-bold font-Nunito text-lg sm:text-xl'>Home</span>
          </Link>
        </div>
      </header>

      <div className='mx-4 sm:mx-10'>
        <div className='flex flex-col sm:flex-row justify-between items-center w-full py-5 gap-4 sm:gap-0'>
          <div className='w-full sm:w-auto'>
            <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
          </div>
          <div className='w-full sm:w-auto'>
            <AddButton 
              btnname='Add Teacher' 
              className='w-full sm:w-48 h-12 bg-gray-950 flex items-center justify-center' 
              onClick={() => setActiveModal('add')}
            />
          </div>
        </div>

        <section className='overflow-x-auto'>
          <table className='shadow w-full min-w-[600px]'>
            <thead className='bg-[#EBEBEB] h-12 sm:h-16'>
              <tr className='text-center text-xs sm:text-base'>
                <th className='p-2 align-middle'>Teacher_id</th>
                <th className='p-2 align-middle'>Name</th>
                <th className='p-2 align-middle'>Email</th>
                <th className='p-2 align-middle' colSpan={4}>Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {teachers.map((teacher) => ( // Removed client-side filter
                <tr 
                  key={teacher.teacherId} 
                  className='h-12 sm:h-16 bg-[#FFFFFF] hover:bg-gray-100 border text-xs sm:text-sm'
                >
                  <td className='p-2 align-middle'>{teacher.teacherId}</td>
                  <td className='p-2 align-middle'>{teacher.teacherName}</td>
                  <td className='p-2 align-middle break-all'>{teacher.teacherEmail}</td>
                  <td className='p-1 align-middle'>
                    <button 
                      className='btn btn-info w-full sm:w-24 shadow text-xs sm:text-sm py-1 sm:py-2' 
                      onClick={() => {
                        setSelectedTeacherId(teacher.teacherId);
                        setActiveModal('view');
                      }}
                    >
                      View
                    </button>
                  </td>
                  <td className='p-1 align-middle'>
                    <button 
                      className='btn btn-warning w-full sm:w-24 shadow text-xs sm:text-sm py-1 sm:py-2' 
                      onClick={() => {
                        setSelectedTeacherId(teacher.teacherId);
                        setActiveModal('edit');
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td className='p-1 align-middle'>
                    <button 
                      className='btn btn-success w-full sm:w-24 shadow text-xs sm:text-sm py-1 sm:py-2' 
                      onClick={() => {
                        setSelectedTeacherId(teacher.teacherId);
                        setActiveModal('email');
                      }}
                    >
                      Email
                    </button>
                  </td>
                  <td className='p-1 align-middle'>
                    <button 
                      className='btn btn-danger w-full sm:w-24 shadow text-xs sm:text-sm py-1 sm:py-2' 
                      onClick={() => {
                        setSelectedTeacherId(teacher.teacherId);
                        setActiveModal('delete');
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-2 sm:gap-4">
          <button
            className="btn btn-secondary w-full sm:w-auto px-4 py-2 text-xs sm:text-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span className='text-xs sm:text-sm self-center'>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            className="btn btn-secondary w-full sm:w-auto px-4 py-2 text-xs sm:text-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>

      {activeModal === 'add' && (
        <TeacherAddDetailsFormModel
          onClose={() => {
            setActiveModal(null);
            loadTeachers();
          }}
        />
      )}
      {activeModal === 'edit' && selectedTeacherId && (
        <TeacherEditModel
          teacherId={selectedTeacherId}
          onClose={() => {
            setSelectedTeacherId(null);
            setActiveModal(null);
            loadTeachers();
          }}
        />
      )}
      {activeModal === 'email' && selectedTeacherId && (
        <TeacherSendEmailModel
          teacherId={selectedTeacherId}
          onClose={() => {
            setSelectedTeacherId(null);
            setActiveModal(null);
            loadTeachers();
          }}
        />
      )}
      {activeModal === 'view' && selectedTeacherId && (
        <TeacherViewModel
          teacherId={selectedTeacherId}
          onClose={() => {
            setSelectedTeacherId(null);
            setActiveModal(null);
            loadTeachers();
          }}
        />
      )}
      {activeModal === 'delete' && selectedTeacherId && (
        <TeacherDeleteModel
          teacherId={selectedTeacherId}
          onClose={() => {
            setSelectedTeacherId(null);
            setActiveModal(null);
            loadTeachers();
          }}
        />
      )}
    </div>
  );
};

export default TeachersView;
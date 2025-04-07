import React, { useEffect, useState } from 'react';
import SearchBar from './common/SearchBar';
import AddButton from './common/AddButton';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddDetailsFormModel from './AddDetailsFormModel';
import EditModel from './EditModel';
import ViewModel from './ViewModel';
import SendEmailModelStudentParent from './SendEmailModelStudentParent';
import DeleteModel from './common/DeleteModel';
import { Delete, Edit, View, Mail } from 'lucide-react';

const StudentEditModel = ({ onClose, studentId }) => (
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
    includeDropDown={true}
    includeCheckbox={true}
    includeSwitch={true}
  />
);

const StudentSendEmailModel = ({ onClose, studentId }) => (
  <SendEmailModelStudentParent
    title="Send student Credentials"
    apiEndpoints={{
      getEndpoint1: 'http://localhost:8085/api/v1/student/get-only-student-by',
      getEndpoint2: 'http://localhost:8085/api/v1/student/get-parent-by-student',
      sendEndpoint: 'http://localhost:8085/api/v1/mail/send-user-credentials'
    }}
    fields={[
      { label: 'Student Email', name: 'studentEmail', type: 'email', required: true },
      { label: 'Parent Email', name: 'parentEmail', type: 'email', required: true }
    ]}
    onClose={onClose}
    entityId={studentId}
  />
);

const StudentViewModel = ({ onClose, studentId }) => (
  <ViewModel
    title="Student Profile"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/student/get-student-by'
    }}
    fields={[
      { label: 'Student Id', name: 'studentId' },
      { label: 'Student Name', name: 'studentName' },
      { label: 'Student Email', name: 'studentEmail' },
      { label: 'Contact No', name: 'studentContactno' },
      { label: 'Address', name: 'studentAddress' },
      { label: 'Parent Name', name: 'studentParentName' },
      { label: 'Parent Email', name: 'studentParentEmail' },
      { label: 'Parent Contact No', name: 'studentParentContactno' },
      { label: 'Class Types', name: 'classTypes' },
      { label: 'Free Card', name: 'freeCard' }

    ]}
    onClose={onClose}
    entityId={studentId}
  />
);

const StudentAddDetailsFormModel = ({ onClose }) => (
  <AddDetailsFormModel
    title="Add Student"
    btnTitle='Add Student'
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/student/get-all-students',
      saveEndpoint: 'http://localhost:8085/api/v1/student/save-student-and-parent'
    }}
    fields={[
      { label: 'Full Name', type: 'text', name: 'studentName', placeholder: 'Full Name', required: true },
      { label: 'Email', type: 'email', name: 'studentEmail', placeholder: 'Email', required: true },
      { label: 'Contact no', type: 'text', name: 'studentContactno', placeholder: 'Contact no', required: true },
      { label: 'Address', type: 'text', name: 'studentAddress', placeholder: 'Address', required: true },
      { label: 'Parent Name', type: 'text', name: 'studentParentName', placeholder: 'Parent Name', required: true },
      { label: 'Parent Email', type: 'email', name: 'studentParentEmail', placeholder: 'Parent Email', required: true },
      { label: 'Parent Contact no', type: 'text', name: 'studentParentContactno', placeholder: 'Parent Contact no', required: true }
    ]}
    includeSwitch={true}
    includeDropDown={true}
    includeCheckbox={true}
    onClose={onClose}
  />
);

const StudentDeleteModel = ({ onClose, studentId }) => (
  <DeleteModel
    title="Delete Student with Parent"
    apiEndpoints={{
      deleteEndpoint: 'http://localhost:8085/api/v1/student/delete'
    }}
    onClose={onClose}
    entityId={studentId}
  />
);

const StudentsView = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5);
  const [sentEmails, setSentEmails] = useState(new Set());

  useEffect(() => {
    loadStudents();
  }, [currentPage, searchTerm]); // Added searchTerm as a dependency

  const loadStudents = async () => {
    try {
      const url = `http://localhost:8085/api/v1/student/get-all-students?page=${currentPage}&size=${pageSize}${
        searchTerm ? `&searchTerm=${encodeURIComponent(searchTerm)}` : ''
      }`;
      const result = await axios.get(url, { validateStatus: () => true });
      if (result.status === 200) {
        setStudents(result.data.content);
        setTotalPages(result.data.totalPages);
      }
    } catch (error) {
      console.error('Error loading students:', error);
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
  const handleEmailSent = (studentId, success) => {
    if (success) {
      setSentEmails(prev => new Set(prev).add(studentId));
    }
    setSelectedStudentId(null);
    setActiveModal(null);
    loadStudents();
  };

  return (
    <div className='min-h-screen bg-slate-100'>
      <header className="flex flex-col sm:flex-row items-center justify-between bg-indigo-800 text-white h-auto sm:h-[150px] p-4 sm:p-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold leading-8 text-center sm:text-left">Student</h1>
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
          <AddButton 
            btnname='Add Student' 
            className='w-full sm:w-48 h-12 bg-indigo-500 flex items-center justify-center' 
            onClick={() => setActiveModal('add')}
          />
        </div>

        <section className='overflow-x-auto'>
          <table className='shadow w-full min-w-[600px]'>
            <thead className='bg-indigo-100 h-12 sm:h-16'>
              <tr className='text-center text-xs sm:text-base'>
                <th className='p-2'>Student_id</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Email</th>
                <th colSpan={4} className='p-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {students.map((student) => ( // Removed client-side filter
                <tr key={student.studentId} className='h-12 sm:h-16 bg-[#FFFFFF] hover:bg-gray-100 border text-xs sm:text-sm'>
                  <td className='p-2'>{student.studentId}</td>
                  <td className='p-2'>{student.studentName}</td>
                  <td className='p-2 break-all'>{student.studentEmail}</td>
                  <td className='p-1'>
                    <button 
                      onClick={() => {
                        setSelectedStudentId(student.studentId);
                        setActiveModal('view');
                      }}
                    >
                      <View className="text-blue-500 hover:text-blue-600"/>
                    </button>
                  </td>
                  <td className='p-1'>
                    <button 
                      onClick={() => {
                        setSelectedStudentId(student.studentId);
                        setActiveModal('edit');
                      }}
                    >
                      <Edit className="text-amber-500 hover:text-amber-600"/>
                    </button>
                  </td>
                  <td className='p-1'>
                    <button 
                      onClick={() => {
                        setSelectedStudentId(student.studentId);
                        setActiveModal('email');
                      }}
                    >
                      <Mail className={sentEmails.has(student.studentId) ? 'text-green-500' : 'text-indigo-500 hover:text-indigo-600'}/>
                    </button>
                  </td>
                  <td className='p-1'>
                    <button 
                      onClick={() => {
                        setSelectedStudentId(student.studentId);
                        setActiveModal('delete');
                      }}
                    >
                      <Delete className="text-red-500 hover:text-red-600"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-2 sm:gap-4">
          <button
            className="bg-indigo-300 rounded w-full sm:w-auto px-4 py-2 text-xs sm:text-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span className='text-xs sm:text-sm'>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            className="bg-indigo-300 rounded w-full sm:w-auto px-4 py-2 text-xs sm:text-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>

      {activeModal === 'add' && (
        <StudentAddDetailsFormModel
          onClose={() => {
            setActiveModal(null);
            loadStudents();
          }}
        />
      )}
      {activeModal === 'edit' && selectedStudentId && (
        <StudentEditModel
          studentId={selectedStudentId}
          onClose={() => {
            setSelectedStudentId(null);
            setActiveModal(null);
            loadStudents();
          }}
        />
      )}
      {activeModal === 'email' && selectedStudentId && (
        <StudentSendEmailModel
          studentId={selectedStudentId}
          onClose={(success) => handleEmailSent(selectedStudentId, success)}
        />
      )}
      {activeModal === 'view' && selectedStudentId && (
        <StudentViewModel
          studentId={selectedStudentId}
          onClose={() => {
            setSelectedStudentId(null);
            setActiveModal(null);
            loadStudents();
          }}
        />
      )}
      {activeModal === 'delete' && selectedStudentId && (
        <StudentDeleteModel
          studentId={selectedStudentId}
          onClose={() => {
            setSelectedStudentId(null);
            setActiveModal(null);
            loadStudents();
          }}
        />
      )}
    </div>
  );
};

export default StudentsView;
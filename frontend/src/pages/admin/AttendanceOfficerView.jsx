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

const AttendanceOfficerEditModel = ({ onClose, attendanceOfficerId }) => (
  <EditModel 
    title="Update Attendance Officer"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/attendanceOfficer/get-aOfficer-by',
      updateEndpoint: 'http://localhost:8085/api/v1/attendanceOfficer/update'
    }}
    fields={[
      { label: 'AttendanceOfficer Name', name: 'attendanceOfficerName', type: 'text', required: true },
      { label: 'AttendanceOfficer Email', name: 'attendanceOfficerEmail', type: 'email', required: true },
      { label: 'Contact No', name: 'attendanceOfficerContactno', type: 'text', required: true },
      { label: 'Address', name: 'attendanceOfficerAddress', type: 'text', required: true }
    ]}
    onClose={onClose}
    entityId={attendanceOfficerId}
  />
);

const AttendanceOfficerSendEmailModel = ({ onClose, attendanceOfficerId }) => (
  <SendEmailModel
    title="Send Attendance Officer Credentials"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/attendanceOfficer/get-aOfficer-by',
      sendEndpoint: 'http://localhost:8085/api/v1/mail/send-user-credentials'
    }}
    fields={[
      { label: 'AOfficer Email', name: 'attendanceOfficerEmail', type: 'email', required: true }
    ]}
    onClose={onClose}
    entityId={attendanceOfficerId}
  />
);

const AttendanceOfficerViewModel = ({ onClose, attendanceOfficerId }) => (
  <ViewModel
    title="Attendance Officer Profile"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/attendanceOfficer/get-aOfficer-by'
    }}
    fields={[
      { label: 'AttendanceOfficer Id', name: 'attendanceOfficerId' },
      { label: 'AttendanceOfficer Name', name: 'attendanceOfficerName' },
      { label: 'AttendanceOfficer Email', name: 'attendanceOfficerEmail' },
      { label: 'Contact No', name: 'attendanceOfficerContactno' },
      { label: 'Address', name: 'attendanceOfficerAddress' }
    ]}
    onClose={onClose}
    entityId={attendanceOfficerId}
  />
);

const AOfficerAddDetailsFormModel = ({ onClose }) => (
  <AddDetailsFormModel 
    title="Add AOfficer"
    btnTitle='Add AOfficer'
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/attendanceOfficer/get-all-aOfficers',
      saveEndpoint: 'http://localhost:8085/api/v1/attendanceOfficer/save'
    }}
    fields={[
      { label: 'Full Name', type: 'text', name: 'attendanceOfficerName', placeholder: 'Full Name', required: true },
      { label: 'Email', type: 'email', name: 'attendanceOfficerEmail', placeholder: 'Email', required: true },
      { label: 'Contact no', type: 'text', name: 'attendanceOfficerContactno', placeholder: 'Contact no', required: true },
      { label: 'Address', type: 'text', name: 'attendanceOfficerAddress', placeholder: 'Address', required: true }
    ]}
    onClose={onClose}
  />
);

const AttendanceOfficerDeleteModel = ({ onClose, attendanceOfficerId }) => (
  <DeleteModel
    title="Delete Attendance Officer"
    apiEndpoints={{
      deleteEndpoint: 'http://localhost:8085/api/v1/attendanceOfficer/delete'
    }}
    onClose={onClose}
    entityId={attendanceOfficerId}
  /> 
);

const AttendanceOfficerView = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedAOfficerId, setSelectedAOfficerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [aOfficers, setAOfficers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5);
  const [sentEmails, setSentEmails] = useState(new Set());

  useEffect(() => {
    loadAOfficer();
  }, [currentPage, searchTerm]);

  const loadAOfficer = async () => {
    try {
      const url = `http://localhost:8085/api/v1/attendanceOfficer/get-all-aOfficers?page=${currentPage}&size=${pageSize}${
        searchTerm ? `&searchTerm=${encodeURIComponent(searchTerm)}` : ''
      }`;
      const result = await axios.get(url, { validateStatus: () => true });
      if (result.status === 200) {
        setAOfficers(result.data.content);
        setTotalPages(result.data.totalPages);
      }
    } catch (error) {
      console.error('Error loading attendance officers:', error);
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

  const handleEmailSent = (aOfficerId, success) => {
    if (success) {
      setSentEmails(prev => new Set(prev).add(aOfficerId));
    }
    setSelectedAOfficerId(null);
    setActiveModal(null);
    loadAOfficer();
  };

  return (
    <div className='min-h-screen bg-[#D9D9D9]'>
      <header className="flex flex-col sm:flex-row items-center justify-between bg-black text-white h-auto sm:h-[150px] p-4 sm:p-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold leading-8 text-center sm:text-left">Attendance Officer</h1>
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
              btnname='Add aOfficer' 
              className='w-full sm:w-48 h-12 bg-gray-950 flex items-center justify-center' 
              onClick={() => setActiveModal('add')}
            />
          </div>
        </div>

        <section className='overflow-x-auto'>
          <table className='shadow w-full min-w-[600px]'>
            <thead className='bg-[#EBEBEB] h-12 sm:h-16'>
              <tr className='text-center text-xs sm:text-base'>
                <th className='p-2 align-middle'>AOfficer_id</th>
                <th className='p-2 align-middle'>Name</th>
                <th className='p-2 align-middle'>Email</th>
                <th className='p-2 align-middle' colSpan={4}>Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {aOfficers.map((aOfficer) => (
                <tr 
                  key={aOfficer.attendanceOfficerId} 
                  className='h-12 sm:h-16 bg-[#FFFFFF] hover:bg-gray-100 border text-xs sm:text-sm'
                >
                  <td className='p-2 align-middle'>{aOfficer.attendanceOfficerId}</td>
                  <td className='p-2 align-middle'>{aOfficer.attendanceOfficerName}</td>
                  <td className='p-2 align-middle break-all'>{aOfficer.attendanceOfficerEmail}</td>
                  <td className='p-1 align-middle'>
                    <button 
                      className='btn btn-info w-full sm:w-24 shadow text-xs sm:text-sm py-1 sm:py-2'
                      onClick={() => {
                        setSelectedAOfficerId(aOfficer.attendanceOfficerId);
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
                        setSelectedAOfficerId(aOfficer.attendanceOfficerId);
                        setActiveModal('edit');
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td className='p-1 align-middle'>
                    <button 
                      className={`btn w-full sm:w-24 shadow text-xs sm:text-sm py-1 sm:py-2 ${
                        sentEmails.has(aOfficer.attendanceOfficerId) ? 'btn-success' : 'btn-primary'
                      }`}
                      onClick={() => {
                        setSelectedAOfficerId(aOfficer.attendanceOfficerId);
                        setActiveModal('email');
                      }}
                    >
                      {sentEmails.has(aOfficer.attendanceOfficerId) ? 'Sent' : 'Email'}
                    </button>
                  </td>
                  <td className='p-1 align-middle'>
                    <button 
                      className='btn btn-danger w-full sm:w-24 shadow text-xs sm:text-sm py-1 sm:py-2'
                      onClick={() => {
                        setSelectedAOfficerId(aOfficer.attendanceOfficerId);
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
        <AOfficerAddDetailsFormModel
          onClose={() => {
            setActiveModal(null);
            loadAOfficer();
          }}
        />
      )}
      {activeModal === 'edit' && selectedAOfficerId && (
        <AttendanceOfficerEditModel
          attendanceOfficerId={selectedAOfficerId}
          onClose={() => {
            setSelectedAOfficerId(null);
            setActiveModal(null);
            loadAOfficer();
          }}
        />
      )}
      {activeModal === 'email' && selectedAOfficerId && (
        <AttendanceOfficerSendEmailModel
          attendanceOfficerId={selectedAOfficerId}
          onClose={(success) => handleEmailSent(selectedAOfficerId, success)} // Fixed to pass success
        />
      )}
      {activeModal === 'view' && selectedAOfficerId && (
        <AttendanceOfficerViewModel
          attendanceOfficerId={selectedAOfficerId}
          onClose={() => {
            setSelectedAOfficerId(null);
            setActiveModal(null);
            loadAOfficer();
          }}
        />
      )}
      {activeModal === 'delete' && selectedAOfficerId && (
        <AttendanceOfficerDeleteModel
          attendanceOfficerId={selectedAOfficerId}
          onClose={() => {
            setSelectedAOfficerId(null);
            setActiveModal(null);
            loadAOfficer();
          }}
        />
      )}
    </div>
  );
};

export default AttendanceOfficerView;
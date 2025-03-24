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

// Modal components remain the same
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

// ... (other modal components remain unchanged)

const AttendanceOfficerView = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedAOfficerId, setSelectedAOfficerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [aOfficers, setAOfficers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5); // Match backend default size

  useEffect(() => {
    loadAOfficer();
  }, [currentPage]); // Reload when page changes

  const loadAOfficer = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8085/api/v1/attendanceOfficer/get-all-aOfficers?page=${currentPage}&size=${pageSize}&sort=attendanceOfficerName,asc`,
        {
          validateStatus: () => true
        }
      );
      
      if (result.status === 200) {
        setAOfficers(result.data.content); // Paginated content
        setTotalPages(result.data.totalPages); // Total pages from response
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

  return (
    <div className='min-h-screen bg-[#D9D9D9]'>
      <header className="flex items-center justify-between bg-black text-white h-[150px]">
        <div className='pl-10'>
          <h1 className="text-2xl font-bold leading-8">Attendance Officer</h1>
        </div>
        <div className='pr-10'>
          <Link to={'/admin-dashboard'} className="bg-red-600 hover:bg-red-700 rounded w-48 h-10 flex justify-center items-center gap-[10px] text-decoration-none">
            <span className='text-white font-bold font-Nunito text-xl'>Home</span>
          </Link>
        </div>
      </header>
      <div className='mx-10'>
        <div className='flex justify-between items-center w-full py-5'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <AddButton 
            btnname='Add aOfficer' 
            className='flex items-end bg-gray-950 pb-2.5 w-48 h-12'
            onClick={() => setActiveModal('add')}
          />
        </div>
        
        <section>
          <table className='shadow w-full'>
            <thead className='bg-[#EBEBEB] h-16'>
              <tr className='text-center'>
                <th>attendanceOfficer_id</th>
                <th>Name</th>
                <th>Email</th>
                <th colSpan={4}>Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {aOfficers
                .filter((aOfficer) =>
                  aOfficer.attendanceOfficerName
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase())
                )
                .map((aOfficer) => (
                  <tr 
                    key={aOfficer.attendanceOfficerId} 
                    className='h-16 bg-[#FFFFFF] hover:bg-gray-100 border'
                  >
                    <td>{aOfficer.attendanceOfficerId}</td>
                    <td>{aOfficer.attendanceOfficerName}</td>
                    <td>{aOfficer.attendanceOfficerEmail}</td>
                    <td>
                      <button 
                        className='btn btn-info w-24 shadow'
                        onClick={() => {
                          setSelectedAOfficerId(aOfficer.attendanceOfficerId);
                          setActiveModal('view');
                        }}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button 
                        className='btn btn-warning w-24 shadow'
                        onClick={() => {
                          setSelectedAOfficerId(aOfficer.attendanceOfficerId);
                          setActiveModal('edit');
                        }}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button 
                        className='btn btn-success w-24 shadow'
                        onClick={() => {
                          setSelectedAOfficerId(aOfficer.attendanceOfficerId);
                          setActiveModal('email');
                        }}
                      >
                        Email
                      </button>
                    </td>
                    <td>
                      <button 
                        className='btn btn-danger w-24 flex justify-center items-center shadow'
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

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 gap-4">
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </section>

        {/* Modal components remain the same, just update onClose to refresh data */}
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
          <AttendanceOffficerSendEmailModel
            attendanceOfficerId={selectedAOfficerId}
            onClose={() => {
              setSelectedAOfficerId(null);
              setActiveModal(null);
              loadAOfficer();
            }}
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
    </div>
  );
};

export default AttendanceOfficerView;
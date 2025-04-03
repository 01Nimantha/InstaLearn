import React, { useEffect, useState } from 'react';
import SearchBar from './common/SearchBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditModel from './EditModel';
import ViewModel from './ViewModel';

const ParentEditModel = ({ onClose, parentId }) => (
  <EditModel
    title="Update Parent"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/parent/get-parent-by',
      updateEndpoint: 'http://localhost:8085/api/v1/parent/update'
    }}
    fields={[
      { label: 'Parent Name', name: 'parentName', type: 'text', required: true },
      { label: 'Parent Email', name: 'parentEmail', type: 'email', required: true },
      { label: 'Contact No', name: 'parentContactno', type: 'text', required: true },
      { label: 'Address', name: 'parentAddress', type: 'text', required: true }
    ]}
    onClose={onClose}
    entityId={parentId}
  />
);

const ParentViewModel = ({ onClose, parentId }) => (
  <ViewModel
    title="Parent Profile"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/parent/get-parent-by'
    }}
    fields={[
      { label: 'Parent Id', name: 'parentId' },
      { label: 'Parent Name', name: 'parentName' },
      { label: 'Parent Email', name: 'parentEmail' },
      { label: 'Contact No', name: 'parentContactno' },
      { label: 'Address', name: 'parentAddress' }
    ]}
    onClose={onClose}
    entityId={parentId}
  />
);

const ParentsView = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [parents, setParents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5);

  useEffect(() => {
    loadParents();
  }, [currentPage, searchTerm]); // Added searchTerm as a dependency

  const loadParents = async () => {
    try {
      const url = `http://localhost:8085/api/v1/parent/get-all-parents?page=${currentPage}&size=${pageSize}${
        searchTerm ? `&searchTerm=${encodeURIComponent(searchTerm)}` : ''
      }`;
      const result = await axios.get(url, { validateStatus: () => true });
      if (result.status === 200) {
        setParents(result.data.content);
        setTotalPages(result.data.totalPages);
      }
    } catch (error) {
      console.error('Error loading parents:', error);
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
          <h1 className="text-xl sm:text-2xl font-bold leading-8 text-center sm:text-left">Parent</h1>
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
        </div>

        <section className='overflow-x-auto'>
          <table className='shadow w-full min-w-[500px]'>
            <thead className='bg-[#EBEBEB] h-12 sm:h-16'>
              <tr className='text-center text-xs sm:text-base'>
                <th className='p-2'>Parent_id</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Email</th>
                <th colSpan={2} className='p-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {parents.map((parent) => ( // Removed client-side filter
                <tr key={parent.parentId} className='h-12 sm:h-16 bg-[#FFFFFF] hover:bg-gray-100 border text-xs sm:text-sm'>
                  <td className='p-2'>{parent.parentId}</td>
                  <td className='p-2'>{parent.parentName}</td>
                  <td className='p-2 break-all'>{parent.parentEmail}</td>
                  <td className='p-1'>
                    <button 
                      className='btn btn-info w-full sm:w-24 shadow text-xs sm:text-sm py-1 sm:py-2' 
                      onClick={() => {
                        setSelectedParentId(parent.parentId);
                        setActiveModal('view');
                      }}
                    >
                      View
                    </button>
                  </td>
                  <td className='p-1'>
                    <button 
                      className='btn btn-warning w-full sm:w-24 shadow text-xs sm:text-sm py-1 sm:py-2' 
                      onClick={() => {
                        setSelectedParentId(parent.parentId);
                        setActiveModal('edit');
                      }}
                    >
                      Update
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
          <span className='text-xs sm:text-sm'>
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

      {activeModal === 'edit' && selectedParentId && (
        <ParentEditModel
          parentId={selectedParentId}
          onClose={() => {
            setSelectedParentId(null);
            setActiveModal(null);
            loadParents();
          }}
        />
      )}
      {activeModal === 'view' && selectedParentId && (
        <ParentViewModel
          parentId={selectedParentId}
          onClose={() => {
            setSelectedParentId(null);
            setActiveModal(null);
            loadParents();
          }}
        />
      )}
    </div>
  );
};

export default ParentsView;
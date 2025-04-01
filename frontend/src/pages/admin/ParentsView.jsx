import React, { useEffect } from 'react'
import SearchBar from './common/SearchBar'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditModel from './EditModel';
import ViewModel from './ViewModel';

const ParentEditModel = ({ onClose,parentId }) => (
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
)
const ParentViewModel = ({ onClose,parentId }) => (
  <ViewModel
    title="Parent Profile"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/parent/get-parent-by'
    }}
    fields={[
      {label: 'parent Id', name: 'parentId'},
      { label: 'parent Name', name: 'parentName'},
      { label: 'parent Email', name: 'parentEmail'},
      { label: 'Contact No', name: 'parentContactno'},
      { label: 'Address', name: 'parentAddress' }
    ]}
    onClose={onClose}
    entityId={parentId}
  />
)
const ParentsView = () => {

    const [activeModal,setActiveModal] = useState(null);
    const [selectedParentId, setSelectedParentId] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [parents, setParents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
      const [totalPages, setTotalPages] = useState(0);
      const [pageSize] = useState(5); // Match backend default size

  useEffect(()=>{
    loadParents();
  },[currentPage]);

// 
const loadParents = async()=>{
  try {
    const result = await axios.get(
      `http://localhost:8085/api/v1/parent/get-all-parents?page=${currentPage}&size=${pageSize}`,
      {
        validateStatus: () => true
      }
    );
    
    if (result.status === 200) {
      setParents(result.data.content); // Paginated content
      setTotalPages(result.data.totalPages); // Total pages from response
    }
  } catch (error) {
    console.error('Error loading attendance officers:', error);
  }   
}
const handlePageChange = (newPage) => {
  if (newPage >= 0 && newPage < totalPages) {
    setCurrentPage(newPage);
  }
};


  return (
    <div className=' min-h-screen bg-[#D9D9D9]'>
      <header className="flex items-center justify-between bg-black text-white h-[150px]">
              <div className='pl-10'>
                <h1 className="text-2xl font-bold leading-8">Parent</h1>
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
            </div>
            
 
            <section>
            <table className='shadow w-full'>
              <thead className='bg-[#EBEBEB] h-16'>
                <tr className='text-center'>
                  <th>Parent_id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {parents.filter((parent) => 
                  parent.parentId 
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()))
                .map((parent,index)=>(
                    <tr key={parent.parentId} className='h-16 bg-[#FFFFFF] hover:bg-gray-100 border' >
                      <td>{parent.parentId}</td>
                      <td>{parent.parentName}</td>
                      <td>{parent.parentEmail}</td>
                      <td>
                      <button className='btn btn-info w-24 shadow' 
                        onClick={() => {
                          setSelectedParentId(parent.parentId);
                          setActiveModal('view');
                          }} >
                        View
                        </button>
                        </td>
                      
                      <td>
                      <button className='btn btn-warning w-24 shadow' 
                        onClick={() => {
                          setSelectedParentId(parent.parentId);
                          setActiveModal('edit');
                          }} >
                        Update
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
          {activeModal == 'edit' &&selectedParentId && (
          <ParentEditModel
            parentId={selectedParentId}
            onClose={() => {
              setSelectedParentId(null)
              setActiveModal(null);
              loadParents()
            }}
          />
        )}
        {activeModal == 'view'&& selectedParentId && (
          <ParentViewModel
            parentId={selectedParentId}
            onClose={() => {
              setSelectedParentId(null)
              setActiveModal(null);
              loadParents()
            }}
          />
        )}
      </div>
    </div>
  )
}

export default ParentsView


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
import { Delete, Edit, View, Mail } from 'lucide-react';

const AdminEditModel = ({ onClose, adminId }) => (
  <EditModel
    title="Update Admin"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/admin/get-admin-by',
      updateEndpoint: 'http://localhost:8085/api/v1/admin/update'
    }}
    fields={[
      { label: 'Admin Name', name: 'adminName', type: 'text', required: true },
      { label: 'Admin Email', name: 'adminEmail', type: 'email', required: true },
      { label: 'Contact No', name: 'adminContactno', type: 'text', required: true,pattern: '^[0-9]{10}$' },
      { label: 'Address', name: 'adminAddress', type: 'text', required: true }
    ]}
    redirectUrl="/admins-view"
    onClose={onClose}
    entityId={adminId}
  />
);

const AdminSendEmailModel = ({ onClose, adminId }) => (
  <SendEmailModel
    title="Send Admin Credentials"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/admin/get-admin-by',
      sendEndpoint: 'http://localhost:8085/api/v1/mail/send-user-credentials'
    }}
    fields={[
      { label: 'Admin Email', name: 'adminEmail', type: 'email', required: true }
    ]}
    onClose={onClose}
    entityId={adminId}
  />
);

const AdminViewModel = ({ onClose, adminId }) => (
  <ViewModel
    title="Admin Profile"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/admin/get-admin-by'
    }}
    fields={[
      { label: 'Admin Id', name: 'adminId' },
      { label: 'Admin Name', name: 'adminName' },
      { label: 'Admin Email', name: 'adminEmail' },
      { label: 'Contact No', name: 'adminContactno' },
      { label: 'Address', name: 'adminAddress' }
    ]}
    onClose={onClose}
    entityId={adminId}
  />
);

const AdminAddDetailsFormModel = ({ onClose }) => (
  <AddDetailsFormModel
    title="Add Admin"
    btnTitle='Add Admin'
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/admin/get-all-admins',
      saveEndpoint: 'http://localhost:8085/api/v1/admin/save'
    }}
    fields={[
      { label: 'Full Name', type: 'text', name: 'adminName', placeholder: 'Full Name', required: true },
      { label: 'Email', type: 'email', name: 'adminEmail', placeholder: 'Email', required: true },
      { label: 'Contact no', type: 'text', name: 'adminContactno', placeholder: 'Contact no', required: true ,pattern: '^[0-9]{10}$'},
      { label: 'Address', type: 'text', name: 'adminAddress', placeholder: 'Address', required: true }
    ]}
    onClose={onClose}
  />
);

const AdminDeleteModel = ({ onClose, adminId }) => (
  <DeleteModel
    title="Delete Admin"
    apiEndpoints={{
      deleteEndpoint: 'http://localhost:8085/api/v1/admin/delete'
    }}
    onClose={onClose}
    entityId={adminId}
  />
);

const AdminsView = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [showModal, setShowModal] = useState(false); // Unused, but kept as is
  const [searchTerm, setSearchTerm] = useState('');
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5);
  const [sentEmails, setSentEmails] = useState(new Set());

  useEffect(() => {
    loadadmins();
  }, [currentPage, searchTerm]); // Added searchTerm dependency

  const loadadmins = async () => {
    try {
      const url = `http://localhost:8085/api/v1/admin/get-all-admins?page=${currentPage}&size=${pageSize}${
        searchTerm ? `&searchTerm=${encodeURIComponent(searchTerm)}` : ''
      }`;
      const result = await axios.get(url, { validateStatus: () => true });
      if (result.status === 200) {
        setAdmins(result.data.content);
        setTotalPages(result.data.totalPages);
      }
    } catch (error) {
      console.error('Error loading admins:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEmailSent = (adminId, success) => {
    if (success) {
      setSentEmails(prev => new Set(prev).add(adminId));
    }
    setSelectedAdminId(null);
    setActiveModal(null);
    loadadmins();
  };

  return (
    <div className='min-h-screen bg-slate-100'>
      <header className="flex flex-col sm:flex-row items-center justify-between bg-indigo-800 text-white h-auto sm:h-[150px] p-4 sm:p-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold leading-8 text-center sm:text-left">Admin</h1>
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
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <AddButton 
            btnname='Add Admin' 
            className='w-full sm:w-48 h-12 bg-indigo-500 flex items-center justify-center' 
            onClick={() => setActiveModal('add')}
          />
        </div>

        <section className='overflow-x-auto'>
          <table className='shadow w-full min-w-[600px]'>
            <thead className='bg-indigo-100 h-12 sm:h-16'>
              <tr className='text-center text-xs sm:text-base'>
                <th className='p-2'>Admin_id</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Email</th>
                <th colSpan={4} className='p-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {admins
                .filter((admin) => 
                  admin.adminId.toString().toUpperCase().includes(searchTerm.toUpperCase()) // Fixed toString()
                )
                .map((admin) => (
                  <tr key={admin.adminId} className='h-12 sm:h-16 bg-[#FFFFFF] hover:bg-gray-100 border text-xsA sm:text-sm'>
                    <td className='p-2'>{admin.adminId}</td>
                    <td className='p-2'>{admin.adminName}</td>
                    <td className='p-2 break-all'>{admin.adminEmail}</td>
                    <td className='p-1'>
                      <button 
                        onClick={() => {
                          setSelectedAdminId(admin.adminId);
                          setActiveModal('view');
                        }}
                      >
                        <View className="text-blue-500 hover:text-blue-600"/>
                      </button>
                    </td>
                    <td className='p-1'>
                      <button 
                        onClick={() => {
                          setSelectedAdminId(admin.adminId);
                          setActiveModal('edit');
                        }}
                      >
                        <Edit className="text-amber-500 hover:text-amber-600"/>
                      </button>
                    </td>
                    <td className='p-1'>
                      <button 
                        onClick={() => {
                          setSelectedAdminId(admin.adminId);
                          setActiveModal('email');
                        }}
                      >
                        <Mail className={sentEmails.has(admin.adminId) ? 'text-green-500' : 'text-indigo-500 hover:text-indigo-600'}/>
                      </button>
                    </td>
                    <td className='p-1'>
                      <button
                        onClick={() => {
                          setSelectedAdminId(admin.adminId);
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

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-2 sm:gap-4">
          <button
            className="bg-indigo-300 w-full sm:w-auto px-4 py-2 text-xs sm:text-sm rounded"
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
        <AdminAddDetailsFormModel
          onClose={(savedData) => {
            if (savedData) {
              setSelectedAdminId(savedData.adminId);
              setActiveModal('email');
            } else {
              setActiveModal(null);
            }
            loadadmins();
          }}
        />
      )}
      {activeModal === 'edit' && selectedAdminId && (
        <AdminEditModel
          adminId={selectedAdminId}
          onClose={() => {
            setSelectedAdminId(null);
            setActiveModal(null);
            loadadmins();
          }}
        />
      )}
      {activeModal === 'email' && selectedAdminId && (
        <AdminSendEmailModel
          adminId={selectedAdminId}
          onClose={(success) => handleEmailSent(selectedAdminId, success)} // Fixed to use handleEmailSent
        />
      )}
      {activeModal === 'view' && selectedAdminId && (
        <AdminViewModel
          adminId={selectedAdminId}
          onClose={() => {
            setSelectedAdminId(null);
            setActiveModal(null);
            loadadmins();
          }}
        />
      )}
      {activeModal === 'delete' && selectedAdminId && (
        <AdminDeleteModel
          adminId={selectedAdminId}
          onClose={() => {
            setSelectedAdminId(null);
            setActiveModal(null);
            loadadmins();
          }}
        />
      )}
    </div>
  );
};

export default AdminsView;
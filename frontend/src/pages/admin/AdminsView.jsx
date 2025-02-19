import React, { useEffect } from 'react'
import SearchBar from './common/SearchBar'
import { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AddButton from './common/AddButton';
import AddDetailsFormModel from './AddDetailsFormModel';
import EditModel from './EditModel';
import SendEmailModel from './SendEmailModel';
import ViewModel from './ViewModel';

const AdminEditModel = ({ onClose,adminId }) => (
  <EditModel
    title="Update Admin"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/admin/get-admin-by',
      updateEndpoint: 'http://localhost:8085/api/v1/admin/update'
    }}
    fields={[
      { label: 'Admin Name', name: 'adminName', type: 'text', required: true },
      { label: 'Admin Email', name: 'adminEmail', type: 'email', required: true },
      { label: 'Contact No', name: 'adminContactno', type: 'text', required: true },
      { label: 'Address', name: 'adminAddress', type: 'text', required: true }
    ]}
    redirectUrl="/admins-view"
    onClose={onClose}
    entityId={adminId}
  />
)

const AdminSendEmailModel = ({ onClose,adminId }) => (
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
)

const AdminViewModel = ({ onClose,adminId }) => (
  <ViewModel
    title="Admin Profile"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/admin/get-admin-by'
    }}
    fields={[
      {label: 'Admin Id', name: 'adminId'},
      { label: 'Admin Name', name: 'adminName'},
      { label: 'Admin Email', name: 'adminEmail'},
      { label: 'Contact No', name: 'adminContactno'},
      { label: 'Address', name: 'adminAddress' }
    ]}
    onClose={onClose}
    entityId={adminId}
  />
)
const AdminAddDetailsFormModel = ({ onClose }) => (
  <AddDetailsFormModel 
          
    title="Add Admin"
    btnTitle='Add Admin'
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/admin/get-all-admins',
      saveEndpoint: 'http://localhost:8085/api/v1/admin/save'
    }}
    fields={[
      { label: 'Full Name',type: 'text', name: 'adminName', placeholder: 'Full Name',required: true},
      { label: 'Email', type: 'email', name: 'adminEmail', placeholder: 'Email' ,required: true},
      { label: 'Contact no', type: 'text',  name: 'adminContactno',  placeholder: 'Contact no' ,required: true},
      { label: 'Address', type: 'text', name: 'adminAddress', placeholder: 'Address' ,required: true}
          ]}
    onClose={onClose}
  
    />
)

const AdminsView = () => {

  const [activeModal,setActiveModal] = useState(null);
  const [selectedAdminId, setSelectedAdminId] = useState(null)
  const [showModal, setShowModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [admins, setAdmins] = useState([]);

  useEffect(()=>{
    loadadmins();
  },[]);
 
const loadadmins = async()=>{
    const result = await axios.get(
        "http://localhost:8085/api/v1/admin/get-all-admins",{
            validateStatus:()=>{
                return true;
            }
        }
    );
    if(result.status == 302){
        setAdmins(result.data);
    }    
}

const handleDelete = async(adminId)=>{
  await axios.delete(`http://localhost:8085/api/v1/admin/delete/${adminId}`);
  loadadmins();
}

  return (
    <div className=' min-h-screen bg-[#D9D9D9]'>
      <header className="flex items-center justify-between bg-black text-white h-[150px]">
              <div className='pl-10'>
                <h1 className="text-2xl font-bold leading-8">Admin</h1>
              </div>
              <div className='pr-10'>
                <Link to={'/admin-dashboard'} className="bg-red-600 hover:bg-red-700 rounded w-48 h-10 flex justify-center items-center gap-[10px] text-decoration-none">
                  <span className='text-white font-bold font-Nunito text-xl '>Home</span>
                </Link>
              </div>
      </header>
      <div className='mx-10'>
            <div className='flex justify-between items-center w-full py-5'>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <AddButton btnname='Add Admin' className='flex items-end bg-gray-950 pb-2.5 w-48 h-12' 
                onClick={()=>setActiveModal('add')}/>
            </div>
 
            <section>
            <table className='shadow  w-full'>
              <thead className='bg-[#EBEBEB] h-16'>
                <tr className='text-center'>
                  <th>Admin_id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th colSpan={4}>Actions</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {admins.filter((admin) => 
                  admin.adminId 
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()))
                .map((admin,index)=>(
                    <tr key={admin.adminId} className='h-16 bg-[#FFFFFF] hover:bg-gray-100 border' >
                      <td>{admin.adminId}</td>
                      <td>{admin.adminName}</td>
                      <td>{admin.adminEmail}</td>
                      <td>
                      <button className='btn btn-info w-24 shadow' 
                        onClick={() => {
                          setSelectedAdminId(admin.adminId);
                          setActiveModal('view');
                          }} >
                            View
                        </button>
                        
                        </td>
                      
                      <td>
                      <button className='btn btn-warning w-24 shadow' 
                        onClick={() => {
                          setSelectedAdminId(admin.adminId);
                          setActiveModal('edit');
                          }} >
                            Update
                        </button>
                        
                      </td>
                      <td>
                      <button className='btn btn-success w-24 shadow' 
                        onClick={() => {
                          setSelectedAdminId(admin.adminId);
                          setActiveModal('email');
                          }} >
                           Email
                        </button>
                      </td>
                      <td >
                      <button 
                        className='btn btn-danger w-24 flex justify-center items-center shadow'
                        onClick={()=>handleDelete(admin.adminId)}>
                       Delete
                        </button>
                    </td>
                      
                    </tr>
                ))}
                
              </tbody>
            </table>
          </section>
          {activeModal == 'add' &&(
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
          {activeModal == 'edit' && selectedAdminId && (
          <AdminEditModel
            adminId={selectedAdminId}
            onClose={() => {
              setSelectedAdminId(null);
              setActiveModal(null);
              loadadmins();
            }

            }
          />
        )}
        {activeModal == 'email' && selectedAdminId && (
          <AdminSendEmailModel
            adminId={selectedAdminId}
            onClose={() => {
              setSelectedAdminId(null);
              setActiveModal(null);
              loadadmins();
            }

            }
          />
        )}
        {activeModal == 'view' && selectedAdminId && (
          <AdminViewModel
            adminId={selectedAdminId}
            onClose={() => {
              setSelectedAdminId(null);
              setActiveModal(null);
              loadadmins();
            }

            }
          />
        )}
      </div>
      
    </div>
  )
  
}

export default AdminsView

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

const AttendanceOfficerEditModel = ({ onClose,attendanceOfficerId }) => (
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
)
const AttendanceOffficerSendEmailModel = ({ onClose,attendanceOfficerId }) => (
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
)
const AttendanceOfficerViewModel = ({ onClose,attendanceOfficerId }) => (
  <ViewModel
    title="Attendance Officer Profile"
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/attendanceOfficer/get-aOfficer-by'
    }}
    fields={[
      {label: 'AttendanceOfficer Id', name: 'attendanceOfficerId'},
      { label: 'AttendanceOfficer Name', name: 'attendanceOfficerName'},
      { label: 'AttendanceOfficer Email', name: 'attendanceOfficerEmail'},
      { label: 'Contact No', name: 'attendanceOfficerContactno'},
      { label: 'Address', name: 'attendanceOfficerAddress' }
    ]}
    onClose={onClose}
    entityId={attendanceOfficerId}
  />
)
const AOfficerAddDetailsFormModel = ({ onClose }) => (
  <AddDetailsFormModel 
          
    title="Add AOfficer"
    btnTitle='Add AOfficer'
    apiEndpoints={{
      getEndpoint: 'http://localhost:8085/api/v1/attendanceOfficer/get-all-aOfficers',
      saveEndpoint: 'http://localhost:8085/api/v1/attendanceOfficer/save'
    }}
    fields={[
      { label: 'Full Name',type: 'text', name: 'attendanceOfficerName', placeholder: 'Full Name',required: true},
      { label: 'Email', type: 'email', name: 'attendanceOfficerEmail', placeholder: 'Email' ,required: true},
      { label: 'Contact no', type: 'text',  name: 'attendanceOfficerContactno',  placeholder: 'Contact no' ,required: true},
      { label: 'Address', type: 'text', name: 'attendanceOfficerAddress', placeholder: 'Address' ,required: true}
          ]}
    onClose={onClose}
    />
)

const AttendanceOfficerDeleteModel = ({ onClose,attendanceOfficerId }) => (
  <DeleteModel
    title="Delete Admin"
    apiEndpoints={{
      deleteEndpoint: 'http://localhost:8085/api/v1/attendanceOfficer/delete'
    }}
    onClose={onClose}
    entityId={attendanceOfficerId}
  /> 
)

const AttendanceOfficerView = () => {

      const [activeModal,setActiveModal] = useState(null);
      const [selectedAOfficerId, setSelectedAOfficerId] = useState(null)
      const [searchTerm, setSearchTerm] = useState('');
      const [aOfficers, setaOfficer] = useState([]);
      const [showModal, setShowModal] = useState(false);
    
      useEffect(()=>{
        loadaOfficer();
    },[]);
    
    // 
    const loadaOfficer = async()=>{
        const result = await axios.get(
            "http://localhost:8085/api/v1/attendanceOfficer/get-all-aOfficers",{
                validateStatus:()=>{
                    return true;
                }
            }
        );
        if(result.status == 302){
            setaOfficer(result.data);
        }    
    }

      return (
        <div className=' min-h-screen bg-[#D9D9D9]'>
          <header className="flex items-center justify-between bg-black text-white h-[150px]">
                  <div className='pl-10'>
                    <h1 className="text-2xl font-bold leading-8">Attendance Officer</h1>
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
                  <AddButton btnname='Add aOfficer' className='flex items-end bg-gray-950 pb-2.5 w-48 h-12'onClick={()=>setActiveModal('add')}/>
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
                    {aOfficers.filter((aOfficer) => 
                      aOfficer.attendanceOfficerId
                      .toUpperCase()
                      .includes(searchTerm.toUpperCase()))
                    .map((aOfficer,index)=>(
                        <tr key={aOfficer.attendanceOfficerId} className='h-16 bg-[#FFFFFF] hover:bg-gray-100 border' >
                          <td>{aOfficer.attendanceOfficerId}</td>
                          <td>{aOfficer.attendanceOfficerName}</td>
                          <td>{aOfficer.attendanceOfficerEmail}</td>
                          <td>
                          <button className='btn btn-info w-24 shadow' 
                        onClick={() => {
                          setSelectedAOfficerId(aOfficer.attendanceOfficerId);
                          setActiveModal('view');

                          }} >
                            View
                        </button>
                            </td>
                          
                          <td>
                          <button className='btn btn-warning w-24 shadow' 
                        onClick={() => {
                          setSelectedAOfficerId(aOfficer.attendanceOfficerId);
                          setActiveModal('edit');

                          }} >
                            Update
                        </button>
                          </td>
                          <td>
                      <button className='btn btn-success w-24 shadow' 
                        onClick={() => {
                          setSelectedAOfficerId(aOfficer.attendanceOfficerId);
                          setActiveModal('email');
                          }} >
                           Email
                        </button>
                      </td>
                          <td >
                          <button 
                            className='btn btn-danger w-24 flex justify-center items-center shadow'
                            onClick={() => {
                              setSelectedAOfficerId(aOfficer.attendanceOfficerId);
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
          {activeModal == 'add' &&(
          <AOfficerAddDetailsFormModel
            onClose={() => {
              setActiveModal(null);
              loadaOfficer()
            }

            }
          />
        )}
          {activeModal == 'edit' && selectedAOfficerId && (
          <AttendanceOfficerEditModel
            attendanceOfficerId={selectedAOfficerId}
            onClose={() => {
              setSelectedAOfficerId(null)
              setActiveModal(null);
              loadaOfficer()
            }

            }
          />
        )}
        {activeModal == 'email' && selectedAOfficerId && (
          <AttendanceOffficerSendEmailModel
            attendanceOfficerId={selectedAOfficerId}
            onClose={() => {
              setSelectedAOfficerId(null);
              setActiveModal(null);
              loadaOfficer();
            }

            }
          />
        )}
        {activeModal == 'view' && selectedAOfficerId && (
          <AttendanceOfficerViewModel
            attendanceOfficerId={selectedAOfficerId}
            onClose={() => {
              setSelectedAOfficerId(null);
              setActiveModal(null);
              loadaOfficer();
            }

            }
          />
        )}
        {activeModal == 'delete' && selectedAOfficerId && (
          <AttendanceOfficerDeleteModel
            attendanceOfficerId={selectedAOfficerId}
            onClose={() => {
              setSelectedAOfficerId(null);
              setActiveModal(null);
              loadaOfficer();
            }

            }
          />
        )}
          </div>
        </div>
      )
   
}

export default AttendanceOfficerView
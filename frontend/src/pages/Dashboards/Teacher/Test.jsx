import React, { Fragment, useState } from 'react'
import Modal from '../../../components/Modal'; // Adjust the path if needed


const Test = () => {
    const[showModal,setShowModal]=useState(false);
  return (
    <Fragment>
    <div>
    <button className=
    'text-white bg-blue-700 text-sm rounded-lg px-5 py-7.5 text-center mr-5'onClick={()=>setShowModal(true)}>Add</button>
              
     <Modal isVisible={showModal} onClose={()=>setShowModal(false)}>Form Modal</Modal>
              
    </div>
    </Fragment>
  )
}

export default Test

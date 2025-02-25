import React from 'react'
import Button from '../../../components/Button'
import Modal from '../../../components/Modal'

const SchedulePage = () => {
  return (
    <div className='d-flex'>
      <div className="flex justify-between items-center w-full p-3 rounded-[8px] ml-2.5">
          <h2 className="text-xl font-bold">Manage Schedule</h2>
          <Button className="align-right"
                    name={"Add Event"}
                    action={() => setShowModal(true)} // Open the modal on click
                    backgroundColor={"#287f93"}
                    fontColor={"white"}
                    cornerRadius={false}
           />
        </div>
        
    </div>
  )
}

export default SchedulePage

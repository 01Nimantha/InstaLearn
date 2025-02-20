import React from 'react'
import Button from '../../../components/Button'
import { FaSearch } from 'react-icons/fa';

const Attendance = () => {
  return (
    <div className='d-flex'>

      <div className="p-4 w-full">
      <h2 className="text-xl font-bold">Attendance</h2>
            <div className="relative flex items-center bg-[#fff] w-96 rounded-l-full shadow mt-10 h-14">
                    <input
                      type="text"
                      placeholder="Search by id..."
                      // value={searchTerm}
                      // onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-4 py-2 rounded-l-full border-gray-300"
                    />
                    <button className="absolute right-0 bg-[#287f93] text-[#fff] h-14 w-14 flex items-center  justify-center rounded-lg">
                      <FaSearch/>
                    </button>
            </div>
            

            <section>
                <table className='shadow mt-10'style={{margin:"2%",padding:"2%", minWidth:"74vw", maxWidth:"74vw",backgroundColor:"#ffffff"}}>
                <thead className='bg-[#EBEBEB] h-16'>
                    <tr className='text-center'>
                        <th>Student Id</th>
                        <th>January</th>
                        <th>February</th>
                        <th>March</th>
                    </tr>
                </thead>
                <tbody className='bg-[#ffffff] h-16'>
                <tr className='text-center'>
                        <th>ST000001</th>
                        <th>
                            <Button
                            name={"4"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"green"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> <nbsp></nbsp>
                            <Button
                            name={"11"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"green"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> <nbsp></nbsp>
                            <Button
                            name={"18"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"green"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> <nbsp></nbsp>
                            <Button
                            name={"25"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"red"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> 
              
                        </th>
                        <th>
                        <th>
                            <Button
                            name={"1"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"#EBEBEB"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> <nbsp></nbsp>
                            <Button
                            name={"8"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"#EBEBEB"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> <nbsp></nbsp>
                            <Button
                            name={"15"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"#EBEBEB"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> <nbsp></nbsp>
                            <Button
                            name={"22"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"#EBEBEB"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> 
              
                        </th>
              
                        </th>
                        <th>
                        <th>
                        <Button
                            name={"1"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"#EBEBEB"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> <nbsp></nbsp>
                            <Button
                            name={"8"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"#EBEBEB"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> <nbsp></nbsp>
                            <Button
                            name={"15"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"#EBEBEB"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> <nbsp></nbsp>
                            <Button
                            name={"22"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"#EBEBEB"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> 
              
                        </th>
              
                        </th>
                    </tr>
                </tbody>

                <tbody className='bg-[#EBEBEB] h-16'>
                <tr className='text-center'>
                        <th>ST000002</th>
                        <th>
                        <th>
                            
              
                        </th>
              
                        </th>
                        <th>
                        <th>
                           
              
                        </th>
              
                        </th>
                        <th>
                        <th>
                            
              
                        </th>
              
                        </th>
                        
                    </tr>
                </tbody>

                <tbody className='bg-[#ffffff] h-16'>
                <tr className='text-center'>
                        <th>ST000003</th>
                        <th>
                        <th>
                            
              
                        </th>
              
                        </th>
                        <th>
                        <th>
                            
              
                        </th>
              
                        </th>
                        <th>
                        <th>
                            
              
                        </th>
              
                        </th>
                        
                    </tr>
                </tbody>
                

                </table>
            </section>
      </div>
    </div>
  )
}

export default Attendance

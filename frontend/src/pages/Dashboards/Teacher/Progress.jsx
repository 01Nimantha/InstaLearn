import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import SearchBar from '../../admin/common/SearchBar';
import AddButton from '../../admin/common/AddButton';


const Progress = () => {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='d-flex'>
     

      <div className="p-4 w-full">
      <h2 className="text-xl font-bold">Progress</h2>
            
            <div className='flex justify-between items-center w-full py-5 ml-5'>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <AddButton btnname='Add Excel sheet' className='flex items-end bg-gray-950 pb-2.5 w-48 h-12' 
             />
            </div>
      
            <section>
                <table className='shadow mt-10 'style={{margin:"2%",padding:"2%", minWidth:"74vw", maxWidth:"74vw",backgroundColor:"#ffffff"}}>
                <thead className='bg-[#EBEBEB] h-16'>
                    <tr className='text-center'>
                        <th>Student Id</th>
                        <th>January</th>
                        <th>February</th>
                        <th>March</th>
                        <th>April</th>
                    </tr>
                </thead>
                <tbody className='bg-[#ffffff] h-16'>
                <tr className='text-center'>
                        <th>ST000001</th>
                        <th>85</th>
                        <th>78</th>
                        <th>67</th>
                        <th>80</th>
                    </tr>
                </tbody>

                <tbody className='bg-[#EBEBEB] h-16'>
                <tr className='text-center'>
                        <th>ST000002</th>
                        <th>95</th>
                        <th>78</th>
                        <th>67</th>
                        <th>80</th>
                    </tr>
                </tbody>

                <tbody className='bg-[#ffffff] h-16'>
                <tr className='text-center'>
                        <th>ST000003</th>
                        <th>85</th>
                        <th>78</th>
                        <th>67</th>
                        <th>80</th>
                    </tr>
                </tbody>

                </table>
            </section>
      </div>
    </div>
  )
}

export default Progress;

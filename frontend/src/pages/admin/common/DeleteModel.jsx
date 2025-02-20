import axios from 'axios';

const DeleteModel = ({
    apiEndpoints: {
        deleteEndpoint
    },
    onClose,
    entityId,
    title
}) => {

  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    await axios.delete(`${deleteEndpoint}/${entityId}`);
    onClose();
       
  };

    const handleClose = (e) =>{
        if(e.target.id === 'wrapper') onClose();
      }
      

  return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
        <div className='w-1/3 bg-white  rounded-2xl'>
        
           <header className='flex justify-between items-center p-3 bg-gray-950  rounded-t-2xl border'>
                <span className='text-2xl text-white'>{title}</span>
            </header>
                <div className='p-2'>
                <h2 className='flex justify-center'>Are you sure?</h2>
                <span className='flex justify-center'>Do you really want to delete these records?<br/>This process cannot be undone</span>
                </div>
            <form className='p-6 space-y-3 text-sm'>
                
                <div className='px-1 flex justify-center gap-5 py-1 mr-5'>
                    <div className='col-sm-2'>
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className='btn btn-danger btn-lg'
                            >
                            Delete
                        </button>
                    </div>
                    <div className='col-sm-2'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='btn btn-outline-warning btn-lg'
                            >
                            Cancel
                        </button>
                    </div> 
                </div>
            </form>

        </div>
    </div>
  )
}

export default DeleteModel
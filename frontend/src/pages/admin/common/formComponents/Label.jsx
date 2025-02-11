import React from 'react'

const Label = ({htmlFor,labelName,inputtype,inputid,inputplaceholder,onChange,inputvalue}) => {
  return (
    <div>
        <label className='block text-gray-700' htmlFor={inputid}>
            {labelName}
        </label>
        <input className='w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm'
                        type={inputtype}
                        id={inputid}
                        placeholder={inputplaceholder}
                        onChange={onChange}
                        required
                        value={inputvalue} />
    </div>
  )
}

export default Label
import React from 'react'

const LabeledInput = ({labelName,type,id,placeholder,onChange,value,name}) => {
  return (
    <div>
        <label className='block text-gray-700' htmlFor={id}>
            {labelName}
        </label>
        <input className='w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm'
                        type={type}
                        id={id}
                        placeholder={placeholder}
                        onChange={onChange}
                        required
                        value={value} 
                        name={name}/>
    </div>
  )
}

export default LabeledInput
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewModel = ({
  apiEndpoints: {
    getEndpoint,
  },
  fields,
  onClose,
  entityId,
  title
}) => {
  const [entity, setEntity] = useState({});

  useEffect(() => {
    loadEntity();
  }, []);

  const loadEntity = async () => {
    try {
      const result = await axios.get(`${getEndpoint}/${entityId}`);
      setEntity(result.data);
    } catch (error) {
      console.error('Error loading entity:', error);
    }
  };

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  const renderFieldValue = (fieldName) => {
    if (fieldName === 'classTypes') {
      return entity.classTypes?.map(ct => `${ct.classTypeName} (${ct.type})`).join(', ') || 'Not Available';
    }
    if (typeof entity[fieldName] === 'boolean') {
      return entity[fieldName] ? 'Yes' : 'No';
    }
    return entity[fieldName] || 'Not Available';
  };

  return (
    <div 
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50' 
      id="wrapper" 
      onClick={handleClose}
    >
      <div className='w-full max-w-md mx-4 sm:mx-0 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded-2xl max-h-[90vh] flex flex-col'>
        <header className='flex justify-between items-center p-3 bg-indigo-800 rounded-t-2xl border shrink-0'>
          <span className='text-xl sm:text-2xl text-white'>{title}</span>
        </header>

        <div className="p-4 sm:p-6 space-y-3 text-sm overflow-y-auto flex-1">
          <div className="space-y-2">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-gray-700 font-bold text-sm sm:text-base">
                  {field.label}:
                </label>
                <div className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm break-words">
                  {renderFieldValue(field.name)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-4 px-4 pb-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary w-full sm:w-auto px-6 py-2 text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModel;
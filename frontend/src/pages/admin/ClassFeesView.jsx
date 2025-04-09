import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Trash2, Plus, ChevronDown, Edit } from 'lucide-react';

const ClassFeesView = () => {
  const [classFees, setClassFees] = useState([]);
  const [classNames, setClassNames] = useState([]);
  const [classTypes, setClassTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClassName, setSelectedClassName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isClassNameDropdownOpen, setIsClassNameDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    className: '',
    amount: ''
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [editAmount, setEditAmount] = useState('');

  useEffect(() => {
    fetchClassFees();
    fetchClassNames();
    fetchClassTypes();
  }, []);

  const fetchClassFees = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:8085/api/v1/classFees/get-all-classes');
      console.log('Class Fees Response:', response.data); // Log the response for debugging
      setClassFees(response.data || []); // Ensure it's an array, even if empty
    } catch (err) {
      console.error('Error fetching class fees:', err);
      setError('Failed to load class fees: ' + (err.response?.data?.message || err.message));
      setClassFees([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchClassNames = async () => {
    try {
      const response = await axios.get('http://localhost:8085/classType/get-all-class-names');
      console.log('Class Names Response:', response.data); // Log for debugging
      setClassNames(response.data || []);
    } catch (err) {
      console.error('Error fetching class names:', err);
      setError(prev => prev || 'Failed to load class names');
    }
  };

  const fetchClassTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8085/classType/get-all-class-types');
      console.log('Class Types Response:', response.data); // Log for debugging
      setClassTypes(response.data || []);
    } catch (err) {
      console.error('Error fetching class types:', err);
      setError(prev => prev || 'Failed to load class types');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClassNameSelect = (className) => {
    setSelectedClassName(className);
    setFormData(prev => ({
      ...prev,
      className: `${className}${selectedType ? ' ' + selectedType : ''}`.trim()
    }));
    setIsClassNameDropdownOpen(false);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setFormData(prev => ({
      ...prev,
      className: `${selectedClassName ? selectedClassName + ' ' : ''}${type}`.trim()
    }));
    setIsTypeDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.className || !formData.amount) {
        throw new Error('Please fill in all required fields');
      }

      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      const payload = { ...formData, amount };
      await axios.post('http://localhost:8085/api/v1/classFees/save-class-fees', payload);
      fetchClassFees(); // Refresh the list
      setFormData({ className: '', amount: '' });
      setSelectedClassName('');
      setSelectedType('');
    } catch (err) {
      console.error('Error saving class fees:', err);
      setError(err.message || 'Failed to save class fees');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this fee?')) {
      try {
        await axios.delete(`http://localhost:8085/api/v1/classFees/delete/${id}`);
        fetchClassFees(); // Refresh the list
      } catch (err) {
        console.error('Error deleting class fee:', err);
        setError('Failed to delete class fee');
      }
    }
  };

  const handleUpdate = (feeId) => {
    const fee = classFees.find(f => f.classFeesId === feeId);
    if (fee) {
      setEditingFee(fee);
      setEditAmount(fee.amount.toString());
      setIsEditModalOpen(true);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!editAmount) {
        throw new Error('Please enter an amount');
      }

      const amount = parseFloat(editAmount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      await axios.put(`http://localhost:8085/api/v1/classFees/update/${editingFee.classFeesId}`, {
        amount: amount
      });

      // Refresh the list
      await fetchClassFees();
      
      // Close modal and reset state
      setIsEditModalOpen(false);
      setEditingFee(null);
      setEditAmount('');
    } catch (err) {
      console.error('Error updating class fee:', err);
      setError(err.message || 'Failed to update class fee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-indigo-800 text-white py-6">
        <div className="px-4 max-w-[98%] mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Class Fees Management</h1>
            <p className="text-lg mt-1">Manage Class Fees and Types</p>
          </div>
          <Link
            to="/admin-dashboard"
            className="bg-red-600 hover:bg-red-700 rounded px-6 py-3 text-white font-bold flex items-center gap-2 transition-colors text-decoration-none"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="px-4 max-w-[98%] mx-auto py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Class Fee</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Name *</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsClassNameDropdownOpen(!isClassNameDropdownOpen)}
                    className="w-full bg-white p-2 border rounded-md flex items-center justify-between focus:ring-2 focus:ring-indigo-500"
                  >
                    <span className="truncate">{selectedClassName || 'Select Class Name'}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isClassNameDropdownOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  {isClassNameDropdownOpen && (
                    <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {classNames.map((className) => (
                        <button
                          key={className}
                          type="button"
                          onClick={() => handleClassNameSelect(className)}
                          className="w-full p-2 text-left hover:bg-gray-50 text-sm"
                        >
                          {className}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                    className="w-full bg-white p-2 border rounded-md flex items-center justify-between focus:ring-2 focus:ring-indigo-500"
                  >
                    <span className="truncate">{selectedType || 'Select Type'}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isTypeDropdownOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  {isTypeDropdownOpen && (
                    <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {classTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleTypeSelect(type)}
                          className="w-full p-2 text-left hover:bg-gray-50 text-sm"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (Rs.) *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {loading ? 'Saving...' : 'Add Fee'}
              </button>
            </div>
          </form>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Edit Class Fee</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Name
                  </label>
                  <input
                    type="text"
                    value={editingFee?.className || ''}
                    className="w-full p-2 border rounded-md bg-gray-100"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (Rs.) *
                  </label>
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingFee(null);
                      setEditAmount('');
                      setError('');
                    }}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center text-gray-500">Loading class fees...</div>
            ) : classFees.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No class fees found</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classFees.map((fee) => (
                    <tr key={fee.classFeesId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.className}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rs. {fee.amount.toFixed(2)}</td>
                      <td className="flex gap-10 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleUpdate(fee.classFeesId)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(fee.classFeesId)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassFeesView;
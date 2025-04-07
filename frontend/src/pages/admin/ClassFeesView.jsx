import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus } from 'lucide-react';

const ClassFeesView = () => {
  const [classFees, setClassFees] = useState([]);
  const [classTypes, setClassTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    classTypeId: '',
    type: '',
    amount: '',
    description: ''
  });

  useEffect(() => {
    fetchClassFees();
    fetchClassTypes();
  }, []);

  const fetchClassFees = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/classFees/get-all-classFees');
      setClassFees(response.data);
    } catch (err) {
      setError('Failed to load class fees');
      console.error('Error fetching class fees:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClassTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/classType/get-all-classTypes');
      setClassTypes(response.data);
    } catch (err) {
      setError('Failed to load class types');
      console.error('Error fetching class types:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate form data
      if (!formData.classTypeId || !formData.type || !formData.amount) {
        throw new Error('Please fill in all required fields');
      }

      // Convert amount to number and validate
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      // Prepare data for API
      const payload = {
        ...formData,
        amount: amount
      };

      // Make API call
      await axios.post('http://localhost:8085/api/v1/classFees/save', payload);
      fetchClassFees(); // Refresh the list
      setFormData({
        classTypeId: '',
        type: '',
        amount: '',
        description: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to save class fees');
      console.error('Error saving class fees:', err);
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
        setError('Failed to delete class fee');
        console.error('Error deleting class fee:', err);
      }
    }
  };

  const getClassName = (classTypeId) => {
    const classType = classTypes.find(ct => ct.classTypeId === classTypeId);
    return classType ? `${classType.className} - ${classType.grade}` : 'Unknown Class';
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
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

      {/* Main content */}
      <div className="px-4 max-w-[98%] mx-auto py-6">
        {/* Add New Fee Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Class Fee</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class Name *
                </label>
                <select
                  name="classTypeId"
                  value={formData.classTypeId}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a class</option>
                  {classTypes.map((classType) => (
                    <option key={classType.classTypeId} value={classType.classTypeId}>
                      {classType.className} - {classType.grade}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select type</option>
                  <option value="Theory">Theory</option>
                  <option value="Revision">Revision</option>
                  <option value="Paper">Paper</option>
                  <option value="Group">Group</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (Rs.) *
                </label>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
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

        {/* Class Fees Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {classFees.map((fee) => (
                  <tr key={fee.classFeesId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getClassName(fee.classTypeId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fee.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Rs. {fee.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {fee.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleDelete(fee.classFeesId)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassFeesView; 
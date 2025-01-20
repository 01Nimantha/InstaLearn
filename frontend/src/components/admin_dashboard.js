import React, { useState } from 'react';
import { Search } from 'lucide-react';

const DataTable = ({ title, data, columns, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(row => 
    Object.values(row).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleUpdate = (id) => {
    console.log(`Update ${title} with ID: ${id}`);
  };

  const handleView = (id) => {
    console.log(`View ${title} with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete ${title} with ID: ${id}`);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          {`Add ${title}`}
        </button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${title.toLowerCase()}...`}
            className="w-full p-2 pl-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                >
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <tr
                  key={row.id || row.parent_id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  {columns.map((column) => (
                    <td
                      key={`${row.id || row.parent_id}-${column.key}`}
                      className="px-4 py-3 text-sm text-gray-600"
                    >
                      {row[column.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleUpdate(row.id || row.parent_id)}
                        className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      >
                        Update
                      </button>
                      <button 
                        onClick={() => handleView(row.id || row.parent_id)}
                        className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      >
                        View
                      </button>
                      {title !== 'Parent' && (
                        <button 
                          onClick={() => handleDelete(row.id || row.parent_id)}
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length + 1} 
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No {title.toLowerCase()} found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const studentData = [
    {
      id: 'SC/2023/0001',
      name: 'W.M.M.N. Wijevoon',
      email: 'wijevoon@gmail.com'
    },
    {
      id: 'SC/2023/0002',
      name: 'John Doe',
      email: 'john@gmail.com'
    },
    {
      id: 'SC/2023/0003',
      name: 'Jane Smith',
      email: 'jane@gmail.com'
    }
  ];

  const teacherData = [
    {
      id: 'TH/2023/0001',
      name: 'W.M.M.N. Wijevoon',
      email: 'wijevoon@gmail.com'
    },
    {
      id: 'TH/2023/0002',
      name: 'David Wilson',
      email: 'david@gmail.com'
    }
  ];

  const parentData = [
    {
      parent_id: 'PN/2023/0001',
      student_id: 'SC/2023/0001',
      name: 'W.M.M.N. Wijevoon',
      email: 'wijevoon@gmail.com'
    },
    {
      parent_id: 'PN/2023/0002',
      student_id: 'SC/2023/0002',
      name: 'Robert Doe',
      email: 'robert@gmail.com'
    }
  ];

  const adminData = [
    {
      id: 'AD/2023/0001',
      name: 'W.M.M.N. Wijevoon',
      email: 'wijevoon@gmail.com'
    },
    {
      id: 'AD/2023/0002',
      name: 'Admin User',
      email: 'admin@gmail.com'
    }
  ];

  const studentColumns = [
    { key: 'id', label: 'Student ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ];

  const teacherColumns = [
    { key: 'id', label: 'Teacher ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ];

  const parentColumns = [
    { key: 'parent_id', label: 'Parent ID' },
    { key: 'student_id', label: 'Student ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ];

  const adminColumns = [
    { key: 'id', label: 'Admin ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ];

  const handleAdd = (type) => {
    console.log(`Add new ${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
            Home
          </button>
        </div>

        <DataTable
          title="Student"
          data={studentData}
          columns={studentColumns}
          onAdd={() => handleAdd('student')}
        />

        <DataTable
          title="Teacher"
          data={teacherData}
          columns={teacherColumns}
          onAdd={() => handleAdd('teacher')}
        />

        <DataTable
          title="Parent"
          data={parentData}
          columns={parentColumns}
          onAdd={() => handleAdd('parent')}
        />

        <DataTable
          title="Admin"
          data={adminData}
          columns={adminColumns}
          onAdd={() => handleAdd('admin')}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
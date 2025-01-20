import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Common List View Component
const UserListView = ({ userType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const sampleData = [
    { id: '1', name: 'W.M.M.N. Wjileson', email: 'wjileson@gmail.com' },
    { id: '2', name: 'W.M.M.N. Wjileson', email: 'wjileson@gmail.com' },
    { id: '3', name: 'W.M.M.N. Wjileson', email: 'wjileson@gmail.com' },
    { id: '4', name: 'W.M.M.N. Wjileson', email: 'wjileson@gmail.com' },
    { id: '5', name: 'W.M.M.N. Wjileson', email: 'wjileson@gmail.com' }
  ];

  const getIdPrefix = () => {
    switch (userType) {
      case 'Teacher': return 'TH';
      case 'Student': return 'SC';
      case 'Parent': return 'PN';
      case 'Admin': return 'AD';
      case 'Attendance Officer': return 'AO';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">{userType}</h1>
        <Button variant="secondary">Home</Button>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Input 
              placeholder="Search by id..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button>{`Add ${userType}`}</Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">{`${userType}_id`}</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">{`${getIdPrefix()}2024/100${item.id}`}</td>
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.email}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Update</Button>
                        <Button variant="outline" size="sm">View</Button>
                        {userType !== 'Parent' && (
                          <Button variant="destructive" size="sm">Delete</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Update Card Component
const UpdateUserCard = ({ userType }) => {
  const getFormFields = () => {
    const commonFields = ['Name', 'Email'];
    switch (userType) {
      case 'Student':
        return [...commonFields, 'Contact', 'Address', 'Parent Email'];
      case 'Teacher':
        return [...commonFields, 'Contact', 'Address'];
      case 'Parent':
        return [...commonFields, 'Contact', 'Student ID'];
      case 'Admin':
      case 'Attendance Officer':
        return [...commonFields, 'Contact'];
      default:
        return commonFields;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">{`Update ${userType}`}</h1>
        <Button variant="secondary">Home</Button>
      </div>
      <div className="p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{`Update ${userType}`}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getFormFields().map((field, index) => (
              <Input 
                key={index} 
                placeholder={field} 
                className="w-full"
              />
            ))}
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="destructive">Cancel</Button>
              <Button>Update</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// View Card Component
const ViewUserCard = ({ userType }) => {
  const getDisplayFields = () => {
    const commonFields = ['Name', 'Email'];
    switch (userType) {
      case 'Student':
        return [...commonFields, 'Contact', 'Address', 'Parent Email'];
      case 'Teacher':
        return [...commonFields, 'Contact', 'Address'];
      case 'Parent':
        return [...commonFields, 'Contact', 'Student ID'];
      case 'Admin':
      case 'Attendance Officer':
        return [...commonFields, 'Contact'];
      default:
        return commonFields;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">{`View ${userType}`}</h1>
        <Button variant="secondary">Home</Button>
      </div>
      <div className="p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{`${userType} Details`}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getDisplayFields().map((field, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-500">
                  {field}
                </label>
                <div className="p-2 bg-gray-50 rounded-md">
                  {field === 'Name' ? 'W.M.M.N. Wjileson' : 
                   field === 'Email' ? 'wjileson@gmail.com' :
                   field === 'Contact' ? '+1234567890' :
                   field === 'Address' ? '123 Main St, City' :
                   field === 'Parent Email' ? 'parent@gmail.com' :
                   field === 'Student ID' ? 'SC2024/1001' : 'N/A'}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Usage Example Component
const UserManagement = () => {
  const [view, setView] = useState('list');
  const [userType, setUserType] = useState('Student');

  return (
    <div>
      {view === 'list' && <UserListView userType={userType} />}
      {view === 'update' && <UpdateUserCard userType={userType} />}
      {view === 'view' && <ViewUserCard userType={userType} />}
    </div>
  );
};

export default UserManagement;
import React, { useState } from 'react';
import { Search, Home } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [activeView, setActiveView] = useState('main');
  const [selectedRole, setSelectedRole] = useState('');

  const handleNavigation = (view, role = '') => {
    setActiveView(view);
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {activeView === 'main' ? 'Admin Dashboard' : `${selectedRole} Management`}
        </h1>
        {activeView !== 'main' && (
          <Button 
            variant="ghost" 
            className="text-white"
            onClick={() => handleNavigation('main')}
          >
            <Home className="h-5 w-5" />
          </Button>
        )}
      </nav>
      
      {/* Main Content Area */}
      <div className="p-6">
        {activeView === 'main' ? (
          <MainDashboard onNavigate={handleNavigation} />
        ) : (
          <UserManagement role={selectedRole} />
        )}
      </div>
    </div>
  );
};

const MainDashboard = ({ onNavigate }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-24 text-lg"
            onClick={() => onNavigate('management', 'Teacher')}
          >
            Teacher
          </Button>
          <Button 
            variant="outline" 
            className="h-24 text-lg"
            onClick={() => onNavigate('management', 'Student')}
          >
            Student
          </Button>
          <Button 
            variant="outline" 
            className="h-24 text-lg"
            onClick={() => onNavigate('management', 'Parent')}
          >
            Parent
          </Button>
          <Button 
            variant="outline" 
            className="h-24 text-lg"
            onClick={() => onNavigate('management', 'Admin')}
          >
            Admin
          </Button>
          <Button 
            variant="outline" 
            className="h-24 text-lg col-span-2"
            onClick={() => onNavigate('management', 'Attendance Officer')}
          >
            Attendance Officer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const UserManagement = ({ role }) => {
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');

  const getIdPrefix = () => {
    const prefixes = {
      'Teacher': 'TH',
      'Student': 'SC',
      'Parent': 'PN',
      'Admin': 'AD',
      'Attendance Officer': 'AO'
    };
    return prefixes[role] || '';
  };

  const getFormFields = () => {
    const commonFields = ['Name', 'Email'];
    const additionalFields = {
      'Student': ['Contact', 'Address', 'Parent Email'],
      'Teacher': ['Contact', 'Address'],
      'Parent': ['Contact', 'Student ID'],
      'Admin': ['Contact'],
      'Attendance Officer': ['Contact']
    };
    return [...commonFields, ...(additionalFields[role] || [])];
  };

  const renderList = () => (
    <>
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
        <Button onClick={() => setView('add')}>{`Add ${role}`}</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">{`${role}_id`}</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="border-b">
                  <td className="p-4">{`${getIdPrefix()}2024/100${item}`}</td>
                  <td className="p-4">W.M.M.N. Wjileson</td>
                  <td className="p-4">wjileson@gmail.com</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setView('update')}
                      >
                        Update
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setView('view')}
                      >
                        View
                      </Button>
                      {role !== 'Parent' && (
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
    </>
  );

  const renderForm = (mode) => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{`${mode === 'add' ? 'Add' : mode === 'update' ? 'Update' : 'View'} ${role}`}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {getFormFields().map((field, index) => (
          mode === 'view' ? (
            <div key={index} className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-500">{field}</label>
              <div className="p-2 bg-gray-50 rounded-md">
                {field === 'Name' ? 'W.M.M.N. Wjileson' : 
                 field === 'Email' ? 'wjileson@gmail.com' :
                 field === 'Contact' ? '+1234567890' :
                 field === 'Address' ? '123 Main St, City' :
                 field === 'Parent Email' ? 'parent@gmail.com' :
                 field === 'Student ID' ? 'SC2024/1001' : 'N/A'}
              </div>
            </div>
          ) : (
            <Input 
              key={index}
              placeholder={field}
              className="w-full"
              readOnly={mode === 'view'}
            />
          )
        ))}
        {mode !== 'view' && (
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              variant="destructive"
              onClick={() => setView('list')}
            >
              Cancel
            </Button>
            <Button>{mode === 'add' ? 'Add' : 'Update'}</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      {view === 'list' && renderList()}
      {view === 'add' && renderForm('add')}
      {view === 'update' && renderForm('update')}
      {view === 'view' && renderForm('view')}
    </>
  );
};

export default Dashboard;
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

const AdminDashboardPreview = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentTitle, setCurrentTitle] = useState('Admin Dashboard');

  const navigateTo = (view, title) => {
    setCurrentView(view);
    setCurrentTitle(title);
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-2 gap-4">
      <Button 
        variant="outline" 
        className="h-24 text-lg"
        onClick={() => navigateTo('teacher', 'Teacher Management')}
      >
        Teacher
      </Button>
      <Button 
        variant="outline" 
        className="h-24 text-lg"
        onClick={() => navigateTo('student', 'Student Management')}
      >
        Student
      </Button>
      <Button 
        variant="outline" 
        className="h-24 text-lg"
        onClick={() => navigateTo('parent', 'Parent Management')}
      >
        Parent
      </Button>
      <Button 
        variant="outline" 
        className="h-24 text-lg"
        onClick={() => navigateTo('admin', 'Admin Management')}
      >
        Admin
      </Button>
      <Button 
        variant="outline" 
        className="h-24 text-lg col-span-2"
        onClick={() => navigateTo('attendance', 'Attendance Management')}
      >
        Attendance Officer
      </Button>
    </div>
  );

  const renderForm = (type) => {
    const formFields = {
      student: ['Student ID', 'Name', 'Email', 'Contact', 'Address', 'Parent Email'],
      teacher: ['Name', 'Email', 'Contact', 'Address'],
      parent: ['Name', 'Email', 'Contact', 'Student ID'],
      admin: ['Name', 'Email', 'Contact'],
      attendance: ['Name', 'Email', 'Contact']
    };

    return (
      <div className="space-y-4 max-w-md mx-auto">
        {formFields[type].map((field, index) => (
          <Input key={index} placeholder={field} className="w-full" />
        ))}
        <div className="flex justify-end space-x-2">
          <Button variant="destructive" onClick={() => navigateTo('dashboard', 'Admin Dashboard')}>
            Cancel
          </Button>
          <Button>Add {type.charAt(0).toUpperCase() + type.slice(1)}</Button>
        </div>
      </div>
    );
  };

  const renderList = (type) => {
    const prefix = type.substring(0, 2).toUpperCase();
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="relative w-64">
            <Input placeholder="Search by ID..." />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button onClick={() => setCurrentView(`${type}-form`)}>
            Add {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="border-t">
                  <td className="p-4">{`${prefix}2024/100${item}`}</td>
                  <td className="p-4">W.M.M.N. Wjileson</td>
                  <td className="p-4">wjileson@gmail.com</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Update</Button>
                      <Button variant="outline" size="sm">View</Button>
                      {type !== 'parent' && (
                        <Button variant="destructive" size="sm">Delete</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">{currentTitle}</h1>
        <Button 
          variant="ghost" 
          className="text-white"
          onClick={() => navigateTo('dashboard', 'Admin Dashboard')}
        >
          <Home className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            {currentView === 'dashboard' && renderDashboard()}
            {currentView === 'student' && renderList('student')}
            {currentView === 'teacher' && renderList('teacher')}
            {currentView === 'parent' && renderList('parent')}
            {currentView === 'admin' && renderList('admin')}
            {currentView === 'attendance' && renderList('attendance')}
            {currentView === 'student-form' && renderForm('student')}
            {currentView === 'teacher-form' && renderForm('teacher')}
            {currentView === 'parent-form' && renderForm('parent')}
            {currentView === 'admin-form' && renderForm('admin')}
            {currentView === 'attendance-form' && renderForm('attendance')}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPreview;
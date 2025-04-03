import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from './common/AddButton';

const prepareForm = (fields) => {
    return fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
};

const AddDetailsFormModel = ({
    apiEndpoints: { getEndpoint, saveEndpoint },
    onClose,
    title,
    btnTitle,
    fields,
    includeSwitch,
    includeDropDown,
    includeCheckbox
}) => {
    const initialForm = prepareForm(fields);
    const [form, setForm] = useState(initialForm);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [classTypes, setClassTypes] = useState([]);

    useEffect(() => {
        loadClasses();
        loadEntity();
    }, []);

    const loadClasses = async () => {
        try {
            const response = await axios.get("http://localhost:8085/classType/get-all-class-names");
            const classes = Array.isArray(response.data) ? response.data : [];
            setClassTypes(classes);
        } catch (error) {
            console.error('Failed to load classes:', error);
        }
    };

    const loadEntity = async () => {
        try {
            const result = await axios.get(getEndpoint, { validateStatus: () => true });
            if (result.status === 302) {
                setForm(result.data);
            }
        } catch (error) {
            console.error('Failed to load entity:', error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [id]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: checked,
        }));
    };

    const handleSwitchChange = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    const saveUser = async (formData) => {
        try {
            const response = await axios.post(saveEndpoint, formData);
            return response.data;
        } catch (error) {
            console.error('Failed to save user:', error);
            throw error;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const classTypes = [];
        if (form.theory) {
            classTypes.push({
                classTypeName: form.classTypeName,
                type: "THEORY"
            });
        }
        if (form.paper) {
            classTypes.push({
                classTypeName: form.classTypeName,
                type: "PAPER"
            });
        }

        const finalFormData = {
            ...form,
            freeCard: isSwitchOn,
            classTypes: includeCheckbox ? classTypes : undefined
        };

        saveUser(finalFormData)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error('Submit failed:', error);
            });
    };

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50' 
            id="wrapper" 
            onClick={handleClose}
        >
            <div className='w-full max-w-md mx-4 sm:mx-0 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded-2xl max-h-[90vh] flex flex-col'>
                <header className='flex justify-between items-center p-3 bg-gray-950 rounded-t-2xl border shrink-0'>
                    <span className='text-xl sm:text-2xl text-white'>{title}</span>
                </header>

                <form 
                    className='p-4 sm:p-6 space-y-3 text-sm overflow-y-auto flex-1' 
                    onSubmit={handleSubmit}
                >
                    <div className='space-y-2'>
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label 
                                    className='block text-gray-700 text-sm sm:text-base' 
                                    htmlFor={field.name}
                                >
                                    {field.label}
                                </label>
                                <input
                                    className='w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm text-xs sm:text-sm'
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    value={form[field.name]}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                    </div>

                    {includeDropDown && (
                        <div>
                            <label 
                                className='block text-gray-700 text-sm sm:text-base' 
                                htmlFor='classTypeName'
                            >
                                Class Name
                            </label>
                            <select
                                className='w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm text-xs sm:text-sm'
                                name='classTypeName'
                                id='classTypeName'
                                required
                                value={form.classTypeName || ''}
                                onChange={handleInputChange}
                            >
                                <option value="">Select a Class Type</option>
                                {classTypes.map((classType, index) => (
                                    <option key={index} value={classType}>
                                        {classType}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {includeCheckbox && (
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <label className="text-gray-700 text-sm sm:text-base">Class Type:</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="theory"
                                        checked={form.theory || false}
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-xs sm:text-sm">Theory</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="paper"
                                        checked={form.paper || false}
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-xs sm:text-sm">Paper</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {includeSwitch && (
                        <div className="flex items-center gap-3 mt-4">
                            <span className="text-xs sm:text-sm">Enable Free Card:</span>
                            <label className="relative inline-flex items-center cursor-pointer" htmlFor='freeCard'>
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    id="freeCard"
                                    name='freeCard'
                                    checked={isSwitchOn}
                                    onChange={handleSwitchChange}
                                />
                                <div className="w-14 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-950"></div>
                            </label>
                        </div>
                    )}

                    <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 px-1 py-1'>
                        <AddButton 
                            btnname={btnTitle} 
                            className='w-full sm:w-48 h-12 bg-gray-950' 
                            type='submit' 
                        />
                        <button
                            type='button'
                            onClick={onClose}
                            className='btn btn-outline-warning w-full sm:w-auto px-6 py-2 text-xs sm:text-sm'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDetailsFormModel;
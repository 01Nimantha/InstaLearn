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

    // Load class types from the API
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

    // Load entity data from the API
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

    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [id]: value,
        }));
    };

    // Handle checkbox changes
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: checked,
        }));
    };

    // Handle switch changes
    const handleSwitchChange = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    // Save user data
    const saveUser = async (formData) => {
        try {
            const response = await axios.post(saveEndpoint, formData);
            return response.data;
        } catch (error) {
            console.error('Failed to save user:', error);
            throw error;
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the classTypes array based on checkbox selections
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

        // Prepare the final form data
        const finalFormData = {
            ...form,
            freeCard: isSwitchOn,
            classTypes: includeCheckbox ? classTypes : undefined // Include classTypes only if checkbox is enabled
        };

        // Save the data
        saveUser(finalFormData)
            .then(() => {
                window.location.reload(); // Consider using state update instead of reload for better UX
            })
            .catch((error) => {
                console.error('Submit failed:', error);
            });
    };

    // Handle modal close
    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
            <div className='w-1/3 bg-white rounded-2xl'>
                <header className='flex justify-between items-center p-3 bg-gray-950 rounded-t-2xl border'>
                    <span className='text-2xl text-white'>{title}</span>
                </header>

                <form className='p-6 space-y-3 text-sm' onSubmit={handleSubmit}>
                    <div className='space-y-1'>
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label className='block text-gray-700' htmlFor={field.name}>
                                    {field.label}
                                </label>
                                <input
                                    className='w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm'
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
                            <label className='block text-gray-700' htmlFor='classTypeName'>
                                Class Name
                            </label>
                            <select
                                className='w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm'
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
                        <div className="flex items-center space-x-4">
                            <label className="text-gray-700 mr-2">Class Type:</label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="theory"
                                    checked={form.theory || false}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span>Theory</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="paper"
                                    checked={form.paper || false}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span>Paper</span>
                            </label>
                        </div>
                    )}

                    {includeSwitch && (
                        <div className="flex items-center gap-3 mt-4">
                            <span className="text-sm">Enable Free Card:</span>
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

                    <div className='px-1 flex justify-between py-1 mr-5'>
                        <div>
                            <AddButton btnname={btnTitle} className='flex items-end bg-gray-950 pb-2.5 w-48 h-12' type='submit' />
                        </div>
                        <div className='col-sm-2'>
                            <button
                                type='button'
                                onClick={onClose}
                                className='btn btn-outline-warning btn-lg'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDetailsFormModel;
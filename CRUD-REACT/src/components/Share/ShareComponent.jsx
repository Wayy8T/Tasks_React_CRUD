import React, { useEffect, useState } from 'react';

const FormComponent = ({ title, initialData, onSubmit }) => {
    const [name, setName] = useState(initialData.name || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [errors, setError] = useState({
        name: '',
        description: ''
    });

    const handleName = (e) => setName(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        if (name.trim()) {
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Name is required';
            valid = false;
        }

        if (description.trim()) {
            errorsCopy.description = '';
        } else {
            errorsCopy.description = 'Description is required';
            valid = false;
        }

        setError(errorsCopy);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({ name, description });
        }
    };

    return (
        <div className='container'>
            <h2 className='text-center'>{title}</h2>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Name:</label>
                        <input type="text"
                            placeholder='Enter Name'
                            value={name}
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            onChange={handleName}
                        />
                        {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                    </div>

                    <div className='form-group mb-2'>
                        <label className='form-label'>Description:</label>
                        <input type="text"
                            placeholder='Enter Description'
                            value={description}
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            onChange={handleDescription}
                        />
                        {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
                    </div>

                    <button type='submit' className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default FormComponent;

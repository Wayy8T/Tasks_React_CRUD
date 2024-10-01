import React, { useEffect, useState } from 'react'
import { createCategory, getCategory, updateCategory } from '../../services/categoryService'
import { useNavigate, useParams } from 'react-router-dom'
const CategoryComponent = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const { id } = useParams();
    const [errors, setError] = useState({
        name: '',
        description: ''
    })
    console.log(id)

    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)

    // click vao update no se lay du lieu qua id de add vao trong box
    const navigator = useNavigate();
    useEffect(() => {
        if (id) {
            getCategory(id).then((response) => {
                setName(response.data.name);
                setDescription(response.data.description);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    const saveOrUpdateCategory = (e) => {
        // Ngăn không cho form gửi dữ liệu
        e.preventDefault();
        // xử lý dữ liệu
        if (validateForm()) {
            const category = {
                name: name,
                description: description
            }
            console.log(category)
            console.log(id)
            if (id) {
                updateCategory(id, category).then((response) => {
                    navigator('/categories')
                }).catch(error => {
                    console.error(error)
                })
            } else {
                // Call category service to interact with the REST API for data manipulation
                createCategory(category).then((response) => {
                    navigator('/categories')
                }).catch(errors => {
                    console.error(errors)
                })
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors }
        if (name.trim()) {
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Name is required'
            valid = false
        }

        if (description.trim()) {
            errorsCopy.description = '';
        } else {
            errorsCopy.lastName = 'Description is required'
            valid = false
        }

        setError(errorsCopy);
        return valid
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Category</h2>
        } else {
            return <h2 className='text-center'>Add Category</h2>
        }
    }

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {/* <h2 className='text-canter'>Add Employee</h2> */}
                    {pageTitle()}
                    <div className='card-body'>
                        <form action="">

                            <div className='form-group mb-2'>
                                <label className='form-label' htmlFor="">Name:</label>
                                <input type="text"
                                    placeholder='Enter Category Name'
                                    name='name'
                                    value={name}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    onChange={handleName}
                                >
                                </input>
                                {/* Nếu biểu thức bên trái (errors.firstName) là truthy (có giá trị), thì biểu thức bên phải (phần tử <div>) sẽ được trả về và hiển thị. Nếu biểu thức bên trái là falsy (không có giá trị), thì không có gì được hiển thị. */}
                                {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label' htmlFor="">Description:</label>
                                <input type="text"
                                    placeholder='Enter Description Category'
                                    name='description'
                                    value={description}
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    onChange={handleDescription}
                                >
                                </input>
                                {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateCategory}>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryComponent
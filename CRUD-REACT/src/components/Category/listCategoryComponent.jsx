import React, { useEffect, useState } from 'react'
import { deleteCategory, listCategories } from '../../services/categoryService'
import { useNavigate } from 'react-router-dom'
import { listProducts } from '../../services/productService';

function ListCategoryComponent() {
    const navigator = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories(setCategories);
    }, []);
    function getAllCategories(setCategories) {
        listCategories()
            .then((response) => {
                setCategories(response.data);
                console.log("Fetched categories: ", response);
            })
            .catch((error) => {
                console.error("Error fetching categories: ", error);
            });
    }
    function addNewCategory() {
        navigator('/add-category');
    }

    function updateCategory(id) {
        navigator(`/edit-category/${id}`);
    }

    function removeCategory(id) {
        deleteCategory(id)
            .then((response) => {
                getAllCategories(setCategories); // Call updated categories
            })
            .catch((error) => {
                console.error("Error deleting category: ", error);
            });
    }

    const viewProducts = () => {
        navigator('/products'); // Changed function name for clarity
    };

    return (
        <div className='container'>
            <h2 className='text-center'>List of Categories</h2>
            <button className='btn btn-primary mb-2' onClick={addNewCategory}>Add Category</button>
            <button className='btn btn-primary mb-2' onClick={viewProducts}>List Products</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Category Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateCategory(category.id)}>
                                    Update
                                </button>
                                <button className='btn btn-danger' onClick={() => removeCategory(category.id)} style={{ marginLeft: '10px' }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListCategoryComponent;
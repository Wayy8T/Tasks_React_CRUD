import React, { useEffect, useState } from 'react'
import { deleteCategory, listCategories } from '../../services/categoryService'
import { useNavigate } from 'react-router-dom'
import { listProductsByCategory } from '../../services/productService';

function ListCategoryComponent() {
    const navigator = useNavigate();
    const [categories, setCategories] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Số lượng mục hiển thị trên mỗi trang
    const totalPages = Math.ceil(categories.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);



    useEffect(() => {
        // getProductsByCategory();
        getAllCategories(setCategories);
    }, []);
    // const { id } = useParams();

    // Hàm lấy sản phẩm theo category
    const getProductsByCategory = () => {
        listProductsByCategory(id, page)
            .then((response) => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };


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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                    {currentItems.map((category) => (
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
            {/* Tạo nút phân trang */}
            <nav>
                <ul className='pagination'>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className='page-link' onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default ListCategoryComponent;
import React, { useEffect, useState } from 'react';
import { listProducts, deleteProduct } from '../../services/productService';
import { useNavigate } from 'react-router-dom';

function ListProductComponent() {
    const navigator = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Số sản phẩm hiển thị trên mỗi trang

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = () => {
        listProducts()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    function addNewProduct() {
        navigator('/add-product');
    }

    function updateProduct(id) {
        navigator(`/edit-product/${id}`);
    }

    function removeProduct(id) {
        deleteProduct(id)
            .then((response) => {
                getAllProducts();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Tính toán số trang
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Lấy các sản phẩm cần hiển thị cho trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    // Hàm để chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='container'>
            <h2 className='text-center'>List of Products</h2>
            <button className='btn btn-primary mb-2' onClick={addNewProduct}>Add Product</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product name</th>
                        <th>Product price</th>
                        <th>Product description</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td>{product.categoryId}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateProduct(product.id)}>
                                        Update
                                    </button>
                                    <button className='btn btn-danger' onClick={() => removeProduct(product.id)} style={{ marginLeft: '10px' }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
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
}

export default ListProductComponent;
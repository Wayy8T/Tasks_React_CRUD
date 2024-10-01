import React, { useEffect, useState } from 'react'
import { listProducts } from '../../services/productService'
import { useNavigate } from 'react-router-dom'
import { deleteProduct } from '../../services/productService';
function ListProductComponent() {
    const navigator = useNavigate();
    //  React hooks
    //  useState([]): Khởi tạo một state (categories) với giá trị ban đầu là một mảng rỗng []
    //  khi dữ liệu từ API được lấy về, setcategories sẽ được gọi để cập nhật employees với dữ liệu mới 
    const [products, setProducts] = useState([])
    // useEffect nhận vào hai tham số:
    // Tham số thứ nhất: Một hàm callback sẽ được thực thi.
    // Tham số thứ hai: Một mảng dependencies, giúp React xác định khi nào thì nên chạy lại
    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = () => {
        listProducts().then((response) => {
            setProducts(response.data)
        }).catch(error => {
            console.error(error)
        })
    }

    function addNewProduct() {
        navigator('/add-product')
    }

    function updateProduct(id) {
        navigator(`/edit-product/${id}`)
    }

    function removeProduct(id) {
        deleteProduct(id).then(response => {
            getAllProducts();
        }).catch(error => {
            console.error(error)
        })

    }

    return (
        <div className='container '>
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
                        products.map(product =>
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td>{product.categoryId}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => {
                                        updateProduct(product.id)
                                    }}>
                                        Update
                                    </button>
                                    <button className='btn btn-danger' onClick={() => {
                                        removeProduct(product.id)
                                    }}
                                        style={{ marginLeft: '10px' }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    <tr>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ListProductComponent
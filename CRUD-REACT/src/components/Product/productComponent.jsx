// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createProduct, getProduct, updateProduct } from '../../services/productService';
// import { listCategories } from '../../services/categoryService'
// const CategoryComponent = () => {
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [description, setDescription] = useState('');
//     const [categoryId, setCategoryId] = useState('');
//     const { id } = useParams();
//     const [errors, setError] = useState({
//         name: '',
//         price: '',
//         description: '',
//         categoryId: ''
//     });

//     const navigator = useNavigate();

//     useEffect(() => {
//         let isMounted = true;
//         if (id) {
//             getProduct(id).then((response) => {
//                 if (isMounted) {
//                     setName(response.data.name);
//                     setPrice(response.data.price);
//                     setDescription(response.data.description);
//                     setCategoryId(response.data.categoryId);
//                 }
//             }).catch(console.error);
//         }
//         return () => { isMounted = false };
//     }, [id]);

//     const [categories, setCategories] = useState([]);
//     useEffect(() => {
//         getAllCategories(setCategories);
//     }, []);

//     function getAllCategories(setCategories) {
//         listCategories()
//             .then((response) => {
//                 setCategories(response.data);
//                 console.log("Fetched categories: ", response);
//             })
//             .catch((error) => {
//                 console.error("Error fetching categories: ", error);
//             });
//     }

//     const validateField = (fieldName, value) => {
//         switch (fieldName) {
//             case 'name':
//                 return value.trim() ? '' : 'Name is required';
//             case 'price':
//                 return (value && value > 0) ? '' : 'Price is required and must be greater than 0';
//             case 'description':
//                 return value.trim() ? '' : 'Description is required';
//             case 'categoryId':
//                 return value.trim() ? '' : 'CategoryId is required';
//             default:
//                 return '';
//         }
//     };

//     const validateForm = () => {
//         const errorsCopy = { ...errors };
//         let valid = true;
//         for (const field in errorsCopy) {
//             const errorMsg = validateField(field, eval(field));
//             if (errorMsg) {
//                 errorsCopy[field] = errorMsg;
//                 valid = false;
//             } else {
//                 errorsCopy[field] = '';
//             }
//         }
//         setError(errorsCopy);
//         return valid;
//     };

//     const saveOrUpdateProduct = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             const product = { name, price, description, categoryId };
//             console.log(product)
//             if (id) {
//                 updateProduct(id, product).then(() => navigator('/products')).catch(console.error);
//             } else {
//                 createProduct(product).then(() => navigator('/products')).catch(console.error);
//             }
//         }
//     };

//     return (
//         <div className='container'>
//             <br />
//             <div className='row'>
//                 <div className='card col-md-6 offset-md-3'>
//                     <h2 className='text-center'>{id ? 'Update Product' : 'Add Product'}</h2>
//                     <div className='card-body'>
//                         <form onSubmit={saveOrUpdateProduct}>
//                             <div className='form-group mb-2'>
//                                 <label className='form-label' htmlFor='name'>Name:</label>
//                                 <input type='text'
//                                     id='name'
//                                     placeholder='Enter Product Name'
//                                     value={name}
//                                     className={`form-control ${errors.name ? 'is-invalid' : ''}`}
//                                     onChange={(e) => setName(e.target.value)}
//                                 />
//                                 {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label className='form-label' htmlFor='price'>Price:</label>
//                                 <input type='text'
//                                     id='price'
//                                     placeholder='Enter Product Price'
//                                     value={price}
//                                     className={`form-control ${errors.price ? 'is-invalid' : ''}`}
//                                     onChange={(e) => setPrice(e.target.value)}
//                                 />
//                                 {errors.price && <div className='invalid-feedback'>{errors.price}</div>}
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label className='form-label' htmlFor='description'>Description:</label>
//                                 <input type='text'
//                                     id='description'
//                                     placeholder='Enter Product Description'
//                                     value={description}
//                                     className={`form-control ${errors.description ? 'is-invalid' : ''}`}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                 />
//                                 {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label className='form-label' htmlFor='categoryId'>Category Name</label>
//                                 <select
//                                     id='categoryId'
//                                     value={categoryId}
//                                     className={`form-control ${errors.categoryId ? 'is-invalid' : ''}`}
//                                     onChange={(e) => setCategoryId(e.target.value)}
//                                 >
//                                     <option value="" disabled>Select a category</option>
//                                     {categories.map(category => (
//                                         <option key={category.id} value={category.id}>
//                                             {category.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 {errors.categoryId && <div className='invalid-feedback'>{errors.categoryId}</div>}
//                             </div>
//                             <button type='submit' className='btn btn-success'>Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CategoryComponent;
import React, { useEffect } from 'react';
import { createProduct, getProduct, updateProduct } from '../../services/productService';
import { useNavigate, useParams } from 'react-router-dom';
import formComponent from '../Share/ShareComponent'; // Import component chung

const ProductComponent = () => {
    const { id } = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getProduct(id).then((response) => {
                // Bạn có thể truyền dữ liệu này vào component chung
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    const handleSubmit = (data) => {
        if (id) {
            updateProduct(id, data).then(() => {
                navigator('/products');
            }).catch(error => {
                console.error(error);
            });
        } else {
            createProduct(data).then(() => {
                navigator('/products');
            }).catch(error => {
                console.error(error);
            });
        }
    };

    return (
        <formComponent
            title={id ? "Update Product" : "Add Product"}
            initialData={{}} // Truyền dữ liệu khởi tạo vào đây
            onSubmit={handleSubmit}
        />
    );
};

export default ProductComponent;

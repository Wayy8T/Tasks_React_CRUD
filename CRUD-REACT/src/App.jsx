import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ListCategoryComponent from './components/Category/listCategoryComponent'
import ProductComponent from './components/Product/productComponent'
import HeaderComponent from './components/layout/headerComponent'
import FooterComponent from './components/layout/footerComponent'
import CategoryComponent from './components/Category/categoryComponent'
import ListProductComponent from './components/Product/listProductComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/log-in" element={<Login />} /> {/* Đường dẫn đến Login */}
          <Route path="/sign-up" element={<Register />} /> {/* Đường dẫn đến Login */}
          {/* http://localhoast:3000  */}
          <Route path='/categories' element={<ListCategoryComponent />} />
          <Route path='/products' element={<ListProductComponent />} />
          <Route path='/categories/list-products' element={<ListProductComponent />}></Route>
          <Route path='/add-category' element={<CategoryComponent />}></Route>
          <Route path='/add-product' element={<ProductComponent />}></Route>
          <Route path='/edit-category/:id' element={<CategoryComponent />}></Route>
          <Route path='/edit-product/:id' element={<ProductComponent />}></Route>
        </Routes>
        <FooterComponent />

      </BrowserRouter>
    </>
  )
}

export default App

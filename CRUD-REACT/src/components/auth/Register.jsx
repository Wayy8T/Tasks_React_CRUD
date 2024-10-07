import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

import { registerService } from '../../services/accountService'; // Nhập hàm loginService từ dịch vụ
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
} from 'mdb-react-ui-kit';

export default function Profile() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [passWord, setPassWord] = React.useState("");
    const [cfPassWord, setCfPassWord] = React.useState("");
    const [errors, setError] = useState({
        email: '',
        userName: '',
        passWord: '',
        cfPassWord: ''

    })

    const handleRegister = () => {
        if (validateRegister()) {
            const data = {
                email: email,
                userName: userName,
                passWord: passWord
            }
            registerService(data) // Gọi hàm loginService
                .then(response => {
                    console.log(response.data); // In ra dữ liệu trả về
                    if (response.status === 200) {
                        alert("Đăng ký thành công");
                        navigate('/log-in'); // Điều hướng đến trang chủ
                    }
                })
                .catch(error => {
                    alert("Vui lòng kiểm tra thông tin của bạn!");
                });
        }

    };

    const validateRegister = () => {
        let valid = true;
        const errorsCopy = { ...errors }

        // Kiểm tra email
        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        // Kiểm tra tên
        if (userName.trim()) {
            errorsCopy.userName = '';
        } else {
            errorsCopy.userName = 'userName is required';
            valid = false;
        }

        // Kiểm tra mật khẩu
        if (passWord.trim()) {
            errorsCopy.passWord = '';
        } else {
            errorsCopy.passWord = 'Password is required';
            valid = false;
        }

        // Kiểm tra xác nhận mật khẩu
        if (cfPassWord.trim()) {
            errorsCopy.cfPassWord = '';
        } else {
            errorsCopy.cfPassWord = 'Confirm Password is required';
            valid = false;
        }

        // So sánh password và cfPassword
        if (passWord !== cfPassWord) {
            errorsCopy.cfPassWord = 'Passwords do not match';
            valid = false;
        }

        setError(errorsCopy);
        return valid;
    }

    return (
        <MDBContainer fluid>

            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBIcon fas icon="user me-3" size='lg' />
                                <MDBInput label='Your Name' id='form1' type='text' className='w-100' onChange={(e) => setUserName(e.target.value)} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="envelope me-3" size='lg' />
                                <MDBInput label='Your Email' id='form2' type='email' onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg' />
                                <MDBInput label='Password' id='form3' type='password' onChange={(e) => setPassWord(e.target.value)} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="key me-3" size='lg' />
                                <MDBInput label='Repeat your password' id='form4' type='password' onChange={(e) => setCfPassWord(e.target.value)} />
                            </div>

                            <div className='mb-4'>
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                            </div>

                            <button className='mb-4' size='lg' onClick={handleRegister}>Register</button>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../services/accountService'; // Nhập hàm loginService từ dịch vụ
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [passWord, setPassWord] = React.useState("");


    const handleLogin = () => {
        const data = {
            email: email,
            passWord: passWord
        }
        loginService(data) // Gọi hàm loginService
            .then(response => {
                console.log(response.data); // In ra dữ liệu trả về
                if (response.status === 200) {
                    localStorage.setItem("accessToken", response.data.result.accessToken); // Lưu accessToken vào localStorage
                    alert("Đăng nhập thành công");
                    navigate('/categories'); // Điều hướng đến trang chủ
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
                alert("Tên người dùng hoặc mật khẩu không đúng");
            });
    };

    function registerAccount() {
        navigate('/sign-up');
    }

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">

            <MDBRow>

                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6'>

                    <div className="d-flex flex-row align-items-center justify-content-center">

                        <p className="lead fw-normal mb-0 me-3"></p>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='facebook-f' />
                        </MDBBtn>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='twitter' />
                        </MDBBtn>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='linkedin-in' />
                        </MDBBtn>

                    </div>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0"></p>
                    </div>

                    <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} />
                    <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassWord(e.target.value)} />

                    <div className="d-flex justify-content-between mb-4">
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                        <a href="!#">Forgot password?</a>
                    </div>

                    <div className='text-center text-md-start mt-4 pt-2'>
                        <button className="mb-0 px-5" size='lg' onClick={handleLogin} ripple="false">Login</button>
                        <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger" onClick={registerAccount}>Register</a></p>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
    // return (
    //     <form>
    //         <div>
    //             <label>Email:</label>
    //             <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
    //         </div>
    //         <div>
    //             <label>Mật khẩu:</label>
    //             <input type='password' value={passWord} onChange={(e) => setPassWord(e.target.value)} />
    //         </div>
    //         <div>
    //             <button type='button' onClick={handleLogin}>Đăng Nhập</button>
    //         </div>
    //     </form>
    // );
}
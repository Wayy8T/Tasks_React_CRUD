import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../services/accountService'; // Nhập hàm loginService từ dịch vụ

export default function Profile() {
    const navigate = useNavigate();
    const [account, setAccount] = React.useState("");

    const logout = () => {
        localStorage.removeItem("accessToken")
        alert("Logout success")
    }

    const getAccount = () => {

    }

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

    return (
        <form>
            <div>
                <label>Email:</label>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Mật khẩu:</label>
                <input type='password' value={passWord} onChange={(e) => setPassWord(e.target.value)} />
            </div>
            <div>
                <button type='button' onClick={handleLogin}>Đăng Nhập</button>
            </div>
        </form>
    );
}
import React from 'react'

const HeaderComponent = () => {
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/log-in";
    };

    // Ẩn header nếu ở trang login
    if (location.pathname === '/log-in' || location.pathname === '/sign-up') {
        return null;
    }

    return (
        <div>
            <header>
                <nav className='navbar navbar-dark bg-dark d-flex justify-content-between'>
                    <a className="navbar-brand" href="https://getbootstrap.com/docs/5.0/components/navbar/">Management System</a>
                    <button
                        className="btn btn-outline-light"
                        onClick={handleLogout}
                        style={{ position: 'relative', left: '-10px' }} // Điều chỉnh giá trị theo ý muốn
                    >
                        Logout
                    </button>
                </nav>
            </header>
        </div>
    );
}

export default HeaderComponent
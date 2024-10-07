import React from 'react'

const FooterComponent = () => {
    // Ẩn footer nếu ở trang login
    if (location.pathname === '/log-in' || location.pathname === '/sign-up') {
        return null;
    }
    return (
        <div>
            <footer className='footer'>
                <span>All rights reserved 2024 by javaguides</span>
            </footer>
        </div>
    )
}

export default FooterComponent
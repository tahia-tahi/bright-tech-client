import React from 'react';
import web_logo from '../assets/post-logo.png'

const Logo = () => {
    return (
        <div>
            <img src={web_logo} className="w-32 sm:w-44 rounded-lg cursor-pointer" alt="" />
        </div>
    );
};

export default Logo;
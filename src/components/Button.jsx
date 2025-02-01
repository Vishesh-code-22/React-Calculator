import React from "react";

const Button = ({ value, className = "" }) => {
    return (
        <button
            className={`rounded-2xl text-white font-semibold text-xl 
                shadow-[2px_2px_10px_2px_black,-2px_-2px_10px_2px_rgba(255,255,255,0.53)] 
                active:shadow-none active:scale-95 active:translate-y-1 cursor-pointer
                transition duration-50 ease-in-out 
                ${className}`}
        >
            {value}
        </button>
    );
};

export default Button;

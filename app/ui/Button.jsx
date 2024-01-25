"use client";

const Button = ({ label, color }) => {
    return (
        <button type="submit" className={`bg-${color}-500 mx-2 text-white px-4 py-2 rounded`}>{label}</button>
    )
}

export default Button
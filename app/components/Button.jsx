'use client';
const Button = ({ label, color }) => {
    return (
        <button
            type="submit"
            className={`bg-${color}-500 text-gray-800 py-2 px-4 rounded-md hover:bg-${color}-600 focus:outline-none focus:ring focus:border-${color}-300`}
        >
            {label}
        </button>
    )
}

export default Button
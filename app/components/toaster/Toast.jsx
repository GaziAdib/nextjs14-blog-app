"use client";

import { toast } from "react-toastify";

const Toast = ({ label }) => {
    toast.success(`${label}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
    });
}

export default Toast;
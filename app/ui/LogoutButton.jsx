"use client";
import { signOut } from "next-auth/react";
const LogoutButton = ({ label }) => {
    return (
        <button onClick={() => signOut()}>{label}</button>
    )
}

export default LogoutButton
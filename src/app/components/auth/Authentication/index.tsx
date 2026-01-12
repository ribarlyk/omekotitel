'use client'
import Login from "../Login";
import Register from "../Register";

export default function Authentication() {
    return (
        <div className="flex flex-row gap-20">
            <Login />
            <Register />
        </div>
    )
}
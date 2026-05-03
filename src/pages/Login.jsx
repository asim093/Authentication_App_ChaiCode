import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, loading, message } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await login(username, password)
        if (success) {
            navigate('/profile')
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#101828] px-6 lg:px-8">
            <div className="w-full max-w-sm">
                <h2 className="text-center text-2xl font-bold tracking-tight text-white">
                    Sign in to your account
                </h2>

                {message.text && (
                    <div className={`mt-4 p-3 rounded-md text-sm ${message.type === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                        {message.text}
                    </div>
                )}

                <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-100">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="username"
                                required
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-100">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-indigo-500 py-2 text-sm font-semibold text-white hover:bg-indigo-400 disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                    <div className="text-sm text-gray-300 text-center">
                        Not a User?{" "}
                        <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 px-5">
                            Sign up Now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
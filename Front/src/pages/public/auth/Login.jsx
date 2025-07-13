import React, { useState } from 'react';
import { Footer } from '../../../components/Footer';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import { API_URL } from '../../../API';

export const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setForm({ ...form, [e.target.name]: e.target.value.toLowerCase() });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
        setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const newFieldErrors = {};
        if (!form.email.trim()) newFieldErrors.email = 'Email is required';
        if (!form.password.trim()) newFieldErrors.password = 'Password is required';

        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors);
            setError('Please fill in all required fields.');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess('Login successful!');
                login(data.user);
                localStorage.setItem('loginSuccess', `Successful login, welcome back ${data.user.username}`);
                navigate('/home');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Server error');
        }
    };

    return (
        <main className='w-full relative bg-[#fff] flex flex-col items-center justify-start text-center text-sm text-[#0f141a] font-lexend min-h-screen'>
            <section className='w-full max-w-[1280px] bg-[#f7fafc] flex flex-col items-center justify-start min-h-[600px] md:min-h-[700px] lg:min-h-[800px]'>
                <section className='w-full flex flex-row items-center justify-center py-5 px-4 md:px-16 lg:px-40 box-border text-[#0d171c]'>
                    <div className='w-full max-w-[960px] overflow-hidden shrink-0 flex flex-col items-center justify-start py-5 px-0 box-border'>
                        <header className='self-stretch flex flex-col items-center justify-start pt-5 px-2 md:px-4 pb-3 text-2xl md:text-[28px]'>
                            <h1 className='self-stretch leading-[35px] font-bold'>
                                Welcome back to Edusoft
                            </h1>
                        </header>
                        <form className='w-full max-w-[480px] mx-auto flex flex-col gap-4' onSubmit={handleSubmit} noValidate>
                            <div className='flex flex-col items-start'>
                                <label htmlFor='email' className='leading-6 font-medium'>
                                    Email <span className="text-red-600" aria-hidden="true">*</span>
                                    <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    value={form.email}
                                    onChange={handleChange}
<<<<<<< Updated upstream
                                    className='self-stretch rounded-xl bg-[#f7fafc] border-[#d1dee8] border-solid border-[1px] box-border h-12 md:h-14 p-3 md:p-[15px] text-[#4f7a96] text-base md:text-lg'
=======
                                    className={`self-stretch rounded-xl bg-[#f7fafc] border-solid border-[1px] box-border h-12 md:h-14 p-3 md:p-[15px] text-[#4C7490] text-base md:text-lg ${fieldErrors.email ? 'border-red-500' : 'border-[#d1dee8]'}`}
>>>>>>> Stashed changes
                                    placeholder='Enter your email'
                                    aria-invalid={!!fieldErrors.email}
                                />
                                {fieldErrors.email && (
                                    <span className="text-red-600 text-xs mt-1">{fieldErrors.email}</span>
                                )}
                            </div>
                            <div className='flex flex-col items-start relative'>
                                <label htmlFor='password' className='leading-6 font-medium'>
                                    Password <span className="text-red-600" aria-hidden="true">*</span>
                                    <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    id='password'
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={handleChange}
<<<<<<< Updated upstream
                                    className='self-stretch rounded-xl bg-[#f7fafc] border-[#d1dee8] border-solid border-[1px] box-border h-12 md:h-14 p-3 md:p-[15px] text-[#4f7a96] text-base md:text-lg pr-12'
=======
                                    className={`self-stretch rounded-xl bg-[#f7fafc] border-solid border-[1px] box-border h-12 md:h-14 p-3 md:p-[15px] text-[#4C7490] text-base md:text-lg pr-12 ${fieldErrors.password ? 'border-red-500' : 'border-[#d1dee8]'}`}
>>>>>>> Stashed changes
                                    placeholder='Enter your password'
                                    aria-invalid={!!fieldErrors.password}
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-[32px] md:top-[36px] p-1 bg-transparent border-none outline-none"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    <img
                                        src={showPassword ? '/eye-slash.png' : '/eye.png'}
                                        alt={showPassword ? 'Hide password' : 'Show password'}
                                        className="w-6 h-6"
                                    />
                                </button>
                                {fieldErrors.password && (
                                    <span className="text-red-600 text-xs mt-1">{fieldErrors.password}</span>
                                )}
                            </div>
                            <div className='self-stretch text-left text-[#4C7490]'>
                                <span
                                    className='leading-[21px] cursor-pointer underline'
                                    onClick={() => navigate('/recover-password')}
                                >
                                    Forgot password?
                                </span>
                            </div>
                            {error && (
                                <div className="flex items-center gap-3 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-2 mt-1">
                                    <img src="/x-circle.png" alt="Error" className="w-6 h-6" />
                                    <span>{error}</span>
                                </div>
                            )}
                            <button
                                type='submit'
                                className='w-full rounded-[20px] bg-[#1377B9] h-10 md:h-12 flex items-center justify-center py-0 px-4 min-w-[84px] max-w-[480px] cursor-pointer text-[#fafafa] font-bold leading-[21px] text-base md:text-lg transition-colors duration-150 hover:bg-[#1d7fc1] focus:outline-2 focus:outline-[#0d171c]'
                            >
                                Log in
                            </button>
                            <div className='self-stretch text-center text-[#4C7490]'>
                                <span>Don't have an account? </span>
                                <span
                                    className='font-medium underline cursor-pointer'
                                    onClick={() => navigate('/register')}
                                >
                                    Sign up
                                </span>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        </main>
    );
};

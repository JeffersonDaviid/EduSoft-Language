import React, { useState } from 'react';
import { Footer } from '../../../components/Footer';
import { useNavigate } from 'react-router';
import { API_URL } from '../../../API';

export const RecoverPassword = () => {
    const [form, setForm] = useState({
        email: '',
        answerSecret: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const newFieldErrors = {};

        if (!form.email.trim()) newFieldErrors.email = 'Email is required';
        if (!form.answerSecret.trim()) newFieldErrors.answerSecret = 'Secret answer is required';
        if (!form.newPassword) newFieldErrors.newPassword = 'Password is required';
        if (!form.confirmNewPassword) newFieldErrors.confirmNewPassword = 'Please confirm your password';

        if (
            form.newPassword &&
            form.confirmNewPassword &&
            form.newPassword !== form.confirmNewPassword
        ) {
            newFieldErrors.confirmNewPassword = 'Passwords do not match';
        }

        if (
            form.newPassword &&
            (form.newPassword.length < 8 || form.newPassword.length > 15)
        ) {
            newFieldErrors.newPassword = 'Password must be between 8 and 15 characters';
        }

        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors);
            setError('Please fix the errors before submitting.');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/user/recover-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form.email,
                    answerSecret: form.answerSecret,
                    newPassword: form.newPassword,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess('Password updated successfully!');
                setForm({
                    email: '',
                    answerSecret: '',
                    newPassword: '',
                    confirmNewPassword: '',
                });
            } else {
                setError(data.error || 'Password recovery failed');
            }
        } catch (err) {
            setError('Server error');
        }
    };

    // Función para manejar eventos de teclado
    const handleKeyDown = (e, action) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            action();
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <main className='w-full relative bg-[#fff] flex flex-col items-center justify-start text-center text-sm text-[#0f141a] font-lexend min-h-screen'>
            <section className='w-full max-w-[1280px] bg-[#fafafa] flex flex-col items-center justify-start min-h-[600px] md:min-h-[700px] lg:min-h-[800px]'>
                <section className='w-full flex flex-row items-center justify-center py-5 px-4 md:px-16 lg:px-40 box-border text-left text-base'>
                    <div className='w-full max-w-[480px] overflow-hidden shrink-0 flex flex-col items-center justify-start py-5 px-0 box-border'>
                        <header className='self-stretch flex flex-col items-center justify-start pt-5 px-2 md:px-4 pb-3 text-center text-2xl md:text-[28px]'>
                            <h1 className='self-stretch leading-[35px] font-bold'
                                tabIndex={0}>
                                Recover your password
                            </h1>
                        </header>
                        <form className='w-full mx-auto flex flex-col gap-4' onSubmit={handleSubmit} noValidate>
                            {success && (
                                <div className="flex items-center gap-3 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-2">
                                    <img src="/check-circle.png" alt="Success" className="w-6 h-6" />
                                    <span>{success}</span>
                                </div>
                            )}
                            {error && (
                                <div className="flex items-center gap-3 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-2">
                                    <img src="/x-circle.png" alt="Error" className="w-6 h-6" />
                                    <span>{error}</span>
                                </div>
                            )}
                            <div className='flex flex-col items-start'>
                                <label htmlFor='email' className='leading-6 font-medium'
                                    tabIndex={0}>
                                    Email <span className="text-red-600" aria-hidden="true">*</span>
                                    <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`self-stretch rounded-xl bg-[#fafafa] border-solid border-[1px] box-border h-12 p-3 text-[#57788f] text-base ${fieldErrors.email ? 'border-red-500' : 'border-[#d4dee3]'}`}
                                    placeholder='Enter your email'
                                    aria-invalid={!!fieldErrors.email}
                                />
                                {fieldErrors.email && (
                                    <span className="text-red-600 text-xs mt-1">{fieldErrors.email}</span>
                                )}
                            </div>
                            <div className='flex flex-col items-start'>
                                <label htmlFor='answerSecret' className='leading-6 font-medium'
                                    tabIndex={0}>
                                    Secret Answer <span className="text-red-600" aria-hidden="true">*</span>
                                    <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    id='answerSecret'
                                    name='answerSecret'
                                    type='text'
                                    value={form.answerSecret}
                                    onChange={handleChange}
                                    className={`self-stretch rounded-xl bg-[#fafafa] border-solid border-[1px] box-border h-12 p-3 text-[#57788f] text-base ${fieldErrors.answerSecret ? 'border-red-500' : 'border-[#d4dee3]'}`}
                                    placeholder='Enter your secret answer'
                                    aria-invalid={!!fieldErrors.answerSecret}
                                />
                                {fieldErrors.answerSecret && (
                                    <span className="text-red-600 text-xs mt-1">{fieldErrors.answerSecret}</span>
                                )}
                            </div>
                            <div className='flex flex-col items-start'>
                                <label htmlFor='newPassword' className='leading-6 font-medium'
                                    tabIndex={0}>
                                    New Password <span className="text-red-600" aria-hidden="true">*</span>
                                    <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    id='newPassword'
                                    name='newPassword'
                                    type='password'
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    className={`self-stretch rounded-xl bg-[#fafafa] border-solid border-[1px] box-border h-12 p-3 text-[#57788f] text-base ${fieldErrors.newPassword ? 'border-red-500' : 'border-[#d4dee3]'}`}
                                    placeholder='Enter your new password'
                                    aria-invalid={!!fieldErrors.newPassword}
                                />
                                {fieldErrors.newPassword && (
                                    <span className="text-red-600 text-xs mt-1">{fieldErrors.newPassword}</span>
                                )}
                            </div>
                            <div className='flex flex-col items-start'>
                                <label htmlFor='confirmNewPassword' className='leading-6 font-medium'
                                    tabIndex={0}>
                                    Confirm New Password <span className="text-red-600" aria-hidden="true">*</span>
                                    <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    id='confirmNewPassword'
                                    name='confirmNewPassword'
                                    type='password'
                                    value={form.confirmNewPassword}
                                    onChange={handleChange}
                                    className={`self-stretch rounded-xl bg-[#fafafa] border-solid border-[1px] box-border h-12 p-3 text-[#57788f] text-base ${fieldErrors.confirmNewPassword ? 'border-red-500' : 'border-[#d4dee3]'}`}
                                    placeholder='Confirm your new password'
                                    aria-invalid={!!fieldErrors.confirmNewPassword}
                                />
                                {fieldErrors.confirmNewPassword && (
                                    <span className="text-red-600 text-xs mt-1">{fieldErrors.confirmNewPassword}</span>
                                )}
                            </div>
                            <button
                                type='submit'
                                className='w-full rounded-[20px] bg-[#1377B9] h-10 flex items-center justify-center py-0 px-4 min-w-[84px] max-w-[480px] cursor-pointer text-[#fafafa] font-bold leading-[21px] text-base transition-colors duration-150 hover:bg-[#1d7fc1] focus:outline-2 focus:outline-[#0d171c]'
                                tabIndex={0}
                            >
                                Update Password
                            </button>
                            <div className='w-full text-center text-[#4C7490]'>
                                <button
                                    type='button'
                                    className='leading-[21px] cursor-pointer underline bg-transparent border-none p-0 text-[#4C7490] font-inherit'
                                    onClick={handleBackToLogin}
                                    onKeyDown={(e) => handleKeyDown(e, handleBackToLogin)}
                                    tabIndex={0}
                                    aria-label='Go back to login page'
                                >
                                    Back to Log in
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        </main>
    );
};
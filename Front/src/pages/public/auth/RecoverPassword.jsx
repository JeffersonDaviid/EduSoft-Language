import React, { useState } from 'react';
import { Footer } from '../../../components/Footer';

export const RecoverPassword = () => {
    const [form, setForm] = useState({
        email: '',
        answerSecret: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (form.newPassword !== form.confirmNewPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/user/recover-password', {
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

    return (
        <main className='w-full relative bg-[#fff] flex flex-col items-center justify-start text-center text-sm text-[#0f141a] font-lexend min-h-screen'>
            <section className='w-full max-w-[1280px] bg-[#fafafa] flex flex-col items-center justify-start min-h-[600px] md:min-h-[700px] lg:min-h-[800px]'>
                <section className='w-full flex flex-row items-center justify-center py-5 px-4 md:px-16 lg:px-40 box-border text-left text-base'>
                    <div className='w-full max-w-[480px] overflow-hidden shrink-0 flex flex-col items-center justify-start py-5 px-0 box-border'>
                        <header className='self-stretch flex flex-col items-center justify-start pt-5 px-2 md:px-4 pb-3 text-center text-2xl md:text-[28px]'>
                            <h1 className='self-stretch leading-[35px] font-bold'>
                                Recover your password
                            </h1>
                        </header>
                        <form className='w-full mx-auto flex flex-col gap-4' onSubmit={handleSubmit}>
                            {error && <div className="text-red-500">{error}</div>}
                            {success && <div className="text-green-600">{success}</div>}
                            <div className='flex flex-col items-start'>
                                <label htmlFor='email' className='leading-6 font-medium'>
                                    Email
                                </label>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    value={form.email}
                                    onChange={handleChange}
                                    className='self-stretch rounded-xl bg-[#fafafa] border-[#d4dee3] border-solid border-[1px] box-border h-12 p-3 text-[#57788f] text-base'
                                    placeholder='Enter your email'
                                    required
                                />
                            </div>
                            <div className='flex flex-col items-start'>
                                <label htmlFor='answerSecret' className='leading-6 font-medium'>
                                    Secret Answer
                                </label>
                                <input
                                    id='answerSecret'
                                    name='answerSecret'
                                    type='text'
                                    value={form.answerSecret}
                                    onChange={handleChange}
                                    className='self-stretch rounded-xl bg-[#fafafa] border-[#d4dee3] border-solid border-[1px] box-border h-12 p-3 text-[#57788f] text-base'
                                    placeholder='Enter your secret answer'
                                    required
                                />
                            </div>
                            <div className='flex flex-col items-start'>
                                <label htmlFor='newPassword' className='leading-6 font-medium'>
                                    New Password
                                </label>
                                <input
                                    id='newPassword'
                                    name='newPassword'
                                    type='password'
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    className='self-stretch rounded-xl bg-[#fafafa] border-[#d4dee3] border-solid border-[1px] box-border h-12 p-3 text-[#57788f] text-base'
                                    placeholder='Enter your new password'
                                    required
                                />
                            </div>
                            <div className='flex flex-col items-start'>
                                <label htmlFor='confirmNewPassword' className='leading-6 font-medium'>
                                    Confirm New Password
                                </label>
                                <input
                                    id='confirmNewPassword'
                                    name='confirmNewPassword'
                                    type='password'
                                    value={form.confirmNewPassword}
                                    onChange={handleChange}
                                    className='self-stretch rounded-xl bg-[#fafafa] border-[#d4dee3] border-solid border-[1px] box-border h-12 p-3 text-[#57788f] text-base'
                                    placeholder='Confirm your new password'
                                    required
                                />
                            </div>
                            <button
                                type='submit'
                                className='w-full rounded-[20px] bg-[#42a6eb] h-10 flex items-center justify-center py-0 px-4 min-w-[84px] max-w-[480px] cursor-pointer text-[#fafafa] font-bold leading-[21px] text-base transition-colors duration-150 hover:bg-[#1d7fc1] focus:outline-2 focus:outline-[#0d171c]'
                            >
                                Update Password
                            </button>
                        </form>
                    </div>
                </section>
            </section>
            <Footer />
        </main>
    );
};
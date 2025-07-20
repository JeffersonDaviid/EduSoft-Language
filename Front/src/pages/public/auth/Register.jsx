import React, { useState } from 'react';
import { Footer } from '../../../components/Footer';
import { Link } from 'react-router';
import { API_URL } from '../../../API';

export const Register = () => {
	const [form, setForm] = useState({
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
		answerSecret: '',
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [fieldErrors, setFieldErrors] = useState({});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
		if (!form.username.trim()) newFieldErrors.username = 'Username is required';
		if (!form.password) newFieldErrors.password = 'Password is required';
		if (!form.confirmPassword)
			newFieldErrors.confirmPassword = 'Please confirm your password';
		if (!form.answerSecret.trim())
			newFieldErrors.answerSecret = 'Secret answer is required';

		if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
			newFieldErrors.confirmPassword = 'Passwords do not match';
		}

		if (form.password && (form.password.length < 8 || form.password.length > 15)) {
			newFieldErrors.password = 'Password must be between 8 and 15 characters';
		}

		if (Object.keys(newFieldErrors).length > 0) {
			setFieldErrors(newFieldErrors);
			setError('Please fix the errors before submitting.');
			return;
		}

		try {
			const res = await fetch(`${API_URL}/user/create`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: form.email,
					username: form.username,
					password: form.password,
					answerSecret: form.answerSecret,
				}),
			});
			const data = await res.json();
			if (res.ok) {
				setSuccess('User registered successfully!');
				setForm({
					email: '',
					username: '',
					password: '',
					confirmPassword: '',
					answerSecret: '',
				});
			} else {
				setError(data.error || 'Registration failed');
			}
		} catch (err) {
			setError('Server error');
		}
	};

	return (
		<main className='w-full relative bg-[#fff] flex flex-col items-center justify-start text-center text-sm text-[#0f141a] font-lexend min-h-screen'>
			<section className='w-full max-w-[1280px] bg-[#fafafa] flex flex-col items-center justify-start min-h-[600px] md:min-h-[700px] lg:min-h-[800px]'>
				<section className='w-full flex flex-row items-center justify-center py-5 px-4 md:px-16 lg:px-40 box-border text-left text-base'>
					<div className='w-full max-w-[960px] overflow-hidden shrink-0 flex flex-col items-center justify-start py-5 px-0 box-border'>
						<header className='self-stretch flex flex-col items-center justify-start pt-5 px-2 md:px-4 pb-3 text-center text-2xl md:text-[28px]'>
							<h1 className='self-stretch leading-[35px] font-bold'
							tabIndex={0}>
								Sign up for Edusoft
							</h1>
						</header>
						<form
							className='w-full max-w-[480px] mx-auto flex flex-col gap-4'
							onSubmit={handleSubmit}
							noValidate
						>
							{success && (
								<div className='flex items-center gap-3 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-2'>
									<img src='/check-circle.png' alt='Success' className='w-6 h-6' />
									<span>{success}</span>
								</div>
							)}
							{error && (
								<div className='flex items-center gap-3 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-2'>
									<img src='/x-circle.png' alt='Error' className='w-6 h-6' />
									<span>{error}</span>
								</div>
							)}
							<div className='flex flex-col items-start'>
								<label htmlFor='email' className='leading-6 font-medium'
								tabIndex={0}>
									Email{' '}
									<span className='text-red-600' aria-hidden='true'>
										*
									</span>
									<span className='sr-only'>(required)</span>
								</label>
								<input
									id='email'
									name='email'
									type='email'
									value={form.email}
									onChange={handleChange}
									className={`self-stretch rounded-xl bg-[#fafafa] border-solid border-[1px] box-border h-12 md:h-14 p-3 md:p-[15px] text-[#4C7490] text-base md:text-lg ${
										fieldErrors.email ? 'border-red-500' : 'border-[#d4dee3]'
									}`}
									placeholder='Enter your email'
									aria-invalid={!!fieldErrors.email}
								/>
								{fieldErrors.email && (
									<span className='text-red-600 text-xs mt-1'>{fieldErrors.email}</span>
								)}
							</div>
							<div className='flex flex-col items-start'>
								<label htmlFor='username' className='leading-6 font-medium'
								tabIndex={0}>
									Username{' '}
									<span className='text-red-600' aria-hidden='true'>
										*
									</span>
									<span className='sr-only'>(required)</span>
								</label>
								<input
									id='username'
									name='username'
									type='text'
									value={form.username}
									onChange={handleChange}
									className={`self-stretch rounded-xl bg-[#fafafa] border-solid border-[1px] box-border h-12 md:h-14 p-3 md:p-[15px] text-[#4C7490] text-base md:text-lg ${
										fieldErrors.username ? 'border-red-500' : 'border-[#d4dee3]'
									}`}
									placeholder='Choose a username'
									aria-invalid={!!fieldErrors.username}
								/>
								{fieldErrors.username && (
									<span className='text-red-600 text-xs mt-1'>
										{fieldErrors.username}
									</span>
								)}
							</div>
							<div className='flex flex-col items-start relative'>
								<label htmlFor='password' className='leading-6 font-medium'
								tabIndex={0}>
									Password{' '}
									<span className='text-red-600' aria-hidden='true'>
										*
									</span>
									<span className='sr-only'>(required)</span>
								</label>
								<input
									id='password'
									name='password'
									type={showPassword ? 'text' : 'password'}
									value={form.password}
									onChange={handleChange}
									className={`self-stretch rounded-xl bg-[#fafafa] border-solid border-[1px] box-border h-12 md:h-14 p-3 md:p-[15px] text-[#4C7490] text-base md:text-lg pr-12 ${
										fieldErrors.password ? 'border-red-500' : 'border-[#d4dee3]'
									}`}
									placeholder='Create a password'
									aria-invalid={!!fieldErrors.password}
								/>
								<button
									type='button'
									tabIndex={0}
									onClick={() => setShowPassword((v) => !v)}
									className='absolute right-3 top-[32px] md:top-[36px] p-1 bg-transparent border-none outline-none'
									aria-label={showPassword ? 'Hide password' : 'Show password'}
								>
									<img
										src={showPassword ? '/eye-slash.png' : '/eye.png'}
										alt={showPassword ? 'Hide password' : 'Show password'}
										className='w-6 h-6'
									/>
								</button>
								{fieldErrors.password && (
									<span className='text-red-600 text-xs mt-1'>
										{fieldErrors.password}
									</span>
								)}
							</div>
							<div className='flex flex-col items-start relative'>
								<label htmlFor='confirmPassword' className='leading-6 font-medium'
								tabIndex={0}>
									Confirm Password{' '}
									<span className='text-red-600' aria-hidden='true'>
										*
									</span>
									<span className='sr-only'>(required)</span>
								</label>
								<input
									id='confirmPassword'
									name='confirmPassword'
									type={showConfirmPassword ? 'text' : 'password'}
									value={form.confirmPassword}
									onChange={handleChange}
									className={`self-stretch rounded-xl bg-[#fafafa] border-solid border-[1px] box-border h-12 md:h-14 p-3 md:p-[15px] text-[#4C7490] text-base md:text-lg pr-12 ${
										fieldErrors.confirmPassword ? 'border-red-500' : 'border-[#d4dee3]'
									}`}
									placeholder='Confirm your password'
									aria-invalid={!!fieldErrors.confirmPassword}
								/>
								<button
									type='button'
									tabIndex={0}
									onClick={() => setShowConfirmPassword((v) => !v)}
									className='absolute right-3 top-[30px] md:top-[36px] p-1 bg-transparent border-none outline-none'
									aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
								>
									<img
										src={showConfirmPassword ? '/eye-slash.png' : '/eye.png'}
										alt={showConfirmPassword ? 'Hide password' : 'Show password'}
										className='w-6 h-6'
									/>
								</button>
								{fieldErrors.confirmPassword && (
									<span className='text-red-600 text-xs mt-1'>
										{fieldErrors.confirmPassword}
									</span>
								)}
							</div>
							<div className='flex flex-col items-start'>
								<label htmlFor='answerSecret' className='leading-6 font-medium'
								tabIndex={0}>
									Secret Answer (for password recovery){' '}
									<span className='text-red-600' aria-hidden='true'>
										*
									</span>
									<span className='sr-only'>(required)</span>
								</label>
								<input
									id='answerSecret'
									name='answerSecret'
									type='text'
									value={form.answerSecret}
									onChange={handleChange}
									className={`self-stretch rounded-xl bg-[#fafafa] border-solid border-[1px] box-border h-12 md:h-14 p-3 md:p-[15px] text-[#4C7490] text-base md:text-lg ${
										fieldErrors.answerSecret ? 'border-red-500' : 'border-[#d4dee3]'
									}`}
									placeholder='Enter a secret answer'
									aria-invalid={!!fieldErrors.answerSecret}
								/>
								{fieldErrors.answerSecret && (
									<span className='text-red-600 text-xs mt-1'>
										{fieldErrors.answerSecret}
									</span>
								)}
							</div>
							<button
								type='submit'
								className='w-full rounded-[20px] bg-[#add1eb] h-10 md:h-12 flex items-center justify-center py-0 px-4 min-w-[84px] max-w-[480px] cursor-pointer text-[#0f141a] font-bold leading-[21px] text-base md:text-lg transition-colors duration-150 hover:bg-[#7bbbe3] focus:outline-2 focus:outline-[#0d171c]'
							>
								Sign Up
							</button>
							<div className='self-stretch text-center text-[#4C7490]'>
								<span tabIndex={0}>Already have an account? </span>
								<Link to='/login' className='font-medium underline'>
									Log in
								</Link>
							</div>
						</form>
					</div>
				</section>
			</section>
		</main>
	);
};

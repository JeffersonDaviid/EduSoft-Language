import { useState } from 'react';
import { API_URL } from '../../API';

export const About = () => {
	const [form, setForm] = useState({ email: '', message: '' });
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e) => {
		if (e.target.name === 'email') {
			setForm({ ...form, [e.target.name]: e.target.value.toLowerCase() });
		} else {
			setForm({ ...form, [e.target.name]: e.target.value });
		}
	};

	const handleSendEmail = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		try {
			const res = await fetch(`${API_URL}/user/send-email`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});

			if (res.ok) {
				setSuccess('Email sent successfully!');
				setForm({ email: '', message: '' });
			} else {
				const data = await res.json();
				setError(data.error || 'Failed to send email');
			}
		} catch (error) {
			setError('An error occurred while sending the email. Please try again later.');
		}
	};

	return (
		<main className='w-full relative bg-[#fff] flex flex-col items-start justify-start text-center text-sm text-[#000] font-lexend mb-5'>
			<section className='w-full bg-[#fafafa] min-h-[600px] flex flex-col items-center justify-start'>
				<header className='w-full flex flex-col items-center justify-center py-5 px-4 md:px-10 lg:px-40 box-border text-left'>
					<div className='w-full max-w-[960px] flex flex-col items-start justify-start'>
						<div className='w-full flex flex-col gap-3 p-2 md:p-4'>
							<h1 className='leading-10 font-bold text-2xl md:text-3xl lg:text-4xl mb-2'>
								About us & Help
							</h1>
							<p className='leading-[21px] text-sm text-[#57788f]'>
								Learn a little more about the team that developed this application. You
								can also send us an email to find out more details or answer any questions
								you may have.
							</p>
						</div>
					</div>
				</header>
				<section className='w-full flex flex-col items-center justify-start'>
					<h2 className='w-full max-w-[960px] leading-7 font-bold pt-5 px-4 pb-3 text-left text-lg md:text-xl'>
						About us
					</h2>
					<div className='w-full max-w-[960px] flex flex-col items-start justify-start p-4 text-sm'>
						<article className='w-full rounded-lg bg-[#fafafa] border-[#d4dee3] border-solid border-[1px] box-border flex flex-col items-start justify-start py-3 px-4 md:py-4 md:px-6 shadow-sm'>
							<h3 className='leading-[21px] font-medium py-2 text-base md:text-lg'>
								Edusoft
							</h3>
							<p className='leading-[21px] text-[#57788f]'>
								Edusoft is a development team that focuses on the recreational field of
								the English language, focusing on the language in the academic aspect so
								that you can improve your English vocabulary and listening skills. We
								focus on providing the highest quality when developing our applications
								and ensuring that the user can enjoy using them.
							</p>
						</article>
					</div>
					<h2 className='w-full max-w-[960px] leading-7 font-bold pt-5 px-4 pb-3 text-left text-lg md:text-xl'>
						Help
					</h2>
					<form
						className='w-full max-w-[480px] flex flex-col gap-4 px-4 mx-auto'
						onSubmit={handleSendEmail}
					>
						<div className='flex flex-col items-start'>
							<label htmlFor='email' className='leading-6 font-medium'>
								Your Email
							</label>
							<input
								id='email'
								type='email'
								className='w-full rounded-lg bg-[#fafafa] border-[#d4dee3] border-solid border-[1px] box-border h-12 md:h-14 p-3 md:p-[15px] text-[#57788f] focus:outline-2 focus:outline-[#338fc9]'
								placeholder='email@example.com'
								name='email'
								value={form.email}
								onChange={handleChange}
							/>
						</div>
						<div className='flex flex-col items-start'>
							<label htmlFor='message' className='leading-6 font-medium'>
								Your Message
							</label>
							<textarea
								id='message'
								className='w-full rounded-lg bg-[#fafafa] border-[#d4dee3] border-solid border-[1px] box-border min-h-[100px] md:min-h-[144px] p-3 md:p-[15px] focus:outline-2 focus:outline-[#338fc9]'
								placeholder='Write your message here...'
								name='message'
								value={form.message}
								onChange={handleChange}
							/>
						</div>
						{error && (
							<div className='flex items-center gap-3 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-2 mt-1'>
								<img src='/x-circle.png' alt='Error' className='w-6 h-6' />
								<span>{error}</span>
							</div>
						)}
						<div className='flex flex-row items-center justify-end'>
							<button
								type='submit'
								className='w-full md:w-[120px] rounded-lg bg-[#338fc9] h-10 flex items-center justify-center py-0 px-4 text-[#fafafa] font-bold leading-[21px] focus:outline-2 focus:outline-[#0d171c] transition-colors duration-150'
							>
								Submit
							</button>
						</div>
					</form>
				</section>
			</section>
		</main>
	);
};

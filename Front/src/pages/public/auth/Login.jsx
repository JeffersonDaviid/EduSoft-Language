import React from 'react';
import { Footer } from '../../../components/Footer';

export const Login = () => {
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
						<form className='w-full max-w-[480px] mx-auto flex flex-col gap-4'>
							<div className='flex flex-col items-start'>
								<label htmlFor='username' className='leading-6 font-medium'>
									Username
								</label>
								<input
									id='username'
									name='username'
									type='text'
									className='self-stretch rounded-xl bg-[#f7fafc] border-[#d1dee8] border-solid border-[1px] box-border h-12 md:h-14 p-3 md:p-[15px] text-[#4f7a96] text-base md:text-lg'
									placeholder='Enter your username'
								/>
							</div>
							<div className='flex flex-col items-start'>
								<label htmlFor='password' className='leading-6 font-medium'>
									Password
								</label>
								<input
									id='password'
									name='password'
									type='password'
									className='self-stretch rounded-xl bg-[#f7fafc] border-[#d1dee8] border-solid border-[1px] box-border h-12 md:h-14 p-3 md:p-[15px] text-[#4f7a96] text-base md:text-lg'
									placeholder='Enter your password'
								/>
							</div>
							<div className='self-stretch text-left text-[#4f7a96]'>
								<a href='#' className='leading-[21px]'>
									Forgot password?
								</a>
							</div>
							<button
								className='w-full rounded-[20px] bg-[#42a6eb] h-10 md:h-12 flex items-center justify-center py-0 px-4 min-w-[84px] max-w-[480px] cursor-pointer text-[#fafafa] font-bold leading-[21px] text-base md:text-lg transition-colors duration-150 hover:bg-[#1d7fc1] focus:outline-2 focus:outline-[#0d171c]'
								onClick={() => {
									localStorage.setItem('token', 'dummy_token');
								}}
							>
								Log in
							</button>
							<div className='self-stretch text-center text-[#4f7a96]'>
								<span>Don't have an account? </span>
								<a href='/register' className='font-medium underline'>
									Sign up
								</a>
							</div>
						</form>
					</div>
				</section>
			</section>
		</main>
	);
};

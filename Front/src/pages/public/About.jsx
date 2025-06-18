import React from 'react';
import { Footer } from '../../components/Footer';

export const About = () => {
	return (
		<main className='w-full relative bg-[#fff] flex flex-col items-start justify-start text-center text-sm text-[#000] font-lexend'>
			<section className='self-stretch bg-[#fafafa] h-[981px] overflow-hidden shrink-0 flex flex-col items-start justify-start min-h-[800px]'>
				<header className='self-stretch flex flex-row items-start justify-center py-5 px-40 box-border text-left text-[22px] text-[#0f141a]'>
					<div className='flex-1 overflow-hidden flex flex-col items-start justify-start max-w-[960px]'>
						<div className='self-stretch flex flex-row items-start justify-between flex-wrap content-start p-4 text-[32px]'>
							<div className='flex flex-col items-start justify-start gap-3 min-w-[288px]'>
								<h1 className='w-[524px] leading-10 font-bold'>About us & Help</h1>
								<p className='self-stretch leading-[21px] text-sm text-[#57788f]'>
									Learn a little more about the team that developed this application. You
									can also send us an email to find out more details or answer any
									questions you may have.
								</p>
							</div>
						</div>
					</div>
				</header>
				<section className='self-stretch flex flex-col items-start justify-start'>
					<h2 className='self-stretch leading-7 font-bold pt-5 px-4 pb-3'>About us</h2>
					<div className='self-stretch flex flex-col items-start justify-start p-4 text-sm'>
						<article className='self-stretch rounded-lg bg-[#fafafa] border-[#d4dee3] border-solid border-[1px] box-border h-[165px] flex flex-col items-start justify-start py-[7px] px-[15px]'>
							<h3 className='leading-[21px] font-medium py-2'>Edusoft</h3>
							<p className='self-stretch leading-[21px] text-[#57788f]'>
								Edusoft is a development team that focuses on the recreational field of
								the English language, focusing on the language in the academic aspect so
								that you can improve your English vocabulary and listening skills. We
								focus on providing the highest quality when developing our applications
								and ensuring that the user can enjoy using them.
							</p>
						</article>
					</div>
					<h2 className='self-stretch leading-7 font-bold pt-5 px-4 pb-3'>Help</h2>
					<form className='flex flex-col gap-4 px-4 max-w-[480px]'>
						<div className='flex flex-col items-start'>
							<label htmlFor='email' className='leading-6 font-medium'>
								Your Email
							</label>
							<input
								id='email'
								type='email'
								className='self-stretch rounded-lg bg-[#fafafa] border-[#d4dee3] border-solid border-[1px] box-border h-14 p-[15px] text-[#57788f]'
								placeholder='email@example.com'
							/>
						</div>
						<div className='flex flex-col items-start'>
							<label htmlFor='message' className='leading-6 font-medium'>
								Your Message
							</label>
							<textarea
								id='message'
								className='self-stretch rounded-lg bg-[#fafafa] border-[#d4dee3] border-solid border-[1px] box-border min-h-[144px] p-[15px]'
							/>
						</div>
						<div className='flex flex-row items-start justify-end'>
							<button
								type='submit'
								className='w-[84px] rounded-lg bg-[#338fc9] h-10 flex items-center justify-center py-0 px-4 min-w-[84px] max-w-[480px] text-[#fafafa] font-bold leading-[21px]'
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

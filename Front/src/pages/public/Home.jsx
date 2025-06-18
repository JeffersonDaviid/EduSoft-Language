import { Link } from 'react-router';

import hero from '../../../public/hero.jpg';

export const Home = () => {
	return (
		<main
			className='w-full relative bg-[#fff] min-h-screen flex flex-col items-center justify-between text-center text-sm text-[#61a1c9] font-lexend'
			aria-label='Home page'
		>
			<section className='w-full max-w-[1280px] flex-1 flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px] lg:min-h-[800px]'>
				<section className='w-full flex flex-row items-center justify-center py-5 px-4 md:px-16 lg:px-40 box-border text-2xl md:text-4xl lg:text-5xl text-[#fff]'>
					<div className='w-full max-w-[960px] relative flex flex-col justify-center'>
						<div className='relative w-full flex flex-col items-center justify-center'>
							<div className='w-full md:w-[1000px] flex flex-col items-center justify-center p-2 md:p-4 box-border'>
								<div
									className='w-full md:w-[969px] relative rounded-xl bg-cover bg-no-repeat bg-center min-h-[320px] md:min-h-[480px] flex flex-col items-center justify-center shadow-lg'
									style={{ backgroundImage: `url(${hero})` }}
								>
									<div
										className='absolute inset-0 bg-black/40 rounded-xl pointer-events-none'
										aria-hidden='true'
									></div>
									<div className='w-full md:w-[896px] flex flex-col items-center justify-center gap-2 px-2 md:px-0 mt-8 md:mt-[120px] relative z-10'>
										<h1
											className='w-full md:w-[706px] tracking-[-1px] md:tracking-[-2px] leading-[40px] md:leading-[60px] font-black inline-block h-auto md:h-[60px] shrink-0 text-2xl md:text-4xl lg:text-5xl'
											aria-label='Main headline'
										>
											Learn English by playing!
											<span className='sr-only'>
												Welcome to EduSoft, interactive English learning through games
											</span>
										</h1>
										<p className='self-stretch relative leading-6 text-base md:text-lg text-[#e6e8eb] mt-2'>
											Learn English in a fun and effective way. At EduSoft, we transform
											language learning into an entertaining experience through
											interactive games that will help you improve your comprehension,
											vocabulary, and conversation skills.
										</p>
									</div>
									<div className='flex justify-center w-full mt-8 md:mt-12 relative z-10'>
										<Link
											to='/register'
											className='rounded-xl bg-[#47a8eb] hover:bg-[#1d7fc1] h-12 flex items-center justify-center py-0 px-5 min-w-[120px] max-w-[480px] cursor-pointer text-base md:text-lg text-[#0d171c] leading-6 overflow-hidden text-ellipsis whitespace-nowrap focus:outline-2 focus:outline-[#0d171c] transition-colors duration-150 shadow-md'
											aria-label='Start registration'
											tabIndex={0}
											title='Start your learning journey now'
										>
											Start Now
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</section>
		</main>
	);
};

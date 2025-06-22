import { Link } from 'react-router';
import hero from '../../public/hero.jpg';

export const HomeUser = () => {
	return (
		<main className='w-full min-h-screen flex flex-col items-center justify-between bg-white text-[#0f141a] font-lexend'>
			<section className='w-full flex-1 flex flex-col items-center justify-center min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px]'>
				<section className='w-full flex flex-row items-center justify-center py-6 px-3 sm:px-6 md:px-12 lg:px-32 text-center'>
					<div className='w-full max-w-3xl sm:max-w-4xl md:max-w-5xl flex flex-col justify-center'>
						<div className='flex flex-col items-center justify-center w-full'>
							<div className='w-full flex flex-col items-center justify-center p-2 sm:p-4'>
								<div
									className='w-full relative rounded-xl bg-cover bg-no-repeat bg-center min-h-[220px] sm:min-h-[320px] md:min-h-[480px] flex flex-col items-center justify-center shadow-lg'
									style={{ backgroundImage: `url(${hero})` }}
								>
									<div
										className='absolute inset-0 bg-black/40 rounded-xl pointer-events-none'
										aria-hidden='true'
									></div>
									<div className='w-full flex flex-col items-center justify-center gap-2 px-2 sm:px-4 mt-8 sm:mt-16 relative z-10'>
										<h1
											className='w-full max-w-xl tracking-tight text-white leading-9 sm:leading-[48px] font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
											aria-label='Main headline'
										>
											Learn English by playing!
										</h1>
										<p className='w-full max-w-2xl leading-6 text-base sm:text-lg mt-2 text-[#e6e8eb]'>
											Learn English in a fun and effective way. At EduSoft, we transform
											language learning into an entertaining experience through
											interactive games that will help you improve your comprehension,
											vocabulary, and conversation skills.
										</p>
									</div>
									<div className='flex justify-center w-full mt-6 sm:mt-10 relative z-10'>
										<Link
											to='/games'
											className='rounded-xl text-white bg-[#47a8eb] hover:bg-[#1d7fc1] h-12 flex items-center justify-center px-6 min-w-[120px] max-w-xs text-base sm:text-lg leading-6 whitespace-nowrap focus:outline-2 focus:outline-[#0d171c] transition-colors duration-150 shadow-md'
											aria-label='Start games'
											tabIndex={0}
											title='Start playing now'
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

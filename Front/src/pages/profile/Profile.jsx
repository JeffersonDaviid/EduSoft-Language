import React from 'react';
import { Link } from 'react-router';

export const Profile = () => {
	return (
		<main className='w-full relative bg-[#fff] flex flex-col items-start justify-start text-left text-sm text-[#000] font-lexend'>
			<section className='self-stretch bg-[#fafafa] overflow-hidden flex flex-col items-start justify-start min-h-[800px]'>
				<section className='self-stretch flex flex-col items-start justify-start'>
					<header className='self-stretch flex flex-row items-start justify-center py-5 px-4 md:px-16 lg:px-40 box-border text-[#0f141a]'>
						<div className='flex-1 overflow-hidden flex flex-col items-start justify-start max-w-[960px]'>
							<div className='self-stretch flex flex-row items-start justify-between flex-wrap content-start p-4 text-[32px]'>
								<div className='flex flex-col items-start justify-start gap-3 min-w-[220px]'>
									<h1
										className='leading-10 font-bold text-2xl md:text-3xl lg:text-4xl'
										tabIndex={0}
									>
										Your Profile
									</h1>
									<p className='text-sm text-[#57788f]'>
										Here you can view and customize your learning experience. In your
										profile, you'll find information about your progress, achievements,
										and statistics, as well as the option to adjust your preferences to
										improve your EduSoft Language experience.
									</p>
								</div>
							</div>
							<section className='self-stretch flex flex-row items-start justify-start p-4 text-center'>
								<div className='flex-1 flex flex-col md:flex-row items-center justify-between gap-4'>
									<div className='flex flex-row items-start justify-start gap-4 text-left text-base text-[#57788f]'>
										<img
											className='w-24 h-24 md:w-32 md:h-32 rounded-full object-cover min-h-[96px] md:min-h-[128px] border border-[#d4dee3]'
											alt='Profile picture of Luisa Fernandez'
											src='/depth-7-frame-0@2x.png'
										/>
										<div className='h-24 md:h-32 flex flex-col items-start justify-center'>
											<h2
												className='text-lg md:text-[22px] text-[#0f141a] font-bold leading-7'
												tabIndex={0}
											>
												Luisa Fernandez
											</h2>
											<div className='leading-6'>Level 7</div>
											<div className='leading-6'>Joined 2 years ago</div>
										</div>
									</div>
									<nav
										aria-label='Profile actions'
										className='flex flex-row gap-2 mt-4 md:mt-0'
									>
										<Link
											to='/profile/update'
											className='rounded-[20px] bg-[#e8edf2] h-10 flex items-center justify-center px-4 min-w-[84px] max-w-[180px] font-medium focus:outline-2 focus:outline-blue-400 hover:bg-[#d1dee8] transition-colors duration-150'
											tabIndex={0}
											title='Edit your profile'
										>
											Edit Profile
										</Link>
										<button
											onClick={() => {
												localStorage.removeItem('token');
											}}
											className='rounded-[20px] bg-[#e8edf2] h-10 flex items-center justify-center px-4 min-w-[84px] max-w-[180px] font-medium focus:outline-2 focus:outline-blue-400 hover:bg-[#d1dee8] transition-colors duration-150'
											tabIndex={0}
											title='Log out of your account'
										>
											Log Out
										</button>
									</nav>
								</div>
							</section>
							<section className='self-stretch pt-5 px-4 pb-3'>
								<h2 className='leading-7 font-bold text-lg md:text-[22px]' tabIndex={0}>
									Progress Summary
								</h2>
								<div className='flex flex-row flex-wrap gap-3 text-2xl'>
									{[
										{ value: 150, label: 'Games Played' },
										{ value: 75, label: 'Lessons Completed' },
										{ value: 20, label: 'Achievements Earned' },
									].map((item, idx) => (
										<article
											key={item.label + idx}
											className='flex-1 rounded-lg border-[#d4dee3] border-solid border-[1px] box-border flex flex-col items-start justify-start p-3 gap-2 min-w-[111px] bg-white shadow-sm'
											aria-label={item.label}
										>
											<b className='text-2xl leading-[30px]'>{item.value}</b>
											<span className='text-sm text-[#57788f]'>{item.label}</span>
										</article>
									))}
								</div>
							</section>
							<section className='self-stretch pt-5 px-4 pb-3'>
								<h2 className='leading-7 font-bold text-lg md:text-[22px]' tabIndex={0}>
									Game History
								</h2>
								<div className='self-stretch rounded-xl bg-[#fafafa] border-[#d4dee3] border-solid border-[1px] overflow-x-auto'>
									<table className='w-full text-left min-w-[400px]'>
										<caption className='sr-only'>Game history table</caption>
										<thead>
											<tr>
												<th scope='col' className='py-3 px-4 font-medium'>
													Game
												</th>
												<th scope='col' className='py-3 px-4 font-medium'>
													Date
												</th>
												<th scope='col' className='py-3 px-4 font-medium'>
													Score
												</th>
											</tr>
										</thead>
										<tbody>
											{[
												{
													game: 'Vocabulary Challenge',
													date: '2025-06-05',
													score: '85/100',
												},
												{ game: 'Grammar Quest', date: '2025-06-06', score: '70/100' },
												{
													game: 'Vocabulary Challenge',
													date: '2025-06-07',
													score: '90/100',
												},
												{
													game: 'Reading Comprehension',
													date: '2025-06-08',
													score: '75/100',
												},
												{ game: 'Grammar Quest', date: '2025-06-09', score: '80/100' },
											].map((row, idx) => (
												<tr
													key={row.game + row.date + idx}
													tabIndex={0}
													className='focus:outline-2 focus:outline-blue-400'
												>
													<td className='py-2 px-4 text-[#0d171c]'>{row.game}</td>
													<td className='py-2 px-4 text-[#4f7a96]'>{row.date}</td>
													<td className='py-2 px-4 text-[#57788f]'>{row.score}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</section>
						</div>
					</header>
				</section>
			</section>
		</main>
	);
};

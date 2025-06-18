export const Progress = () => {
	return (
		<main className='w-full min-h-screen bg-[#fff] flex flex-col items-center text-left text-sm text-[#000] font-lexend'>
			<section className='w-full max-w-[1280px] bg-[#f7fafc] flex-1 flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px] lg:min-h-[800px]'>
				<section className='w-full flex flex-col items-center justify-center'>
					<header className='w-full flex flex-col items-center justify-start py-5 px-4 md:px-16 lg:px-40 box-border'>
						<div className='w-full max-w-[960px] flex flex-col gap-6'>
							<div className='flex flex-col gap-3'>
								<h1 className='text-2xl md:text-4xl font-bold leading-10 mb-2'>
									Your Progress
								</h1>
								<p className='text-sm md:text-base text-[#4f7a96]'>
									See how you're progressing on your journey to mastering English! In
									EduSoft Language, you can track your progress and see how you're
									improving every day. Here you can see your achievements, the number of
									words learned, and the level you've reached in each of our games.
								</p>
							</div>
							<section className='w-full flex flex-col items-start justify-start p-4 gap-3'>
								<div className='w-full flex flex-row items-center justify-between gap-2'>
									<h2 className='leading-6 font-medium'>Overall Progress</h2>
									<span className='h-6 text-sm'>75%</span>
								</div>
								<progress value='75' max='100' className='w-full rounded h-2'></progress>
							</section>
							<section className='w-full flex flex-col items-start justify-start pt-5 px-4 pb-3'>
								<h2 className='leading-7 font-bold text-lg md:text-[22px]'>
									Achievements
								</h2>
							</section>
							<section className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4'>
								{[
									{
										img: '/depth-5-frame-0.svg',
										title: 'Lesson Master',
										desc: 'Completed 10 lessons',
									},
									{
										img: '/depth-5-frame-01.svg',
										title: 'Vocabulary Ace',
										desc: 'Learned 100 new words',
									},
									{
										img: '/depth-5-frame-02.svg',
										title: 'Daily Streak',
										desc: 'Practiced for 30 days',
									},
									{
										img: '/depth-5-frame-03.svg',
										title: 'Level 3',
										desc: 'You have reached level 3',
									},
								].map((ach, idx) => (
									<article
										key={ach.title + idx}
										className='bg-[#f7fafc] flex flex-row items-center gap-4 min-h-[72px] rounded-lg shadow p-3'
									>
										<img className='w-12 h-12 rounded-lg' alt={ach.title} src={ach.img} />
										<div className='flex flex-col items-start justify-center'>
											<h3 className='font-medium leading-6'>{ach.title}</h3>
											<p className='text-sm text-[#4f7a96]'>{ach.desc}</p>
										</div>
									</article>
								))}
							</section>
							<section className='w-full flex flex-col items-start justify-start pt-5 px-4 pb-3'>
								<h2 className='leading-7 font-bold text-lg md:text-[22px]'>
									Achievement History
								</h2>
							</section>
							<section className='w-full flex flex-col items-start justify-start py-3 px-4 text-sm'>
								<div className='w-full rounded-xl bg-[#f7fafc] border-[#d1dee8] border-solid border-[1px] overflow-x-auto'>
									<table className='w-full text-left min-w-[500px]'>
										<thead>
											<tr>
												<th className='py-3 px-4 font-medium'>Activity</th>
												<th className='py-3 px-4 font-medium'>Date</th>
												<th className='py-3 px-4 font-medium'>Result</th>
											</tr>
										</thead>
										<tbody className='text-[#4f7a96]'>
											<tr>
												<td className='py-2 px-4 text-[#0d171c]'>Lesson 1</td>
												<td className='py-2 px-4'>2025-06-05</td>
												<td className='py-2 px-4'>Completed</td>
											</tr>
											<tr>
												<td className='py-2 px-4 text-[#0d171c]'>Practice Session</td>
												<td className='py-2 px-4'>2025-06-06</td>
												<td className='py-2 px-4'>100 points</td>
											</tr>
											<tr>
												<td className='py-2 px-4 text-[#0d171c]'>Lesson 2</td>
												<td className='py-2 px-4'>2025-06-09</td>
												<td className='py-2 px-4'>Completed</td>
											</tr>
											<tr>
												<td className='py-2 px-4 text-[#0d171c]'>Quiz</td>
												<td className='py-2 px-4'>2025-06-09</td>
												<td className='py-2 px-4'>90%</td>
											</tr>
											<tr>
												<td className='py-2 px-4 text-[#0d171c]'>Lesson 3</td>
												<td className='py-2 px-4'>2025-06-10</td>
												<td className='py-2 px-4'>Completed</td>
											</tr>
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

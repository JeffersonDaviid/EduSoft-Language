import { Link } from 'react-router';

export const GamesHome = () => {
	return (
		<main className='w-full min-h-screen bg-[#fff] text-left text-sm text-[#0f141a] flex flex-col items-center font-lexend'>
			<section className='w-full max-w-[1280px] bg-[#fafafa] flex-1 flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px] lg:min-h-[800px]'>
				<header className='w-full flex flex-col items-center justify-start py-5 px-4 md:px-16 lg:px-40 box-border'>
					<div className='w-full max-w-[960px] flex flex-col gap-6'>
						<div className='flex flex-col gap-3'>
							<h1 className='text-2xl md:text-4xl lg:text-5xl font-bold leading-10 mb-2'>
								Our Games
							</h1>
							<p className='text-sm md:text-base text-[#57788f]'>
								Learn English by playing! At EduSoft Language, our games are designed to
								make learning a fun and educational experience. Through multiple-choice
								questions, you can test and expand your English vocabulary in an
								interactive way.
							</p>
						</div>
						{/* Vocabulary Games */}
						<section className='pt-4 pb-2'>
							<h2 className='text-lg md:text-xl font-bold mb-2'>Vocabulary Games</h2>
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
								{[
									{
										title: 'Tense Master',
										desc: 'Practice using different tenses correctly.',
										src: '/depth-7-frame-01@2x.png',
									},
									{
										title: 'Article Adventure',
										desc: 'Learn the correct use of articles (a, an, the).',
										src: '/depth-7-frame-02@2x.png',
									},
									{
										title: 'Preposition Puzzle',
										desc: 'Complete sentences with the correct prepositions.',
										src: '/depth-7-frame-03@2x.png',
									},
								].map((game, idx) => (
									<article
										key={game.title + idx}
										className='rounded-lg flex flex-col items-start justify-start gap-4 bg-white shadow-md p-3'
									>
										<img
											className='w-full rounded-xl max-w-full h-48 md:h-[301px] object-cover'
											alt={game.title}
											src={game.src}
										/>
										<div className='flex flex-col items-start'>
											<h3 className='leading-6 font-medium text-base md:text-lg'>
												{game.title}
											</h3>
											<p className='text-sm text-[#57788f]'>{game.desc}</p>
										</div>
									</article>
								))}
							</div>
						</section>
						{/* Grammar Games */}
						<section className='pt-4 pb-2'>
							<h2 className='text-lg md:text-xl font-bold mb-2'>Grammar Games</h2>
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
								{[
									{
										title: 'Tense Master',
										desc: 'Practice using different tenses correctly.',
										src: '/depth-7-frame-01@2x.png',
									},
									{
										title: 'Article Adventure',
										desc: 'Learn the correct use of articles (a, an, the).',
										src: '/depth-7-frame-02@2x.png',
									},
									{
										title: 'Preposition Puzzle',
										desc: 'Complete sentences with the correct prepositions.',
										src: '/depth-7-frame-03@2x.png',
									},
								].map((game, idx) => (
									<Link
										to={'/games/grammar'}
										key={game.title + idx}
										className='rounded-lg flex flex-col items-start justify-start gap-4 bg-white shadow-md p-3'
									>
										<img
											className='w-full rounded-xl max-w-full h-48 md:h-[301px] object-cover'
											alt={game.title}
											src={game.src}
										/>
										<div className='flex flex-col items-start'>
											<h3 className='leading-6 font-medium text-base md:text-lg'>
												{game.title}
											</h3>
											<p className='text-sm text-[#57788f]'>{game.desc}</p>
										</div>
									</Link>
								))}
							</div>
						</section>
						{/* Listening */}
						<section className='pt-4 pb-2'>
							<h2 className='text-lg md:text-xl font-bold mb-2'>Listening</h2>
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
								{[
									{
										title: 'Tense Master',
										desc: 'Practice using different tenses correctly.',
										src: '/depth-7-frame-01@2x.png',
									},
									{
										title: 'Article Adventure',
										desc: 'Learn the correct use of articles (a, an, the).',
										src: '/depth-7-frame-02@2x.png',
									},
									{
										title: 'Preposition Puzzle',
										desc: 'Complete sentences with the correct prepositions.',
										src: '/depth-7-frame-03@2x.png',
									},
								].map((game, idx) => (
									<article
										key={game.title + idx}
										className='rounded-lg flex flex-col items-start justify-start gap-4 bg-white shadow-md p-3'
									>
										<img
											className='w-full rounded-xl max-w-full h-48 md:h-[301px] object-cover'
											alt={game.title}
											src={game.src}
										/>
										<div className='flex flex-col items-start'>
											<h3 className='leading-6 font-medium text-base md:text-lg'>
												{game.title}
											</h3>
											<p className='text-sm text-[#57788f]'>{game.desc}</p>
										</div>
									</article>
								))}
							</div>
						</section>
						{/* Reading */}
						<section className='pt-4 pb-2'>
							<h2 className='text-lg md:text-xl font-bold mb-2'>Reading</h2>
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
								{[
									{
										title: 'Tense Master',
										desc: 'Practice using different tenses correctly.',
										src: '/depth-7-frame-01@2x.png',
									},
									{
										title: 'Article Adventure',
										desc: 'Learn the correct use of articles (a, an, the).',
										src: '/depth-7-frame-02@2x.png',
									},
									{
										title: 'Preposition Puzzle',
										desc: 'Complete sentences with the correct prepositions.',
										src: '/depth-7-frame-03@2x.png',
									},
								].map((game, idx) => (
									<article
										key={game.title + idx}
										className='rounded-lg flex flex-col items-start justify-start gap-4 bg-white shadow-md p-3'
									>
										<img
											className='w-full rounded-xl max-w-full h-48 md:h-[301px] object-cover'
											alt={game.title}
											src={game.src}
										/>
										<div className='flex flex-col items-start'>
											<h3 className='leading-6 font-medium text-base md:text-lg'>
												{game.title}
											</h3>
											<p className='text-sm text-[#57788f]'>{game.desc}</p>
										</div>
									</article>
								))}
							</div>
						</section>
						{/* Speaking */}
						<section className='pt-4 pb-2'>
							<h2 className='text-lg md:text-xl font-bold mb-2'>Speaking</h2>
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
								{[
									{
										title: 'Tense Master',
										desc: 'Practice using different tenses correctly.',
										src: '/depth-7-frame-01@2x.png',
									},
									{
										title: 'Article Adventure',
										desc: 'Learn the correct use of articles (a, an, the).',
										src: '/depth-7-frame-02@2x.png',
									},
									{
										title: 'Preposition Puzzle',
										desc: 'Complete sentences with the correct prepositions.',
										src: '/depth-7-frame-03@2x.png',
									},
								].map((game, idx) => (
									<article
										key={game.title + idx}
										className='rounded-lg flex flex-col items-start justify-start gap-4 bg-white shadow-md p-3'
									>
										<img
											className='w-full rounded-xl max-w-full h-48 md:h-[301px] object-cover'
											alt={game.title}
											src={game.src}
										/>
										<div className='flex flex-col items-start'>
											<h3 className='leading-6 font-medium text-base md:text-lg'>
												{game.title}
											</h3>
											<p className='text-sm text-[#57788f]'>{game.desc}</p>
										</div>
									</article>
								))}
							</div>
						</section>
					</div>
				</header>
			</section>
		</main>
	);
};

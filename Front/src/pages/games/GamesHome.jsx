import { useState } from 'react';
import { GameDescription } from './GameDescription';

import reading1Icon from '../../../public/reading1.jpg';
import reading2Icon from '../../../public/reading2.jpg';
import reading3Icon from '../../../public/reading3.avif';

import grammar1Icon from '../../../public/grammar1.jpg';
import grammar2Icon from '../../../public/grammar2.png';
import grammar3Icon from '../../../public/grammar3.jpg';

import listen1Icon from '../../../public/listen.jpg';
import listen2Icon from '../../../public/listen2.jpg';
import listen3Icon from '../../../public/listen3.png';

import vocabulary1Icon from '../../../public/vocabulary.jpg';
import vocabulary2Icon from '../../../public/vocabulary2.jpg';
import vocabulary3Icon from '../../../public/vocabulary3.jpg';

import speaking1Icon from '../../../public/speak.png';
import speaking2Icon from '../../../public/speak.png';
import speaking3Icon from '../../../public/speak.png';

import commingSoonIcon from '../../../public/coming_soon.png';

const gamesData = [
	{
		category: 'Vocabulary Games',
		games: [
			{
				title: 'Tense Master',
				desc: 'Practice using different tenses correctly.',
				src: vocabulary1Icon,
				path: '/games/vocabulary',
				enable: true,
			},
			{
				title: 'Article Adventure',
				desc: 'Learn the correct use of articles (a, an, the).',
				src: vocabulary2Icon,
				path: '/games/vocabulary',
				enable: false,
			},
			{
				title: 'Preposition Puzzle',
				desc: 'Complete sentences with the correct prepositions.',
				src: vocabulary3Icon,
				path: '/games/vocabulary',
				enable: false,
			},
		],
	},
	{
		category: 'Grammar Games',
		games: [
			{
				title: 'Grammar Challenge',
				desc: 'Test your grammar skills with fun challenges.',
				src: grammar1Icon,
				path: '/games/grammar',
				enable: true,
			},
			{
				title: 'Sentence Builder',
				desc: 'Build correct sentences from jumbled words.',
				src: grammar2Icon,
				path: '/games/',
				enable: false,
			},
			{
				title: 'Verb Forms',
				desc: 'Practice verb forms in different tenses.',
				src: grammar3Icon,
				path: '/games/',
				enable: false,
			},
		],
	},
	{
		category: 'Listening',
		games: [
			{
				title: 'Audio Quiz',
				desc: 'Listen and answer questions.',
				src: listen1Icon,
				path: '/games/listen',
				enable: true,
			},
			{
				title: 'Sound Match',
				desc: 'Match sounds to words.',
				src: listen2Icon,
				path: '/games/listen',
				enable: false,
			},
			{
				title: 'Dictation',
				desc: 'Type what you hear.',
				src: listen3Icon,
				path: '/games/listen',
				enable: false,
			},
		],
	},
	{
		category: 'Reading',
		games: [
			{
				title: 'Reading Race',
				desc: 'Read and answer questions quickly.',
				src: reading1Icon,
				path: '/games/read',
				enable: true,
			},
			{
				title: 'Comprehension Test',
				desc: 'Test your reading comprehension.',
				src: reading2Icon,
				path: '/games/',
				enable: false,
			},
			{
				title: 'Story Builder',
				desc: 'Build stories from prompts.',
				src: reading3Icon,
				path: '/games/',
				enable: false,
			},
		],
	},
	{
		category: 'Speaking',
		games: [
			{
				title: 'Pronunciation Practice',
				desc: 'Practice your pronunciation.',
				src: speaking1Icon,
				path: '/games/speak',
				enable: true,
			},
			{
				title: 'Role Play',
				desc: 'Speak in different scenarios.',
				src: speaking2Icon,
				path: '/games/speak/',
				enable: false,
			},
			{
				title: 'Fluency Builder',
				desc: 'Improve your speaking fluency.',
				src: speaking3Icon,
				path: '/games/speak/',
				enable: false,
			},
		],
	},
];

export const GamesHome = () => {
	const [selectedGame, setSelectedGame] = useState(null);

	if (selectedGame) {
		return (
			<main className='w-full min-h-screen bg-[#fff] flex flex-col items-center  font-lexend'>
				<GameDescription
					title={selectedGame.title}
					description={selectedGame.desc}
					link={selectedGame.path}
					img={selectedGame.src}
					setSelectedGame={setSelectedGame}
					enable={selectedGame.enable}
				/>
			</main>
		);
	}

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
						{gamesData.map(({ category, games }) => (
							<section key={category} className='pt-4 pb-2'>
								<h2 className='text-lg md:text-xl font-bold mb-2'>{category}</h2>
								<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
									{games.map((game, idx) => (
										<article
											key={game.title + idx}
											className='rounded-lg flex flex-col items-start justify-start gap-4 bg-white shadow-md p-3 cursor-pointer hover:shadow-lg transition-shadow duration-150'
											onClick={() => setSelectedGame(game)}
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
						))}
					</div>
				</header>
			</section>
		</main>
	);
};

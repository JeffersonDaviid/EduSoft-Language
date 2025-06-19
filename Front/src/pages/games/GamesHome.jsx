import React from 'react';
import { Link } from 'react-router-dom';

// --- Componente Reutilizable para la Tarjeta de Juego ---
const GameCard = ({ game }) => (
    <Link to={game.link || '#'}>
        <article className='rounded-lg flex flex-col items-start justify-start gap-4 bg-white shadow-md p-3 h-full transition-transform duration-300 hover:scale-105 cursor-pointer'>
            <img
                className='w-full rounded-xl max-w-full h-48 md:h-[200px] object-cover'
                alt={game.title}
                src={game.src}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/e2e8f0/e2e8f0?text=Image" }}
            />
            <div className='flex flex-col items-start'>
                <h3 className='leading-6 font-medium text-base md:text-lg'>
                    {game.title}
                </h3>
                <p className='text-sm text-[#57788f]'>{game.desc}</p>
            </div>
        </article>
    </Link>
);


// --- Componente Principal GamesHome ---
export const GamesHome = () => {
    // --- Datos para Juegos de Vocabulario ---
    const vocabularyGamesData = [
        {
            title: 'Word Matching',
            desc: 'Match words with their definitions.',
            src: '/public/vocabulary.jpg',
            link: '/games/vocabulary',
        },
        {
            title: 'Sentence Completion',
            desc: 'Complete sentences using the correct words.',
            src: '/img/vocabulary-completion.png',
            link: '/games/vocabulary',
        },
        {
            title: 'Crossword Puzzle',
            desc: 'Solve the crossword using vocabulary clues.',
            src: '/img/vocabulary-crossword.png',
            link: '/games/vocabulary',
        },
    ];

    // --- Datos para Juegos de Gramática ---
    const grammarGamesData = [
        {
            title: 'Tense Trainer',
            desc: 'Practice using different verb tenses.',
            src: '/img/grammar-tenses.png',
            link: '/games/grammar/tenses',
        },
        {
            title: 'Article Practice',
            desc: 'Choose the correct article (a, an, the).',
            src: '/img/grammar-articles.png',
            link: '/games/grammar/articles',
        },
        {
            title: 'Preposition Challenge',
            desc: 'Select the right preposition to complete the sentence.',
            src: '/img/grammar-prepositions.png',
            link: '/games/grammar/prepositions',
        },
    ];

    // --- Datos para la sección "Listening" ---
    const listeningGamesData = [
        {
            title: 'Listen and Choose',
            desc: 'Listen to the audio and choose the correct option.',
            src: '/public/listen.jpg',
            link: '/games/listen',
        },
        {
            title: 'Dictation Practice',
            desc: 'Listen and type the sentences you hear.',
            src: '/img/listening-dictation.png',
            link: '/games/listen',
        },
        {
            title: 'Audio Comprehension',
            desc: 'Answer questions based on the audio clip.',
            src: '/img/listening-comprehension.png',
            link: '/games/listen',
        },
    ];

    // --- Datos para la sección "Reading" ---
    const readingGamesData = [
        {
            title: 'Reading Comprehension',
            desc: 'Read the passage and answer the questions.',
            src: '/img/reading-comprehension.png',
            link: '/games/reading/comprehension',
        },
        {
            title: 'Sentence Scramble',
            desc: 'Rearrange the words to form correct sentences.',
            src: '/img/reading-scramble.png',
            link: '/games/reading/scramble',
        },
        {
            title: 'Find the Mistake',
            desc: 'Read the text and identify the grammatical errors.',
            src: '/img/reading-mistake.png',
            link: '/games/reading/mistake',
        },
    ];

    // --- Datos para la sección "Speaking" ---
    const speakingGamesData = [
        {
            title: 'Pronunciation Practice',
            desc: 'Record yourself and compare your pronunciation.',
            src: '/public/speak.png',
            link: '/games/speak',
        },
        {
            title: 'Role Play',
            desc: 'Practice speaking English in different scenarios.',
            src: '/public/coming_soon.png',
            link: '/games/speaking/roleplay',
        },
        {
            title: 'Describe the Image',
            desc: 'Speak and describe the image shown.',
            src: '/public/coming_soon.png',
            link: '/games/speaking/describe',
        },
    ];


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
                                make learning a fun and educational experience. Through interactive
                                activities, you can test and improve your English skills.
                            </p>
                        </div>

                        {/* Vocabulary Games */}
                        <section className='pt-4 pb-2'>
                            <h2 className='text-lg md:text-xl font-bold mb-2'>Vocabulary Games</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                {vocabularyGamesData.map((game) => <GameCard game={game} key={`vocab-${game.title}`} />)}
                            </div>
                        </section>

                        {/* Grammar Games */}
                        <section className='pt-4 pb-2'>
                            <h2 className='text-lg md:text-xl font-bold mb-2'>Grammar Games</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                {grammarGamesData.map((game) => <GameCard game={game} key={`grammar-${game.title}`} />)}
                            </div>
                        </section>

                        {/* Listening */}
                        <section className='pt-4 pb-2'>
                            <h2 className='text-lg md:text-xl font-bold mb-2'>Listening</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                {listeningGamesData.map((game) => <GameCard game={game} key={`listen-${game.title}`} />)}
                            </div>
                        </section>

                        {/* Reading */}
                        <section className='pt-4 pb-2'>
                            <h2 className='text-lg md:text-xl font-bold mb-2'>Reading</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                {readingGamesData.map((game) => <GameCard game={game} key={`read-${game.title}`} />)}
                            </div>
                        </section>

                        {/* Speaking */}
                        <section className='pt-4 pb-2'>
                            <h2 className='text-lg md:text-xl font-bold mb-2'>Speaking</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                {speakingGamesData.map((game) => <GameCard game={game} key={`speak-${game.title}`} />)}
                            </div>
                        </section>

                    </div>
                </header>
            </section>
        </main>
    );
};
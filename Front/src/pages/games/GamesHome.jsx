import React from 'react';
import { Link } from 'react-router-dom';

// --- Componente Reutilizable para la Tarjeta de Juego ---
// Esto mantiene tu código limpio. Si quieres cambiar el estilo de las tarjetas,
// solo lo cambias en este único lugar.
const GameCard = ({ game }) => (
    <Link to={game.link || '#'}> {/* Usamos '#' como fallback si no hay link */}
        <article className='rounded-lg flex flex-col items-start justify-start gap-4 bg-white shadow-md p-3 h-full transition-transform duration-300 hover:scale-105 cursor-pointer'>
            <img
                className='w-full rounded-xl max-w-full h-48 md:h-[200px] object-cover'
                alt={game.title}
                src={game.src}
                // Si la imagen no carga, muestra un placeholder
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/e2e8f0/e2e8f0?text=Image" }}
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
    // --- Datos Originales de tus Juegos ---
    // He restaurado los datos exactos que tenías.
    // También añadí la propiedad 'link' para que la navegación funcione.
    const originalGamesData = [
        {
            title: 'Tense Master',
            desc: 'Practice using different tenses correctly.',
            src: '/depth-7-frame-01@2x.png',
            link: '/games/grammar', // Ruta para el juego
        },
        {
            title: 'Article Adventure',
            desc: 'Learn the correct use of articles (a, an, the).',
            src: '/depth-7-frame-02@2x.png',
            link: '/games/vocabulary', // Ruta para el juego
        },
        {
            title: 'Preposition Puzzle',
            desc: 'Complete sentences with the correct prepositions.',
            src: '/depth-7-frame-03@2x.png',
            link: '/games/write', // Ruta para el juego
        },
    ];

    // Datos específicos para la sección "Listening" para que uno lleve a /listen
    const listeningGamesData = [
        {
            title: 'Tense Master',
            desc: 'Practice using different tenses correctly.',
            src: '/depth-7-frame-01@2x.png',
            link: '/games/listen', // ¡Esta es la ruta que querías para este juego!
        },
        {
            title: 'Article Adventure',
            desc: 'Learn the correct use of articles (a, an, the).',
            src: '/depth-7-frame-02@2x.png',
            link: '/games/listen',
        },
        {
            title: 'Preposition Puzzle',
            desc: 'Complete sentences with the correct prepositions.',
            src: '/depth-7-frame-03@2x.png',
            link: '/games/listen',
        },
    ];


    // --- Renderizado del Componente ---
    // Esta es la estructura visual que tenías, ahora funcional.
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
                                {originalGamesData.map((game) => <GameCard game={game} key={`vocab-${game.title}`} />)}
                            </div>
                        </section>

                        {/* Grammar Games */}
                        <section className='pt-4 pb-2'>
                            <h2 className='text-lg md:text-xl font-bold mb-2'>Grammar Games</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                {originalGamesData.map((game) => <GameCard game={game} key={`grammar-${game.title}`} />)}
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
                                {originalGamesData.map((game) => <GameCard game={game} key={`read-${game.title}`} />)}
                            </div>
                        </section>

                        {/* Speaking */}
                        <section className='pt-4 pb-2'>
                            <h2 className='text-lg md:text-xl font-bold mb-2'>Speaking</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                {originalGamesData.map((game) => <GameCard game={game} key={`speak-${game.title}`} />)}
                            </div>
                        </section>
                    </div>
                </header>
            </section>
        </main>
    );
};

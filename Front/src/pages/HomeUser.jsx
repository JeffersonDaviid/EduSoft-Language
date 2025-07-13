import { Link } from 'react-router';
import React, { useEffect, useState } from 'react';
import hero from '../../public/hero.jpg';

export const HomeUser = () => {
	const [loginMessage, setLoginMessage] = useState('');

	useEffect(() => {
		const msg = localStorage.getItem('loginSuccess');
		if (msg) {
			setLoginMessage(msg);
			localStorage.removeItem('loginSuccess');
		}
	}, []);

 return (
        <main className='w-full relative bg-[#fff] min-h-screen flex flex-col items-center justify-between text-center text-sm text-[#0f141a] font-lexend'>
            {/* El mensaje de login se mantiene igual */}
            {loginMessage && (
                <div className='flex items-center gap-3 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-6 mt-8 max-w-xl mx-auto z-20'>
                    <img src='/check-circle.png' alt='Success' className='w-6 h-6' />
                    <span>{loginMessage}</span>
                </div>
            )}

            <section className='w-full max-w-[1280px] flex-1 flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px]'>
                <section className='w-full flex flex-row items-center justify-center py-5 px-4 md:px-16 lg:px-40 box-border'>
                    
                    {/* 1. Contenedor principal con posición relativa */}
                    <div className='w-full md:w-[1000px] relative rounded-xl shadow-lg flex items-center justify-center p-2 md:p-4 box-border min-h-[220px] sm:min-h-[320px] md:min-h-[480px]'>
                        
                        {/* 2. La imagen ahora es una etiqueta <img> con su propio alt text */}
                        <img 
                            src={hero} 
                            alt="An illustration of three young friends sitting in modern chairs, using their smartphones to engage with an English learning app."
                            className="absolute inset-0 w-full h-full object-cover rounded-xl"
                        />

                        {/* 3. Capa de superposición para oscurecer la imagen */}
                        <div className="absolute inset-0 bg-black/40 rounded-xl" aria-hidden="true"></div>

                        {/* 4. Contenedor para el contenido, con z-index para ponerlo al frente */}
                        <div className='relative z-10 w-full flex flex-col items-center justify-center gap-2 px-2 sm:px-4'>
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
                            <div className='flex justify-center w-full mt-6 sm:mt-10'>
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
                </section>
            </section>
        </main>
	);
};

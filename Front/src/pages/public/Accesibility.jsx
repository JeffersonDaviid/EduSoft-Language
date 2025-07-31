import React from 'react';

const Accessibility = () => {
    return (
        <main className='w-full relative bg-[#fff] flex flex-col items-start justify-start text-center text-sm text-[#000] font-lexend mb-5'>
            <section className='w-full bg-[#fafafa] min-h-[600px] flex flex-col items-center justify-start'>
                <header className='w-full flex flex-col items-center justify-center py-5 px-4 md:px-10 lg:px-40 box-border text-left'>
                    <div className='w-full max-w-[960px] flex flex-col items-start justify-start'>
                        <div className='w-full flex flex-col gap-3 p-2 md:p-4'>
                            <h1 className='leading-10 font-bold text-2xl md:text-3xl lg:text-4xl mb-2' tabIndex={0}>
                                Accessibility
                            </h1>
                            <p className='leading-[21px] text-sm text-[#517085]' tabIndex={0}>
                                Welcome to the Accessibility section. Here you will find information and tools to help you navigate and use EduSoft more easily, regardless of your abilities.
                            </p>
                        </div>
                    </div>
                </header>
                <section className='w-full flex flex-col items-center justify-start'>
                    <h2 className='w-full max-w-[960px] leading-7 font-bold pt-5 px-4 pb-3 text-left text-lg md:text-xl' tabIndex={0}>
                        Commands
                    </h2>
                    <div className='w-full max-w-[960px] flex flex-col items-start justify-start p-4 text-sm'>
                        <article className='w-full rounded-lg bg-[#fafafa] border-[#d4dee3] border-solid border-[1px] box-border flex flex-col md:flex-row items-start justify-between py-3 px-4 md:py-4 md:px-6 shadow-sm gap-6'>
                            <div className='flex-1 flex flex-col gap-2 text-left'>
                                <div tabIndex={0}><strong>Tab</strong>: Navigate through interactive elements.</div>
                                <div tabIndex={0}><strong>Enter</strong>: Activate selected buttons or links.</div>
                                <div tabIndex={0}><strong>Esc</strong>: Close modals or dialogs.</div>
                                <div tabIndex={0}><strong>Ctrl + H</strong>: Go to Home.</div>
                                <div tabIndex={0}><strong>Ctrl + A</strong>: Go to About Us.</div>
                                <div tabIndex={0}><strong>Ctrl + B</strong>: Go to Accessibility.</div>
                            </div>
                            <div className='flex-1 flex flex-col gap-2 text-left'>
                                <div tabIndex={0}><strong>Ctrl + L</strong>: Go to Login (only if not logged in).</div>
                                <div tabIndex={0}><strong>Ctrl + S</strong>: Go to Sign Up (only if not logged in).</div>
                                <div tabIndex={0}><strong>Ctrl + G</strong>: Go to Games (only if logged in).</div>
                                <div tabIndex={0}><strong>Ctrl + P</strong>: Go to Progress (only if logged in).</div>
                                <div tabIndex={0}><strong>Ctrl + R</strong>: Go to Profile (only if logged in).</div>
                                <div tabIndex={0}><strong>Screen Reader Support</strong>: All main elements are labeled for screen readers.</div>
                            </div>
                        </article>
                    </div>
                </section>
            </section>
        </main>
    );
};

export default Accessibility;
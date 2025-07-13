import { useEffect, useState } from 'react';
import { API_URL } from '../API';

export const Progress = () => {

    const [progress, setProgress] = useState({ history: [] });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user || !user.id) return;
        fetch(`${API_URL}/user/progress?userId=${user.id}`)
            .then(res => res.json())
            .then(data => setProgress({ history: data.history || [] }));
    }, []);

    const GAME_TYPES = [
        'Vocabulary Challenge',
        'Reading Challenge',
        'Grammar Challenge',
        'Listening Challenge',
        'Speaking Challenge',
    ];

    const playedTypes = new Set(
        progress.history
            .filter(row => GAME_TYPES.includes(row.game))
            .map(row => row.game)
    );
    const percent = Math.min(playedTypes.size * 20, 100);

    const getAverage = (type) => {
        const games = progress.history.filter(row => row.game === type);
        if (!games.length) return null;
        const avg = Math.round(games.reduce((acc, row) => acc + (row.score || 0), 0) / games.length);
        return avg;
    };

    const minAvgType = (() => {
        let minType = null;
        let minAvg = Infinity;
        GAME_TYPES.forEach(type => {
            const avg = getAverage(type);
            if (avg !== null && avg < minAvg) {
                minAvg = avg;
                minType = type;
            }
        });
        return minType;
    })();

    const getPracticeStreak = () => {
        const dates = Array.from(
            new Set(
                progress.history
                    .map(row => new Date(row.playedAt).toDateString())
            )
        ).sort((a, b) => new Date(b) - new Date(a));
        if (dates.length === 0) return 0;
        let streak = 1;
        let prev = new Date(dates[0]);
        for (let i = 1; i < dates.length; i++) {
            const curr = new Date(dates[i]);
            const diff = (prev - curr) / (1000 * 60 * 60 * 24);
            if (diff === 1) {
                streak++;
                prev = curr;
            } else if (diff > 1) {
                break;
            }
        }
        return streak;
    };
    const streak = getPracticeStreak();

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
                                <p className='text-sm md:text-base text-[#4C7490]'>
                                    Track your learning journey in EduSoft Language! Here you can view your
                                    overall progress, see your average scores for each game type,
                                    check your daily practice streak, and get friendly tips to helper
                                    you improve even more.
                                </p>
                            </div>
                            <section className='w-full flex flex-col items-start justify-start p-4 gap-3'>
                                <div className='w-full flex flex-row items-center justify-between gap-2'>
                                    <h2 className='leading-6 font-medium'>Complete all game types to reach 100% progress</h2>
                                    <span className='h-6 text-sm'>{percent}%</span>
                                </div>
                                <progress value={percent} max='100' className='w-full rounded h-2'></progress>
                            </section>
                            <section className='w-full flex flex-col items-start justify-start pt-5 px-4 pb-3'>
                                <h2 className='leading-7 font-bold text-lg md:text-[22px]'>
                                    Average Scores by Game Type
                                </h2>
                            </section>
                            <section className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 px-4'>
                                {GAME_TYPES.map((type) => {
                                    const avg = getAverage(type);
                                    return (
                                        <article
                                            key={type}
                                            className='bg-[#f7fafc] flex flex-col items-center gap-2 min-h-[72px] rounded-lg shadow p-3'
                                        >
                                            <h3 className='font-medium leading-6 text-base text-[#0d171c]'>{type.replace(' Challenge', '')}</h3>
                                            <p className='text-2xl font-bold text-blue-700'>
                                                {avg !== null ? `${avg}/100` : <span className='text-gray-400'>–</span>}
                                            </p>
                                            <p className='text-xs text-[#4C7490]'>Average Score</p>
                                        </article>
                                    );
                                })}
                            </section>
                            <section className='w-full flex flex-col items-start justify-start pt-5 px-4 pb-3'>
                                <h2 className='leading-7 font-bold text-lg md:text-[22px]'>
                                    Practice Summary
                                </h2>
                            </section>
                            <section className='w-full flex flex-row items-center justify-start gap-4 px-4 py-2'>
                                <div className='bg-white rounded-lg shadow p-4 flex flex-col items-center min-w-[120px]'>
                                    <span className='text-3xl font-bold text-emerald-600'>{streak}</span>
                                    <span className='text-xs text-[#4C7490]'>Day Streak</span>
                                </div>
                                {minAvgType && (
                                    <div className="bg-blue-100 text-blue-800 rounded p-3 text-sm font-medium flex-1">
                                        <span className="font-bold">{minAvgType.replace(' Challenge', '')}</span> could use a little extra practice! Give it another try to boost your overall progress. 🚀
                                    </div>
                                )}
                            </section>
                        </div>
                    </header>
                </section>
            </section>
        </main>
    );
};

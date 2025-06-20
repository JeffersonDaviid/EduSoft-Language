import { useState, useEffect } from 'react';
import { HeaderGame } from '../../../components/HeaderGame';
import { GameEnd } from '../GameEnd';
import { useAuth } from '../../../context/AuthContext';

const passages = [
	{
		text: `Although Ecuador is famous for its {0}, many university students are
           still unaware of the {1} available close to home. The Universidad de
           Cuenca {2} launched a summer field course in the Andean páramo that allows
           participants to collect data on water quality while practising their English.
           The project was designed by a group of biology {3} who realised that hands-on
           activities motivate learners far more than traditional lectures. During the
           course, each student is paired with a mentor and must prepare a short report,
           which is later shared at an open science fair. This experience not only
           strengthens academic skills but also promotes {4} tourism in the nearby
           communities.`,
		answers: ['biodiversity', 'opportunities', 'recently', 'lecturers', 'responsible'],
		distractors: ['landscape', 'students', 'careless'],
	},
	{
		text: `The city of {0} has become a living laboratory for architecture students
           who analyse how colonial buildings withstand frequent {1}. While attending a
           workshop organised by the Universidad Central, participants must propose
           strategies that respect the original {2} yet improve safety. Their findings
           are later presented to local {3}, which often adopt the ideas in community
           projects. This collaboration encourages sustainable urban planning and gives
           students valuable {4} experience before graduation.`,
		answers: ['Cuenca', 'earthquakes', 'design', 'authorities', 'professional'],
		distractors: ['volcanoes', 'tourists', 'temporary'],
	},
	{
		text: `During lockdown, many Ecuadorian universities accelerated the use of open
           educational resources, a trend that {0} benefited rural learners. One example
           is a virtual laboratory that simulates chemical {1} with minimal bandwidth.
           Students located in remote areas of {2} province can now repeat experiments
           until they fully {3} the concepts, which would have been impossible in a
           traditional setting. Lecturers report that overall student {4} has improved
           since the platform was introduced.`,
		answers: ['particularly', 'reactions', 'Esmeraldas', 'grasp', 'performance'],
		distractors: ['machinery', 'attendance', 'Galápagos'],
	},
];

const TOTAL_ANSWERS = passages.reduce((acc, p) => acc + p.answers.length, 0); 

export const Reading = () => {
	const total = passages.length;
	const [idx, setIdx] = useState(0); // paso actual
	const [blanks, setBlanks] = useState([]);
	const [verified, setVerified] = useState(false);
	const [finished, setFinished] = useState(false);
	const [alert, setAlert] = useState(''); // aviso “faltan espacios”
	const [allBlanks, setAllBlanks] = useState([]);
	const [currentScore, setCurrentScore] = useState(0);
	const [finalScore, setFinalScore] = useState(-1); 
	const { user } = useAuth();

	const current = passages[idx];
	const choices = [...current.answers, ...current.distractors].sort(
		() => Math.random() - 0.5
	);

	// al cambiar de lectura, reinicia
	useEffect(() => {
		setBlanks(Array(current.answers.length).fill(''));
		setVerified(false);
		setAlert('');
	}, [idx]);

	// helpers
	const allFilled = blanks.every((w) => w !== '');
	const allCorrect = blanks.every((w, i) => w === current.answers[i]);

	const selectWord = (i, val) =>
		setBlanks((b) => {
			const copy = [...b];
			copy[i] = val;
			return copy;
		});

const handleVerify = () => {
        if (!allFilled) {
            setAlert('Please complete all spaces before checking.');
            return;
        }
        setVerified(true);

        let totalCorrect = 0;
        allBlanks.forEach((blankArr, idxP) => {
            const passage = passages[idxP];
            blankArr.forEach((ans, i) => {
                if (ans === passage.answers[i]) totalCorrect += 1;
            });
        });
        blanks.forEach((ans, i) => {
            if (ans === current.answers[i]) totalCorrect += 1;
        });
        setCurrentScore(Math.round((totalCorrect / TOTAL_ANSWERS) * 100));
    };

    const handleNext = () => {
        setAllBlanks((prev) => [...prev, blanks]);
        setIdx((i) => i + 1);
        setVerified(false);
    };

	const handleFinish = async () => {
		const userAnswers = [...allBlanks, blanks];
		let totalCorrect = 0;

		for (let i = 0; i < passages.length; i++) {
			for (let j = 0; j < passages[i].answers.length; j++) {
				if (userAnswers[i] && userAnswers[i][j] === passages[i].answers[j]) {
					totalCorrect += 1;
				}
			}
		}

		const score = Math.round((totalCorrect / TOTAL_ANSWERS) * 100);

		if (user && user.id) {
			await fetch('http://localhost:8080/user/game-history', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId: user.id,
					game: 'Reading Challenge',
					score: score
				}),
			});
		}
		setFinished(true);
	};

	// UI final
	if (finished) return <GameEnd />;

	// UI principal
	return (
		<section className='max-w-2xl mx-auto p-6 space-y-6'>
			<HeaderGame
				typeGame={'Reading'}
				title={'Choose the correct word'}
				currentStep={idx + 1}
				totalSteps={total}
				score={currentScore}
			/>

			<div className='leading-relaxed'>
				{current.text.split(/(\{\d\})/g).map((seg, k) => {
					const m = seg.match(/\{(\d)\}/);
					if (!m) return seg;

					const i = Number(m[1]);
					const filled = blanks[i];
					const correct = current.answers[i];
					const wrong = verified && filled !== correct;

					return (
						<span key={k} className='inline-flex items-center'>
							<select
								value={filled}
								disabled={verified}
								onChange={(e) => selectWord(i, e.target.value)}
								className={`mx-1 border rounded px-2 ${
									verified && filled === correct
										? 'bg-green-100'
										: wrong
										? 'bg-red-100'
										: ''
								}`}
							>
								<option value=''>___</option>
								{choices.map((c) => (
									<option key={c} value={c}>
										{c}
									</option>
								))}
							</select>

							{/* 💡 Corrección visible al verificar si estaba mal */}
							{wrong && (
								<span className='text-emerald-700 text-sm italic ml-1'>{correct}</span>
							)}
						</span>
					);
				})}
			</div>

			{/* Aviso faltan espacios */}
			{alert && !verified && <p className='text-red-600 text-sm'>{alert}</p>}

			{/* Botonera */}
			<div className='flex gap-4'>
				{!verified && (
					<button
						onClick={handleVerify}
						className='bg-blue-600 text-white px-4 py-2 rounded'
					>
						Verify
					</button>
				)}

				{verified && idx < total - 1 && (
					<button
						onClick={handleNext}
						className='bg-emerald-600 text-white px-4 py-2 rounded'
					>
						Next ➔
					</button>
				)}

				{verified && idx === total - 1 && (
					<button
						onClick={handleFinish}
						className='bg-neutral-700 text-white px-4 py-2 rounded'
					>
						Finish
					</button>
				)}
			</div>

			{/* Feedback tras verificar */}
			{verified && (
				<p
					className={`font-semibold ${allCorrect ? 'text-emerald-600' : 'text-red-600'}`}
				>
					{allCorrect
						? 'Great! All answers are correct.'
						: 'Some answers are incorrect — check the red highlights.'}
				</p>
			)}
		</section>
	);
};

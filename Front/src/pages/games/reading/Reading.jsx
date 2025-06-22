import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { HeaderGame } from '../../../components/HeaderGame';
import { useAuth } from '../../../context/AuthContext';
import { API_URL } from '../../../API';

const passagesStack = [
	{
		text: `During the innovation week, speakers emphasised that {0} and {1} will soon redefine online education. {2}, some professors still {3} to traditional lectures, believing that chalkboard explanations keep students {4}.`,
		answers: [
			'augmented reality',
			'artificial intelligence',
			'Nevertheless',
			'stick',
			'focused',
		],
		distractors: ['email', 'annoyed', 'adapt'],
	},
	{
		text: `Our research team used {0} services to store readings and sent an {1} to every participant each Friday. The massive set of {2} helped us {3} the causes of soil erosion and {4} solutions for farmers.`,
		answers: ['cloud computing', 'email', 'big data', 'analyse', 'offer'],
		distractors: ['resist', 'newsletter', 'tired'],
	},
	{
		text: `Lucía is an exceptionally {0} engineer; she can {1} ideas others overlook. When obstacles appear, she gathers her colleagues to {2} possibilities. If someone feels {3}, she reminds them to {4} trying.`,
		answers: ['imaginative', 'generate', 'brainstorm', 'frustrated', 'keep'],
		distractors: ['stick', 'newsletter', 'exhausted'],
	},
	{
		text: `I used to send my grandparents a {0} every month, but now we {1} up with each other via a Sunday {2}. The change has {3} me excited, and my grandparents say they feel less {4}.`,
		answers: ['postcard', 'keep', 'video conference', 'made', 'isolated'],
		distractors: ['cloud', 'exhausted', 'embrace'],
	},
	{
		text: `Although management urged everyone to {0} change, a few workers continued to {1} and even {2} a formal complaint. The facilitator managed to {3} calm and designed activities that {4} progress.`,
		answers: ['embrace', 'resist', 'make', 'keep', 'drive'],
		distractors: ['newsletter', 'annoyed', 'identify'],
	},
	{
		text: `The buzzing fluorescent light in the office {0} me crazy. The janitor promised to {1} ahead of the issue by replacing the fixture, but the finance department hasn't {2} the expense yet. {3}, the staff grow increasingly {4}.`,
		answers: ['drives', 'stay', 'approved', 'Consequently', 'annoyed'],
		distractors: ['innovative', 'keep', 'postcard'],
	},
	{
		text: `A local startup combined {0} with a secure {1} platform to track coffee beans from farm to cup. Farmers receive an {2} each time their lot is sold, allowing them to {3} up with demand and {4} decisions about harvest timing.`,
		answers: ['Internet of Things', 'blockchain', 'instant message', 'keep', 'make'],
		distractors: ['newsletter', 'resist', 'annoyed'],
	},
	{
		text: `During the creativity hackathon, the most {0} participants formed a team that quickly {1} root causes of food waste on campus. They used whiteboards to {2} ideas and proposed a {3} plan that left the judges feeling {4}.`,
		answers: ['resourceful', 'identified', 'brainstorm', 'comprehensive', 'excited'],
		distractors: ['email', 'resist', 'blockchain'],
	},
	{
		text: `While people in Kyoto bow when greeting, residents of Quito usually {0} hands. These contrasting customs {1} visitors, yet locals {2} calm and politely explain the difference. Tourists who {3} to adjust often feel {4} later for being flexible.`,
		answers: ['shake', 'surprise', 'stay', 'adapt', 'satisfied'],
		distractors: ['newsletter', 'blockchain', 'annoyed'],
	},
	{
		text: `The late bus service really {0} on commuters' nerves. To {1} change, city officials installed an {2} when delays exceed ten minutes. Although some passengers still {3} adjusting, most now {4} calm during rush hour.`,
		answers: ['gets', 'drive', 'instant message', 'resist', 'keep'],
		distractors: ['newsletter', 'blockchain', 'excited'],
	},
	{
		text: `Researchers who once worked with paper logs have {0} to a fully digital workflow. They now {1} their files on a {2} server, {3} up with international teams through weekly {4}.`,
		answers: ['adapted', 'store', 'cloud computing', 'keep', 'video conferences'],
		distractors: ['postcard', 'resist', 'annoyed'],
	},
	{
		text: `Back in school, we {0} to photocopy journal articles, but nowadays we simply {1} them from the library database. This transition has {2} time and {3} me {4} rather than exhausted.`,
		answers: ['used', 'download', 'saved', 'left', 'relieved'],
		distractors: ['keep', 'frustrated', 'newsletter'],
	},
	{
		text: `Professor Lin records a weekly {0} so students can {1} up when they miss class. She {2} calm explanations with interactive quizzes, and anyone who feels {3} is encouraged to {4} a complaint anonymously.`,
		answers: ['podcast', 'catch', 'combines', 'frustrated', 'make'],
		distractors: ['email', 'resist', 'excited'],
	},
	{
		text: `Chef Marcos, known for his {0} palate, asked his trainees to {1} the causes of a burnt sauce. They {2} ideas on the board, {3} the options, and finally {4} the issue by lowering the heat.`,
		answers: ['disciplined', 'identify', 'brainstormed', 'analysed', 'tackled'],
		distractors: ['newsletter', 'adapt', 'annoyed'],
	},
	{
		text: `At the workshop, attendees felt {0} when their prototypes failed, but the facilitator reminded them to {1} trying. Soon they {2} ideas together, {3} alternatives, and {4} notable progress.`,
		answers: ['annoyed', 'keep', 'brainstormed', 'evaluated', 'made'],
		distractors: ['blockchain', 'resist', 'stay'],
	},
	{
		text: `Pop-up ads on the learning portal {0} me crazy, so I filed a ticket. {1}, the support team sent a polite {2}, promising to {3} improvements and keep users {4}.`,
		answers: ['drive', 'Later', 'email', 'make', 'informed'],
		distractors: ['newsletter', 'resist', 'annoyed'],
	},
	{
		text: `City planners launched a {0} initiative combining {1} sensors with open data to monitor traffic. Residents receive a {2} every morning, allowing them to {3} informed and {4} their routes.`,
		answers: ['visionary', 'IoT', 'newsletter', 'stay', 'adapt'],
		distractors: ['get', 'annoyed', 'big data'],
	},
	{
		text: `The game design team, full of {0} minds, used {1} to predict player behaviour and {2} change in the company’s creative culture. When deadlines approached, they would {3} calm and {4} alternatives efficiently.`,
		answers: ['curious', 'machine learning', 'drive', 'keep', 'evaluate'],
		distractors: ['postcard', 'annoyed', 'resist'],
	},
	{
		text: `After the earthquake drill, residents felt {0} but also {1}, knowing they could {2} to unexpected events. The organisers sent an {3} afterward to {4} up the outcomes and collect feedback.`,
		answers: ['exhausted', 'relieved', 'adapt', 'email', 'sum'],
		distractors: ['stick', 'frustrated', 'newsletter'],
	},
	{
		text: `When customers {0} on hold too long, they usually {1} a complaint. The support team tries to {2} calm and {3} the issue quickly, but the outdated ticket system still {4} everyone frustrated.`,
		answers: ['stay', 'make', 'keep', 'solve', 'leaves'],
		distractors: ['newsletter', 'adapt', 'annoyed'],
	},
	{
		text: `The small bakery’s owner is extremely {0}; she used {1} media to announce flash sales and {2} up with orders. Even when power cuts {3} on her nerves, she {4} calm and keeps baking.`,
		answers: ['resourceful', 'social media', 'keep', 'get', 'stays'],
		distractors: ['augmented reality', 'annoyed', 'resist'],
	},
	{
		text: `As the university expands, administrators must {0} space limitations. They {1} causes of overcrowding, {2} alternatives like evening classes, and {3} a weekly {4} to update students.`,
		answers: ['tackle', 'analyse', 'evaluate', 'send', 'newsletter'],
		distractors: ['blockchain', 'embrace', 'excited'],
	},
	{
		text: `In the remote team, daily {0} help members {1} up with tasks. Whenever connection glitches {2} someone crazy, they simply {3} calm, restart the call, and continue until objectives are {4}.`,
		answers: ['video conferences', 'keep', 'drive', 'stay', 'achieved'],
		distractors: ['newsletter', 'resist', 'annoyed'],
	},
	{
		text: `Data scientists were {0} when the {1} analysis revealed unexpected patterns. They {2} a report, {3} their findings formally, and {4} improvements to the algorithm.`,
		answers: ['excited', 'big data', 'wrote', 'presented', 'proposed'],
		distractors: ['newsletter', 'resist', 'annoyed'],
	},
	{
		text: `The art exhibition combined {0} headsets with interactive sculptures, leaving visitors {1}. Curators sent an {2} afterward to {3} feedback and {4} the event for next year.`,
		answers: ['augmented reality', 'inspired', 'email', 'collect', 'improve'],
		distractors: ['newsletter', 'blockchain', 'frustrated'],
	},
];

const passages = passagesStack.sort(() => Math.random() - 0.5).slice(0, 5); // Selecciona 5 lecturas aleatorias
console.log(passages); // TODO: eliminar en producción

export const Reading = () => {
	const total = passages.length;
	const [idx, setIdx] = useState(0);
	const [blanks, setBlanks] = useState([]);
	const [verified, setVerified] = useState(false);
	const [alert, setAlert] = useState('');
	const [results, setResults] = useState([]);
	const [score, setScore] = useState(0);
	const [finished, setFinished] = useState(false);
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

		/* se crea un resultado POR LECTURA */
		const readingResult = {
			idx: idx,
			text: current.text,
			userAnswers: [...blanks],
			correctAnswers: [...current.answers],
			isCorrect: allCorrect, // sigue siendo incorrecta si hay alguna errónea
		};
		setResults((prev) => [...prev, readingResult]);

		// Calcular el score usando una variable temporal para incluir crédito parcial
		const tempResults = [...results, readingResult];
		const totalTempScore = tempResults.reduce((acc, r) => {
			const maxPoints = 100 / passages.length;
			// Calcula cuántas respuestas fueron correctas
			const numCorrect = r.userAnswers.reduce(
				(count, ans, i) => (ans === r.correctAnswers[i] ? count + 1 : count),
				0
			);
			// Si se escogió al menos una correcta, se asigna crédito parcial,
			// pero la lectura se marca como incorrecta si alguna falla.
			const points =
				numCorrect > 0 ? (numCorrect / r.correctAnswers.length) * maxPoints : 0;
			return acc + points;
		}, 0);

		setScore(Math.round(totalTempScore));
	};

	const handleNext = () => {
		setIdx((i) => i + 1);
	};

	/* ---------- Finish ---------- */
	const handleFinish = async () => {
		// score ya está calculado en state «score»
		setFinished(true);
		if (user?.id) {
			await fetch(`${API_URL}/user/game-history`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId: user.id,
					game: 'Reading Challenge',
					score,
				}),
			});
		}
	};

	// UI final
	if (finished)
		return (
			<GameResumeDetails
				results={results} // [{index, text, userAnswers, correctAnswers, isCorrect}, …]
				score={score} // 0-100
				onPlayAgain={() => window.location.reload()}
			/>
		);

	// UI principal
	return (
		<section className='max-w-2xl mx-auto p-6 space-y-6'>
			<HeaderGame
				typeGame='Reading'
				title='Choose the correct word'
				currentStep={idx + 1}
				totalSteps={total}
				score={score}
			/>

			<div className='leading-relaxed text-md'>
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
			<div className='flex flex-col justify-center sm:flex-row gap-3 sm:gap-4'>
				{!verified && (
					<button
						onClick={handleVerify}
						className='bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-40 cursor-pointer'
					>
						Verify
					</button>
				)}

				{verified && idx < total - 1 && (
					<button
						onClick={handleNext}
						className='bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition-colors duration-150 cursor-pointer'
					>
						Next ➔
					</button>
				)}

				{verified && idx === total - 1 && (
					<button
						onClick={handleFinish}
						className='bg-neutral-700 text-white px-4 py-2 rounded cursor-pointer'
					>
						Finish
					</button>
				)}
			</div>
		</section>
	);
};

const ReadingCard = ({ idx, text, userAnswers, correctAnswers, isCorrect }) => {
	const badge = isCorrect ? '✓' : '✗';
	const badgeColor = isCorrect ? 'text-green-600' : 'text-red-600';

	return (
		<div
			className={`p-4 flex flex-col gap-2 rounded-lg sm:bg-gray-50 sm:border sm:border-gray-200`}
		>
			{/* Encabezado */}
			<div className='flex items-center gap-3 mb-2'>
				<span
					className={`flex-shrink-0 bg-gray-200 ${badgeColor} rounded-full h-8 w-8 flex items-center justify-center font-bold`}
				>
					{badge}
				</span>
				<h3 className='font-bold text-gray-800'>Reading {idx + 1}</h3>
			</div>

			{/* Texto con placeholders */}
			<p className='text-black mb-2'>{text}</p>

			{/* Respuestas */}
			<p className='text-sm text-[#57788F]'>
				<span className='font-medium'>Your answers:&nbsp;</span>
				{userAnswers.join(', ')}
			</p>

			{!isCorrect && (
				<p className='text-sm text-[#57788F]'>
					<span className='font-medium'>Correct answers:&nbsp;</span>
					{correctAnswers.join(', ')}
				</p>
			)}
		</div>
	);
};

const GameResumeDetails = ({ results, score, onPlayAgain }) => {
	const correctReadings = results.filter((r) => r.isCorrect);
	const incorrectReadings = results.filter((r) => !r.isCorrect);

	return (
		<div className='w-full max-w-4xl mx-auto my-16 bg-white lg:shadow-2xl rounded-2xl p-4 sm:p-8 md:p-12 text-left'>
			<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center'>
				Review Your Performance
			</h1>

			{/* Puntaje global */}
			<p className='text-3xl sm:text-4xl font-extrabold text-green-600 text-center mb-8'>
				{score} / 100
			</p>

			<p className='text-gray-600 text-center mb-8 sm:mb-10'>
				Let's take a look at how you did. This review will help you understand where you
				excelled and where you might need a bit more practice.
			</p>

			{/* Lecturas correctas */}
			{correctReadings.length > 0 && (
				<section className='space-y-4 mb-8'>
					<h2 className='text-xl sm:text-2xl font-bold text-gray-800'>
						Correct Readings
					</h2>
					{correctReadings.map((r) => (
						<ReadingCard key={r.idx} {...r} />
					))}
				</section>
			)}

			{/* Lecturas con errores */}
			{incorrectReadings.length > 0 && (
				<section className='space-y-4'>
					<h2 className='text-xl sm:text-2xl font-bold text-gray-800'>
						Readings to Review
					</h2>
					{incorrectReadings.map((r) => (
						<ReadingCard key={r.idx} {...r} />
					))}
				</section>
			)}

			{/* Botones */}
			<div className='mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center'>
				<button
					onClick={onPlayAgain}
					className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg text-lg cursor-pointer'
				>
					Play Again
				</button>
				<Link
					to='/games'
					className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg text-center cursor-pointer'
				>
					Browse Other Games
				</Link>
			</div>
		</div>
	);
};

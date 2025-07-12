export const SENTENCES_STACK_FOR_GRAMMAR = [
	'Big data is being analyzed in real time to predict customer behavior.',
	'Augmented-reality headsets have been adopted by several hospitals to train surgeons.',
	'Will quantum computing be embraced by mainstream businesses within the decade?',
	'These constant pop-up ads aren’t annoying, are they?',
	'Moreover, video conferencing, which facilitates remote collaboration, is reshaping office culture.',
	'In my opinion, the Internet of Things will revolutionize urban planning.',
	'Participating in the debate, she argued that social-media platforms must be regulated.',
	'Streaming services are being preferred over traditional broadcasting worldwide.',
	'Nevertheless, cyber-security remains a pressing concern; furthermore, data breaches damage trust.',
	'Isn’t it true that e-mail has become less popular among teenagers?',
	'Cloud computing has been heralded as the backbone of digital transformation.',
	'By 2030, remote workspaces will be managed entirely through virtual-reality dashboards.',
	'Applicants fluent in Python, possessing AWS certification, and boasting machine-learning experience stand out immediately.',
	'My colleague, who is undeniably visionary, suggested prototyping early to identify flaws.',
	'To solve connectivity issues, one practical solution is installing a mesh network.',
	'Employees motivated by curiosity often generate breakthrough ideas.',
	'Lack of feedback, analyzed carefully, shows why the project stalled.',
	'Her résumé, which was meticulously formatted, highlighted transferable skills.',
	'Designers known for their adaptability frequently pivot during development.',
	'Frankly, the fact remains: our cost-benefit ratio favors automation.',
	'When bandwidth drops, rebooting the router is a quick fix.',
	'The prototype, tested repeatedly, proved viable.',
	'Innovative thinkers, who thrive under pressure, often cultivate a culture of experimentation.',
	'Root-cause analysis revealed that inadequate training led to errors.',
	'While residents of Quito greet with a handshake, people from Tokyo bow politely.',
	'Back then, our family gathered around a radio during the evenings, but now everyone streams podcasts individually.',
	'Some professionals stay calm under stress, whereas others keep complaining about minor issues.',
	'Generally speaking, community-oriented cultures place a higher value on collective success.',
	'Except for a few regional differences, holiday traditions remain remarkably similar across the country.',
	'He always brought home-made desserts to meetings while employed here.',
	'Tourists keep asking for eco-friendly options, so hotels stay competitive by adopting green policies.',
	'On the other hand, city dwellers dine out frequently, whereas rural families cook at home.',
	'Accepting change is difficult; nevertheless, many employees embrace automation.',
	'Years ago, our group wrote postcards and waited weeks for a reply.',
	'Although smartphones simplify communication, they also keep users constantly distracted.',
	'By and large, people prefer flexible schedules over rigid nine-to-five routines.',
	'Slow-loading webpages drive me crazy during rush hours.',
	'I get irritated when automated voices mispronounce my name.',
	'Long queues at the bank make me feel exhausted.',
	'Could you tell me why the printer keeps jamming every morning?',
	'The colleague who never replies to emails is my biggest source of frustration.',
	'What bothers her most is that meetings start late.',
	'If customers feel annoyed, sending a quick apology email may avoid further problems.',
	'He politely suggested that we double-check the cables before calling support.',
	'Did that issue get resolved following the update, or does it still cause errors?',
	'Broken coffee machines, outdated keyboards, and flickering monitors were mentioned in the complaint list.',
	'Our supervisor, who is typically even-tempered, sounded disappointed during today’s briefing.',
	'Could you tell me where to submit a formal request for quieter workspaces?',
	'The constant notifications are getting on everyone’s nerves, so silent mode was activated.',
	'Satisfied and relieved, our team celebrated after the bug had been fixed.',
];

export const SENTENCES_STACK_FOR_READING = [
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

export const SENTENCES_STACK_FOR_SPEAKING = [
	{
		sentence:
			'Contemporary economic theories suggest that sustainable development requires comprehensive policy reform.',
	},
	{
		sentence:
			'Artificial intelligence has revolutionized data analysis across multiple scientific disciplines.',
	},
	{
		sentence:
			'Environmental conservation efforts must address both climate change and biodiversity preservation simultaneously.',
	},
	{
		sentence:
			'Advanced research methodologies enable scientists to investigate complex psychological phenomena.',
	},
	{
		sentence:
			'International cooperation is essential for addressing global challenges in the twenty-first century.',
	},
	{
		sentence:
			'Technological innovations have transformed communication patterns in modern professional environments.',
	},
	{
		sentence:
			'Academic institutions increasingly emphasize critical thinking and analytical reasoning skills.',
	},
	{
		sentence:
			'Sophisticated marketing strategies leverage consumer psychology to influence purchasing decisions effectively.',
	},
	{
		sentence:
			'Medical breakthroughs demonstrate the importance of interdisciplinary collaboration in scientific research.',
	},
	{
		sentence:
			'Cultural diversity enriches educational experiences and promotes intellectual growth among students.',
	},
	{
		sentence:
			'Financial markets exhibit complex behavioral patterns that economists continue to analyze extensively.',
	},
	{
		sentence:
			'Urban planning requires balancing economic development with environmental sustainability concerns.',
	},
	{
		sentence:
			'Digital transformation has fundamentally altered traditional business models across various industries.',
	},
	{
		sentence:
			'Educational technology facilitates personalized learning experiences for students with diverse academic needs.',
	},
	{
		sentence:
			'Professional development opportunities enhance employee satisfaction and organizational productivity significantly.',
	},
];

export const SENTENCES_STACK_FOR_LISTENING = [
	{
		display: 'The committee needs to ____ the new proposal before approval.',
		speak: 'The committee needs to evaluate the new proposal before approval.',
		answer: 'evaluate',
	},
	{
		display: 'Climate change has ____ effects on global ecosystems.',
		speak: 'Climate change has profound effects on global ecosystems.',
		answer: 'profound',
	},
	{
		display: "The study's findings ____ the initial hypothesis.",
		speak: "The study's findings contradict the initial hypothesis.",
		answer: 'contradict',
	},
	{
		display: 'It is ____ that all students attend the mandatory orientation.',
		speak: 'It is imperative that all students attend the mandatory orientation.',
		answer: 'imperative',
	},
	{
		display: 'The author uses vivid imagery to ____ his main points.',
		speak: 'The author uses vivid imagery to illustrate his main points.',
		answer: 'illustrate',
	},
	{
		display: 'Technological ____ have transformed the way we communicate.',
		speak: 'Technological innovations have transformed the way we communicate.',
		answer: 'innovations',
	},
	{
		display: 'The professor provided a ____ explanation of the complex theory.',
		speak: 'The professor provided a comprehensive explanation of the complex theory.',
		answer: 'comprehensive',
	},
	{
		display: 'A key ____ of the research is to identify potential solutions.',
		speak: 'A key objective of the research is to identify potential solutions.',
		answer: 'objective',
	},
	{
		display: 'The government plans to ____ new policies to reduce pollution.',
		speak: 'The government plans to implement new policies to reduce pollution.',
		answer: 'implement',
	},
	{
		display: 'Despite the challenges, they managed to achieve their ____.',
		speak: 'Despite the challenges, they managed to achieve their goals.',
		answer: 'goals',
	},
	{
		display: 'The evidence presented was not ____ to support the claim.',
		speak: 'The evidence presented was not sufficient to support the claim.',
		answer: 'sufficient',
	},
	{
		display: 'Further research is required to ____ these results.',
		speak: 'Further research is required to validate these results.',
		answer: 'validate',
	},
	{
		display: 'The transition to renewable energy is ____.',
		speak: 'The transition to renewable energy is inevitable.',
		answer: 'inevitable',
	},
];

// Lista de palabras y definiciones para el juego de vocabulario.
export const SENTENCES_STACK_FOR_VOCABULARY = [
	{
		definition:
			'A set of rules a computer follows to solve problems or make calculations.',
		answer: 'algorithm', // Technology buzzwords
	},
	{
		definition:
			'A formal word used to add another piece of information to an idea you are developing.',
		answer: 'furthermore', // Expressions for connecting ideas formally
	},
	{
		definition:
			'A digital audio file, like a radio show, that you can download and listen to whenever you want.',
		answer: 'podcast', // Words for forms of communication
	},
	{
		definition:
			'Describes a person who is good at finding clever ways to overcome difficulties.',
		answer: 'resourceful', // Qualities of creative people
	},
	{
		definition: 'A verb that means to confront or start dealing with a difficult issue.',
		answer: 'tackle', // Collocations for problem solving
	},
	{
		definition:
			'Using a network of remote servers hosted on the Internet to store, manage, and process data, rather than a local server or a personal computer.',
		answer: 'cloud computing', // Technology buzzwords
	},
	{
		definition: 'A formal word that means "as a result" or "therefore".',
		answer: 'consequently', // Expressions for connecting ideas formally
	},
	{
		definition:
			'Describes a person or a new idea that introduces new methods and is original.',
		answer: 'innovative', // Qualities of creative people
	},
	{
		definition: 'To put a decision, plan, or agreement into effect.',
		answer: 'implement', // Collocations for problem solving
	},
	{
		definition:
			'A brief written message, typically used in a business or professional setting.',
		answer: 'memo', // Words for forms of communication
	},
];

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../API';
import FontControls from '../../components/FontControl';
import { ConfirmationModal } from '../../components/ConfirmationModal';

export const Profile = () => {
	const [profileUpdateMessage, setProfileUpdateMessage] = useState('');
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const user = JSON.parse(localStorage.getItem('user') || '{}');
	const username = user?.username || 'Your Profile';
	const createdAt = user?.createdAt;

	// Estado para progreso
	const [progress, setProgress] = useState({
		gamesPlayed: 0,
		averageScore: 0,
		history: [],
	});
	const [loading, setLoading] = useState(true);
	const [ranking, setRanking] = useState(null);

	const totalScore = progress.history.reduce((acc, row) => acc + (row.score || 0), 0);
	const level = Math.floor(totalScore / 500);
	const scoreInLevel = totalScore % 500;

	useEffect(() => {
		const msg = localStorage.getItem('profileUpdateSuccess');
		if (msg) {
			setProfileUpdateMessage(msg);
			localStorage.removeItem('profileUpdateSuccess');
		}
	}, []);

	useEffect(() => {
		const fetchProgress = async () => {
			if (!user || !user.id) return;
			try {
				const res = await fetch(`${API_URL}/user/progress?userId=${user.id}`);
				const data = await res.json();
				setProgress({
					gamesPlayed: data.gamesPlayed || 0,
					averageScore: data.averageScore || 0,
					history: data.history || [],
				});
			} catch {
				setProgress({ gamesPlayed: 0, averageScore: 0, history: [] });
			}
			setLoading(false);
		};
		fetchProgress();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.id]);

	useEffect(() => {
		const fetchRanking = async () => {
			if (!user || !user.id) return;
			try {
				const res = await fetch(`${API_URL}/user/ranking?userId=${user.id}`);
				const data = await res.json();
				setRanking(data.ranking);
			} catch {
				setRanking(null);
			}
		};
		fetchRanking();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.id]);

	let joinedText = '';
	if (createdAt) {
		const createdDate = new Date(createdAt);
		const now = new Date();
		const diffMs = now - createdDate;
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
		if (diffDays < 1) {
			joinedText = 'Joined today';
		} else if (diffDays === 1) {
			joinedText = 'Joined 1 day ago';
		} else {
			joinedText = `Joined ${diffDays} days ago`;
		}
	}

	const handleLogout = () => {
		setShowLogoutModal(true);
	};

	const confirmLogout = () => {
		setShowLogoutModal(false);
		logout();
		navigate('/');
	};

	return (
		<main className='w-full relative bg-[#fff] flex flex-col items-start justify-start text-left text-sm text-[#000] font-lexend'>
			{profileUpdateMessage && (
				<div className='w-full flex items-center justify-center py-4 bg-[#fafafa]'>
					{' '}
					{/* Added py-4 for top/bottom spacing */}
					<div
						className='flex items-center gap-3 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 max-w-xl'
						tabIndex={0}
						role='status'
					>
						<img src='/check-circle.png' alt='Success' className='w-6 h-6' />
						<span>{profileUpdateMessage}</span>
					</div>
				</div>
			)}
			<section className='self-stretch bg-[#fafafa] overflow-hidden flex flex-col items-start justify-start min-h-[800px]'>
				<section className='self-stretch flex flex-col items-start justify-start'>
					<header className='self-stretch flex flex-row items-start justify-center py-5 px-4 md:px-16 lg:px-40 box-border text-[#0f141a]'>
						<div className='flex-1 overflow-hidden flex flex-col items-start justify-start max-w-[960px]'>
							<div className='self-stretch flex flex-row items-start justify-between flex-wrap content-start p-4 text-[32px]'>
								<div className='flex flex-col items-start justify-start gap-3 min-w-[220px]'>
									<h1
										className='leading-10 font-bold text-2xl md:text-3xl lg:text-4xl'
										tabIndex={0}
									>
										Profile
									</h1>
									<p className='text-sm text-[#57788f]' tabIndex={0}>
										Here you can view and customize your learning experience. In your
										profile, you'll find information about your progress, achievements,
										and statistics, as well as the option to adjust your preferences to
										improve your EduSoft Language experience.
									</p>
								</div>
							</div>
							<section className='self-stretch flex flex-row items-start justify-start p-4 text-center'>
								<div className='flex-1 flex flex-col md:flex-row items-center justify-between gap-4'>
									<div className='flex flex-row items-start justify-start gap-4 text-left text-base text-[#57788f]'>
										<img
											className='w-24 h-24 md:w-32 md:h-32 rounded-full object-cover min-h-[96px] md:min-h-[128px] border border-[#d4dee3]'
											alt='Profile picture'
											tabIndex={0}
											src={
												user.profilePicture &&
												user.profilePicture.startsWith('profile-pictures/')
													? `${API_URL}/${user.profilePicture}`
													: '/default-profile-picture.jpg'
											}
										/>
										<div className='h-24 md:h-32 flex flex-col items-start justify-center'>
											<h2
												className='text-lg md:text-[22px] text-[#0f141a] font-bold leading-7'
												tabIndex={0}
											>
												{username}
											</h2>
											<div className='leading-6' tabIndex={0}>
												Level {level} ({scoreInLevel}/500 score)
											</div>
											<div className='leading-6' tabIndex={0}>
												{joinedText}
											</div>
										</div>
									</div>
									<nav
										aria-label='Profile actions'
										className='flex flex-col gap-3 mt-4 md:mt-0'
									>
										<div className='flex flex-row gap-2'>
											<Link
												to='/profile/update'
												className='rounded-[20px] bg-[#e8edf2] h-10 flex items-center justify-center px-4 min-w-[84px] max-w-[180px] font-medium focus:outline-2 focus:outline-blue-400 hover:bg-[#d1dee8] transition-colors duration-150'
												tabIndex={0}
												title='Edit your profile'
											>
												Edit Profile
											</Link>
											<button
												onClick={handleLogout}
												className='rounded-[20px] bg-[#e8edf2] h-10 flex items-center justify-center px-4 min-w-[84px] max-w-[180px] font-medium focus:outline-2 focus:outline-blue-400 hover:bg-[#d1dee8] transition-colors duration-150'
												tabIndex={0}
												title='Log out of your account'
											>
												Log Out
											</button>
										</div>
										<FontControls />
									</nav>
								</div>
							</section>
							{/* Progress Summary */}
							<section className='self-stretch pt-5 px-4 pb-3'>
								<h2 className='leading-7 font-bold text-lg md:text-[22px]' tabIndex={0}>
									Progress Summary
								</h2>
								<div className='flex flex-row flex-wrap gap-3 text-2xl'>
									<article
										className='flex-1 rounded-lg border-[#d4dee3] border-solid border-[1px] box-border flex flex-col items-start justify-start p-3 gap-2 min-w-[111px] bg-white shadow-sm'
										aria-label='Games Played'
									>
										<b className='text-2xl leading-[30px]' tabIndex={0}>
											{loading ? '...' : progress.gamesPlayed}
										</b>
										<span className='text-sm text-[#57788f]' tabIndex={0}>
											Games Played
										</span>
									</article>
									<article
										className='flex-1 rounded-lg border-[#d4dee3] border-solid border-[1px] box-border flex flex-col items-start justify-start p-3 gap-2 min-w-[111px] bg-white shadow-sm'
										aria-label='Average Score'
									>
										<b className='text-2xl leading-[30px]' tabIndex={0}>
											{loading ? '...' : progress.averageScore}
										</b>
										<span className='text-sm text-[#57788f]' tabIndex={0}>
											Average Score
										</span>
									</article>
									<article
										className='flex-1 rounded-lg border-[#d4dee3] border-solid border-[1px] box-border flex flex-col items-start justify-start p-3 gap-2 min-w-[111px] bg-white shadow-sm'
										aria-label='Ranking'
									>
										<b className='text-2xl leading-[30px]' tabIndex={0}>
											{loading || ranking == null ? '...' : `#${ranking}`}
										</b>
										<span className='text-sm text-[#57788f]' tabIndex={0}>
											Ranking
										</span>
									</article>
								</div>
							</section>
							{/* Game History */}
							<section className='self-stretch pt-5 px-4 pb-3'>
								<h2 className='leading-7 font-bold text-lg md:text-[22px]' tabIndex={0}>
									Game History
								</h2>
								<div className='self-stretch rounded-xl bg-[#fafafa] border-[#d4dee3] border-solid border-[1px] overflow-x-auto'>
									<table className='w-full text-left min-w-[400px]'>
										<caption className='sr-only'>Game history table</caption>
										<thead>
											<tr>
												<th scope='col' className='py-3 px-4 font-medium' tabIndex={0}>
													Game
												</th>
												<th scope='col' className='py-3 px-4 font-medium' tabIndex={0}>
													Date
												</th>
												<th scope='col' className='py-3 px-4 font-medium' tabIndex={0}>
													Score
												</th>
											</tr>
										</thead>
										<tbody>
											{loading ? (
												<tr>
													<td colSpan={3} className='py-2 px-4 text-center' tabIndex={0}>
														Loading...
													</td>
												</tr>
											) : progress.history.length === 0 ? (
												<tr>
													<td colSpan={3} className='py-2 px-4 text-center' tabIndex={0}>
														No games played yet.
													</td>
												</tr>
											) : (
												progress.history.map((row, idx) => (
													<tr
														key={row.id || idx}
														tabIndex={0}
														className='focus:outline-2 focus:outline-blue-400'
													>
														<td className='py-2 px-4 text-[#0d171c]'>{row.game}</td>
														<td className='py-2 px-4 text-[#4f7a96]'>
															{new Date(row.playedAt).toLocaleDateString()}
														</td>
														<td className='py-2 px-4 text-[#57788f]'>{row.score}/100</td>
													</tr>
												))
											)}
										</tbody>
									</table>
								</div>
							</section>
						</div>
					</header>
				</section>
			</section>
			
			<ConfirmationModal
				isOpen={showLogoutModal}
				title="Sign Out"
				message="Are you sure you want to sign out of your account?"
				onConfirm={confirmLogout}
				onCancel={() => setShowLogoutModal(false)}
				confirmText="Sign Out"
				cancelText="Cancel"
			/>
		</main>
	);
};

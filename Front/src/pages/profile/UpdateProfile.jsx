export const UpdateProfile = () => {
	return (
		<main className='w-full relative bg-[#fff] flex flex-col items-start justify-start text-left text-sm text-[#000] font-lexend'>
			<section className='self-stretch bg-[#f7fafc] min-h-[800px] overflow-hidden flex flex-col items-start justify-start'>
				<section className='self-stretch flex flex-col items-start justify-start'>
					<header className='self-stretch flex flex-row items-start justify-center py-5 px-4 md:px-16 lg:px-40 box-border text-base text-[#0d171c]'>
						<div className='flex-1 overflow-hidden flex flex-col items-start justify-start max-w-[960px]'>
							<div className='self-stretch flex flex-row items-start justify-between flex-wrap content-start p-4 text-[32px]'>
								<div className='flex flex-col items-start justify-start gap-3 min-w-[220px]'>
									<h1
										className='leading-10 font-bold text-2xl md:text-3xl lg:text-4xl'
										tabIndex={0}
									>
										Edit Profile
									</h1>
									<p className='text-sm text-[#4f7a96]'>
										Update your account information.
									</p>
								</div>
							</div>
							<section className='self-stretch flex flex-col items-center justify-start'>
								<div className='flex flex-col items-center justify-start gap-4'>
									<img
										className='w-24 h-24 md:w-32 md:h-32 rounded-full object-cover min-h-[96px] md:min-h-[128px] border border-[#d4dee3]'
										alt='Profile picture of Luisa Fernandez'
										src='/depth-7-frame-0@2x.png'
									/>
									<div className='h-24 md:h-32 flex flex-col items-center justify-center'>
										<h2
											className='text-lg md:text-[22px] text-[#0f141a] font-bold leading-7'
											tabIndex={0}
										>
											Luisa Fernandez
										</h2>
										<div className='leading-6'>Level 7</div>
										<div className='leading-6'>Joined 2 years ago</div>
									</div>
								</div>
								<button
									className='rounded-[20px] bg-[#e8edf2] h-10 flex items-center justify-center px-4 min-w-[84px] max-w-[240px] font-medium mt-4 focus:outline-2 focus:outline-blue-400 hover:bg-[#d1dee8] transition-colors duration-150'
									tabIndex={0}
									aria-label='Change profile picture'
								>
									Change Profile Picture
								</button>
							</section>
							<form
								className='w-full max-w-[480px] mx-auto flex flex-col gap-4 mt-6'
								aria-label='Update profile form'
							>
								<div className='flex flex-col items-start'>
									<label htmlFor='email' className='leading-6 font-medium'>
										Email
									</label>
									<input
										id='email'
										name='email'
										type='email'
										autoComplete='email'
										placeholder='Enter your email'
										className='self-stretch rounded-xl bg-[#e8edf2] h-10 p-2 focus:outline-2 focus:outline-blue-400'
										aria-required='true'
									/>
								</div>
								<div className='flex flex-col items-start'>
									<label htmlFor='username' className='leading-6 font-medium'>
										Username
									</label>
									<input
										id='username'
										name='username'
										type='text'
										autoComplete='username'
										placeholder='Enter your username'
										className='self-stretch rounded-xl bg-[#e8edf2] h-10 p-2 focus:outline-2 focus:outline-blue-400'
										aria-required='true'
									/>
								</div>
								<div className='flex flex-col items-start'>
									<label htmlFor='newPassword' className='leading-6 font-medium'>
										New Password
									</label>
									<input
										id='newPassword'
										name='newPassword'
										type='password'
										autoComplete='new-password'
										placeholder='Enter new password'
										className='self-stretch rounded-xl bg-[#e8edf2] h-10 p-2 focus:outline-2 focus:outline-blue-400'
									/>
								</div>
								<div className='flex flex-col items-start'>
									<label htmlFor='confirmNewPassword' className='leading-6 font-medium'>
										Confirm New Password
									</label>
									<input
										id='confirmNewPassword'
										name='confirmNewPassword'
										type='password'
										autoComplete='new-password'
										placeholder='Confirm new password'
										className='self-stretch rounded-xl bg-[#e8edf2] h-10 p-2 focus:outline-2 focus:outline-blue-400'
									/>
								</div>
								<button
									type='submit'
									className='rounded-3xl bg-[#42a6eb] h-12 flex items-center justify-center px-5 min-w-[84px] max-w-[480px] font-bold text-white mt-4 focus:outline-2 focus:outline-blue-400 hover:bg-[#1d7fc2] transition-colors duration-150'
									aria-label='Save changes to your profile'
								>
									Save Changes
								</button>
							</form>
						</div>
					</header>
				</section>
			</section>
		</main>
	);
};

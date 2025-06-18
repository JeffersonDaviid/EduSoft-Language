import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

export const UpdateProfile = () => {
    const navigate = useNavigate();
    const { logout, updateUser } = useAuth();

    // Asegura que user nunca sea null
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [form, setForm] = useState({
        email: user.email || '',
        username: user.username || '',
        newPassword: '',
        confirmNewPassword: '',
    });

    // Usa la ruta relativa para el backend, pero la URL completa para previsualización
    const [profilePicture, setProfilePicture] = useState(user.profilePicture || '');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(() => {
        if (user.profilePicture && user.profilePicture.startsWith('profile-pictures/')) {
            return `http://localhost:8080/${user.profilePicture}`;
        }
        return '/default-profile-picture.jpg';
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Previsualización de la imagen seleccionada
    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else if (profilePicture && profilePicture.startsWith('profile-pictures/')) {
            setPreviewUrl(`http://localhost:8080/${profilePicture}`);
        } else {
            setPreviewUrl('/default-profile-picture.jpg');
        }
    }, [selectedFile, profilePicture]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (form.newPassword && form.newPassword !== form.confirmNewPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            let updatedProfilePicture = profilePicture;

            if (selectedFile) {
                const formData = new FormData();
                formData.append('profilePicture', selectedFile);

                const uploadRes = await fetch('http://localhost:8080/user/upload-profile-picture', {
                    method: 'POST',
                    body: formData,
                });
                const uploadData = await uploadRes.json();
                if (uploadRes.ok) {
                    updatedProfilePicture = uploadData.filename;
                    setProfilePicture(updatedProfilePicture); // Actualiza el estado para futuras previsualizaciones
                } else {
                    setError(uploadData.error || 'Error uploading profile picture');
                    return;
                }
            }

            const res = await fetch('http://localhost:8080/user/update-profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form.email,
                    username: form.username,
                    newPassword: form.newPassword,
                    profilePicture: updatedProfilePicture,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess('Profile updated successfully!');
                localStorage.setItem('user', JSON.stringify(data.user));
                updateUser(data.user);
                setTimeout(() => navigate('/profile'), 1200);
            } else {
                setError(data.error || 'Error updating profile');
            }
        } catch (err) {
            setError('Server error');
        }
    };

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
                                        alt='Profile picture'
                                        src={previewUrl}
                                    />
                                    <label
                                        className='rounded-[20px] bg-[#e8edf2] h-10 flex items-center justify-center px-4 min-w-[84px] max-w-[240px] font-medium mt-4 focus:outline-2 focus:outline-blue-400 hover:bg-[#d1dee8] transition-colors duration-150 cursor-pointer'
                                        tabIndex={0}
                                        aria-label='Change profile picture'
                                    >
                                        <input
                                            type='file'
                                            accept='image/*'
                                            className='hidden'
                                            onChange={handleFileChange}
                                        />
                                        Change Profile Picture
                                    </label>
                                </div>
                            </section>
                            <form
                                className='w-full max-w-[480px] mx-auto flex flex-col gap-4 mt-6'
                                aria-label='Update profile form'
                                onSubmit={handleSubmit}
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
                                        value={form.email}
                                        onChange={handleChange}
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
                                        value={form.username}
                                        onChange={handleChange}
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
                                        value={form.newPassword}
                                        onChange={handleChange}
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
                                        value={form.confirmNewPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                {error && <div className='text-red-500'>{error}</div>}
                                {success && <div className='text-green-600'>{success}</div>}
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
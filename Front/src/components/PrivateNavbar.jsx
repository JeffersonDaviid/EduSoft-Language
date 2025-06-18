import { Link } from 'react-router';
import logoApp from '../../public/logo.png';
import { useAuth } from '../context/AuthContext';

const PrivateNavbar = () => {
    const { user } = useAuth();
    const profilePicture = user?.profilePicture || 'default-profile-picture.jpg';

    return (
        <nav className='self-stretch border-[#e6e8eb] border-solid border-b-[1px] flex flex-row items-center justify-between py-3 px-10 gap-0'>
            <a
                href='/'
                className='flex flex-row items-center justify-start cursor-pointer w-[127px] h-10 gap-4'
            >
                <img className='w-[104px] h-[49.1px] object-cover' alt='Logo' src={logoApp} />
                <span className='w-px h-[23px]' aria-hidden='true' />
            </a>
            <ul className='flex-1 flex flex-row items-center justify-end gap-8 list-none m-0 p-0'>
                <li className='h-10 flex items-center'>
                    <Link to='/home' className='text-[#61a1c9] relative leading-[21px] font-medium'>
                        Home
                    </Link>
                </li>
                <li className='h-10 flex items-center'>
                    <Link to='/games' className='relative leading-[21px] font-medium'>
                        Games
                    </Link>
                </li>
                <li className='h-10 flex items-center'>
                    <Link to='/progress' className='relative leading-[21px] font-medium'>
                        Progress
                    </Link>
                </li>
                <li className='h-10 flex items-center'>
                    <Link to='/profile' className='relative leading-[21px] font-medium'>
                        Profile
                    </Link>
                </li>
                <li className='h-10 flex items-center'>
                    <Link to='/about' className='relative leading-[21px] font-medium'>
                        About us/Help
                    </Link>
                </li>
                <li className='h-10 flex items-center'>
                    <img
                        className='w-10 rounded-[20px] h-10 overflow-hidden shrink-0 object-cover'
                        alt='Avatar profile'
                        src={
                            profilePicture.startsWith('profile-pictures/')
                                ? `http://localhost:8080/${profilePicture}`
                                : '/default-profile-picture.jpg'
                        }
                    />
                </li>
            </ul>
        </nav>
    );
};

export default PrivateNavbar;
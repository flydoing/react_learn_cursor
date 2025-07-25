import './NavBar.scss';
import userAvatar from '@/assets/user-avatar.png';
import logo2 from '@/assets/logo2.png';
import React from 'react';

interface NavBarProps {
  searchValue: string;
  setSearchValue: (v: string) => void;
  isSearchActive: boolean;
  setIsSearchActive: (v: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ searchValue, setSearchValue, isSearchActive, setIsSearchActive }) => {
  return (
    <div className='nav-bar'>
      <div className='nav-bar-left'>
        <img className='logo' src={logo2} alt='logo' />
        <div className={`search ${isSearchActive ? 'active' : ''}`}>
          <input
            className='search-input'
            type='text'
            placeholder='search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setIsSearchActive(false)}
          />
        </div>
      </div>
      {isSearchActive ? (
        <div className='nav-bar-right'>
          <button>取消</button>
        </div>
      ) : (
        <div className='nav-bar-right'>
          <img className='user-avatar' src={userAvatar} alt='userAvatar' />
          <img className='user-avatar' src={userAvatar} alt='userAvatar' />
          <button>打开App</button>
        </div>
      )}
    </div>
  );
};

export default NavBar; 
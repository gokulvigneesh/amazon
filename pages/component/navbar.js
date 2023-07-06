import { useState } from 'react';
import { useRouter } from 'next/router';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Menubar from './menubar';
import Body from './body'

const Navbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
 
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    console.log('Perform search with query:', searchQuery);

    router.push(`/search?query=${searchQuery}`);
  };

  
  return (
    <>
      <nav className="navbar-container">
        <div className="logo-container">
          <img src="/images/logo.jpg" alt="Logo" className="logo" />
        </div>
          <div className="navbar-items">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>

            <button
              onClick={() => router.push('/signin')}
              className="signin-button"
            >
              Sign In
            </button>
          </div>
      </nav>
    
    <div>
      <Menubar/>
    </div>

    <div>
      <Body/>
    </div>
    </>
  );
};

export default Navbar;

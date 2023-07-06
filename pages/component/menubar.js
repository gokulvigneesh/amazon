import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './menu.css';

const Menubar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="menu-container">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {!isSidebarOpen && (
          <div className="menu-icon" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} className="icon" />
          </div>
        )}
        {isSidebarOpen && (
          <div className="close-icon" onClick={closeSidebar}>
            <FontAwesomeIcon icon={faTimes} className="close" />
          </div>
        )}
        <ul className="sidebar-menu">
          <div className='sidebar-msg'>
             <h2 className='hello'>hello!</h2>
          </div>
          <div className='sidebar-item'>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
            <li>Menu Item 4</li>
          </div>
        </ul>
      </div>
      <ul className="menu1">
        <div className='menu-item1'>
      
          <li className='li1'>Menu Item 1</li>
          <li className='li2'>Menu Item 2</li>
          <li className='li3'>Menu Item 3</li>
          <li className='li4'>Menu Item 4</li>
          <li className='li5'>Menu Item 5</li>
          <li className='li6'>Menu Item 6</li>
        </div>
      </ul>
    </div>
  );
};

export default Menubar;

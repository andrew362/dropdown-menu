import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar>
        <NavItems icon="💩" />
        <NavItems icon="💩" />
        <NavItems icon="💩">
          <DropdownMenu />
        </NavItems>
      </Navbar>
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItems(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [height, setHeight] = useState(null);

  const getHeight = (el) => {
    const h = el.offsetHeight;
    setHeight(h);
  };
  
  return (
    <div className="dropdown" style={{ height: `${height}px` }}>
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        onEnter={getHeight}
        className="menu-primary"
      >
        <div className="menu">
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem menuType={() => setActiveMenu('settings')} leftIcon="⚙" rightIcon="➡">
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        onEnter={getHeight}
        className="menu-settings"
      >
        <div className="menu">
          <DropdownItem menuType={() => setActiveMenu('main')}>Back</DropdownItem>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Profile</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

function DropdownItem(props) {
  return (
    <a href="#" className="menu-item" onClick={props.menuType}>
      <span className="icon-button">{props.leftIcon}</span>
      {props.children}
      <span className="icon-right">{props.rightIcon}</span>
    </a>
  );
}

export default App;

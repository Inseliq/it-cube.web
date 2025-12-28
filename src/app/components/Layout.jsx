import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { usePageTitle } from '../utils/usePageTitle';

const Layout = () => {
  usePageTitle('/it-cube.web');

  return (
    <>
      <Header />
      <main className='page'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
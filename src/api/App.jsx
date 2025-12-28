import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import '../../assets/css/root.css'
import Layout from '../app/components/Layout';

// #Pages
import Home from '../app/pages/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />
        {/* <Route path="docs" element={<Docs />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
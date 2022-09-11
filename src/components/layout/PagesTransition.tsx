import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { backPage, homePage, mintPage } from '../../router/constants';
import Home from '../../modules/home';
import Layout from './Layout';

const PagesTransition = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path={`${homePage}*`} element={<Home />} />
        <Route path="*" element={<div>NotFound</div>} />
      </Routes>
    </AnimatePresence>
  );
};

export default PagesTransition;

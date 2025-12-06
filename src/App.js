import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TerminalIntro from './TerminalIntro';
import MainInterface from './MainInterface';

import SmoothScroll from './SmoothScroll';
import CustomCursor from './CustomCursor';
import { LanguageProvider } from './contexts/LanguageContext';

import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<TerminalIntro />} />
        <Route path="/home" element={<MainInterface />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <BrowserRouter>
          <CustomCursor />
          <AnimatedRoutes />
        </BrowserRouter>
      </SmoothScroll>
    </LanguageProvider>
  );
}

export default App;

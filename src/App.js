import React, { useCallback, useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'antd/dist/reset.css';

import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Experience3D, { webglAvailable } from './experience/Experience3D';

const VIEW_KEY = 'portfolio-view';

const initialView = () => {
  if (!webglAvailable()) return 'classic';
  let saved = null;
  try {
    saved = localStorage.getItem(VIEW_KEY);
  } catch (e) {
    saved = null;
  }
  if (saved === 'classic' || saved === '3d') return saved;
  return navigator.connection && navigator.connection.saveData ? 'classic' : '3d';
};

const remember = (view) => {
  try {
    localStorage.setItem(VIEW_KEY, view);
  } catch (e) {
    // storage can be unavailable (private mode); the preference is optional
  }
};

const AppContent = () => {
  const { theme: currentTheme, isDarkMode } = useTheme();
  const [view, setView] = useState(initialView);
  const [notice, setNotice] = useState('');
  const canUse3D = webglAvailable();

  useEffect(() => {
    if (view === 'classic') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
      });
    }
  }, [view]);

  const leave3D = useCallback((reason) => {
    setView('classic');
    if (reason) setNotice('The 3D workspace could not be started, so the classic portfolio is shown instead.');
    else remember('classic');
  }, []);

  const enter3D = () => {
    setNotice('');
    remember('3d');
    setView('3d');
  };

  return (
    <ConfigProvider 
      theme={{
        ...currentTheme,
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {view === '3d' ? (
        <Experience3D onExit={leave3D} />
      ) : (
        <div className="App">
          {notice && (
            <p className="xp-notice" role="status">
              {notice}
            </p>
          )}
          <Header />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Achievements />
          <Contact />
          <Footer />
          {canUse3D && (
            <button type="button" className="xp-enter" onClick={enter3D}>
              Enter 3D workspace
            </button>
          )}
        </div>
      )}
    </ConfigProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App; 
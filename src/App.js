import React, { useEffect } from 'react';
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

const AppContent = () => {
  const { theme: currentTheme, isDarkMode } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <ConfigProvider 
      theme={{
        ...currentTheme,
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className="App">
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
      </div>
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
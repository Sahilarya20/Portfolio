import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Switch, Tooltip } from 'antd';
import { 
  MenuOutlined, 
  UserOutlined, 
  ExperimentOutlined, 
  ProjectOutlined, 
  ToolOutlined, 
  BookOutlined, 
  TrophyOutlined, 
  ContactsOutlined,
  SunOutlined,
  MoonOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const { Header: AntHeader } = Layout;

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setVisible(false);
  };

  const menuItems = [
    { key: 'about', label: 'About', icon: <UserOutlined />, onClick: () => scrollToSection('about') },
    { key: 'experience', label: 'Experience', icon: <ExperimentOutlined />, onClick: () => scrollToSection('experience') },
    { key: 'projects', label: 'Projects', icon: <ProjectOutlined />, onClick: () => scrollToSection('projects') },
    { key: 'skills', label: 'Skills', icon: <ToolOutlined />, onClick: () => scrollToSection('skills') },
    { key: 'education', label: 'Education', icon: <BookOutlined />, onClick: () => scrollToSection('education') },
    { key: 'achievements', label: 'Achievements', icon: <TrophyOutlined />, onClick: () => scrollToSection('achievements') },
    { key: 'contact', label: 'Contact', icon: <ContactsOutlined />, onClick: () => scrollToSection('contact') },
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AntHeader
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          padding: '0 20px',
          background: scrolled 
            ? isDarkMode 
              ? 'rgba(15, 15, 26, 0.95)' 
              : 'rgba(255, 255, 255, 0.95)'
            : isDarkMode 
              ? 'rgba(15, 15, 26, 0.1)' 
              : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: scrolled 
            ? isDarkMode 
              ? '1px solid #2d3748' 
              : '1px solid #f0f0f0' 
            : 'none',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <motion.div
          className="logo"
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #1890ff, #722ed1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer',
          }}
          whileHover={{ scale: 1.05 }}
          onClick={() => scrollToSection('hero')}
        >
          Sahil Arya
        </motion.div>

        {/* Desktop Menu and Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="desktop-section">
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '16px',
              minWidth: '600px',
              justifyContent: 'flex-end',
            }}
            className="desktop-menu"
          />
          
          <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-theme-toggle">
              <SunOutlined 
                style={{ 
                  color: isDarkMode ? '#9ca3af' : '#4c6ef5', 
                  fontSize: '16px',
                  transition: 'color 0.3s ease'
                }} 
              />
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                size="default"
                style={{
                  backgroundColor: isDarkMode ? '#4c6ef5' : '#d9d9d9',
                }}
                className="theme-switch"
              />
              <MoonOutlined 
                style={{ 
                  color: isDarkMode ? '#4c6ef5' : '#9ca3af', 
                  fontSize: '16px',
                  transition: 'color 0.3s ease'
                }} 
              />
            </div>
          </Tooltip>
        </div>

        {/* Mobile Menu Button Only */}
        <div className="mobile-section">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setVisible(true)}
            className="mobile-menu-button"
            style={{
              fontSize: '18px',
              color: '#1890ff',
            }}
          />
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Navigation</span>
              <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <SunOutlined style={{ fontSize: '14px' }} />
                  <Switch
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    size="small"
                  />
                  <MoonOutlined style={{ fontSize: '14px' }} />
                </div>
              </Tooltip>
            </div>
          }
          placement="right"
          onClose={() => setVisible(false)}
          open={visible}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="vertical"
            items={menuItems}
            style={{ border: 'none' }}
          />
        </Drawer>
      </AntHeader>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .desktop-section {
            display: none !important;
          }
          .desktop-theme-toggle {
            display: none !important;
          }
          .mobile-section {
            display: block !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-section {
            display: none !important;
          }
          .mobile-menu-button {
            display: none !important;
          }
        }
        
        .ant-menu-horizontal {
          border-bottom: none !important;
        }
        
        .ant-menu-item {
          border-bottom: 2px solid transparent !important;
          transition: all 0.3s ease !important;
        }
        
        .ant-menu-item:hover {
          border-bottom-color: #1890ff !important;
          color: #1890ff !important;
        }
        
        .theme-switch .ant-switch-handle {
          transition: all 0.3s ease !important;
        }
        
        .theme-switch:hover {
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
        }
      `}</style>
    </motion.div>
  );
};

export default Header; 
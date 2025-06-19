import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined, UserOutlined, ExperimentOutlined, ProjectOutlined, ToolOutlined, BookOutlined, TrophyOutlined, ContactsOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Header: AntHeader } = Layout;

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: scrolled ? '1px solid #f0f0f0' : 'none',
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

        {/* Desktop Menu */}
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

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setVisible(true)}
          className="mobile-menu-button"
          style={{
            fontSize: '18px',
            color: '#1890ff',
            display: 'none',
          }}
        />

        {/* Mobile Drawer */}
        <Drawer
          title="Navigation"
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
          .mobile-menu-button {
            display: block !important;
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
      `}</style>
    </motion.div>
  );
};

export default Header; 
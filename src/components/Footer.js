import React from 'react';
import { Row, Col, Space, Divider } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined, HeartFilled, ArrowUpOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: <LinkedinOutlined />,
      url: 'https://linkedin.com/in/sahil-a-4a262211a',
      name: 'LinkedIn'
    },
    {
      icon: <GithubOutlined />,
      url: 'https://github.com/Sahilarya20',
      name: 'GitHub'
    },
    {
      icon: <MailOutlined />,
      url: 'mailto:sahilarya53@gmail.com',
      name: 'Email'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.1,
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px 20px', position: 'relative', zIndex: 1 }}>
        {/* Main Footer Content */}
        <Row gutter={[32, 32]} justify="space-between">
          <Col xs={24} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>
                Sahil Arya
              </h3>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.9, marginBottom: '30px' }}>
                Full Stack Developer passionate about building innovative solutions 
                that make a difference. Always excited to take on new challenges and 
                create meaningful impact through technology.
              </p>
              <Space size="large">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.15)',
                      color: '#fff',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease',
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: 'rgba(255,255,255,0.25)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </Space>
            </motion.div>
          </Col>

          <Col xs={24} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px', color: '#fff' }}>
                Quick Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    style={{
                      color: 'rgba(255,255,255,0.8)',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      display: 'inline-block',
                    }}
                    whileHover={{ 
                      color: '#fff',
                      x: 5
                    }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </Col>

          <Col xs={24} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px', color: '#fff' }}>
                Contact Info
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <strong style={{ color: '#fff' }}>Email:</strong>
                  <br />
                  <a 
                    href="mailto:sahilarya53@gmail.com" 
                    style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}
                  >
                    sahilarya53@gmail.com
                  </a>
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>Phone:</strong>
                  <br />
                  <a 
                    href="tel:+919582006504" 
                    style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}
                  >
                    +91 9582006504
                  </a>
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>Location:</strong>
                  <br />
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>Delhi, India</span>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>

        <Divider style={{ borderColor: 'rgba(255,255,255,0.2)', margin: '40px 0 20px' }} />

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Row justify="space-between" align="middle">
            <Col xs={24} md={12}>
              <p style={{ margin: 0, opacity: 0.8, textAlign: { xs: 'center', md: 'left' } }}>
                © {new Date().getFullYear()} Sahil Arya. Made with{' '}
                <HeartFilled style={{ color: '#ff4d4f', margin: '0 4px' }} />
                using React & Ant Design
              </p>
            </Col>
            <Col xs={24} md={12} style={{ textAlign: { xs: 'center', md: 'right' }, marginTop: { xs: '16px', md: '0' } }}>
              <motion.button
                onClick={scrollToTop}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{ 
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                title="Back to top"
              >
                <ArrowUpOutlined />
              </motion.button>
            </Col>
          </Row>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 
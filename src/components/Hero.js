import React from 'react';
import { Row, Col, Button, Space } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined, PhoneOutlined, DownloadOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { ReactTyped as Typed } from 'react-typed';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          animation: 'float 6s ease-in-out infinite',
        }}
      />

      <Row
        justify="center"
        align="middle"
        style={{ width: '100%', zIndex: 1, padding: '0 20px' }}
      >
        <Col xs={24} sm={20} md={16} lg={12}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ textAlign: 'center', color: 'white' }}
          >
            <motion.div variants={itemVariants}>
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Hi, I'm{' '}
                <span className="gradient-text" style={{ color: '#fff' }}>
                  Sahil Arya
                </span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  fontWeight: 400,
                  marginBottom: '2rem',
                  minHeight: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typed
                  strings={[
                    'Software Engineer',
                    'Full Stack Developer',
                    'React.js Specialist',
                    'Node.js Expert',
                    'Problem Solver'
                  ]}
                  typeSpeed={50}
                  backSpeed={50}
                  loop
                  style={{ color: '#fff' }}
                />
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p
                style={{
                  fontSize: '1.2rem',
                  marginBottom: '3rem',
                  opacity: 0.9,
                  maxWidth: '600px',
                  margin: '0 auto 3rem',
                  lineHeight: 1.6,
                }}
              >
                Building innovative B2B analytics platforms and delivering high-performance
                solutions that reduce processing time and boost efficiency.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Space size="large" wrap style={{ marginBottom: '3rem' }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<MailOutlined />}
                  href="mailto:sahilarya53@gmail.com"
                  style={{
                    borderRadius: '25px',
                    height: '50px',
                    paddingLeft: '30px',
                    paddingRight: '30px',
                    fontSize: '16px',
                    background: 'rgba(255,255,255,0.2)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  Get In Touch
                </Button>
                
                <Button
                  size="large"
                  icon={<DownloadOutlined />}
                  style={{
                    borderRadius: '25px',
                    height: '50px',
                    paddingLeft: '30px',
                    paddingRight: '30px',
                    fontSize: '16px',
                    background: 'transparent',
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                  }}
                  onClick={() => {
                    // Download resume functionality
                    const link = document.createElement('a');
                    link.href = '/Sahil_resume.pdf';
                    link.download = 'Sahil_Arya_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Download Resume
                </Button>
              </Space>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Space size="large">
                <motion.a
                  href="https://github.com/Sahilarya20"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ color: 'white', fontSize: '24px' }}
                >
                  <GithubOutlined />
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/sahil-a-4a262211a"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ color: 'white', fontSize: '24px' }}
                >
                  <LinkedinOutlined />
                </motion.a>
                
                <motion.a
                  href="tel:+919582006504"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ color: 'white', fontSize: '24px' }}
                >
                  <PhoneOutlined />
                </motion.a>
              </Space>
            </motion.div>
          </motion.div>
        </Col>
      </Row>

      {/* Scroll Down Indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={() => scrollToSection('about')}
      >
        <ArrowDownOutlined style={{ fontSize: '24px' }} />
        <br />
        <span style={{ fontSize: '12px', opacity: 0.8 }}>Scroll Down</span>
      </motion.div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero; 
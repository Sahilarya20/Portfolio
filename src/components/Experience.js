import React from 'react';
import { Row, Col, Card, Tag, Badge, Divider } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, RocketOutlined, CodeOutlined, CheckCircleOutlined, BulbOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Experience = () => {
  const { isDarkMode } = useTheme();
  
  const experiences = [
    {
      title: 'Software Engineer (Analyst)',
      company: 'Polestar Analytics',
      location: 'Noida, India',
      duration: 'November 2023 – Present',
      achievements: [
        'Building 1Platform, a B2B analytics SaaS platform for managing ETL transformations and hierarchical data using React.js, Node.js, and PostgreSQL',
        'Built core modules (Masters, Pipelines, Data Lake, Entity, Approval Workflow, Data Model, Execution Logs) reducing processing time by 25%',
        'Refactored state management from prop drilling to Redux, improving code maintainability across 12 components',
        'Designed Process Automation data module using LLM models to extract and transform data from documents',
        'Boosted API performance by 30% (600ms → 420ms) via server-side pagination and lazy loading',
        'Reduced network payload from 2MB to 20KB/page for Delta Lake queries, cutting network transfer by 90%',
        'Delivered tailored PoCs for clients including Knipper, BDS, Zydus, Insigneo and more'
      ],
      technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Redux', 'Azure', 'Python', 'LLM'],
      type: 'Full-time',
      primary: true
    },
    {
      title: 'Software Engineer (Intern)',
      company: 'DOB Publication',
      location: 'Delhi, India',
      duration: 'June 2022 – August 2022',
      achievements: [
        'Developed an E-commerce platform from scratch using Next.js (frontend), PHP (backend), and MySQL (database)',
        'Integrated Razorpay payment gateway for seamless transactions, increasing successful payment conversions',
        'Created a custom admin panel to manage inventory, orders, and user data, improving operational efficiency'
      ],
      technologies: ['Next.js', 'PHP', 'MySQL', 'phpMyAdmin', 'Razorpay'],
      type: 'Internship',
      primary: false
    }
  ];

  const timelineItems = experiences.map((exp, index) => ({
    color: exp.color,
    children: (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        viewport={{ once: true }}
        style={{ marginBottom: '40px' }}
      >
        <Card
          style={{
            borderRadius: '16px',
            border: 'none',
            background: 'var(--bg-secondary)',
            overflow: 'hidden',
            position: 'relative',
          }}
          bodyStyle={{ padding: 0 }}
        >
          {/* Header Section */}
          <div 
            style={{
              background: `linear-gradient(135deg, ${exp.color}, ${exp.color}dd)`,
              padding: '24px 32px',
              color: 'white',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <Badge 
                  count={exp.type} 
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)',
                    marginBottom: '12px'
                  }} 
                />
                <h3 style={{ 
                  fontSize: '1.6rem', 
                  fontWeight: '700', 
                  marginBottom: '8px', 
                  color: 'white',
                  lineHeight: '1.3'
                }}>
                  {exp.title}
                </h3>
                <h4 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '500', 
                  marginBottom: '16px', 
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: '1.3'
                }}>
                  {exp.company}
                </h4>
              </div>
            </div>
            
            <Row gutter={[16, 8]} style={{ marginTop: '16px' }}>
              <Col xs={24} sm={12}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.9)' }}>
                  <CalendarOutlined style={{ fontSize: '16px' }} />
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{exp.duration}</span>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.9)' }}>
                  <EnvironmentOutlined style={{ fontSize: '16px' }} />
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{exp.location}</span>
                </div>
              </Col>
            </Row>
          </div>

          {/* Content Section */}
          <div style={{ padding: '32px' }}>
            {/* Key Achievements */}
            <div style={{ marginBottom: '32px' }}>
              <h5 style={{ 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                marginBottom: '20px', 
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <RocketOutlined style={{ color: exp.color }} />
                Key Achievements
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {exp.achievements.map((achievement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px 16px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <CheckCircleOutlined 
                      style={{ 
                        color: exp.color, 
                        marginTop: '2px',
                        fontSize: '16px',
                        minWidth: '16px'
                      }} 
                    />
                    <span style={{ 
                      color: 'var(--text-secondary)', 
                      lineHeight: 1.6,
                      fontSize: '15px'
                    }}>
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <Divider style={{ margin: '24px 0', borderColor: 'var(--border-color)' }} />

            {/* Technologies */}
            <div>
              <h5 style={{ 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                marginBottom: '16px', 
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CodeOutlined style={{ color: exp.color }} />
                Technologies & Tools
              </h5>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {exp.technologies.map((tech, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Tag 
                      style={{ 
                        marginBottom: '8px', 
                        borderRadius: '20px',
                        padding: '4px 12px',
                        fontSize: '13px',
                        fontWeight: '500',
                        background: `${exp.color}15`,
                        border: `1px solid ${exp.color}30`,
                        color: 'var(--text-primary)'
                      }}
                    >
                      {tech}
                    </Tag>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    ),
  }));

  return (
    <section id="experience" style={{ padding: '100px 0', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1890ff' }}>
            Professional Experience
          </h2>
          <div style={{ width: '60px', height: '4px', background: '#1890ff', margin: '0 auto' }} />
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '20px', maxWidth: '600px', margin: '20px auto 0' }}>
            My journey in software development, building innovative solutions and contributing to meaningful projects.
          </p>
        </motion.div>

        {/* Experience Cards - Vertical Layout */}
        <div style={{ maxWidth: '1155px', margin: '0 auto' }}>
          {experiences.map((exp, index) => {
            const primaryColor = isDarkMode ? '#4c6ef5' : '#1890ff';
            const secondaryColor = isDarkMode ? '#748ffc' : '#40a9ff';
            const accentColor = exp.primary ? primaryColor : secondaryColor;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                style={{ marginBottom: '50px' }}
              >
                <Card
                  style={{
                    borderRadius: '20px',
                    border: 'none',
                    background: 'var(--bg-secondary)',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: isDarkMode 
                      ? `0 20px 40px rgba(76, 110, 245, 0.1)` 
                      : `0 20px 40px rgba(24, 144, 255, 0.1)`,
                  }}
                  bodyStyle={{ padding: 0 }}
                >
                  {/* Top Accent Bar */}
                  <div
                    style={{
                      height: '4px',
                      background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`,
                      width: '100%',
                    }}
                  />

                  <div style={{ padding: '40px' }}>
                    {/* Header Section */}
                    <Row gutter={[24, 24]} align="middle" style={{ marginBottom: '32px' }}>
                      <Col xs={24} md={16}>
                        <div>
                          <Badge
                            count={exp.type}
                            style={{
                              backgroundColor: accentColor,
                              color: 'white',
                              fontSize: '12px',
                              fontWeight: '500',
                              marginBottom: '12px',
                            }}
                          />
                          
                          <h3
                            style={{
                              fontSize: '1.8rem',
                              fontWeight: '700',
                              marginBottom: '8px',
                              color: 'var(--text-primary)',
                              lineHeight: '1.3',
                            }}
                          >
                            {exp.title}
                          </h3>
                          
                          <h4
                            style={{
                              fontSize: '1.4rem',
                              fontWeight: '600',
                              marginBottom: '0',
                              color: accentColor,
                              lineHeight: '1.3',
                            }}
                          >
                            {exp.company}
                          </h4>
                        </div>
                      </Col>
                      
                      <Col xs={24} md={8}>
                        <div style={{ textAlign: { xs: 'left', md: 'right' } }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                            <CalendarOutlined style={{ color: accentColor, fontSize: '16px' }} />
                            <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>
                              {exp.duration}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                            <EnvironmentOutlined style={{ color: accentColor, fontSize: '16px' }} />
                            <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>
                              {exp.location}
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    {/* Content Section */}
                    {/* Achievements Section */}
                    <div style={{ marginBottom: '32px' }}>
                      <h5
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          marginBottom: '20px',
                          color: 'var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <RocketOutlined style={{ color: accentColor }} />
                        Key Achievements
                      </h5>
                      
                      <div style={{ display: 'grid', gap: '16px' }}>
                        {exp.achievements.map((achievement, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '12px',
                              padding: '16px 20px',
                              background: isDarkMode 
                                ? `linear-gradient(135deg, #16213e, #2d3748)` 
                                : `linear-gradient(135deg, #f8f9fa, #e9ecef)`,
                              borderRadius: '12px',
                              border: `1px solid ${accentColor}20`,
                              borderLeft: `4px solid ${accentColor}`,
                            }}
                          >
                            <CheckCircleOutlined
                              style={{
                                color: accentColor,
                                marginTop: '2px',
                                fontSize: '16px',
                                minWidth: '16px',
                              }}
                            />
                            <span
                              style={{
                                color: 'var(--text-secondary)',
                                lineHeight: 1.6,
                                fontSize: '15px',
                              }}
                            >
                              {achievement}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies Section */}
                    <div>
                      <h5
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          marginBottom: '20px',
                          color: 'var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <CodeOutlined style={{ color: accentColor }} />
                        Technologies
                      </h5>
                      
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {exp.technologies.map((tech, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            viewport={{ once: true }}
                          >
                            <Tag
                              style={{
                                background: `${accentColor}15`,
                                border: `1px solid ${accentColor}40`,
                                color: 'var(--text-primary)',
                                borderRadius: '20px',
                                padding: '6px 16px',
                                fontSize: '13px',
                                fontWeight: '500',
                                marginBottom: '10px',
                              }}
                            >
                              {tech}
                            </Tag>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginTop: '100px' }}
        >
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} lg={12}>
              <Card
                style={{
                  borderRadius: '20px',
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #4c6ef5 0%, #748ffc 100%)'
                    : 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
                  border: 'none',
                  color: 'white',
                  height: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                }}
                bodyStyle={{ padding: '40px', position: 'relative', zIndex: 1 }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '160px',
                    height: '160px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '-20px',
                    width: '80px',
                    height: '80px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                  }}
                />
                <RocketOutlined style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '24px' }} />
                <h4 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '24px', color: '#fff' }}>
                  Performance Impact
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'Reduced processing time by 25%',
                    'Boosted API performance by 30%',
                    'Cut network transfer by 90%',
                    'Enhanced maintainability across 12 components'
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                    >
                      <CheckCircleOutlined style={{ color: '#fff', fontSize: '18px', minWidth: '18px' }} />
                      <span style={{ fontSize: '16px', opacity: 0.95, fontWeight: '500' }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </Col>
            
            <Col xs={24} lg={12}>
              <Card
                style={{
                  borderRadius: '20px',
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #845ef7 0%, #be4bdb 100%)'
                    : 'linear-gradient(135deg, #722ed1 0%, #eb2f96 100%)',
                  border: 'none',
                  color: 'white',
                  height: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                }}
                bodyStyle={{ padding: '40px', position: 'relative', zIndex: 1 }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '160px',
                    height: '160px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '-20px',
                    width: '80px',
                    height: '80px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                  }}
                />
                <BulbOutlined style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '24px' }} />
                <h4 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '24px', color: '#fff' }}>
                  Technical Innovation
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'Built comprehensive B2B SaaS platforms',
                    'Implemented LLM-based automation',
                    'Delivered multiple client PoCs',
                    'Integrated modern payment systems'
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                    >
                      <CheckCircleOutlined style={{ color: '#fff', fontSize: '18px', minWidth: '18px' }} />
                      <span style={{ fontSize: '16px', opacity: 0.95, fontWeight: '500' }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 
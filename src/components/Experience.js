import React from 'react';
import { Row, Col, Card, Tag, Timeline } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, RocketOutlined, CodeOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const Experience = () => {
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
      color: '#1890ff'
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
      color: '#52c41a'
    }
  ];

  const timelineItems = experiences.map((exp, index) => ({
    color: exp.color,
    children: (
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        viewport={{ once: true }}
      >
        <Card
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: 'none',
            marginBottom: '20px',
          }}
          bodyStyle={{ padding: '30px' }}
        >
          <div style={{ marginBottom: '20px' }}>
            <Tag color={exp.color} style={{ marginBottom: '8px', fontSize: '12px', padding: '4px 8px' }}>
              {exp.type}
            </Tag>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
              {exp.title}
            </h3>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '16px', color: exp.color }}>
              {exp.company}
            </h4>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CalendarOutlined /> {exp.duration}
              </span>
              <span style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <EnvironmentOutlined /> {exp.location}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h5 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '16px', color: '#333' }}>
              Key Achievements:
            </h5>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {exp.achievements.map((achievement, idx) => (
                <li key={idx} style={{ marginBottom: '8px', color: '#666', lineHeight: 1.6 }}>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
              Technologies Used:
            </h5>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {exp.technologies.map((tech, idx) => (
                <Tag key={idx} style={{ marginBottom: '4px', borderRadius: '12px' }}>
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    ),
  }));

  return (
    <section id="experience" style={{ padding: '100px 0', background: '#fff' }}>
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
          <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '20px', maxWidth: '600px', margin: '20px auto 0' }}>
            My journey in software development, building innovative solutions and contributing to meaningful projects.
          </p>
        </motion.div>

        <Row justify="center">
          <Col xs={24} lg={20}>
            <Timeline
              mode="alternate"
              items={timelineItems}
              style={{ padding: '20px 0' }}
            />
          </Col>
        </Row>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginTop: '80px' }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card
                style={{
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  color: 'white',
                  height: '100%',
                }}
                bodyStyle={{ padding: '30px' }}
              >
                <RocketOutlined style={{ fontSize: '3rem', color: '#fff', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '15px', color: '#fff' }}>
                  Performance Impact
                </h4>
                <ul style={{ paddingLeft: '20px', margin: 0, color: '#fff' }}>
                  <li style={{ marginBottom: '8px', opacity: 0.9 }}>Reduced processing time by 25%</li>
                  <li style={{ marginBottom: '8px', opacity: 0.9 }}>Boosted API performance by 30%</li>
                  <li style={{ marginBottom: '8px', opacity: 0.9 }}>Cut network transfer by 90%</li>
                  <li style={{ marginBottom: '8px', opacity: 0.9 }}>Improved code maintainability across 12 components</li>
                </ul>
              </Card>
            </Col>
            
            <Col xs={24} md={12}>
              <Card
                style={{
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  border: 'none',
                  color: 'white',
                  height: '100%',
                }}
                bodyStyle={{ padding: '30px' }}
              >
                <CodeOutlined style={{ fontSize: '3rem', color: '#fff', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '15px', color: '#fff' }}>
                  Technical Excellence
                </h4>
                <ul style={{ paddingLeft: '20px', margin: 0, color: '#fff' }}>
                  <li style={{ marginBottom: '8px', opacity: 0.9 }}>Built comprehensive B2B SaaS platforms</li>
                  <li style={{ marginBottom: '8px', opacity: 0.9 }}>Implemented LLM-based automation solutions</li>
                  <li style={{ marginBottom: '8px', opacity: 0.9 }}>Delivered multiple client PoCs</li>
                  <li style={{ marginBottom: '8px', opacity: 0.9 }}>Integrated modern payment gateways</li>
                </ul>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 
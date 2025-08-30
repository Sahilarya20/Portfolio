import React from 'react';
import { Row, Col, Card, Tag } from 'antd';
import { BookOutlined, CalendarOutlined, EnvironmentOutlined, TrophyOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const Education = () => {
  const education = {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Maharaja Agrasen Institute of Technology',
    location: 'Delhi, India',
    duration: 'August 2019 - June 2023',
    cgpa: '8.50/10',
    highlights: [
      'Specialized in Computer Science and Engineering',
      'Strong foundation in Data Structures and Algorithms',
      'Extensive coursework in Software Engineering',
      'Database Management and System Design',
      'Object-Oriented Programming and Design Patterns',
      'Web Development and Full-Stack Technologies'
    ],
    relevantCourses: [
      'Data Structures and Algorithms',
      'Database Management Systems',
      'Object Oriented Programming',
      'Software Engineering',
      'Computer Networks',
      'Operating Systems',
      'System Design',
      'Web Technologies'
    ]
  };

  return (
    <section id="education" style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1890ff' }}>
            Education
          </h2>
          <div style={{ width: '60px', height: '4px', background: '#1890ff', margin: '0 auto' }} />
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '20px', maxWidth: '600px', margin: '20px auto 0' }}>
            My academic journey and educational background that laid the foundation for my career in technology.
          </p>
        </motion.div>

        <Row justify="center">
          <Col xs={24} lg={20}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card
                style={{
                  borderRadius: '20px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  border: 'none',
                  overflow: 'hidden',
                }}
                bodyStyle={{ padding: 0 }}
              >
                {/* Header Section */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '40px',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  <BookOutlined style={{ fontSize: '4rem', marginBottom: '20px' }} />
                  <h3 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '16px', color: '#fff' }}>
                    {education.degree}
                  </h3>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: '400', marginBottom: '20px', color: '#fff', opacity: 0.9 }}>
                    {education.institution}
                  </h4>
                  
                  <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={8}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <CalendarOutlined />
                        <span>{education.duration}</span>
                      </div>
                    </Col>
                    <Col xs={24} sm={8}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <EnvironmentOutlined />
                        <span>{education.location}</span>
                      </div>
                    </Col>
                    <Col xs={24} sm={8}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <TrophyOutlined />
                        <span>CGPA: {education.cgpa}</span>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Content Section */}
                <div style={{ padding: '40px' }}>
                  <Row gutter={[32, 32]}>
                    <Col xs={24} lg={12}>
                      <h4 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '20px', color: 'var(--text-primary)' }}>
                        Academic Highlights
                      </h4>
                      <ul style={{ paddingLeft: '20px', margin: 0 }}>
                        {education.highlights.map((highlight, index) => (
                          <li key={index} style={{ marginBottom: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1rem' }}>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </Col>

                    <Col xs={24} lg={12}>
                      <h4 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '20px', color: 'var(--text-primary)' }}>
                        Relevant Coursework
                      </h4>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {education.relevantCourses.map((course, index) => (
                          <Tag
                            key={index}
                            style={{
                              marginBottom: '8px',
                              padding: '8px 16px',
                              borderRadius: '20px',
                              fontSize: '0.9rem',
                              border: '1px solid #d9d9d9',
                              background: '#f6f6f6',
                            }}
                          >
                            {course}
                          </Tag>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginTop: '60px' }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card
                style={{
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: 'none',
                  textAlign: 'center',
                  height: '100%',
                }}
                bodyStyle={{ padding: '30px' }}
              >
                <BookOutlined style={{ fontSize: '3rem', color: '#1890ff', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px' }}>
                  Strong Academic Foundation
                </h4>
                <p style={{ color: '#666', lineHeight: 1.6 }}>
                  Graduated with distinction, maintaining a consistent CGPA of 8.50 throughout my undergraduate studies.
                </p>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card
                style={{
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: 'none',
                  textAlign: 'center',
                  height: '100%',
                }}
                bodyStyle={{ padding: '30px' }}
              >
                <TrophyOutlined style={{ fontSize: '3rem', color: '#52c41a', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px' }}>
                  Technical Excellence
                </h4>
                <p style={{ color: '#666', lineHeight: 1.6 }}>
                  Specialized in cutting-edge technologies and gained hands-on experience through various projects and internships.
                </p>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card
                style={{
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: 'none',
                  textAlign: 'center',
                  height: '100%',
                }}
                bodyStyle={{ padding: '30px' }}
              >
                <EnvironmentOutlined style={{ fontSize: '3rem', color: '#fa8c16', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px' }}>
                  Industry Readiness
                </h4>
                <p style={{ color: '#666', lineHeight: 1.6 }}>
                  Bridged the gap between academic knowledge and industry requirements through practical application and real-world projects.
                </p>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default Education; 
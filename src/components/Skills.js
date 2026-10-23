import React from 'react';
import { Row, Col, Card, Tag } from 'antd';
import { CodeOutlined, DatabaseOutlined, ToolOutlined, CloudOutlined, MobileOutlined, BulbOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming',
      icon: <CodeOutlined />,
      color: '#1890ff',
      skills: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'C++']
    },
    {
      title: 'Frontend',
      icon: <MobileOutlined />,
      color: '#52c41a',
      skills: ['React.js', 'HTML', 'CSS', 'Ant Design', 'Responsive Interfaces', 'Reusable Components', 'Dashboards']
    },
    {
      title: 'Backend and Integration',
      icon: <ToolOutlined />,
      color: '#fa8c16',
      skills: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'gRPC', 'Microservices', 'API Integration', 'Error Handling']
    },
    {
      title: 'Data Engineering',
      icon: <DatabaseOutlined />,
      color: '#722ed1',
      skills: ['PostgreSQL', 'Redis', 'Databricks', 'Delta Lake', 'SQL Query Optimization', 'ETL Pipelines', 'Data Ingestion', 'Data Transformation', 'Data Quality']
    },
    {
      title: 'Generative AI',
      icon: <BulbOutlined />,
      color: '#eb2f96',
      skills: ['LLMs', 'Claude Sonnet', 'Llama 3', 'Vector Search', 'Retrieval-Based Document Processing', 'Structured and Unstructured Data Extraction']
    },
    {
      title: 'Engineering and Tools',
      icon: <CloudOutlined />,
      color: '#13c2c2',
      skills: ['Microfrontend Architecture', 'Distributed Systems', 'RabbitMQ', 'OOP', 'Data Structures and Algorithms', 'DBMS', 'Performance Optimization', 'Git', 'GitHub', 'Microsoft Azure']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" style={{ padding: '100px 0', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1890ff' }}>
            Technical Skills
          </h2>
          <div style={{ width: '60px', height: '4px', background: '#1890ff', margin: '0 auto' }} />
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '20px', maxWidth: '600px', margin: '20px auto 0' }}>
            A comprehensive overview of my technical expertise across languages, frontend, backend, data engineering, and generative AI.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Row gutter={[24, 24]}>
            {skillCategories.map((category, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <motion.div variants={itemVariants}>
                  <Card
                    style={{
                      borderRadius: '16px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      border: 'none',
                      height: '100%',
                      transition: 'transform 0.3s ease',
                    }}
                    bodyStyle={{ padding: '30px' }}
                    hoverable
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0px)';
                    }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                      <div
                        style={{
                          fontSize: '3rem',
                          color: category.color,
                          marginBottom: '16px',
                        }}
                      >
                        {category.icon}
                      </div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                        {category.title}
                      </h3>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {category.skills.map((skill) => (
                        <Tag
                          key={skill}
                          style={{ borderRadius: '12px', marginBottom: '4px', padding: '4px 12px', fontSize: '0.9rem', borderColor: category.color, color: 'var(--text-primary)', background: 'transparent' }}
                        >
                          {skill}
                        </Tag>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginTop: '80px' }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card
                style={{
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  color: 'white',
                  textAlign: 'center',
                  height: '100%',
                }}
                bodyStyle={{ padding: '40px 30px' }}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', color: '#fff' }}>
                  Frontend Expertise
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['React.js', 'TypeScript', 'Ant Design', 'HTML', 'CSS'].map((tech, idx) => (
                    <Tag key={idx} style={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      border: 'none', 
                      color: '#fff',
                      borderRadius: '12px',
                      marginBottom: '8px'
                    }}>
                      {tech}
                    </Tag>
                  ))}
                </div>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card
                style={{
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  border: 'none',
                  color: 'white',
                  textAlign: 'center',
                  height: '100%',
                }}
                bodyStyle={{ padding: '40px 30px' }}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', color: '#fff' }}>
                  Backend & Data
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Databricks'].map((tech, idx) => (
                    <Tag key={idx} style={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      border: 'none', 
                      color: '#fff',
                      borderRadius: '12px',
                      marginBottom: '8px'
                    }}>
                      {tech}
                    </Tag>
                  ))}
                </div>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card
                style={{
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  border: 'none',
                  color: 'white',
                  textAlign: 'center',
                  height: '100%',
                }}
                bodyStyle={{ padding: '40px 30px' }}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', color: '#fff' }}>
                  Cloud & Tools
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['Azure', 'Git', 'GitHub', 'RabbitMQ', 'gRPC'].map((tech, idx) => (
                    <Tag key={idx} style={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      border: 'none', 
                      color: '#fff',
                      borderRadius: '12px',
                      marginBottom: '8px'
                    }}>
                      {tech}
                    </Tag>
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

export default Skills; 
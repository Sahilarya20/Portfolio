import React from 'react';
import { Row, Col, Card, Progress, Tag } from 'antd';
import { CodeOutlined, DatabaseOutlined, ToolOutlined, CloudOutlined, MobileOutlined, BulbOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <CodeOutlined />,
      color: '#1890ff',
      skills: [
        { name: 'C++', level: 95 },
        { name: 'JavaScript/TypeScript', level: 90 },
        { name: 'PHP', level: 75 },
        { name: 'SQL', level: 85 },
        { name: 'HTML/CSS', level: 90 }
      ]
    },
    {
      title: 'Frameworks & Libraries',
      icon: <MobileOutlined />,
      color: '#52c41a',
      skills: [
        { name: 'React.js', level: 95 },
        { name: 'Node.js', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Ant Design', level: 90 },
        { name: 'Chart.js', level: 80 },
        { name: 'PrimeReact', level: 85 }
      ]
    },
    {
      title: 'Databases & Tools',
      icon: <DatabaseOutlined />,
      color: '#722ed1',
      skills: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'MySQL', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'Redis', level: 70 },
        { name: 'phpMyAdmin', level: 80 }
      ]
    },
    {
      title: 'Developer Tools',
      icon: <ToolOutlined />,
      color: '#fa8c16',
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'VS Code', level: 95 },
        { name: 'Azure Boards', level: 80 },
        { name: 'Jira', level: 85 },
        { name: 'Eclipse', level: 75 }
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: <CloudOutlined />,
      color: '#13c2c2',
      skills: [
        { name: 'Azure', level: 80 },
        { name: 'Docker', level: 75 },
        { name: 'CI/CD', level: 70 },
        { name: 'AWS', level: 65 }
      ]
    },
    {
      title: 'Concepts & Soft Skills',
      icon: <BulbOutlined />,
      color: '#eb2f96',
      skills: [
        { name: 'Data Structures & Algorithms', level: 90 },
        { name: 'Object Oriented Programming', level: 85 },
        { name: 'Database Management', level: 85 },
        { name: 'System Design', level: 80 },
        { name: 'Problem Solving', level: 95 },
        { name: 'Leadership', level: 85 }
      ]
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
            A comprehensive overview of my technical expertise and proficiency levels across various technologies.
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

                    <div style={{ space: '16px' }}>
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} style={{ marginBottom: '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                              {skill.name}
                            </span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                              {skill.level}%
                            </span>
                          </div>
                          <Progress
                            percent={skill.level}
                            strokeColor={{
                              '0%': category.color,
                              '100%': category.color,
                            }}
                            trailColor="#f0f0f0"
                            strokeWidth={8}
                            showInfo={false}
                            style={{ marginBottom: '4px' }}
                          />
                        </div>
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
                  {['React.js', 'Next.js', 'TypeScript', 'Ant Design', 'Modular SCSS'].map((tech, idx) => (
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
                  Backend & Database
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['Node.js', 'PHP', 'PostgreSQL', 'MySQL', 'Redis'].map((tech, idx) => (
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
                  DevOps & Tools
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['Azure', 'Git', 'Docker', 'Jira', 'VS Code'].map((tech, idx) => (
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
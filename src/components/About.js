import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { CodeOutlined, TeamOutlined, TrophyOutlined, RocketOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { title: 'Years Experience', value: 2, suffix: '+', icon: <CodeOutlined /> },
    { title: 'Projects Completed', value: 10, suffix: '+', icon: <RocketOutlined /> },
    { title: 'LeetCode Problems', value: 300, suffix: '+', icon: <TrophyOutlined /> },
    { title: 'Technologies Mastered', value: 15, suffix: '+', icon: <TeamOutlined /> },
  ];

  return (
    <section id="about" style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1890ff' }}>
            About Me
          </h2>
          <div style={{ width: '60px', height: '4px', background: '#1890ff', margin: '0 auto' }} />
        </motion.div>

        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '2rem', color: 'var(--text-primary)' }}>
                Software Engineer & Problem Solver
              </h3>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                I'm a passionate Software Engineer with expertise in building scalable B2B analytics platforms. 
                Currently working at <strong>Polestar Analytics</strong>, where I've built 1Platform - a comprehensive 
                SaaS solution for managing ETL transformations and hierarchical data.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                My experience spans across <strong>React.js, Node.js, PostgreSQL</strong>, and cloud technologies. 
                I've successfully delivered performance improvements of up to <strong>30%</strong> through optimization 
                techniques and have collaborated with cross-functional teams working on Python and Azure-based data services.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                I'm driven by solving complex problems and building solutions that make a real impact. 
                From reducing processing times by 25% to implementing Process Automation using LLM models, 
                I constantly strive for excellence in every project.
              </p>
            </motion.div>
          </Col>

          <Col xs={24} lg={12}>
            <Row gutter={[16, 16]}>
              {stats.map((stat, index) => (
                <Col xs={12} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      style={{
                        textAlign: 'center',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        border: 'none',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        height: '160px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                      bodyStyle={{ padding: '20px' }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '10px', color: '#fff' }}>
                        {stat.icon}
                      </div>
                      <Statistic
                        value={stat.value}
                        suffix={stat.suffix}
                        valueStyle={{ color: '#fff', fontSize: '1.8rem', fontWeight: 'bold' }}
                      />
                      <p style={{ margin: '8px 0 0', fontSize: '0.9rem', opacity: 0.9 }}>
                        {stat.title}
                      </p>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Technical Highlights */}
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
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: 'none',
                  height: '100%',
                }}
                bodyStyle={{ padding: '30px' }}
              >
                <RocketOutlined style={{ fontSize: '3rem', color: '#1890ff', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--text-primary)' }}>Performance Optimization</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Boosted API performance by 30% through server-side pagination and lazy loading, 
                  reducing network payload from 2MB to 20KB/page.
                </p>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: 'none',
                  height: '100%',
                }}
                bodyStyle={{ padding: '30px' }}
              >
                <TeamOutlined style={{ fontSize: '3rem', color: '#52c41a', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--text-primary)' }}>Full-Stack Development</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Built complete B2B analytics platforms using React.js, Node.js, and PostgreSQL, 
                  collaborating with cross-functional teams on data services.
                </p>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: 'none',
                  height: '100%',
                }}
                bodyStyle={{ padding: '30px' }}
              >
                <TrophyOutlined style={{ fontSize: '3rem', color: '#faad14', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--text-primary)' }}>Problem Solving</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Solved 300+ DSA problems on LeetCode and achieved AIR 1214 in CodeKaze 2022, 
                  demonstrating strong analytical and problem-solving skills.
                </p>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 
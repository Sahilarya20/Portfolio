import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { CodeOutlined, TeamOutlined, TrophyOutlined, RocketOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { title: 'Years Experience', value: 3, suffix: '', icon: <CodeOutlined /> },
    { title: 'Enterprise Clients', value: 4, suffix: '+', icon: <TeamOutlined /> },
    { title: 'DSA Problems Solved', value: 400, suffix: '+', icon: <TrophyOutlined /> },
    { title: 'Microservices Built', value: 5, suffix: '+', icon: <RocketOutlined /> },
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
                Senior Software Engineer & Systems Architect
              </h3>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                I'm a Senior Software Engineer at <strong>Polestar Analytics</strong> with nearly 3 years of experience building
                scalable enterprise applications, data integration platforms, and AI-enabled analytics solutions using React.js,
                TypeScript, Python, Node.js, and SQL. I led the migration of a production-scale frontend monolith to a
                <strong> microfrontend architecture</strong> enabling 4+ independent teams to release in parallel, and
                decomposed a Node.js monolith into <strong>5+ Python microservices</strong> using gRPC, RabbitMQ, and Redis.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                I engineered <strong>PromoPulse</strong> — an AI-powered enterprise analytics platform that turns Databricks
                datasets into LLM-driven recommendations, scenario simulations, and KPI forecasts. I've also built OCR and
                document-processing pipelines using <strong>Claude Sonnet</strong>, <strong>Llama 3</strong>, and vector-search
                retrieval, achieving 92% extraction accuracy with support for 128K-token context windows.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                I work directly with enterprise clients — Knipper, BDS, Zydus, and Insigneo — and I'm a recipient of multiple
                <strong> Quarterly Impact Awards</strong> and a <strong>Databricks Certified Generative AI Engineer Associate</strong>,
                focused on data quality, performance optimization, and reliable enterprise workflows.
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
                <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--text-primary)' }}>AI & LLM Engineering</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Built AI-powered systems using Claude Sonnet, Llama 3, and vector-search retrieval achieving
                  92% extraction accuracy on enterprise documents with 128K-token context support.
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
                <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--text-primary)' }}>Distributed Systems</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Decomposed a Node.js monolith into 5+ Python microservices using gRPC, RabbitMQ, and Redis for
                  asynchronous processing, service isolation, and reliable inter-service communication.
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
                <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--text-primary)' }}>Performance & Scale</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Reduced API latency ~30% (600 ms → 420 ms) and per-page payload from 2 MB to 20 KB
                  through server-side pagination, lazy loading, and optimized Delta Lake queries.
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
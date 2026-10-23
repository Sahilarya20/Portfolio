import React from 'react';
import { Row, Col, Card, Tag, Button, Space } from 'antd';
import { GithubOutlined, LinkOutlined, DatabaseOutlined, ApiOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'PacketLens',
      description: 'A real-time network analysis dashboard using WebSockets to stream live data and classify traffic across 20+ applications with custom binary parsers and no external packet-library dependencies.',
      longDescription: 'PacketLens is a high-performance network monitoring tool featuring a multi-threaded load balancer and a rule-based blocking engine. It provides real-time visibility into network traffic with deep packet inspection and intelligent traffic classification.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      technologies: ['React.js', 'Node.js', 'Express', 'Socket.IO', 'Tailwind CSS'],
      features: [
        'Live data streaming via WebSockets',
        'Traffic classification across 20+ applications',
        'Custom binary parsers (no external packet libraries)',
        'Multithreaded load balancer with configurable parallel workers',
        'Rule-based traffic-blocking engine',
        'IP, application, and domain filtering'
      ],
      githubLink: 'https://github.com/Sahilarya20/PacketLens',
      liveLink: 'https://packet-lens-4lco.vercel.app/',
      category: 'Network Tools',
      icon: <ApiOutlined />,
      color: '#1890ff'
    },
    {
      id: 2,
      title: '1Platform',
      description: 'Enterprise B2B analytics and ETL SaaS platform supporting 4+ enterprise clients across data ingestion, transformation, governance, and analytics workflows.',
      longDescription: '1Platform is a comprehensive analytics and ETL SaaS solution built with React.js, Node.js, PostgreSQL, Azure, and Databricks. It automates complex SQL-based workflows and delivers significant performance gains for enterprise data pipelines.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Azure', 'Databricks'],
      features: [
        'Data ingestion, validation, and transformation workflows',
        'Automated manual SQL operations (~90% less data-engineering effort)',
        'API latency 600 ms → 420 ms',
        'Per-page payload 2 MB → 20 KB',
        'Server-side pagination and lazy loading',
        'Optimized Delta Lake queries'
      ],
      githubLink: '#',
      liveLink: 'https://mdm.polestarllp.com/login',
      category: 'Enterprise SaaS',
      icon: <DatabaseOutlined />,
      color: '#722ed1'
    },
  ];

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
    <section id="projects" style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1890ff' }}>
            Featured Projects
          </h2>
          <div style={{ width: '60px', height: '4px', background: '#1890ff', margin: '0 auto' }} />
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '20px', maxWidth: '600px', margin: '20px auto 0' }}>
            Showcasing innovative solutions built with cutting-edge technologies to solve real-world problems.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Row gutter={[32, 32]} justify="center">
            {projects.map((project, index) => (
              <Col xs={24} lg={12} key={project.id}>
                <motion.div variants={itemVariants}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      border: 'none',
                      height: '100%',
                      transition: 'all 0.3s ease',
                    }}
                    bodyStyle={{ padding: 0 }}
                    cover={
                      <div style={{ position: 'relative', overflow: 'hidden', height: '250px' }}>
                        <img
                          src={project.image}
                          alt={project.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                          }}
                          className="project-overlay"
                        >
                          <div style={{ fontSize: '4rem', color: '#fff' }}>
                            {project.icon}
                          </div>
                        </div>
                      </div>
                    }
                    onMouseEnter={(e) => {
                      const overlay = e.currentTarget.querySelector('.project-overlay');
                      const img = e.currentTarget.querySelector('img');
                      if (overlay) overlay.style.opacity = '1';
                      if (img) img.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      const overlay = e.currentTarget.querySelector('.project-overlay');
                      const img = e.currentTarget.querySelector('img');
                      if (overlay) overlay.style.opacity = '0';
                      if (img) img.style.transform = 'scale(1)';
                    }}
                  >
                    <div style={{ padding: '30px' }}>
                      <div style={{ marginBottom: '20px' }}>
                        <Tag color={project.color} style={{ marginBottom: '12px', fontSize: '12px', padding: '4px 12px', borderRadius: '12px' }}>
                          {project.category}
                        </Tag>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>
                          {project.title}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                          {project.description}
                        </p>
                      </div>

                      <div style={{ marginBottom: '24px' }}>
                        <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>
                          Key Features:
                        </h5>
                        <Row gutter={[8, 8]}>
                          {project.features.map((feature, idx) => (
                            <Col key={idx} span={12}>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                                <SettingOutlined style={{ color: project.color, marginRight: '8px', fontSize: '12px' }} />
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{feature}</span>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>

                      <div style={{ marginBottom: '24px' }}>
                        <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>
                          Technologies:
                        </h5>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {project.technologies.map((tech, idx) => (
                            <Tag key={idx} style={{ borderRadius: '12px', marginBottom: '4px' }}>
                              {tech}
                            </Tag>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <Button
                          type="primary"
                          icon={<GithubOutlined />}
                          href={project.githubLink}
                          target="_blank"
                          style={{ borderRadius: '20px', flex: 1 }}
                        >
                          View Code
                        </Button>
                        <Button
                          icon={<LinkOutlined />}
                          href={project.liveLink}
                          target="_blank"
                          style={{ borderRadius: '20px', flex: 1 }}
                        >
                          Live Demo
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Additional Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginTop: '80px', textAlign: 'center' }}
        >
          <Card
            style={{
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              color: 'white',
            }}
            bodyStyle={{ padding: '40px' }}
          >
            <h3 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '16px', color: '#fff' }}>
              Want to see more projects?
            </h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '24px', opacity: 0.9 }}>
              Check out my GitHub profile for more exciting projects and contributions to open source.
            </p>
            <Button
              type="primary"
              size="large"
              icon={<GithubOutlined />}
              href="https://github.com/Sahilarya20"
              target="_blank"
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
              Visit GitHub Profile
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 
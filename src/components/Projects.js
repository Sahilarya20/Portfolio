import React from 'react';
import { Row, Col, Card, Tag, Button, Space } from 'antd';
import { GithubOutlined, LinkOutlined, DatabaseOutlined, ApiOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'MDM (Master Data Management)',
      description: 'A comprehensive Master Data Management platform built with React.js and Node.js for hierarchical data management and workflow automation.',
      longDescription: 'MDM is a sophisticated data management platform that enables organizations to manage their master data efficiently. It provides features for creating hierarchical data structures, managing taxonomies, implementing approval workflows, and comprehensive user management.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      technologies: ['React.js', 'Node.js', 'SQL', 'Chart.js'],
      features: [
        'Hierarchical data management',
        'Masters creations',
        'Taxonomy management',
        'Approval Workflow system',
        'User Management',
        'Data visualization with Chart.js'
      ],
      githubLink: '#',
      liveLink: '#',
      category: 'Data Management',
      icon: <DatabaseOutlined />,
      color: '#1890ff'
    },
    {
      id: 2,
      title: 'Wormhole (Data Pipeline Platform)',
      description: 'A powerful data integration platform for managing multiple data source connections, transfer pipelines, and process automation with advanced scheduling capabilities.',
      longDescription: 'Wormhole is an enterprise-grade data pipeline platform that simplifies the process of connecting various data sources, creating ETL pipelines, and automating data processes. It features a modern UI built with PrimeReact and Ant Design components.',
      image: 'https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      technologies: ['React.js', 'Node.js', 'SQL', 'PrimeReact', 'Ant Design'],
      features: [
        'Multiple Datasource Connections',
        'Data Transfer Pipelines',
        'Process Automation',
        'License allotment system',
        'Advanced User Management',
        'Intelligent Schedulers'
      ],
      githubLink: '#',
      liveLink: '#',
      category: 'Data Integration',
      icon: <ApiOutlined />,
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
    <section id="projects" style={{ padding: '100px 0', background: '#f8f9fa' }}>
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
          <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '20px', maxWidth: '600px', margin: '20px auto 0' }}>
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
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                          {project.title}
                        </h3>
                        <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '16px' }}>
                          {project.description}
                        </p>
                      </div>

                      <div style={{ marginBottom: '24px' }}>
                        <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                          Key Features:
                        </h5>
                        <Row gutter={[8, 8]}>
                          {project.features.map((feature, idx) => (
                            <Col key={idx} span={12}>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                                <SettingOutlined style={{ color: project.color, marginRight: '8px', fontSize: '12px' }} />
                                <span style={{ fontSize: '0.9rem', color: '#666' }}>{feature}</span>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>

                      <div style={{ marginBottom: '24px' }}>
                        <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
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
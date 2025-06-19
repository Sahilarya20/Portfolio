import React from 'react';
import { Row, Col, Card, Tag, Statistic } from 'antd';
import { TrophyOutlined, StarOutlined, CodeOutlined, TeamOutlined, GiftOutlined, CrownOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: 'Quarterly Impact Award - Dashing Debut',
      organization: 'Polestar Analytics',
      description: 'Recognized for exceptional performance and outstanding contribution during the first quarter at Polestar Analytics.',
      icon: <TrophyOutlined />,
      color: '#faad14',
      date: '2024',
      category: 'Professional Award'
    },
    {
      id: 2,
      title: 'Appreciation Certificate for ProfitPulse',
      organization: 'Polestar Analytics',
      description: 'Received appreciation for developing high-quality asset ProfitPulse that significantly improved financial analytics for clients.',
      icon: <GiftOutlined />,
      color: '#52c41a',
      date: '2024',
      category: 'Project Recognition'
    },
    {
      id: 3,
      title: 'Google HashCode 2022',
      organization: 'Google',
      description: 'Achieved Global Rank 2421 and Indian Rank 830 in the prestigious Google HashCode 2022 programming competition.',
      icon: <CrownOutlined />,
      color: '#1890ff',
      date: '2022',
      category: 'Programming Competition'
    },
    {
      id: 4,
      title: 'CodeKaze 2022 - AIR 1214',
      organization: 'CodeStudio',
      description: 'Secured All India Rank 1214 in CodeKaze 2022, demonstrating strong problem-solving and algorithmic skills.',
      icon: <CodeOutlined />,
      color: '#722ed1',
      date: '2022',
      category: 'Programming Competition'
    }
  ];

  const stats = [
    {
      title: 'LeetCode Problems Solved',
      value: 300,
      suffix: '+',
      icon: <CodeOutlined />,
      color: '#1890ff'
    },
    {
      title: 'CodeStudio Problems',
      value: 150,
      suffix: '+',
      icon: <StarOutlined />,
      color: '#52c41a'
    },
    {
      title: 'CodeChef Problems',
      value: 100,
      suffix: '+',
      icon: <TrophyOutlined />,
      color: '#faad14'
    },
    {
      title: 'Competitive Programming Contests',
      value: 50,
      suffix: '+',
      icon: <TeamOutlined />,
      color: '#722ed1'
    }
  ];

  return (
    <section id="achievements" style={{ padding: '100px 0', background: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1890ff' }}>
            Achievements & Recognition
          </h2>
          <div style={{ width: '60px', height: '4px', background: '#1890ff', margin: '0 auto' }} />
          <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '20px', maxWidth: '600px', margin: '20px auto 0' }}>
            Awards, certifications, and competitive programming achievements that highlight my dedication to excellence.
          </p>
        </motion.div>

        {/* Achievement Cards */}
        <Row gutter={[24, 24]}>
          {achievements.map((achievement, index) => (
            <Col xs={24} md={12} key={achievement.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  style={{
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    border: 'none',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  bodyStyle={{ padding: '30px' }}
                  hoverable
                >
                  {/* Decorative corner */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '80px',
                      height: '80px',
                      background: `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}40)`,
                      clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                    }}
                  />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ marginBottom: '20px' }}>
                      <Tag
                        color={achievement.color}
                        style={{
                          marginBottom: '12px',
                          fontSize: '12px',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          border: 'none',
                        }}
                      >
                        {achievement.category}
                      </Tag>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <div
                          style={{
                            fontSize: '2.5rem',
                            color: achievement.color,
                            marginTop: '4px',
                          }}
                        >
                          {achievement.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                            {achievement.title}
                          </h3>
                          <p style={{ fontSize: '1rem', color: achievement.color, fontWeight: '500', marginBottom: '12px' }}>
                            {achievement.organization} • {achievement.date}
                          </p>
                          <p style={{ color: '#666', lineHeight: 1.6, margin: 0 }}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Programming Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginTop: '80px' }}
        >
          <h3 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '600', marginBottom: '40px', color: '#333' }}>
            Competitive Programming Statistics
          </h3>
          <Row gutter={[24, 24]}>
            {stats.map((stat, index) => (
              <Col xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    style={{
                      borderRadius: '16px',
                      background: `linear-gradient(135deg, ${stat.color}10, ${stat.color}20)`,
                      border: `1px solid ${stat.color}30`,
                      textAlign: 'center',
                      height: '100%',
                    }}
                    bodyStyle={{ padding: '30px 20px' }}
                  >
                    <div style={{ fontSize: '2.5rem', color: stat.color, marginBottom: '16px' }}>
                      {stat.icon}
                    </div>
                    <Statistic
                      value={stat.value}
                      suffix={stat.suffix}
                      valueStyle={{ color: stat.color, fontSize: '2rem', fontWeight: 'bold' }}
                    />
                    <p style={{ margin: '12px 0 0', fontSize: '0.9rem', color: '#666', fontWeight: '500' }}>
                      {stat.title}
                    </p>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements; 
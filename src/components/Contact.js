import React, { useState } from 'react';
import { Row, Col, Card, Form, Input, Button, message, Space } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, LinkedinOutlined, GithubOutlined, SendOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: <MailOutlined />,
      title: 'Email',
      value: 'sahilarya53@gmail.com',
      link: 'mailto:sahilarya53@gmail.com',
      color: '#1890ff'
    },
    {
      icon: <PhoneOutlined />,
      title: 'Phone',
      value: '+91 9582006504',
      link: 'tel:+919582006504',
      color: '#52c41a'
    },
    {
      icon: <EnvironmentOutlined />,
      title: 'Location',
      value: 'Delhi, India',
      link: '#',
      color: '#fa8c16'
    }
  ];

  const socialLinks = [
    {
      icon: <LinkedinOutlined />,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/sahil-a-4a262211a',
      color: '#0077b5'
    },
    {
      icon: <GithubOutlined />,
      name: 'GitHub',
      url: 'https://github.com/Sahilarya20',
      color: '#333'
    },
    {
      icon: <MailOutlined />,
      name: 'Email',
      url: 'mailto:sahilarya53@gmail.com',
      color: '#ea4335'
    }
  ];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      message.success('Message sent successfully! I\'ll get back to you soon.');
      form.resetFields();
    } catch (error) {
      message.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1890ff' }}>
            Get In Touch
          </h2>
          <div style={{ width: '60px', height: '4px', background: '#1890ff', margin: '0 auto' }} />
          <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '20px', maxWidth: '600px', margin: '20px auto 0' }}>
            Have a project in mind or want to collaborate? I'd love to hear from you! 
            Let's discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>

        <Row gutter={[32, 32]}>
          {/* Contact Information */}
          <Col xs={24} lg={8}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '30px', color: '#333' }}>
                Contact Information
              </h3>
              
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      style={{
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        cursor: info.link !== '#' ? 'pointer' : 'default',
                      }}
                      bodyStyle={{ padding: '20px' }}
                      onClick={() => {
                        if (info.link !== '#') {
                          window.open(info.link, '_blank');
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div
                          style={{
                            fontSize: '1.5rem',
                            color: info.color,
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: `${info.color}15`,
                            borderRadius: '8px',
                          }}
                        >
                          {info.icon}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px', color: '#333' }}>
                            {info.title}
                          </h4>
                          <p style={{ color: '#666', margin: 0, fontSize: '1rem' }}>
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </Space>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                style={{ marginTop: '40px' }}
              >
                <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
                  Connect With Me
                </h4>
                <Space size="large">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: `${social.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        color: social.color,
                        transition: 'all 0.3s ease',
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: social.color,
                        color: '#fff'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </Space>
              </motion.div>
            </motion.div>
          </Col>

          {/* Contact Form */}
          <Col xs={24} lg={16}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card
                style={{
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: 'none',
                }}
                bodyStyle={{ padding: '40px' }}
              >
                <h3 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '30px', color: '#333' }}>
                  Send Me a Message
                </h3>
                
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  size="large"
                >
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                      >
                        <Input
                          placeholder="Your full name"
                          style={{ borderRadius: '8px' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Please enter a valid email' }
                        ]}
                      >
                        <Input
                          placeholder="your.email@example.com"
                          style={{ borderRadius: '8px' }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Form.Item
                    name="subject"
                    label="Subject"
                    rules={[{ required: true, message: 'Please enter a subject' }]}
                  >
                    <Input
                      placeholder="What is this about?"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                  
                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[{ required: true, message: 'Please enter your message' }]}
                  >
                    <TextArea
                      rows={6}
                      placeholder="Tell me about your project or how I can help you..."
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                  
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      icon={<SendOutlined />}
                      style={{
                        width: '100%',
                        height: '50px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginTop: '80px', textAlign: 'center' }}
        >
          <Card
            style={{
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              color: 'white',
            }}
            bodyStyle={{ padding: '50px 40px' }}
          >
            <h3 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '16px', color: '#fff' }}>
              Ready to Start Your Next Project?
            </h3>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9, maxWidth: '600px', margin: '0 auto 30px' }}>
              Let's work together to build something amazing. I'm always excited to take on new challenges and create innovative solutions.
            </p>
            <Space size="large">
              <Button
                type="default"
                size="large"
                icon={<MailOutlined />}
                href="mailto:sahilarya53@gmail.com"
                style={{
                  borderRadius: '25px',
                  height: '50px',
                  paddingLeft: '30px',
                  paddingRight: '30px',
                  fontSize: '16px',
                  background: 'rgba(255,255,255,0.2)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                }}
              >
                Email Me
              </Button>
              <Button
                type="default"
                size="large"
                icon={<PhoneOutlined />}
                href="tel:+919582006504"
                style={{
                  borderRadius: '25px',
                  height: '50px',
                  paddingLeft: '30px',
                  paddingRight: '30px',
                  fontSize: '16px',
                  background: 'transparent',
                  borderColor: 'rgba(255,255,255,0.5)',
                  color: '#fff',
                }}
              >
                Call Me
              </Button>
            </Space>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 
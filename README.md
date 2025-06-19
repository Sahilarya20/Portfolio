# Sahil Arya - Professional Portfolio

A modern, responsive portfolio website built with React.js and Ant Design, showcasing my experience as a Software Engineer specializing in full-stack development.

## 🚀 Live Demo

[View Portfolio](https://sahilarya-portfolio.vercel.app) *(Update with your deployment URL)*

## ✨ Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Components**: Engaging animations using Framer Motion
- **Professional Sections**:
  - Hero section with animated typing effect
  - About me with statistics
  - Professional experience timeline
  - Featured projects showcase
  - Technical skills with proficiency levels
  - Education details
  - Achievements and certifications
  - Contact form with validation
  - Social media links

## 🛠️ Built With

- **Frontend Framework**: React.js 18
- **UI Library**: Ant Design 5
- **Animations**: Framer Motion
- **Styling**: CSS-in-JS with custom animations
- **Icons**: Ant Design Icons
- **Typography**: Inter font family

## 📦 Key Dependencies

```json
{
  "react": "^18.2.0",
  "antd": "^5.12.8",
  "framer-motion": "^10.16.16",
  "react-typed": "^2.0.12",
  "aos": "^2.3.4",
  "@ant-design/icons": "^5.2.6"
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sahilarya20/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the portfolio

### Building for Production

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── index.html
│   └── Sahil_resume.pdf
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Experience.js
│   │   ├── Projects.js
│   │   ├── Skills.js
│   │   ├── Education.js
│   │   ├── Achievements.js
│   │   ├── Contact.js
│   │   └── Footer.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎨 Customization

### Colors & Theming

The portfolio uses a custom Ant Design theme. You can modify colors in `src/App.js`:

```javascript
const theme = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    // ... other theme tokens
  },
};
```

### Content Updates

1. **Personal Information**: Update details in `src/components/Hero.js`
2. **Experience**: Modify the experience array in `src/components/Experience.js`
3. **Projects**: Update project details in `src/components/Projects.js`
4. **Skills**: Customize skills and proficiency levels in `src/components/Skills.js`
5. **Contact**: Update contact information in `src/components/Contact.js`

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add it to `src/App.js`
3. Update the navigation menu in `src/components/Header.js`

## 🌟 Key Highlights

- **Performance Optimized**: Lazy loading and efficient rendering
- **SEO Friendly**: Semantic HTML structure
- **Accessibility**: ARIA labels and keyboard navigation support
- **Cross-browser Compatible**: Tested on modern browsers
- **Mobile-first Design**: Responsive breakpoints for all screen sizes

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile: < 576px
- Tablet: 576px - 768px
- Desktop: > 768px

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 📧 Contact

- **Email**: sahilarya53@gmail.com
- **Phone**: +91 9582006504
- **LinkedIn**: [sahil-a-4a262211a](https://linkedin.com/in/sahil-a-4a262211a)
- **GitHub**: [Sahilarya20](https://github.com/Sahilarya20)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Ant Design](https://ant.design/) for the amazing UI components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [React](https://reactjs.org/) for the powerful framework
- [Unsplash](https://unsplash.com/) for high-quality images

---

**Made with ❤️ by Sahil Arya** 
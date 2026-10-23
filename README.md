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
## 3D Workspace (src/experience)

The site opens in an interactive 3D developer room (React Three Fiber). The previous scrolling portfolio is kept as the **Classic** view, which is also the automatic fallback when WebGL or the 3D scene is unavailable. The choice is remembered in `localStorage` (`portfolio-view`).

- Controls: WASD / arrows / on-screen pad, click the floor, click glowing stations, drag to orbit, scroll or pinch to zoom, double-click to reset, `Esc` closes the panel.
- Content lives in `src/data/portfolio.js` (add projects such as MDM Studio or Wormhole there).
- Layout, collisions and station positions: `src/experience/sections.js`, `src/experience/collision.js`.

### Avatar

`src/experience/scene/config.js` controls the character.

- `AVATAR.mode = 'procedural'`: a stylised athletic character built in code (`ProceduralHuman.js`) with procedural idle/breathing, blinking, walk, turn, cursor-following head and eyes, a wave that ends in a front double-biceps pose, and a short greeting. Skin, hair, beard, vest and joggers colours are in `HUMAN`. It is an approximation of the reference photo, not a scan.
- `AVATAR.mode = 'glb'` (default): loads any rigged GLB with animation clips. Put the file in `public/models/`, set `AVATAR.url`, and adjust `AVATAR.clips` (substring match on clip names: idle, walk, turn, wave, greet) and `AVATAR.forwardOffset`. The model is auto-scaled to `AVATAR.height`. `RobotExpressive.glb` (CC0, three.js examples) is included as a working sample.

To get a photo-accurate GLB, generate one with a tool such as Ready Player Me, Avaturn, Meshy or Tripo from the reference photo, retarget Mixamo animations if the result has none, then compress it: `npx gltf-transform optimize in.glb out.glb --compress meshopt --texture-compress webp`.

### Optional contact endpoint

The contact form opens a pre-filled email by default. To post to a form service instead, set `REACT_APP_CONTACT_ENDPOINT` (e.g. a Formspree URL) in the Vercel project environment variables.

### Deploy

Vercel auto-detects Create React App: `npm install`, `npm run build`, output `build/`. `vercel.json` adds long-lived caching for `/models/*`.

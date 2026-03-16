# 🧮 Mathematical Exercises

A comprehensive web application designed to help 5th-grade students practice and improve their mathematical skills through timed exercises.

## 🎯 Features

- **Interactive Math Problems**: Practice addition, subtraction, multiplication, and division
- **Timed Sessions**: Complete problems within a time limit to build speed and accuracy
- **Progress Tracking**: Monitor your improvement across multiple sessions
- **Responsive Design**: Works seamlessly on tablets, phones, and desktop computers
- **Bilingual Support**: Available in English and German
- **Local Data Storage**: Your progress is saved locally in your browser

## 📚 Educational Value

This application is specifically designed for 5th-grade students to:
- Reinforce fundamental arithmetic operations
- Develop mental math skills
- Build confidence in mathematical problem-solving
- Practice time management during assessments
- Track personal progress and improvement

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs directly in your browser

### How to Use

1. **Choose Language**: Select your preferred language (English/Deutsch) in the top-right corner
2. **Select Session**: Click on any available session card to begin
3. **Start Session**: Click "Start Session" to begin the timed exercise
4. **Solve Problems**: Answer each math problem as quickly and accurately as possible
5. **Skip if Needed**: Use "Skip Problem" to move difficult problems to the end
6. **View Results**: See your score, accuracy, and review incorrect answers
7. **Track Progress**: Completed sessions show your score for future reference

## 🧠 Problem Types

Each session includes problems evenly distributed across four categories:
- **Addition** (+): Combining numbers
- **Subtraction** (−): Finding the difference
- **Multiplication** (×): Repeated addition
- **Division** (÷): Splitting into equal groups

## ⏱️ Session Structure

- **Session Length**: 100 problems (25 of each type) in 10 minutes
- **Tablet Input**: Touch-friendly number input
- **Skip Functionality**: Move challenging problems to the end of the queue

## 🌐 Languages

The application supports two languages:
- **English**: Complete English interface
- **Deutsch**: Vollständige deutsche Benutzeroberfläche

Language preference is automatically saved and remembered between sessions.

## 🛠️ Technical Details

- **Framework**: React 19 with TypeScript
- **Styling**: CSS with responsive design
- **Storage**: Browser localStorage for progress tracking
- **Deployment**: Single-page application, no server required

## 🚀 Deployment

This application is built as a static single-page application that can be deployed to any static web hosting service.

### Building for Production

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Build the Application**:
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `build/` folder.

3. **Deploy the Static Files**:
   Upload the entire contents of the `build/` folder to your web server or hosting service.

### Hosting Options

- **Netlify**: Drag and drop the `build/` folder or connect your GitHub repository
- **Vercel**: Deploy directly from GitHub or upload the `build/` folder
- **GitHub Pages**: Use GitHub Actions to automatically build and deploy
- **AWS S3 + CloudFront**: Static hosting with CDN for global distribution
- **Traditional Web Hosting**: Upload files via FTP to any web server

### Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Verify `build/index.html` exists
- [ ] Upload all files from `build/` folder (not the folder itself)
- [ ] Ensure the hosting service serves `index.html` as the default file
- [ ] Test the deployed application in a web browser

## 📱 Device Compatibility

- **Desktop Computers**: Full keyboard and mouse support
- **Tablets**: Touch-optimized interface with virtual keyboard support
- **Mobile Phones**: Responsive design with touch-friendly controls

## 🎓 Educational Standards

Aligned with 5th-grade mathematics curriculum standards covering:
- Basic arithmetic operations
- Problem-solving strategies
- Time management skills
- Self-assessment and progress tracking

## 📞 Support

If you encounter any issues or have suggestions for improvement, please check that you're using a modern web browser and try refreshing the page.

## 📄 License

This educational tool is provided as-is for learning purposes.

---

*Made with ❤️ for young mathematicians*
# MedVoice AI - Vue 3 Application

A modern Vue 3 application showcasing the MedVoice AI project - an AI-powered speech recognition and intelligent medical assistance platform.

## Live Demo

Visit the live website: [http://localhost:5173](http://localhost:5173)
Try the interactive demo: [http://localhost:5173/demo](http://localhost:5173/demo)

## Recent Updates

This project has been migrated from a static HTML/CSS/JS website to a modern Vue 3 application with:

1. **Vue 3 Migration**: Complete conversion to Vue 3 with TypeScript
2. **Navigation Component**: Extracted navigation into a reusable Header component  
3. **Tailwind CSS Integration**: Modern styling with Tailwind CSS v4
4. **Complete Content**: All missing sections from original HTML now included
5. **Interactive Demo**: Voice recording simulation page
6. **Responsive Design**: Mobile-first design with modern utilities

## Features

- **Multilingual Support**: English, Uzbek, and Russian with vue-i18n
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Modern UI**: Clean, professional healthcare-focused design
- **Team Showcase**: Complete team profiles with roles
- **Interactive Demo**: Voice recording simulation
- **Complete Sections**: All original HTML sections included

## Technologies Used

- Vue 3 with Composition API
- TypeScript  
- Tailwind CSS v4
- JSON-based translation system
- Font Awesome icons
- Inter font family

## Project Structure

```
medvoice-ai/
├── index.html          # Main website file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── translations/       # Language files
│   ├── en.json        # English translations
│   ├── uz.json        # Uzbek translations
│   └── ru.json        # Russian translations
├── public/
│   └── img/           # Team member avatars
├── vercel.json        # Vercel deployment config
└── package.json       # Project metadata
```

## Languages Supported

- 🇺🇸 **English** - Primary language
- 🇺🇿 **O'zbekcha** - Uzbek language support
- 🇷🇺 **Русский** - Russian language support

## Team

- **Furqat** - Team Lead & Art Director
- **Islombek** - AI/ML Engineer
- **Muhammad** - Backend Developer
- **Akobir** - Frontend Developer

## Local Development

1. Clone the repository
2. Open `index.html` in a browser or serve with a local server:

   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

## Deployment

This project is optimized for Vercel deployment with:

- Static file optimization
- JSON translation caching
- Proper content headers
- Mobile-responsive design

## License

MIT License - feel free to use for your own hackathon projects!

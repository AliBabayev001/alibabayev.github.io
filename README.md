# Ali Babayev's Portfolio

A professional, responsive portfolio website showcasing my skills, projects, and background as a first-year Computer Science student at ADA University.

## Features

- **Multi-page Design**: Home, About, and Projects pages with seamless navigation
- **Responsive Layout**: Fully responsive design optimized for mobile, tablet, and desktop
- **Circular Portrait**: Professional circular portrait image on the home page
- **GitHub Integration**: Direct links to GitHub profile and repository
- **Project Showcase**: Detailed project pages with descriptions and image galleries
- **Skills Display**: Organized skills in Mathematics, Tutoring, and Computer Science
- **Contact Section**: Unified "Get In Touch" section across all pages with multiple contact methods
- **Smooth Navigation**: Sticky navbar with smooth scrolling and active link highlighting
- **Mobile-Optimized**: No horizontal overflow/skewing on mobile devices

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Design**: Responsive Grid/Flexbox layouts
- **Hosting**: GitHub Pages
- **Version Control**: Git

## File Structure

```
alibabayev.github.io/
├── index.html                      # Home page (root required for GitHub Pages)
├── about.html                      # About page with bio and skills
├── projects.html                   # Projects showcase page
├── README.md                       # Project documentation
├── src/                            # Source files
│   ├── script.js                   # Interactive features (search, scroll, animations)
│   └── styles.css                  # Global stylesheet with CSS variables
├── docs/                           # Documentation
│   ├── AliBabayevmd.md             # AI conversation transcript
│   ├── DESIGN.md                   # Design system documentation
│   ├── technicaldoc.md             # Technical documentation
│   └── index.md                    # Jekyll index markdown
├── _includes/                      # Reusable components
│   ├── navbar.html                 # Navigation bar component
│   └── footer.html                 # Footer component
├── _layouts/                       # Jekyll templates
│   └── default.html                # Master layout template
├── assets/                         # Jekyll assets
│   ├── css/
│   ├── js/
│   └── images/
├── images/                         # Project and portfolio images
│   ├── image.png                   # Portrait image
│   ├── portrait.jpg
│   └── [project images]            # Project gallery images
├── _config.yml                     # Jekyll configuration
├── Gemfile                         # Ruby dependencies
└── .gitignore                      # Git ignore file
```

## Features Breakdown

### Home Page

- Hero section with greeting and subtitle
- Brief introduction and call-to-action
- Preview cards for About and Projects sections
- Contact information and social links

### About Page

- Full biography with family background
- Math achievements and academic highlights
- Skills organized by category (Mathematics, Tutoring, Computer Science)
- Contact section

### Projects Page

- Detailed project: "How does hardware work?"
- Project gallery with multiple images
- Project description and role information
- Contact section

## How to View

**Live Website**: [https://alibabayev001.github.io/alibabayev.github.io/](https://alibabayev001.github.io/alibabayev.github.io/)

**Local Viewing**:

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Or use a local server (e.g., Live Server in VS Code)

## Key Technical Features

- **Multi-page Search**: Search functionality across all pages with sessionStorage
- **Lazy Image Loading**: Performance optimization for images
- **Smooth Scrolling**: Enhanced navigation experience
- **Mobile Responsiveness**: Optimized navbar and layout for mobile devices
- **Email Handling**: Click-friendly email buttons without navigation issues
- **Active Navigation Highlighting**: Visual feedback for current page

## Author

**Ali Babayev**

- First-year Computer Science student at ADA University
- Email: [your email]
- GitHub: [https://github.com/AliBabayev001](https://github.com/AliBabayev001)
- Codecademy: [https://www.codecademy.com/profiles/AliBabayev](https://www.codecademy.com/profiles/AliBabayev)

## Repository

- **GitHub Repository**: [https://github.com/AliBabayev001/alibabayev.github.io](https://github.com/AliBabayev001/alibabayev.github.io)
- **Website Repository Link**: Available on all pages under "View Website Repository on GitHub"

## Design Source & Documentation

This portfolio features a **custom-designed interface** created specifically for this project. The design emphasizes professionalism, user experience, and accessibility.

### Design Philosophy

- **Professional Appearance**: Clean, modern design representing a CS student's portfolio
- **User Experience**: Intuitive navigation with smooth interactions
- **Responsive Design**: Seamless experience across mobile, tablet, and desktop
- **Accessibility**: WCAG AA compliant with proper contrast and semantic HTML
- **Performance**: Optimized CSS with custom properties, vanilla JavaScript

### Design Elements

**Color Palette**:

- Primary: `#667eea` (Professional blue) with dark variant `#764ba2`
- Secondary: `#3498db` (Accent blue) with dark variant `#2980b9`
- Neutrals: Grays for text (`#333`), backgrounds (`#f9f9f9`), and borders (`#ddd`)

**Typography**:

- Font Stack: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Responsive sizing: 3rem headings down to 0.875rem captions
- Clear hierarchy for easy content scanning

**Spacing System**:

- CSS custom properties for consistency: `--spacing-xs` to `--spacing-2xl`
- 8px base unit for mathematical consistency
- Adequate whitespace reduces cognitive load

**Animations & Interactions**:

- Smooth transitions with consistent timing (`--transition-fast/normal/slow`)
- Hover effects on interactive elements
- Fade-in animations for scroll reveal
- GPU-accelerated transforms for performance

**Responsive Breakpoints**:

- Mobile (320-480px): Single column, simplified layout
- Tablet (481-768px): Two columns, adjusted spacing
- Desktop (769px+): Full layout with optimal typography

### Design Documentation

For comprehensive design documentation including:

- Complete design system
- Component specifications
- Accessibility features
- Animation specifications
- Performance considerations

See: **[DESIGN.md](./DESIGN.md)** - Full design documentation and specifications

### Custom Development

- **No Templates**: Designed and built from scratch
- **No Frameworks**: Vanilla HTML, CSS, and JavaScript
- **Modular Architecture**: 5 JavaScript modules (Navigation, Scrolling, Search, Email, UI)
- **CSS Variables**: Complete theming system for easy customization

## Development Notes

- Built with vanilla HTML, CSS, and JavaScript (no frameworks)
- Responsive design implemented with CSS Grid and Flexbox
- Git workflow with meaningful commits showing development progress
- Mobile-first responsive design approach
- Custom CSS variables system for maintainability
- Modular JavaScript architecture for scalability

## License

This portfolio is personal and open for viewing. All code is available on GitHub.

---

**Last Updated**: December 13, 2025

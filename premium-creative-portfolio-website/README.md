# Premium Personal Portfolio

A visually striking, modern personal portfolio website built with **raw HTML, CSS, and vanilla JavaScript** — no frameworks or libraries.

## 🚀 Quick Start

1. Place your professional photo as `assets/profile.jpg`
2. Open `index.html` in your browser
3. Customize content by searching for `EDIT:` comments throughout the code

## 📁 Project Structure

```
portfolio/
├── index.html          ← Main HTML file
├── css/
│   └── style.css       ← All styling & design system
├── js/
│   └── script.js       ← All interactivity
├── assets/
│   ├── profile.jpg     ← YOUR professional portrait
│   ├── project-01.jpg  ← Project screenshot (optional)
│   ├── project-02.jpg  ← Project screenshot (optional)
│   ├── project-03.jpg  ← Project screenshot (optional)
│   └── project-04.jpg  ← Project screenshot (optional)
└── README.md
```

## ✏️ What to Customize

Search for `EDIT:` in the code to find all editable sections:

| File | What to change |
|------|---------------|
| `index.html` | Name, title, bio, skills, projects, experience, contact info, social links |
| `css/style.css` | Colors (CSS variables at top), fonts, spacing |
| `js/script.js` | Project modal data, counter targets |

### Changing the Color Scheme

Edit the CSS variables at the top of `css/style.css`:

```css
:root {
    --accent: #c9a84c;        /* Main accent color */
    --accent-rgb: 201, 168, 76; /* Same color in RGB */
    --accent-hover: #dbb965;  /* Lighter variant */
    --accent-dark: #9e8338;   /* Darker variant */
}
```

### Profile Photo Tips

- Use a high-quality professional headshot
- Transparent or clean background works best
- Minimum recommended size: 800×1066px
- Portrait orientation (3:4 aspect ratio)

## ⚡ Features

- **Premium design** — Art-directed, sophisticated layout
- **Smooth animations** — Scroll reveals, counters, parallax
- **Custom cursor** — Elegant dot + outline (desktop only)
- **Project modal** — Click-to-view project details
- **Form validation** — Client-side with clear error messages
- **Fully responsive** — Optimized for all screen sizes
- **Accessible** — Semantic HTML, ARIA, keyboard navigation, prefers-reduced-motion
- **Performant** — Lazy loading, efficient animations, no dependencies
- **Mobile menu** — Animated hamburger navigation

## 🛠 Tech Stack

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+, Intersection Observer)
- Google Fonts (Inter)

## 📝 Connecting the Contact Form

The form validates client-side but doesn't send emails. To connect it:

1. **Formspree**: Change the form action to `https://formspree.io/f/YOUR_ID`
2. **Netlify Forms**: Add `netlify` attribute to the form tag
3. **Custom backend**: Send form data via `fetch()` in the submit handler

## 📄 License

Free for personal use. Credit appreciated but not required.

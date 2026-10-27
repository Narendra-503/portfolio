# Narendra Reddy — Interactive Portfolio

A responsive portfolio inspired by the dark, animated developer-portfolio style of the reference site, customized with your resume, projects, skills, and links. Built with **HTML, CSS, and JavaScript** (no Streamlit or framework build required).

## Included
- `index.html` — portfolio content and sections
- `style.css` — responsive layout, dark/light themes, cards, animations
- `script.js` — animated role text, hero card tilt, active navigation, scroll progress, reveal animations, skill/project filters, theme switch, back-to-top button, contact email draft
- `assets/Narendra_Resume.pdf` — resume download asset

## Run locally
1. Extract the ZIP.
2. Open the folder in VS Code.
3. Open `index.html` in your browser, or use the VS Code Live Server extension.
4. If using Live Server, right-click `index.html` and choose **Open with Live Server**.

Google Fonts and Lucide icons load from online CDNs; those extras require an internet connection. The site itself is static and does not need a server to preview.

## Publish free with GitHub Pages
1. Create a GitHub repository, for example `narendra-portfolio`.
2. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
5. Open the URL GitHub Pages provides.

## Personal links
- GitHub: https://github.com/Narendra-503
- LinkedIn: https://www.linkedin.com/in/narendra-reddy-435856259
- Email: narendrareddy07012005@gmail.com

## Before publishing
- Replace the generic GitHub profile links on project cards with direct project repository URLs, if you have them.
- Check resume dates, education details, and project descriptions for accuracy.
- The contact form prepares an email draft using `mailto:`; it does not send mail from a server.
\n\n### Navigation behavior\nThe navigation now displays one section at a time. Home opens the short About Me introduction; About, Skills, Projects, Experience, and Contact each open their own view.\n

Navigation note: Home, About, Skills, Projects, Experience, and Contact are app-style views. Clicking a menu item displays only that view, updates the URL hash, and returns to the top instead of scrolling through one long page.

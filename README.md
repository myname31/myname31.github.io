# ZanSky AFTERDARK

A monochrome retro-cyberpunk personal portfolio built with HTML, CSS, and Vanilla JavaScript. Designed as a static site for **GitHub Pages**.

## Features

- Responsive multi-section layout for mobile and desktop
- Monochrome pixel-city hero illustration, animated pixel rain, scanlines, subtle noise, and glitch typography
- Scroll reveal and active section navigation
- Interactive quick terminal with a mobile keyboard-aware layout
- Live public GitHub profile statistics
- Dynamic social links: only platforms with a valid URL are displayed
- Birthday date and live countdown to the next celebration
- Custom local MP3 player with play/pause, volume control, track label, and animated equalizer; starts OFF
- Original Geometry Dash-inspired animated cube and obstacle scene
- Personality and hobbies section instead of previous employment details
- Reduced-motion support
- No framework, build step, or server required

## Deploy to GitHub Pages

1. Create or open the repository named **`YOUR_USERNAME.github.io`**.
2. Put `index.html`, `style.css`, `script.js`, and this README in the repository root (not inside an extra project folder).
3. Push/commit the files to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site at `https://YOUR_USERNAME.github.io/`.

No Vercel configuration, CLI, build command, or output directory is needed. The site uses relative asset paths, so it also works when published from a repository subpath.

## Run locally

Open `index.html` in a browser, or use any static server. Music playback starts only after the visitor presses the play button.

## Customize

Open `script.js` and edit the `CONFIG` object:

- `githubUser`: GitHub username used for public profile statistics.
- `socials`: add profile URLs for the platforms you want shown. Leave a value as `""` to hide that platform. Supported keys include `github`, `instagram`, `tiktok`, `youtube`, `facebook`, `x`, `linkedin`, `telegram`, `discord`, `threads`, `whatsapp`, `twitch`, `pinterest`, `reddit`, `medium`, `behance`, `dribbble`, and `website`.
- `projects`: project title, description, tags, and destination URL.
- `skills`: reference list for skills (edit matching skill markup in `index.html` too).

The birthday is set to **31 July 2007, Jakarta** in `birthdayClock()` in `script.js`. The countdown updates automatically; no yearly manual edit is needed.

## Custom music

The player loads a local MP3 file from `assets/music/sound.mp3`.

1. Put your chosen MP3 inside `assets/music/` and name it exactly `sound.mp3`.
2. Keep the relative path and filename unchanged, or update the `src` on the `audio#backgroundMusic` element in `index.html`.
3. Commit and push the MP3 together with the website files to GitHub Pages.

The player includes play/pause, a volume slider, a track label, and an animated equalizer. It starts OFF (`preload="none"`) and will not play until a visitor presses the button. If the MP3 is missing, the player displays `ADD SOUND.MP3` rather than playing automatically.

## Notes

- GitHub statistics use the public GitHub Users API and may be rate-limited.
- Google Fonts are loaded remotely; system fallbacks are included.
- The pixel city is CSS artwork and does not require a large external GIF or video.

# Yes-Or-Yes 💕

An interactive love-themed UI experiment where saying "No" is basically impossible.

![Demo](https://img.shields.io/badge/demo-live-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📖 Description

A playful, single-page romantic interactive web app built with pure HTML, CSS, and vanilla JavaScript. The app features a "Will you be my girlfriend?" question with two buttons — but the NO button has a mind of its own! It teleports away whenever you try to click it, making it impossible to say no. After multiple attempts, an angry cat appears with escalating warning messages. When YES is finally clicked, a beautiful success screen with heart animations celebrates the decision.

## 🚀 Quick Start

Simply open `index.html` in any modern web browser. No installation, dependencies, or build process required!

```bash
# Clone the repository
git clone https://github.com/yourusername/yes-or-yes.git

# Navigate to the project
cd yes-or-yes

# Open in browser
# Option 1: Double-click index.html
# Option 2: Use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

## ✨ Features

### Core Functionality

- **Centered Question**: "Will you be my girlfriend?" displayed on a beautiful frosted-glass card
- **Two Buttons**: YES (green) and NO (red) with distinct behaviors
- **Impossible NO Button**: Teleports to random positions on hover/touch, making it unclickable
- **Attempt Tracking**: Counts how many times the user tries to click NO
- **Angry Cat Warning**: After 3 attempts, shows a wobbly SVG cat with escalating funny messages
- **Success Screen**: When YES is clicked, displays a celebration screen with heart animations

### Visual Effects

- **Soft Pink Theme**: Beautiful gradient background with floating heart particles
- **Smooth Animations**: Cubic-bezier spring easing on button movements
- **Heart Burst**: Explosion animation when YES is clicked
- **Floating Hearts**: Continuous background heart particle system
- **Responsive Design**: Works perfectly on mobile and desktop

## 📋 Requirements

- ✅ No frameworks (only HTML, CSS, vanilla JavaScript)
- ✅ Clean, readable, well-commented code
- ✅ Responsive design for all screen sizes
- ✅ Zero external dependencies

## 🎨 Feature Breakdown

| Feature | Details |
| --- | --- |
| 💕 **Theme** | Soft pink gradient background with continuously floating heart particles |
| ❓ **Question** | "Will you be my girlfriend?" on a frosted-glass card |
| ✅ **YES Button** | Green, triggers a burst-hearts explosion animation then a full-screen "She said YES! 🎉" success screen |
| ❌ **NO Button** | Red, snaps to a fixed position and teleports to a random spot on every hover/touch — impossible to click |
| 🎞️ **Animations** | Cubic-bezier spring easing on NO button movement, floating hearts, heartbeat pulse, card pop-in |
| 📊 **Attempt Counter** | Tracks every NO hover attempt and shows running count below the card |
| 😾 **Angry Cat Warning** | Appears after 3 attempts — features a hand-crafted inline SVG orange cat that wobbles, with escalating funny messages |
| 📱 **Responsive** | Works on all screen sizes via clamp(), flex-wrap, and viewport-aware button positioning |
| 🚫 **No Dependencies** | Pure HTML/CSS/JS — zero frameworks, zero external resources |

## 🛠️ Technical Details

### File Structure

```text
yes-or-yes/
├── index.html    # Complete single-file application
└── README.md     # Documentation
```

### Key Technologies

- **HTML5**: Semantic markup and structure
- **CSS3**: Animations, gradients, backdrop-filter, flexbox
- **Vanilla JavaScript**: Event handling, DOM manipulation, dynamic animations

### Browser Compatibility

Works in all modern browsers that support:

- CSS Grid and Flexbox
- CSS Animations and Transitions
- ES6+ JavaScript features

## 🎮 How It Works

1. **Initial State**: The card displays the question with both buttons in normal flow
2. **First NO Hover**: The NO button switches to fixed positioning and teleports to a random location
3. **Subsequent Hovers**: Each hover/touch moves the button to a new random position
4. **Attempt Counter**: Updates after each escape attempt
5. **Warning System**: After 3 attempts, the angry cat appears with escalating messages
6. **YES Click**: Triggers heart burst animation and success screen
7. **Resize Handling**: Window resize repositions the NO button if it's in escape mode

## 📝 Customization

You can easily customize the app by modifying these constants in the JavaScript:

```javascript
const WARN_AFTER = 3;  // Attempts before warning appears
```

Change the warning messages in the `warningMessages` array, or modify colors in the CSS section to match your preferred theme.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Built with love for that special someone. 💕

---

Made with ❤️ using pure HTML, CSS, and JavaScript

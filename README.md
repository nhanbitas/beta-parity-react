
# Beta Parity React

**Beta Parity React** is a modern, lightweight, and customizable UI component library for React applications. Designed for scalability and maintainability, it offers a collection of reusable components that streamline the development of user interfaces.

## 🚀 Features

- **Fully Customizable**: Style components using CSS variables, theming, and props.
- **Lightweight & Performant**: Optimized for speed and minimal footprint.
- **TypeScript Support**: Provides full TypeScript definitions for better development experience.
- **Dark Mode Ready**: Easily toggle between light and dark themes.
- **Accessible & Responsive**: Built with accessibility and responsiveness in mind.
- **Flexible Layouts**: Grid and flex-based components for adaptive designs.
- **Comprehensive State Management**: Components handle complex UI states with minimal effort.

## 📦 Installation

Install via npm or yarn:

```sh
npm install beta-parity-react
```

Or with yarn:

```sh
yarn add beta-parity-react
```

## 🎨 Usage


Import Parity theme in your React application:

```tsx
import ThemeProvider from 'beta-parity-react/ui/theme';
export default function App() {
  return <ThemeProvider>... // Your application code</ThemeProvider>;
}
```

Import and use components in your React application:

```tsx
import { Button } from "beta-parity-react/ui/Button";

export default function App() {
  return <Button kind="ghost">Click Me</Button>;
}
```

## 🎛 Theming

Beta Parity React uses CSS variables for flexible theming. Customize themes using `:root` and `[data-scheme]` attributes:

```css
:root, [data-scheme="light"] {
    --par-color-text-primary: var(--par-gray-950);
}
[data-scheme="dark"] {
    --par-color-text-primary: var(--white);
}
```

## 📚 Available Components

- Read the [documentation](https://beta-parity-react.vercel.app/)

## 🛠 Development

Clone the repository and install dependencies:

```sh
# ui folder is not existing
git clone https://github.com/nhanbitas/beta-parity-react.git
npm run install:packages
```

Run the development server:

```sh
npm run dev:lib
npm run dev
```

Build the project:

```sh
npm run build:lib
npm run build
```

Start the project:

```sh
npm run start
```

Run tests:

```sh
npm test
```

## 📖 Documentation

Visit our [official documentation](https://beta-parity-react.vercel.app/) for full API reference and examples.

## 🔗 License

This project is licensed under the MIT License.

## 🤝 Contributing

We welcome contributions! Feel free to submit issues and pull requests.

### 🛠 How to Contribute

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Read the [dev information](./dev.note.md).
4. Read the [rules of component](./registry/src/components/component.md).
5. Write your code.
6. Commit your changes (`git commit -m "Add new feature"`).
7. Push to the branch (`git push origin feature-branch`).
8. Create a pull request.


### 🌍 Community & Support

Join the Beta Parity React community to get support, share ideas, and contribute:

- **GitHub Discussions**: [Here](https://beta-parity-react.vercel.app/)
- **Website contact**: [Here](https://beta-parity-react.vercel.app/)
- **Design Support**: [Here](https://beta-parity-react.vercel.app/)

### 🔥 Roadmap

We are constantly working to improve Beta Parity React. Here are some upcoming features:

- New Components: Expanding the library with more UI elements.

- Improved Documentation: More examples, tutorials, and guides.

- Performance Enhancements: Optimizing rendering and bundle size.

- Plugin System: Extend functionality with plugins.

📚 Stay tuned for updates!

---

💡 **Beta Parity React - Simplify your UI development!**




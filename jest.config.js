module.exports = {
     testEnvironment: 'jsdom', // Use jsdom as the environment
     transform: {
       '^.+\\.(ts|tsx)$': 'babel-jest', // Transform TypeScript files using babel-jest
       '^.+\\.(js|jsx)$': 'babel-jest', // Transform JavaScript and JSX files
     },
     transformIgnorePatterns: [
       "/node_modules/(?!your-package-to-transform|another-package-to-transform)/"
     ], // Optional: If you need to transform files in node_modules
   };
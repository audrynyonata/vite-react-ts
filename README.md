### vite-react-ts
# Shopping Cart
My take on the shopping cart demo project as tutored on this 
[typescript course](https://www.youtube.com/watch?v=gieEQFIfgYc "TypeScript Full Course for Beginners | Complete All-in-One Tutorial | 8 Hours") by Dave Gray ([gitdagray](https://github.com/gitdagray/typescript-course) on GitHub)

This project is built on:
1. [React 18](https://react.dev/)
2. [Typescript](https://www.typescriptlang.org/docs/)
3. [Vite](https://vitejs.dev/)
4. [json-server](https://github.com/typicode/json-server)
  
How to run:
1. Clone this repository to your local machine and run,
```bash
   cd vite-react-ts
   
   npm install
   npm run dev
  ```
2. On separate terminal,
```bash
   json-server data/products.json
```

Concepts showcased in this project:
* React Functional components + Hooks
   * `useState`
   * Fetch API on initial page load with `useEffect`
   * Managing complex state with `useReducer`, dispatch, action type & payload
   * Avoid prop drilling with `useContext`, `createContext`, Context.Provider
   * Optimization using `useMemo` and `React.memo`
   * Custom Hooks
* Typescript usage with React
    * Type annotation
    * Type inference
    * Type narrowing
    * Generics
    * async Promise
    * `keyof` and `typeof` assertions
    * Defining type and interface for props
    * HTML ChangeEvent handling
 * Static img asset handling in Vite




***

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# React Learn Cursor

这是一个基于 Vite + React + TypeScript 的 React 学习项目，用于 Vue3 开发者学习 React 框架。

## ✨ 特性

- ⚡️ **快速启动**：使用 Vite 作为构建工具，享受极速的开发体验。
- ⚛️ **React 19**：使用最新的 React 版本。
- 🔵 **TypeScript**：全量使用 TypeScript，提供静态类型检查。
- 📱 **H5 适配**：使用 `postcss-px-to-viewport` 实现 `vw` 适配。
- 🚗 **路由**：使用 `react-router-dom` 进行路由管理。
- 📦 **状态管理**：使用 `redux` 和 `@reduxjs/toolkit` 进行状态管理。
- 🌐 **API 请求**：使用 `axios` 封装 API 请求。
- 💅 **UI 组件库**：集成 `antd-mobile` 作为 UI 组件库。
- 💎 **代码规范**：使用 `eslint` 和 `prettier` 保证代码质量和风格统一。
- 📁 **目录结构**：清晰的模块化目录结构。
- 훅 **自定义 Hooks**：内置了常用的自定义 Hooks。
- 🌿 **环境变量**：支持多环境配置。

## 🚀 快速开始

1.  **克隆项目**

    ```bash
    git clone <your-repo-url>
    cd react_learn_cursor
    ```

2.  **安装依赖**

    ```bash
    npm install
    ```

3.  **运行项目**

    ```bash
    npm run dev
    ```

4.  **打包项目**

    ```bash
    npm run build
    ```

## 📁 目录结构

```
.
├── public
├── src
│   ├── api               # API 请求模块
│   ├── assets            # 静态资源
│   ├── components        # 公共组件
│   ├── hooks             # 自定义 Hooks
│   ├── pages             # 页面
│   ├── router            # 路由配置
│   ├── store             # Redux store
│   ├── styles            # 公共样式
│   └── utils             # 工具函数
├── .env                  # 通用环境变量
├── .env.development      # 开发环境变量
├── .env.production       # 生产环境变量
├── .eslintrc.cjs         # ESLint 配置
├── .prettierrc.js        # Prettier 配置
├── postcss.config.js     # PostCSS 配置
├── tsconfig.json         # TypeScript 配置
└── vite.config.ts        # Vite 配置
```

## 📝 使用说明

### 环境变量

在 `.env` 文件中可以配置通用环境变量，例如：

```
VITE_APP_TITLE=React Learn Cursor
VITE_API_BASE_URL=/api
```

在 `.env.development` 或 `.env.production` 中可以配置特定环境的变量。

### 路由

在 `src/router/index.tsx` 中配置路由。

### Redux

在 `src/store/modules` 目录下创建新的 slice，并将其添加到 `src/store/modules/index.ts` 中。

### API 请求

在 `src/api` 目录下创建新的 API 模块，并使用 `src/api/request.ts` 中封装的 `axios` 实例。

## 🤝 贡献

欢迎提交 issue 或 pull request。

## 📄 许可证

[MIT](LICENSE)

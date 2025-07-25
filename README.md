# React 学习项目

这是一个专门为Vue开发者设计的React学习项目，通过实际案例帮助您快速掌握React开发。

## 🎯 项目目标

- 从Vue2/Vue3开发者的角度学习React
- 通过实际项目掌握React核心概念
- 理解Vue和React的对应关系
- 建立完整的React开发技能体系

## 🚀 技术栈

- **React 19.1.0** - 最新版本的React
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **React Router** - 路由管理
- **Redux Toolkit** - 状态管理
- **Antd Mobile** - UI组件库
- **SCSS** - 样式预处理

## 📁 项目结构

```
src/
├── api/                 # API接口
├── assets/             # 静态资源
├── components/         # 公共组件
├── hooks/              # 自定义Hooks
├── pages/              # 页面组件
│   ├── Home/           # 首页（计数器示例）
│   ├── Todo/           # 待办事项应用
│   ├── UserList/       # 用户列表（API调用示例）
│   └── ...             # 其他页面
├── router/             # 路由配置
├── store/              # Redux状态管理
├── styles/             # 全局样式
└── utils/              # 工具函数
```

## 🎓 学习路径

### 第一阶段：基础概念
1. **Home页面** - 计数器应用
   - useState状态管理
   - Redux Toolkit使用
   - 事件处理
   - 组件通信

2. **Todo页面** - 待办事项应用
   - 列表渲染
   - 表单处理
   - 本地存储
   - 条件渲染

3. **UserList页面** - 用户列表
   - API调用
   - 加载状态
   - 错误处理
   - 数据获取

### 第二阶段：进阶概念
- 自定义Hooks（useLocalStorage）
- 性能优化
- 组件设计模式
- 状态管理最佳实践

## 🔄 Vue vs React 对比

| 概念 | Vue 3 | React |
|------|-------|-------|
| 组件定义 | `<template>` + `<script setup>` | JSX函数组件 |
| 响应式数据 | `ref()`, `reactive()` | `useState()` |
| 计算属性 | `computed()` | `useMemo()` |
| 监听器 | `watch()` | `useEffect()` |
| 状态管理 | Pinia | Redux Toolkit |
| 路由 | Vue Router | React Router |

## 🛠️ 开发指南

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 📚 学习资源

### 官方文档
- [React官方文档](https://react.dev/)
- [React Router文档](https://reactrouter.com/)
- [Redux Toolkit文档](https://redux-toolkit.js.org/)

### 推荐阅读
- [Vue到React学习指南](./Vue到React学习指南.md) - 详细的概念对比
- [React学习指南](./React学习指南.md) - React核心概念详解

## 🎯 实践建议

1. **循序渐进** - 按照页面顺序学习，每个页面都包含特定的React概念
2. **动手实践** - 修改代码，添加新功能，理解每个概念的作用
3. **对比学习** - 结合Vue知识，理解React的设计理念
4. **项目实战** - 尝试重构现有的Vue项目为React

## 🔧 自定义开发

### 添加新页面
1. 在`src/pages/`下创建新页面
2. 在`src/router/index.tsx`中添加路由
3. 在Home页面添加导航链接

### 添加新Hook
1. 在`src/hooks/`下创建自定义Hook
2. 遵循React Hooks规范
3. 添加TypeScript类型定义

### 状态管理
1. 在`src/store/modules/`下创建新的slice
2. 在`src/store/modules/index.ts`中注册
3. 在组件中使用`useSelector`和`useDispatch`

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个学习项目！

## 📄 许可证

MIT License

---

**开始您的React学习之旅吧！** 🚀

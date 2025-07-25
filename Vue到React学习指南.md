# Vue到React学习指南

## 核心概念对比

### 1. 组件定义

**Vue 3 (Composition API)**
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const title = ref('Hello Vue')
const count = ref(0)

const increment = () => {
  count.value++
}
</script>
```

**React (Functional Component)**
```tsx
import { useState } from 'react'

const MyComponent = () => {
  const [title, setTitle] = useState('Hello React')
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={increment}>Count: {count}</button>
    </div>
  )
}
```

### 2. 响应式数据

| Vue 3 | React |
|-------|-------|
| `ref()` | `useState()` |
| `reactive()` | `useState()` (对象) |
| `computed()` | `useMemo()` |
| `watch()` | `useEffect()` |

### 3. 生命周期

**Vue 3**
```vue
<script setup>
import { onMounted, onUnmounted, onUpdated } from 'vue'

onMounted(() => {
  console.log('组件挂载')
})

onUnmounted(() => {
  console.log('组件卸载')
})

onUpdated(() => {
  console.log('组件更新')
})
</script>
```

**React**
```tsx
import { useEffect } from 'react'

const MyComponent = () => {
  useEffect(() => {
    console.log('组件挂载')
    
    return () => {
      console.log('组件卸载')
    }
  }, []) // 空依赖数组 = onMounted

  useEffect(() => {
    console.log('组件更新')
  }) // 无依赖数组 = onUpdated
}
```

### 4. 状态管理

**Vue 3 (Pinia)**
```js
// store/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})
```

**React (Redux Toolkit)**
```ts
// store/modules/counter.ts
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1
    }
  }
})
```

### 5. 路由

**Vue Router**
```vue
<template>
  <router-link to="/about">About</router-link>
  <router-view />
</template>
```

**React Router**
```tsx
import { Link, Routes, Route } from 'react-router-dom'

<Link to="/about">About</Link>
<Routes>
  <Route path="/about" element={<About />} />
</Routes>
```

## 学习路径建议

### 第一阶段：基础概念
1. **JSX vs Template** - 理解JSX语法
2. **Hooks vs Composition API** - 掌握useState, useEffect
3. **Props传递** - 父子组件通信
4. **事件处理** - onClick vs @click

### 第二阶段：进阶概念
1. **Context vs Provide/Inject** - 跨组件状态共享
2. **useMemo vs computed** - 性能优化
3. **useCallback vs 方法缓存** - 函数优化
4. **自定义Hooks vs Composables** - 逻辑复用

### 第三阶段：生态工具
1. **Redux Toolkit vs Pinia** - 状态管理
2. **React Router vs Vue Router** - 路由管理
3. **React Query vs Vue Query** - 数据获取
4. **Testing** - 单元测试

## 实践项目建议

### 1. 计数器应用 ✅ (已完成)
- 基础状态管理
- 事件处理

### 2. 待办事项应用
- 列表渲染
- 表单处理
- 本地存储

### 3. 用户管理应用
- API调用
- 表单验证
- 路由导航

### 4. 购物车应用
- 复杂状态管理
- 组件通信
- 性能优化

## 常见陷阱和注意事项

### 1. 状态更新
```tsx
// ❌ 错误 - 直接修改状态
const [user, setUser] = useState({ name: 'John', age: 25 })
user.age = 26 // 不会触发重新渲染

// ✅ 正确 - 创建新对象
setUser({ ...user, age: 26 })
```

### 2. 依赖数组
```tsx
// ❌ 可能导致无限循环
useEffect(() => {
  fetchData()
}, []) // 如果fetchData在组件内定义，应该加入依赖

// ✅ 正确
useEffect(() => {
  fetchData()
}, [fetchData]) // 需要useCallback包装fetchData
```

### 3. 条件渲染
```tsx
// ❌ 错误 - 条件语句在return外
const MyComponent = () => {
  if (loading) {
    return <div>Loading...</div>
  }
  
  return <div>Content</div>
}

// ✅ 正确 - 在JSX中使用条件
return (
  <div>
    {loading ? <div>Loading...</div> : <div>Content</div>}
  </div>
)
```

## 学习资源推荐

1. **官方文档**
   - React官方文档
   - React Router文档
   - Redux Toolkit文档

2. **实践项目**
   - 重构现有Vue项目为React
   - 创建新的React应用

3. **社区资源**
   - React社区
   - Stack Overflow
   - GitHub示例项目

## 下一步行动

1. 完善当前项目的其他页面
2. 添加更多交互功能
3. 实现API集成
4. 添加测试用例
5. 性能优化实践 
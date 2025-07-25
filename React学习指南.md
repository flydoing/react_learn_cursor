# React 学习指南 - Vue3 开发者视角

## 目录
- [基础概念对比](#基础概念对比)
- [组件开发](#组件开发)
- [状态管理](#状态管理)
- [生命周期](#生命周期)
- [事件处理](#事件处理)
- [条件渲染](#条件渲染)
- [列表渲染](#列表渲染)
- [表单处理](#表单处理)
- [样式处理](#样式处理)
- [路由管理](#路由管理)
- [Hooks 详解](#hooks-详解)
- [性能优化](#性能优化)
- [TypeScript 集成](#typescript-集成)

---

## 基础概念对比

### 1. 组件定义

**Vue3 (Composition API)**
```vue
<template>
  <div>{{ message }}</div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue3')
</script>
```

**React (函数组件)**
```tsx
import React, { useState } from 'react'

const MyComponent: React.FC = () => {
  const [message, setMessage] = useState('Hello React')
  
  return <div>{message}</div>
}

export default MyComponent
```

### 2. 响应式数据

**Vue3**
```vue
<script setup>
import { ref, reactive, computed, watch } from 'vue'

// 基本响应式
const count = ref(0)
const user = reactive({ name: 'John', age: 25 })

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 监听器
watch(count, (newVal, oldVal) => {
  console.log('count changed:', newVal, oldVal)
})
</script>
```

**React**
```tsx
import React, { useState, useMemo, useEffect } from 'react'

const MyComponent: React.FC = () => {
  // 基本状态
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({ name: 'John', age: 25 })
  
  // 计算属性
  const doubleCount = useMemo(() => count * 2, [count])
  
  // 监听器
  useEffect(() => {
    console.log('count changed:', count)
  }, [count])
  
  return <div>{doubleCount}</div>
}
```

---

## 组件开发

### 1. Props 传递

**Vue3**
```vue
<!-- 父组件 -->
<template>
  <ChildComponent 
    :title="title" 
    :user="user"
    @update="handleUpdate"
  />
</template>

<script setup>
import ChildComponent from './ChildComponent.vue'

const title = ref('Hello')
const user = reactive({ name: 'John' })

const handleUpdate = (data) => {
  console.log(data)
}
</script>

<!-- 子组件 -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ user.name }}</p>
    <button @click="$emit('update', 'new data')">Update</button>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  user: Object
})

defineEmits(['update'])
</script>
```

**React**
```tsx
// 父组件
import React, { useState } from 'react'
import ChildComponent from './ChildComponent'

const ParentComponent: React.FC = () => {
  const [title, setTitle] = useState('Hello')
  const [user, setUser] = useState({ name: 'John' })
  
  const handleUpdate = (data: string) => {
    console.log(data)
  }
  
  return (
    <ChildComponent 
      title={title}
      user={user}
      onUpdate={handleUpdate}
    />
  )
}

// 子组件
interface ChildProps {
  title: string
  user: { name: string }
  onUpdate: (data: string) => void
}

const ChildComponent: React.FC<ChildProps> = ({ title, user, onUpdate }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{user.name}</p>
      <button onClick={() => onUpdate('new data')}>Update</button>
    </div>
  )
}
```

### 2. 组件组合

**Vue3 (插槽)**
```vue
<!-- 父组件 -->
<template>
  <Layout>
    <template #header>
      <h1>Header Content</h1>
    </template>
    <template #default>
      <p>Main Content</p>
    </template>
    <template #footer>
      <p>Footer Content</p>
    </template>
  </Layout>
</template>

<!-- Layout 组件 -->
<template>
  <div class="layout">
    <header><slot name="header" /></header>
    <main><slot /></main>
    <footer><slot name="footer" /></footer>
  </div>
</template>
```

**React (Children Props)**
```tsx
// 父组件
import React from 'react'
import Layout from './Layout'

const ParentComponent: React.FC = () => {
  return (
    <Layout
      header={<h1>Header Content</h1>}
      footer={<p>Footer Content</p>}
    >
      <p>Main Content</p>
    </Layout>
  )
}

// Layout 组件
interface LayoutProps {
  header?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ header, children, footer }) => {
  return (
    <div className="layout">
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  )
}
```

---

## 状态管理

### 1. 本地状态

**Vue3**
```vue
<script setup>
import { ref, reactive } from 'vue'

// 简单状态
const count = ref(0)
const increment = () => count.value++

// 复杂状态
const form = reactive({
  name: '',
  email: '',
  age: 0
})

const updateForm = (field: string, value: any) => {
  form[field] = value
}
</script>
```

**React**
```tsx
import React, { useState } from 'react'

const MyComponent: React.FC = () => {
  // 简单状态
  const [count, setCount] = useState(0)
  const increment = () => setCount(prev => prev + 1)
  
  // 复杂状态
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: 0
  })
  
  const updateForm = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }
  
  return <div>{count}</div>
}
```

### 2. 全局状态管理

**Vue3 (Pinia)**
```ts
// store/counter.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  
  return { count, doubleCount, increment, decrement }
})

// 组件中使用
<script setup>
import { useCounterStore } from '@/store/counter'

const counter = useCounterStore()
</script>
```

**React (Zustand)**
```tsx
// store/counter.ts
import { create } from 'zustand'

interface CounterStore {
  count: number
  doubleCount: number
  increment: () => void
  decrement: () => void
}

export const useCounterStore = create<CounterStore>((set, get) => ({
  count: 0,
  doubleCount: 0,
  increment: () => set(state => ({ 
    count: state.count + 1,
    doubleCount: (state.count + 1) * 2
  })),
  decrement: () => set(state => ({ 
    count: state.count - 1,
    doubleCount: (state.count - 1) * 2
  }))
}))

// 组件中使用
import { useCounterStore } from '@/store/counter'

const MyComponent: React.FC = () => {
  const { count, increment } = useCounterStore()
  
  return <button onClick={increment}>{count}</button>
}
```

---

## 生命周期

### 生命周期对比

| Vue3 生命周期 | React 生命周期 | 说明 |
|--------------|---------------|------|
| `onMounted` | `useEffect(() => {}, [])` | 组件挂载后 |
| `onUpdated` | `useEffect(() => {}, [deps])` | 依赖更新后 |
| `onUnmounted` | `useEffect(() => { return cleanup }, [])` | 组件卸载前 |
| `onBeforeMount` | 无直接对应 | 挂载前 |
| `onBeforeUnmount` | 无直接对应 | 卸载前 |

**Vue3**
```vue
<script setup>
import { onMounted, onUnmounted, onUpdated } from 'vue'

onMounted(() => {
  console.log('Component mounted')
})

onUpdated(() => {
  console.log('Component updated')
})

onUnmounted(() => {
  console.log('Component will unmount')
})
</script>
```

**React**
```tsx
import React, { useEffect } from 'react'

const MyComponent: React.FC = () => {
  useEffect(() => {
    console.log('Component mounted')
    
    return () => {
      console.log('Component will unmount')
    }
  }, [])
  
  useEffect(() => {
    console.log('Component updated')
  }, [/* dependencies */])
  
  return <div>Component</div>
}
```

---

## 事件处理

### 1. 基础事件

**Vue3**
```vue
<template>
  <button @click="handleClick">Click me</button>
  <input @input="handleInput" @keyup.enter="handleEnter" />
  <form @submit.prevent="handleSubmit">
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
const handleClick = (event) => {
  console.log('Clicked', event)
}

const handleInput = (event) => {
  console.log('Input value:', event.target.value)
}

const handleEnter = () => {
  console.log('Enter pressed')
}

const handleSubmit = () => {
  console.log('Form submitted')
}
</script>
```

**React**
```tsx
import React from 'react'

const MyComponent: React.FC = () => {
  const handleClick = (event: React.MouseEvent) => {
    console.log('Clicked', event)
  }
  
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', event.target.value)
  }
  
  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log('Enter pressed')
    }
  }
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Form submitted')
  }
  
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <input onChange={handleInput} onKeyUp={handleKeyUp} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
```

### 2. 事件修饰符

**Vue3**
```vue
<template>
  <button @click.stop="handleClick">Stop Propagation</button>
  <button @click.prevent="handleClick">Prevent Default</button>
  <button @click.once="handleClick">Once Only</button>
</template>
```

**React**
```tsx
const MyComponent: React.FC = () => {
  const handleClickStop = (event: React.MouseEvent) => {
    event.stopPropagation()
    console.log('Clicked with stop')
  }
  
  const handleClickPrevent = (event: React.MouseEvent) => {
    event.preventDefault()
    console.log('Clicked with prevent')
  }
  
  const handleClickOnce = (() => {
    let clicked = false
    return (event: React.MouseEvent) => {
      if (!clicked) {
        clicked = true
        console.log('Clicked once')
      }
    }
  })()
  
  return (
    <div>
      <button onClick={handleClickStop}>Stop Propagation</button>
      <button onClick={handleClickPrevent}>Prevent Default</button>
      <button onClick={handleClickOnce}>Once Only</button>
    </div>
  )
}
```

---

## 条件渲染

### 1. 基础条件渲染

**Vue3**
```vue
<template>
  <div v-if="isVisible">Visible Content</div>
  <div v-else-if="isLoading">Loading...</div>
  <div v-else>Hidden Content</div>
  
  <div v-show="isVisible">Always in DOM</div>
</template>

<script setup>
const isVisible = ref(true)
const isLoading = ref(false)
</script>
```

**React**
```tsx
import React, { useState } from 'react'

const MyComponent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <div>
      {isVisible ? (
        <div>Visible Content</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>Hidden Content</div>
      )}
      
      {/* 类似 v-show，通过 CSS 控制显示 */}
      <div style={{ display: isVisible ? 'block' : 'none' }}>
        Always in DOM
      </div>
    </div>
  )
}
```

### 2. 复杂条件渲染

**Vue3**
```vue
<template>
  <div>
    <template v-if="user">
      <h1>Welcome, {{ user.name }}</h1>
      <p>Email: {{ user.email }}</p>
    </template>
    <template v-else>
      <p>Please log in</p>
    </template>
  </div>
</template>
```

**React**
```tsx
import React from 'react'

interface User {
  name: string
  email: string
}

const MyComponent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  
  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  )
}
```

---

## 列表渲染

### 1. 基础列表渲染

**Vue3**
```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
  
  <div v-for="(item, index) in items" :key="item.id">
    {{ index }}: {{ item.name }}
  </div>
</template>

<script setup>
const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
])
</script>
```

**React**
```tsx
import React, { useState } from 'react'

interface Item {
  id: number
  name: string
}

const MyComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ])
  
  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      
      {items.map((item, index) => (
        <div key={item.id}>
          {index}: {item.name}
        </div>
      ))}
    </div>
  )
}
```

### 2. 列表操作

**Vue3**
```vue
<template>
  <div>
    <button @click="addItem">Add Item</button>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
        <button @click="removeItem(item.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const items = ref([])

const addItem = () => {
  const newItem = {
    id: Date.now(),
    name: `Item ${items.value.length + 1}`
  }
  items.value.push(newItem)
}

const removeItem = (id) => {
  const index = items.value.findIndex(item => item.id === id)
  if (index > -1) {
    items.value.splice(index, 1)
  }
}
</script>
```

**React**
```tsx
import React, { useState } from 'react'

interface Item {
  id: number
  name: string
}

const MyComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])
  
  const addItem = () => {
    const newItem: Item = {
      id: Date.now(),
      name: `Item ${items.length + 1}`
    }
    setItems(prev => [...prev, newItem])
  }
  
  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }
  
  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## 表单处理

### 1. 受控组件

**Vue3**
```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input 
      v-model="form.name"
      type="text"
      placeholder="Name"
    />
    <input 
      v-model="form.email"
      type="email"
      placeholder="Email"
    />
    <textarea v-model="form.message" placeholder="Message"></textarea>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
const form = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form data:', form)
}
</script>
```

**React**
```tsx
import React, { useState } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

const MyComponent: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  
  const handleChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Form data:', form)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.name}
        onChange={handleChange('name')}
        type="text"
        placeholder="Name"
      />
      <input
        value={form.email}
        onChange={handleChange('email')}
        type="email"
        placeholder="Email"
      />
      <textarea
        value={form.message}
        onChange={handleChange('message')}
        placeholder="Message"
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### 2. 表单验证

**Vue3**
```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input 
        v-model="form.email"
        :class="{ error: errors.email }"
        type="email"
        placeholder="Email"
      />
      <span v-if="errors.email" class="error-text">
        {{ errors.email }}
      </span>
    </div>
    <button type="submit" :disabled="!isValid">Submit</button>
  </form>
</template>

<script setup>
const form = reactive({ email: '' })
const errors = reactive({ email: '' })

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const isValid = computed(() => {
  return form.email && !errors.email
})

const handleSubmit = () => {
  if (!validateEmail(form.email)) {
    errors.email = 'Please enter a valid email'
    return
  }
  
  console.log('Form submitted:', form.email)
}
</script>
```

**React**
```tsx
import React, { useState, useMemo } from 'react'

const MyComponent: React.FC = () => {
  const [form, setForm] = useState({ email: '' })
  const [errors, setErrors] = useState({ email: '' })
  
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }
  
  const isValid = useMemo(() => {
    return form.email && !errors.email
  }, [form.email, errors.email])
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setForm(prev => ({ ...prev, email: value }))
    
    // 清除错误
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }))
    }
  }
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!validateEmail(form.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }))
      return
    }
    
    console.log('Form submitted:', form.email)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={form.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          type="email"
          placeholder="Email"
        />
        {errors.email && (
          <span className="error-text">{errors.email}</span>
        )}
      </div>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  )
}
```

---

## 样式处理

### 1. CSS 类名

**Vue3**
```vue
<template>
  <div :class="{ active: isActive, disabled: isDisabled }">
    Dynamic Classes
  </div>
  
  <div :class="['base-class', { active: isActive }]">
    Array Classes
  </div>
</template>

<script setup>
const isActive = ref(true)
const isDisabled = ref(false)
</script>

<style scoped>
.active {
  color: green;
}
.disabled {
  opacity: 0.5;
}
</style>
```

**React**
```tsx
import React, { useState } from 'react'
import classNames from 'classnames'

const MyComponent: React.FC = () => {
  const [isActive, setIsActive] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  
  return (
    <div>
      <div className={classNames({
        active: isActive,
        disabled: isDisabled
      })}>
        Dynamic Classes
      </div>
      
      <div className={classNames('base-class', {
        active: isActive
      })}>
        Array Classes
      </div>
    </div>
  )
}
```

### 2. 内联样式

**Vue3**
```vue
<template>
  <div :style="{ color: textColor, fontSize: fontSize + 'px' }">
    Inline Styles
  </div>
</template>

<script setup>
const textColor = ref('red')
const fontSize = ref(16)
</script>
```

**React**
```tsx
import React, { useState } from 'react'

const MyComponent: React.FC = () => {
  const [textColor, setTextColor] = useState('red')
  const [fontSize, setFontSize] = useState(16)
  
  return (
    <div style={{ 
      color: textColor, 
      fontSize: `${fontSize}px` 
    }}>
      Inline Styles
    </div>
  )
}
```

---

## 路由管理

### 1. 基础路由

**Vue3 (Vue Router)**
```vue
<!-- App.vue -->
<template>
  <router-view />
</template>

<!-- 路由配置 -->
<script setup>
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
</script>

<!-- 导航 -->
<template>
  <router-link to="/">Home</router-link>
  <router-link to="/about">About</router-link>
  
  <button @click="$router.push('/about')">Go to About</button>
</template>
```

**React (React Router)**
```tsx
// App.tsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import About from '@/pages/About'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

// 导航组件
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navigation: React.FC = () => {
  const navigate = useNavigate()
  
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      
      <button onClick={() => navigate('/about')}>
        Go to About
      </button>
    </div>
  )
}
```

### 2. 路由参数

**Vue3**
```vue
<!-- 路由配置 -->
<script setup>
const routes = [
  { path: '/user/:id', component: User }
]
</script>

<!-- 组件中使用 -->
<template>
  <div>User ID: {{ $route.params.id }}</div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('User ID:', route.params.id)
</script>
```

**React**
```tsx
// 路由配置
import { Routes, Route } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/user/:id" element={<User />} />
    </Routes>
  )
}

// 组件中使用
import React from 'react'
import { useParams } from 'react-router-dom'

const User: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  
  return <div>User ID: {id}</div>
}
```

---

## Hooks 详解

### 1. useState - 状态管理

```tsx
import React, { useState } from 'react'

const Counter: React.FC = () => {
  // 基本用法
  const [count, setCount] = useState(0)
  
  // 对象状态
  const [user, setUser] = useState({
    name: '',
    email: ''
  })
  
  // 函数式更新
  const increment = () => {
    setCount(prev => prev + 1)
  }
  
  // 更新对象状态
  const updateUser = (field: string, value: string) => {
    setUser(prev => ({ ...prev, [field]: value }))
  }
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      
      <input
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
        placeholder="Name"
      />
    </div>
  )
}
```

### 2. useEffect - 副作用处理

```tsx
import React, { useState, useEffect } from 'react'

const UserProfile: React.FC = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // 组件挂载时执行
  useEffect(() => {
    console.log('Component mounted')
    
    // 清理函数
    return () => {
      console.log('Component will unmount')
    }
  }, [])
  
  // 依赖变化时执行
  useEffect(() => {
    if (user) {
      console.log('User changed:', user)
    }
  }, [user])
  
  // 异步操作
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/user')
        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUser()
  }, [])
  
  if (loading) return <div>Loading...</div>
  
  return <div>User: {user?.name}</div>
}
```

### 3. useMemo - 计算属性

```tsx
import React, { useState, useMemo } from 'react'

const ExpensiveComponent: React.FC = () => {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([1, 2, 3, 4, 5])
  
  // 计算属性，只有 count 或 items 变化时才重新计算
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...')
    return items.reduce((sum, item) => sum + item, 0) * count
  }, [count, items])
  
  // 过滤列表
  const filteredItems = useMemo(() => {
    return items.filter(item => item > count)
  }, [items, count])
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive Value: {expensiveValue}</p>
      <p>Filtered Items: {filteredItems.join(', ')}</p>
      
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment
      </button>
    </div>
  )
}
```

### 4. useCallback - 函数记忆化

```tsx
import React, { useState, useCallback } from 'react'

const ParentComponent: React.FC = () => {
  const [count, setCount] = useState(0)
  
  // 记忆化函数，只有 count 变化时才重新创建
  const handleClick = useCallback(() => {
    console.log('Button clicked, count:', count)
  }, [count])
  
  // 传递给子组件的函数
  const handleChildAction = useCallback((data: string) => {
    console.log('Child action:', data)
  }, [])
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment
      </button>
      
      <ChildComponent 
        onAction={handleChildAction}
        onClick={handleClick}
      />
    </div>
  )
}

interface ChildProps {
  onAction: (data: string) => void
  onClick: () => void
}

const ChildComponent: React.FC<ChildProps> = React.memo(({ onAction, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Click me</button>
      <button onClick={() => onAction('some data')}>
        Trigger Action
      </button>
    </div>
  )
})
```

### 5. useRef - DOM 引用

```tsx
import React, { useRef, useEffect } from 'react'

const InputFocus: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const countRef = useRef(0)
  
  // 聚焦输入框
  const focusInput = () => {
    inputRef.current?.focus()
  }
  
  // 获取输入值
  const getInputValue = () => {
    return inputRef.current?.value
  }
  
  // 计数器（不触发重渲染）
  const incrementCount = () => {
    countRef.current += 1
    console.log('Count:', countRef.current)
  }
  
  useEffect(() => {
    // 组件挂载时自动聚焦
    inputRef.current?.focus()
  }, [])
  
  return (
    <div>
      <input ref={inputRef} placeholder="Focus me" />
      <button onClick={focusInput}>Focus Input</button>
      <button onClick={getInputValue}>Get Value</button>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  )
}
```

---

## 性能优化

### 1. React.memo - 组件记忆化

```tsx
import React, { useState } from 'react'

// 使用 React.memo 包装组件
const ExpensiveComponent: React.FC<{ data: string }> = React.memo(({ data }) => {
  console.log('ExpensiveComponent rendered')
  
  return (
    <div>
      <h2>Expensive Component</h2>
      <p>{data}</p>
    </div>
  )
})

const ParentComponent: React.FC = () => {
  const [count, setCount] = useState(0)
  const [data, setData] = useState('Initial data')
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment (won't re-render ExpensiveComponent)
      </button>
      
      <button onClick={() => setData('New data')}>
        Update Data (will re-render ExpensiveComponent)
      </button>
      
      <ExpensiveComponent data={data} />
    </div>
  )
}
```

### 2. useMemo 和 useCallback 优化

```tsx
import React, { useState, useMemo, useCallback } from 'react'

const OptimizedComponent: React.FC = () => {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([1, 2, 3, 4, 5])
  
  // 计算属性优化
  const expensiveCalculation = useMemo(() => {
    console.log('Performing expensive calculation...')
    return items.reduce((sum, item) => sum + item, 0) * count
  }, [items, count])
  
  // 函数优化
  const handleItemClick = useCallback((itemId: number) => {
    console.log('Item clicked:', itemId)
  }, [])
  
  // 过滤列表优化
  const filteredItems = useMemo(() => {
    return items.filter(item => item > count)
  }, [items, count])
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive Result: {expensiveCalculation}</p>
      
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment
      </button>
      
      <ul>
        {filteredItems.map(item => (
          <li key={item} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### 3. 懒加载组件

```tsx
import React, { Suspense, lazy } from 'react'

// 懒加载组件
const LazyComponent = lazy(() => import('./LazyComponent'))

const App: React.FC = () => {
  return (
    <div>
      <h1>Main App</h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  )
}

// LazyComponent.tsx
const LazyComponent: React.FC = () => {
  return <div>This is a lazy loaded component</div>
}

export default LazyComponent
```

---

## TypeScript 集成

### 1. 组件类型定义

```tsx
import React from 'react'

// 基础 Props 接口
interface ButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  disabled = false, 
  variant = 'primary' 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {text}
    </button>
  )
}

// 泛型组件
interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T) => string | number
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )
}

// 使用示例
const App: React.FC = () => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ]
  
  return (
    <div>
      <Button 
        text="Click me" 
        onClick={() => console.log('clicked')}
        variant="primary"
      />
      
      <List
        items={users}
        renderItem={(user) => <span>{user.name}</span>}
        keyExtractor={(user) => user.id}
      />
    </div>
  )
}
```

### 2. Hooks 类型定义

```tsx
import React, { useState, useEffect, useCallback } from 'react'

// 自定义 Hook 类型
interface UseCounterReturn {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

const useCounter = (initialValue: number = 0): UseCounterReturn => {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1)
  }, [])
  
  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])
  
  return { count, increment, decrement, reset }
}

// API Hook 类型
interface User {
  id: number
  name: string
  email: string
}

interface UseUserReturn {
  user: User | null
  loading: boolean
  error: string | null
  fetchUser: (id: number) => Promise<void>
}

const useUser = (): UseUserReturn => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const fetchUser = useCallback(async (id: number) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/users/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }
      
      const userData: User = await response.json()
      setUser(userData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])
  
  return { user, loading, error, fetchUser }
}

// 使用示例
const UserProfile: React.FC = () => {
  const { count, increment, decrement } = useCounter(0)
  const { user, loading, error, fetchUser } = useUser()
  
  useEffect(() => {
    fetchUser(1)
  }, [fetchUser])
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      
      {user && (
        <div>
          <h3>User: {user.name}</h3>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  )
}
```

---

## 总结

### 主要差异对比

| 特性 | Vue3 | React |
|------|------|-------|
| 模板语法 | Template + Vue 指令 | JSX |
| 响应式 | 自动响应式 | 手动管理状态 |
| 组件定义 | SFC (Single File Component) | 函数组件 |
| 状态管理 | ref/reactive | useState |
| 计算属性 | computed | useMemo |
| 监听器 | watch | useEffect |
| 生命周期 | 生命周期钩子 | useEffect |
| 事件处理 | @事件 | onClick 等 |
| 条件渲染 | v-if/v-show | 条件表达式 |
| 列表渲染 | v-for | map() |
| 表单处理 | v-model | 受控组件 |
| 样式处理 | scoped style | CSS-in-JS/模块化 |

### 学习建议

1. **从基础概念开始**：理解 JSX、组件、Props、State
2. **掌握 Hooks**：useState、useEffect、useMemo、useCallback
3. **学习状态管理**：本地状态 → Context → 全局状态管理
4. **实践项目开发**：从简单组件到复杂应用
5. **性能优化**：React.memo、懒加载、虚拟化
6. **TypeScript 集成**：类型定义、泛型、接口

### 迁移策略

1. **渐进式迁移**：先学习 React 基础，再逐步深入
2. **对比学习**：将 Vue 概念与 React 概念对应
3. **实践为主**：多写代码，多调试
4. **社区资源**：React 官方文档、社区教程、开源项目

通过这份指南，您可以系统地学习 React，并将 Vue3 的经验迁移到 React 开发中。建议您在实际项目中应用这些概念，逐步掌握 React 的开发模式。 
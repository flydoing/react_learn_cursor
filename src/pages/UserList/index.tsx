import { useState, useEffect } from 'react';
import { List, Avatar, Button, Toast, SpinLoading } from 'antd-mobile';
import { UserOutline, RedoOutline } from 'antd-mobile-icons';
import './index.scss';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取用户列表
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
      Toast.show('获取用户列表成功');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取用户列表失败';
      setError(errorMessage);
      Toast.show(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取数据
  useEffect(() => {
    fetchUsers();
  }, []);

  // 模拟用户数据（当API不可用时）
  const mockUsers: User[] = [
    { id: 1, name: '张三', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', email: 'lisi@example.com' },
    { id: 3, name: '王五', email: 'wangwu@example.com' },
    { id: 4, name: '赵六', email: 'zhaoliu@example.com' },
    { id: 5, name: '钱七', email: 'qianqi@example.com' },
  ];

  // 如果API失败，使用模拟数据
  const displayUsers = users.length > 0 ? users : mockUsers;

  return (
    <div className="user-list-page">
      <div className="user-list-header">
        <h1>用户列表</h1>
        <p>展示React中的数据获取和状态管理</p>
        
        <Button
          color="primary"
          fill="outline"
          onClick={fetchUsers}
          disabled={loading}
          className="refresh-btn"
        >
          <RedoOutline />
          {loading ? '加载中...' : '刷新'}
        </Button>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <p>正在显示模拟数据...</p>
        </div>
      )}

      {/* 加载状态 */}
      {loading && (
        <div className="loading-container">
          <SpinLoading color="primary" />
          <p>正在加载用户数据...</p>
        </div>
      )}

      {/* 用户列表 */}
      {!loading && (
        <div className="user-list-container">
          <List header="用户信息">
            {displayUsers.map(user => (
              <List.Item
                key={user.id}
                prefix={
                  <Avatar
                    src={user.avatar || ''}
                    fallback={<UserOutline />}
                    style={{ '--size': '40px' }}
                  />
                }
                title={user.name}
                description={user.email}
                arrow={false}
                className="user-item"
              >
                <div className="user-actions">
                  <Button
                    size="small"
                    fill="outline"
                    onClick={() => {
                      Toast.show(`查看用户: ${user.name}`);
                    }}
                  >
                    查看
                  </Button>
                  <Button
                    size="small"
                    fill="outline"
                    color="primary"
                    onClick={() => {
                      Toast.show(`编辑用户: ${user.name}`);
                    }}
                  >
                    编辑
                  </Button>
                </div>
              </List.Item>
            ))}
          </List>
        </div>
      )}

      {/* 学习要点 */}
      <div className="learning-points">
        <h3>React学习要点：</h3>
        <ul>
          <li>✅ useState - 管理组件状态</li>
          <li>✅ useEffect - 处理副作用（API调用）</li>
          <li>✅ 条件渲染 - 根据状态显示不同内容</li>
          <li>✅ 错误处理 - try-catch和错误状态</li>
          <li>✅ 加载状态 - 提升用户体验</li>
          <li>✅ 列表渲染 - map方法渲染数组</li>
          <li>✅ 事件处理 - 按钮点击和交互</li>
        </ul>
      </div>

      {/* Vue vs React对比 */}
      <div className="comparison">
        <h3>Vue vs React 对比：</h3>
        <div className="comparison-grid">
          <div className="vue-side">
            <h4>Vue 3 (Composition API)</h4>
            <pre>{`// 状态管理
const users = ref([])
const loading = ref(false)

// 生命周期
onMounted(async () => {
  await fetchUsers()
})

// 模板语法
<template>
  <div v-if="loading">加载中...</div>
  <div v-else>
    <div v-for="user in users" :key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>`}</pre>
          </div>
          <div className="react-side">
            <h4>React (Hooks)</h4>
            <pre>{`// 状态管理
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(false)

// 生命周期
useEffect(() => {
  fetchUsers()
}, [])

// JSX语法
return (
  <div>
    {loading ? (
      <div>加载中...</div>
    ) : (
      users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))
    )}
  </div>
)`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList; 
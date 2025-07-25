import { useState, useEffect } from 'react';
import { Button, Input, List, Checkbox, Toast } from 'antd-mobile';
import { DeleteOutline, AddOutline } from 'antd-mobile-icons';
import './index.scss';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // 从localStorage加载数据
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
      setTodos(parsedTodos);
    }
  }, []);

  // 保存数据到localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 添加待办事项
  const addTodo = () => {
    if (!inputValue.trim()) {
      Toast.show('请输入待办事项内容');
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date()
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
    Toast.show('添加成功');
  };

  // 切换完成状态
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 删除待办事项
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    Toast.show('删除成功');
  };

  // 清空已完成
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
    Toast.show('已清空完成项目');
  };

  // 过滤待办事项
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  // 统计信息
  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = totalCount - completedCount;

  return (
    <div className="todo-page">
      <div className="todo-header">
        <h1>待办事项</h1>
        <p className="todo-stats">
          总计: {totalCount} | 已完成: {completedCount} | 待完成: {activeCount}
        </p>
      </div>

      {/* 添加新待办事项 */}
      <div className="todo-input">
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder="请输入待办事项..."
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <Button
          color="primary"
          fill="outline"
          onClick={addTodo}
          className="add-btn"
        >
          <AddOutline />
        </Button>
      </div>

      {/* 过滤器 */}
      <div className="todo-filters">
        <Button
          size="small"
          fill={filter === 'all' ? 'solid' : 'outline'}
          onClick={() => setFilter('all')}
        >
          全部
        </Button>
        <Button
          size="small"
          fill={filter === 'active' ? 'solid' : 'outline'}
          onClick={() => setFilter('active')}
        >
          待完成
        </Button>
        <Button
          size="small"
          fill={filter === 'completed' ? 'solid' : 'outline'}
          onClick={() => setFilter('completed')}
        >
          已完成
        </Button>
        {completedCount > 0 && (
          <Button
            size="small"
            fill="outline"
            color="danger"
            onClick={clearCompleted}
          >
            清空已完成
          </Button>
        )}
      </div>

      {/* 待办事项列表 */}
      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            {filter === 'all' ? '暂无待办事项' : '没有符合条件的项目'}
          </div>
        ) : (
          <List>
            {filteredTodos.map(todo => (
              <List.Item
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
                prefix={
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                }
                extra={
                  <Button
                    size="small"
                    fill="none"
                    color="danger"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <DeleteOutline />
                  </Button>
                }
              >
                <div className="todo-content">
                  <span className="todo-text">{todo.text}</span>
                  <span className="todo-time">
                    {todo.createdAt.toLocaleString()}
                  </span>
                </div>
              </List.Item>
            ))}
          </List>
        )}
      </div>

      {/* 学习提示 */}
      <div className="learning-tips">
        <h3>React学习要点：</h3>
        <ul>
          <li>✅ useState - 状态管理</li>
          <li>✅ useEffect - 副作用处理</li>
          <li>✅ 列表渲染 - map方法</li>
          <li>✅ 条件渲染 - 三元运算符</li>
          <li>✅ 事件处理 - onClick</li>
          <li>✅ 表单处理 - 受控组件</li>
          <li>✅ 本地存储 - localStorage</li>
        </ul>
      </div>
    </div>
  );
};

export default Todo; 
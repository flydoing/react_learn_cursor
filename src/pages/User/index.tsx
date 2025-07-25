import { Link } from 'react-router-dom';
import { List } from 'antd-mobile';
import useTitle from '@/hooks/useTitle';
import './index.scss';

const User = () => {
  useTitle('User Page');

  return (
    <div className='user'>
      <h1>User Page</h1>
      <List header='User Information'>
        <List.Item>Username: Alice</List.Item>
        <List.Item>Email: alice@example.com</List.Item>
      </List>
      <nav>
        <Link to='/'>Go to Home</Link>
      </nav>
    </div>
  );
};

export default User; 
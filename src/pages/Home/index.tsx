import { Button } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { increment, decrement } from '@/store/modules/counter';
import './index.scss';

const Home = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className='home'>
      <h1>Home Page</h1>
      <p>Count: {count}</p>
      <div className='card'>
        <Button color='primary' onClick={() => { dispatch(increment()); }}>
          Increment
        </Button>
        <Button color='primary' onClick={() => { dispatch(decrement()); }}>
          Decrement
        </Button>
      </div>

      <nav>
        <Link to='/about'>Go to About</Link>
        <br />
        <Link to='/user'>Go to User</Link>
        <br />
        <Link to='/todo'>Go to Todo App</Link>
        <br />
        <Link to='/user-list'>Go to User List</Link>
      </nav>
    </div>
  );
};

export default Home; 
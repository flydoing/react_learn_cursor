import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import User from '@/pages/User';
import Douban from '@/pages/Douban';
import Movie from '@/pages/Movie';
import Todo from '@/pages/Todo';
import UserList from '@/pages/UserList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '/douban',
    element: <Douban />,
  },
  {
    path: '/movie',
    element: <Movie />,
  },
  {
    path: '/todo',
    element: <Todo />,
  },
  {
    path: '/user-list',
    element: <UserList />,
  },
]);

export default router; 
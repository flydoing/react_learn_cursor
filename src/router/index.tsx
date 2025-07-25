import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import User from '@/pages/User';
import Douban from '@/pages/Douban';
import Movie from '@/pages/Movie';

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
]);

export default router; 
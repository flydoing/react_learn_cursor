import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './store';
import router from './router';
import 'antd-mobile/es/global';
import './styles/global.scss';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

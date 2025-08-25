import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import './App.css';
import { injectStore } from './api/interceptors';
import { MessageAlert } from './components/MessageAlert';
import { router } from './router/app-router';
import { store } from './store/store';
injectStore(store);

function App() {
  return (
    <Provider store={store}>
      <MessageAlert />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

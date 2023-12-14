import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.scss';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import PostsPage from './pages/postsPage/PostsPage';
import store, { persistor } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} errorElement={<ErrorBoundary />}>
        <Route index element={<PostsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    ),
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  )
}

export default App

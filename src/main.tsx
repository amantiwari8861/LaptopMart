// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Router'
import AuthContextWrapper from './context/AuthContextWrapper';
import { Provider } from 'react-redux'
import { store } from './redux/store';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <AuthContextWrapper>
      <RouterProvider router={router} />
    </AuthContextWrapper>
  </Provider>
  // </StrictMode>,
)

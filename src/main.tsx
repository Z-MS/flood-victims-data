import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import ErrorPage from './components/ErrorPage.tsx'
import DisplacedPersons from './components/Displaced/DisplacedPersons.tsx'
import Signup from './components/Auth/Signup.tsx'
import Signin from './components/Auth/Signin.tsx'
import ResetPassword from './components/Auth/ResetPassword.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/displaced",
    element: <DisplacedPersons />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/reset",
    element: <ResetPassword/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

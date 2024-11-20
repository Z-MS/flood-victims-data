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
import ForgotPassword from './components/Auth/ForgotPassword.tsx'
import EmailAction from './components/Auth/EmailAction.tsx'
import About from './components/About.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/about",
        element: <About />
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
        path: "/action",
        element: <EmailAction/>
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword/>
      },
      {
        path: "/resetpassword",
        element: <ResetPassword/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { createRoot } from 'react-dom/client'
import { StrictMode, Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import App from './App.tsx'
import ErrorPage from './components/ErrorPage.tsx'
import Signup from './components/Auth/Signup.tsx'
import Signin from './components/Auth/Signin.tsx'
import ResetPassword from './components/Auth/ResetPassword.tsx'
import ForgotPassword from './components/Auth/ForgotPassword.tsx'
import EmailAction from './components/Auth/EmailAction.tsx'
import About from './components/About.tsx'
import Contact from './components/Contact.tsx'

const DisplacedPersons = lazy(() => import('./components/Displaced/DisplacedPersons.tsx'))
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
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/displaced",
        element: 
        <Suspense fallback={<Skeleton/>}>
          <DisplacedPersons />
        </Suspense>
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

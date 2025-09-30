import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUP from './page/SignUP'
import Login from './page/Login'

  function App() {
    const router = createBrowserRouter([
      {
        path: "/login",
       element: <Login/>
      },
      {
        path: "/signup",
       element: <SignUP/>
      },
    ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App

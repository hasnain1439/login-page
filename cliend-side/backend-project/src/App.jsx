import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUP from './page/SignUP'
import Login from './page/Login'
import ViewData from './page/ViewData'

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
      {
        path: "/view-data",
       element: <ViewData/>
      },
    ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App

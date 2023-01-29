
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './root';
import Login from './components/Login';
import Home from './components/Home';
import './index.css'
import Register from './components/Register';

function App() {

 

  const router = createBrowserRouter([
    {path:'/', element:<Root/>,errorElement:<h2 className='text-white '>page not found</h2> ,children:[
      {path:'/home', element:<Home/>},
      {index:true, element:<Login/>},
      {path:'/register', element:<Register/>},
    ]}
  ])
  return (
    <div className='bg-custom '>
   <RouterProvider router={router}/>
    </div>
  );
}

export default App;

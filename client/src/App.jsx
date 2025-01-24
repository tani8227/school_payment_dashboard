import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.jsx';
import Home from './pages/Home.jsx';
import Navbar from './components/navabar/Navbar.jsx';
import DashBoard from './pages/DashBoard.jsx';
import School from './pages/School.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TransactionStatus from './pages/TransactionStatus.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "user",
      element: <Navbar />,  
      children: [
        {
          path: "dashboard", 
          element: <DashBoard />
        },
        {
          path:'school-page',
          element:<School/>
        },
        {
          path:'transaction-status',
          element:<TransactionStatus/>
        }
      ]
    }
  ]);

  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

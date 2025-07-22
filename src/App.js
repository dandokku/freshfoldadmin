import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useRoutes} from "react-router-dom";
import axios from "axios";
import SharedLayout from './components/SharedLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Home from './pages/Home';
import Users from './pages/Users';
import Prices from './pages/prices/Prices';
import Bookings from './pages/Bookings';
import Prices2 from './pages/prices/Prices2';
import BookingDetails from './pages/BookingDetails';
import AddPrice from './pages/prices/AddPrice';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setLogInDetails } from './pages/features/adminSlice';
import Services from './pages/services/Services';
import AddService from './pages/services/AddService';

function App() {
  // const routing = useRoutes([
  //   {
  //     path: '/',
  //     element: <Home />,
  //   },
  //   {
  //     path: '/dashboard',
  //     element: <SharedLayout />,
  //     children: [
  //       { path: '/', element: <Dashboard /> },
  //       { path: 'users', element: <Users /> },
  //       { path: 'bookings', element: <Bookings /> },
  //       {
  //         path: 'prices',
  //         element: <Prices />,
  //         children: [{ path: 'price2', element: <Prices2 /> }],
  //       },
  //       { path: 'services', element: <Services /> },
  //     ],
  //   },
  // ]);

  const dispatch = useDispatch();

  async function getAdmin() {
    const localData = localStorage.getItem("admin-jwt");
    const token = JSON.parse(localData);
    const config = {
      headers: {
        'x-auth-admin-token': token
      }
    };
    const response = await axios.get("https://freshfoldserver.onrender.com/api/admins/me", config);
    return response.data;
  }

  const {data} = useQuery("admin", getAdmin, {
    onSuccess: (data) => console.log(data),
    onError: (er) => console.log(er), 
    enabled: localStorage.getItem("admin-jwt") ? true : false
  })

  console.log({data});
  let admin = useSelector((state) => state.admin);

  React.useEffect(() => {
    if(data){
      dispatch(setLogInDetails(data))
      console.log("data added")
      console.log(admin)
    }
  }, [data, dispatch])

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/">
            <Route index element={<Home />}/>
            <Route path="dashboard" element={<SharedLayout />}>
                <Route index element={<Dashboard/>}/>
                <Route index path="/dashboard/users" element={<Users/>}/>
                {/* <Route path="/dashboard/services" element={<Services/>}/> */}
                <Route path="/dashboard/services">
                  <Route index element={<Services/>}/>
                  <Route path='/dashboard/services/add-service' element={<AddService/>}/>
                </Route>
                <Route path="/dashboard/prices">
                  <Route index element={<Prices/>}/>
                  <Route path='/dashboard/prices/add-price' element={<AddPrice/>}/>
                </Route>
                <Route path="/dashboard/bookings">
                  <Route index element={<Bookings/>}/>
                  <Route path='/dashboard/bookings/:bookingId' element={<BookingDetails/>}/>
                </Route>
                {/* <Route path="/dashboard/bookings" element={<Bookings/>}/> */}
            </Route>
            <Route path="login"element={<Login/>}/>
          </Route>          {/* {routing} */}
      </Routes>

    </BrowserRouter>
  );
}

export default App;

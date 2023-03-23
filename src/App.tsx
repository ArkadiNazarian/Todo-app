import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './Modules/App/NavBar';
import { SideBar } from './Modules/App/SideBar';
import { getAccountSelector, get_identity } from './Modules/Auth/redux';
import { useAppDispatch } from './Redux/redux-hooks';
import { routes } from './Routes/app-routes';
import { Routes as PublicRoutes, PrivateRoutes } from './Routes/custom-routes';
import { route_names } from './Routes/route-name';

export function App() {
  const app_routes = routes();
  const route = route_names();
  const my_location = window.location.pathname;
  const user_data = useSelector(getAccountSelector);
  const dispatch = useAppDispatch();
  const [location, set_location] = useState("");

  useEffect(() => {
    if (!user_data.token) return
    dispatch(get_identity())
  }, [dispatch, user_data.token])


  useEffect(() => {
    set_location(my_location)
  }, [my_location])

  return (
    <BrowserRouter>
      {
        (location !== route.login_path && location !== route.signup_path && location !== route.forgot_password_path ) && <NavBar />
      }
      <Box sx={{ display: (location !== route.login_path && location !== route.signup_path && location !== route.forgot_password_path) ? "flex" : "", alignItems: (location !== route.login_path || location !== route.signup_path || location !== route.forgot_password_path) ? "flex-start" : "" }}>
        {
          (location !== route.login_path && location !== route.signup_path && location !== route.forgot_password_path) && <SideBar />
        }
        <Box sx={{ display: (location !== route.login_path && location !== route.signup_path && location !== route.forgot_password_path) ? "flex" : "", width: "100%", justifyContent: (location !== route.login_path && location !== route.signup_path && location !== route.forgot_password_path) ? "center" : "" }}>
          <Routes>
            <Route element={<PrivateRoutes />}>
              {
                app_routes.private_routes.map((value, index) => (
                  <Route path={value.path} element={value.component} key={index} />
                ))
              }
            </Route>
            <Route element={<PublicRoutes />}>
              {
                app_routes.public_routes.map((value, index) => (
                  <Route path={value.path} element={value.component} key={index} />
                ))
              }
            </Route>
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

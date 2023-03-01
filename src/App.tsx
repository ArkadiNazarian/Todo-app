import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAccountSelector, get_identity } from './Modules/Auth/redux';
import { useAppDispatch } from './Redux/redux-hooks';
import { routes } from './Routes/app-routes';
import { Routes as PublicRoutes, PrivateRoutes } from './Routes/custom-routes';

export function App() {
  const app_routes = routes();
  const user_data = useSelector(getAccountSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user_data.token) return
    dispatch(get_identity())
  }, [dispatch, user_data.token])
  
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

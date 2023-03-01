import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { getAccountSelector } from '../Modules/Auth/redux';
import { route_names } from './route-name';

export const PrivateRoutes = () => {

    const user_data = useSelector(getAccountSelector);
    const route = route_names();

    return user_data.token ? <Outlet /> : <Navigate to={route.login_path} />
}

export const Routes = () => {
    const user_data = useSelector(getAccountSelector);
    const route = route_names();

    return user_data.token ? <Navigate to={route.dashboard} /> : <Outlet />
}
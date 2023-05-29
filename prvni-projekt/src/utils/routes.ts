import { HomeIcon } from '@heroicons/react/24/outline';
import ErorrpageScreen from '../pages/404pageScreen';
import DetailUserScreen from '../pages/DetailUserScreen';
import EditUserScreen from '../pages/EditUserScreen';
import LoginScreen from '../pages/LoginScreen';
import NewUserScreen from '../pages/NewUserScreeen';
import OverviewScreen from '../pages/OverviewScreen';
import RegisterScreen from '../pages/RegisterScreen';
import UserListScreen from '../pages/UserListScreen';
import { NavRoute } from '../types/route.types';

export const routes: Array<NavRoute> = [
  {
    path: '/login',
    component: LoginScreen,
  },
  {
    icon: HomeIcon,
    path: '/',
    component: OverviewScreen,
    restricted: true,
  },
  {
    path: '/register',
    component: RegisterScreen,
  },
  {
    path: '/users',
    restricted: true,
    component: UserListScreen,
  },
  {
    path: '/users/new',
    restricted: true,
    component: NewUserScreen,
  },
  {
    path: '/users/edit/:id',
    restricted: true,
    component: EditUserScreen,
  },
  {
    path: '/users/detail/:id',
    restricted: true,
    component: DetailUserScreen,
  },
  {
    path: '*',
    component: ErorrpageScreen,
  }
];

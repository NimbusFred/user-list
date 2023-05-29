import { ComponentType } from 'react';

type ReactComponent = ComponentType<any>;



export interface NavRoute {
  icon?: ReactComponent;
  path: string;
  component: ReactComponent;
  restricted?: boolean;
}
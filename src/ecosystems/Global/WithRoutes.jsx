import React from 'react';
import { useRoutes } from 'hookrouter';
import { PageNotFound } from '../../pages';
import { WithQueryParams } from './WithQueryParams';

export const WithRoutes = ({ children, ...props }) => {
  // console.debug('WithRoutes', { children, routes });
  const appRouteAction = useRoutes(props.routes);

  return (
    <WithQueryParams>
      {
        (typeof appRouteAction === 'function')
          ? appRouteAction(props)
          : <PageNotFound {...props} />
      }
    </WithQueryParams>
  );
};

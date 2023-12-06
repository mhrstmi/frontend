import flattenDeep from 'lodash/flattenDeep';
import React, { ComponentType, ReactNode } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const generateFlattenRoutes = (routes) => {
    if (!routes) return [];
    return flattenDeep(routes.map(({ routes: subRoutes, ...rest }) => [rest, generateFlattenRoutes(subRoutes)]));
  }
  
  export const renderRoutes = (mainRoutes) => {
    const Routes: React.FC<{isAuthorized: boolean}> = ({ isAuthorized }) => {
        const layouts = mainRoutes.map(({ layout, routes }, index) => {
            const subRoutes = generateFlattenRoutes(routes);

            return (
                <Route key={index} element={layout}>
                    {subRoutes.map(({ component, path, isPublic }, index) => {
                        return (
                            <Route element={<ProtectedRoute isPublic={isPublic} isAuthorized={isAuthorized}  />}>
                                {component && path && (<Route key={index} element={component} path={path} />)}
                            </Route>
                        )
                    })}
                </Route>
            )
      });
      return <ReactRoutes>{layouts}</ReactRoutes>;
    }
    return Routes;
  }

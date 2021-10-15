import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingOverlay from '../components/Features/LoadingOverlay';
import NotFoundScreen from '../screens/NotFoundScreen';

const PublicRouter = React.lazy(() => import('./PublicRouter.js'));
const AdminRouter = React.lazy(() => import('./AdminRouter.js'));
const UserRouter = React.lazy(() => import('./UserRouter.js'));

function AppRouter(props) {
  return (
    <React.Suspense fallback={<LoadingOverlay />}>
      <Switch>
        <Route path="/admin" component={AdminRouter} />
        <Route path="/user" component={UserRouter} />
        <Route path="/" component={PublicRouter} />
        <Route path="*" component={NotFoundScreen} />
      </Switch>
    </React.Suspense>
  );
}

export default AppRouter;

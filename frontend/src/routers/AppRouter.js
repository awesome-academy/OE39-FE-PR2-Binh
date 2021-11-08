import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import LoadingOverlay from '../components/Features/LoadingOverlay';
import NotFoundScreen from '../screens/NotFoundScreen';

const PublicRouter = React.lazy(() => import('./PublicRouter.js'));
const AdminRouter = React.lazy(() => import('./AdminRouter.js'));
const UserRouter = React.lazy(() => import('./UserRouter.js'));

function AppRouter(props) {
  const location = useLocation();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  React.useEffect(() => {
    scrollToTop();
  }, [location]);

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

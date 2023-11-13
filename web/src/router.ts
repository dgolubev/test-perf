import {
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { Layout } from './page/Layout';
import * as PlacesPage from './page/places/PlacesPage';

enum AppRoutes {
  HOME = '/',
  // LOGIN = '/login',
  // LOGOUT = '/logout',
}

const router = createBrowserRouter([
  {
    id: 'root',
    path: AppRoutes.HOME,
    // loader: () => {    },
    Component: Layout,
    children: [
      {
        index: true,
        loader: PlacesPage.loader,
        Component: PlacesPage.component,
      },

      // {
      //   path: AppRoutes.LOGIN,
      //   action: LoginPage.action,
      //   Component: LoginPage.component,
      // },
    ],
  },
  // {
  //   path: AppRoutes.LOGOUT,
  //   async action() {
  //     await authProvider.signOut();
  //
  //     return redirect(AppRoutes.HOME);
  //   },
  // },
]);

export {
  router,
  AppRoutes,
}

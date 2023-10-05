import {
  storage
} from '.';
import {
  injectPageProps
} from '.';
import {
  PageTheme,
  PageAdmin,
  PageNotFound,
  PageShare,
  PageEditTheme,
  PageInviteUser,
  PageEditUser,
  PageForgotPassword,
  PageUsers,
  PageLogin,
  PagePostRemoved,
  PageUnsubscribed
} from '../pages';

export const pageRoutes = {
  '/admin/login': PageLogin,
  '/admin': PageAdmin,
  '/admin/themes': PageTheme,
  '/admin/themes/:themeId': PageEditTheme,
  '/admin/users': PageUsers,
  '/admin/users/invite': PageInviteUser,
  '/admin/users/:userId': PageEditUser,
  '/share/:postId': PageShare,
  '/admin/forgot_password': PageForgotPassword,
  '/removed': PagePostRemoved,
  '/unsubscribed': PageUnsubscribed,
  '/*': PageNotFound
};

export const routes = injectPageProps(pageRoutes, (props) => {
  // console.debug('routes.injectPageProps()', props);
  const { postId, themeId, userId } = props;

  const pageProps = { postId, themeId, userId };

  storage.set('pageProps', pageProps);

  return { pageProps };
});

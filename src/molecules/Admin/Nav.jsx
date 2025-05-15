import React, { useCallback, useEffect, useState } from 'react';
import { api, defaultTheme } from '../../lib';
import logo from './helios-logo.png';
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import { AppLogo } from '../../atoms';

const DEFAULT_THEME = defaultTheme;

export const AdminNav = (props) => {
  const { logout, isAuthenticated, account, isEditor, isAdmin, multiThemeEnabled } = props;
  const [ theme, setTheme ] = useState(DEFAULT_THEME);

  const getThemeNavText = () => `Theme${multiThemeEnabled ? 's' : ''}`;

  const getThemeNavLink = useCallback(() => {
    return `/admin/themes${multiThemeEnabled ? '' : `/${theme._id}`}`;
  }, [ theme, multiThemeEnabled ]);

  const getThemeUploadUrl = useCallback((objectPath) => {
    return `${theme.baseUploadUrl}/${objectPath}`;
  }, [ theme ]);

  useEffect(() => {
    api.get('themes/active').then(({ data }) => {
      setTheme(data);
    }).catch((err) => {
      console.warn('Error loading active theme', err);
    });
  }, []);

  return (
    <Navbar className={'AdminNav'}>
      <div className='identity'>
        <img src={logo} className='logo img' alt='admin-logo'></img>
        <h2>Dispatch</h2>
      </div>
      <Nav>
        <NavItem>
          {isAuthenticated && <NavLink href="/admin">Posts</NavLink>}
        </NavItem>
        <NavItem>
          {isAuthenticated && (isEditor || isAdmin) && <NavLink href={getThemeNavLink()}>{getThemeNavText()}</NavLink>}
        </NavItem>
        <NavItem>
          {isAuthenticated && isAdmin && <NavLink href="/admin/users">Users</NavLink>}
        </NavItem>
        {isAuthenticated && account && (
          <NavItem>
            <NavLink href={`/admin/users/${account._id}`}>{account.email} ({account.name})</NavLink>
          </NavItem>
        )}
        <NavItem>
          {isAuthenticated && <NavLink onClick={() => logout()} >Log Out</NavLink>}
        </NavItem>
      </Nav>
      {theme.brandLogo1 && <AppLogo className={'logo-responsive'} src={getThemeUploadUrl(theme.brandLogo1)} />}
    </Navbar>
  );
};

import React, { Fragment, useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { AdminUsersTable } from '../../molecules';
import { ButtonBasic, AppLoader } from '../../atoms';

export const AdminUserList = (props) => {
  const { adminUsers, selectAdminUser, isModerator, isEditor } = props;

  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (isModerator || isEditor) {
      window.location.assign(`/admin`);
    }
    setIsLoading(false);
  }, [ isEditor, isModerator ]);

  return (
    <div className={'AdminContainer'}>
      <Container fluid>
        <div className={'admin-title'}>
        <h1><span>Users</span></h1>
        <div style={{ textAlign: 'center' }}>
          <ButtonBasic className={'btn-success btn-sm'} onClick={() => window.location.assign('/admin/users/invite')}>+ Invite User</ButtonBasic>
        </div>
        </div>
        <Fragment>
          {isLoading ? (
            <AppLoader />
          ) : (
            <Fragment>
              <AdminUsersTable {...{ adminUsers, selectAdminUser }} />
            </Fragment>
          )}
        </Fragment>
      </Container>
    </div>
  );
};

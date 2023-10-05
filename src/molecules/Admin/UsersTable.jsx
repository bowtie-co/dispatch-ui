import React, { Fragment } from 'react';
import { Table } from 'reactstrap';

export const AdminUsersTable = (props) => {
  const { adminUsers, selectAdminUser } = props;

  return (
    <Fragment>
      <div className={'admin-table-container'}>
        <div className={'admin-table-content'}>
          <Table className={'AdminModerationTable'}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
            {adminUsers.map((admin, index) => (
              <tr key={index} onClick={() => selectAdminUser(admin)}>
                <td>
                  {admin.name}
                </td>
                <td>
                  {admin.email}
                </td>
                <td>
                  {admin.role}
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
};

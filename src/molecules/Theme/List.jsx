import React, { Fragment } from 'react';
import { Table } from 'reactstrap';

export const ThemeList = (props) => {
  const { themes, selectTheme } = props;

  return (
    <Fragment>
      <div className={'admin-table-container'}>
        <div className={'admin-table-content'}>
          <Table className={'AdminModerationTable'}>
            <thead>
              <tr>
                <th>Theme Name</th>
                <th>Logo Link</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {themes.map((theme, index) => (
                <tr key={index} onClick={() => selectTheme(theme)}>
                  <td>
                    {theme.projectName}
                  </td>
                  <td>
                    {theme.logoLinkUrl}
                  </td>
                  <td>
                    {theme.active ? 'Yes' : 'No'}
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

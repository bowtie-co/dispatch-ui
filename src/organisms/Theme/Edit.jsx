import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { api, notifier } from '../../lib';
import { Container } from 'reactstrap';
import { AppLoader, ButtonBasic } from '../../atoms';
import { ThemeForm } from '.';

export const ThemeEdit = (props) => {
  const { isAdmin, isModerator, isEditor, themeId, multiThemeEnabled } = props;

  const [ isLoading, setIsLoading ] = useState(true);
  const [ theme, setTheme ] = useState();

  const getReturnPath = useCallback(() => {
    return multiThemeEnabled ? '/admin/themes' : '/admin';
  }, [ multiThemeEnabled ]);

  useEffect(() => {
    if (isAdmin || isEditor) {
      api.get(`themes/${themeId}`).then(({ data }) => {
        setTheme(data);
        setIsLoading(false);
      }).catch((err) => {
        notifier.bad(err);
        setIsLoading(false);
      });
    } else if (isModerator) {
      window.location.assign(`/admin`);
    }
  }, [ isAdmin, isModerator, themeId, isEditor ]);

  const back = () => {
    window.location.assign(getReturnPath());
  };

  const deleteTheme = () => {
    api.deletePlain(`themes/${theme._id}`).then((result) => {
      if (result) {
        window.location.assign(getReturnPath());
      }
    }).catch((err) => {
      notifier.bad(err);
      setIsLoading(false);
    });
  };

  const submit = (event, payload) => {
    event.preventDefault();
    api.put(`themes/${theme._id}`, payload).then((result) => {
      if (result) {
        window.location.assign(getReturnPath());
      }
    }).catch((err) => {
      notifier.bad(err);
      setIsLoading(false);
    });
  };

  const activateTheme = (event) => {
    event.preventDefault();

    api.put(`themes/${theme._id}/activate`).then((result) => {
      if (result) {
        window.location.assign(getReturnPath());
      }
    }).catch((err) => {
      notifier.bad(err);
      setIsLoading(false);
    });
  };

  const editThemeProps = { theme, submit, activateTheme, multiThemeEnabled };

  return (
    <div className={'ThemeEdit'}>
      <Container>
        <h1 className={'admin-title'}><span>Themes</span></h1>
        <Fragment>
          {isLoading ? (
            <AppLoader />
          ) : (
            <Fragment>

              <ThemeForm {...editThemeProps}/>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <ButtonBasic className={'btn-info btn-sm'} onClick={() => back()}>Back</ButtonBasic>
                {multiThemeEnabled && (
                  <ButtonBasic disabled={theme.active} className={'btn-danger btn-sm ml-3'} onClick={() => deleteTheme()}>Delete</ButtonBasic>
                )}
              </div>
            </Fragment>
          )}
        </Fragment>
      </Container>
    </div>
  );
};

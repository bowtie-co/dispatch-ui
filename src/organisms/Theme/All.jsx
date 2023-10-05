import React, { Fragment, useEffect, useState } from 'react';
import { api, notifier } from '../../lib';
import { Container } from 'reactstrap';
import { AppLoader, ButtonBasic } from '../../atoms';
import { ThemeList } from '../../molecules/Theme';
import { ThemeCreate } from '.';

export const ThemeAll = (props) => {
  const { isAdmin, isModerator, isEditor } = props;

  const [ isLoading, setIsLoading ] = useState(true);
  const [ themes, setThemes ] = useState();
  const [ openCreate, setOpenCreate ] = useState(false);

  useEffect(() => {
    if (isAdmin || isEditor) {
      api.get('themes').then(({ data }) => {
        setThemes(data);
        setIsLoading(false);
      }).catch((err) => {
        notifier.bad(err);
        setIsLoading(false);
      });
    } else if (isModerator) {
      window.location.assign(`/admin`);
    }
  }, [ isAdmin, isModerator, isEditor ]);

  const selectTheme = (theme) => {
    window.location.assign(`/admin/themes/${theme._id}`);
  };

  const addTheme = () => {
    setOpenCreate(true);
  };

  const submitTheme = (event, payload) => {
    event.preventDefault();
    api.post(`themes`, payload).then(({ data }) => {
      if (data) {
        window.location.assign(`/admin/themes/${data._id}`);
      }
    }).catch((err) => {
      notifier.bad(err);
      setIsLoading(false);
    });
  };

  const themeProps = { themes, selectTheme };
  const createThemeProps = { submitTheme };

  return (
    <div className={'AdminThemeContainer'}>
      <Container fluid>
        <div className={'admin-title'}>
        <h1><span>Themes</span></h1>
        <div style={{ textAlign: 'center' }}>
          <ButtonBasic className={'btn-success btn-sm'} onClick={() => addTheme()}>+ Add Theme</ButtonBasic>
        </div>
        </div>
        <Fragment>
          {isLoading ? (
            <AppLoader />
          ) : (
            <Fragment>
              { openCreate ?
                <ThemeCreate {...createThemeProps} />
                :
                <ThemeList {...themeProps} />
              }
            </Fragment>
          )}
        </Fragment>
      </Container>
    </div>
  );
};

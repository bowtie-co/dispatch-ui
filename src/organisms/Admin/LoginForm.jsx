import React, { useState } from 'react';
import { api, notifier, storage } from '../../lib';
import { Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { AppLoader, ButtonBasic } from '../../atoms';

export const AdminLoginForm = ({ ...props }) => {
  const [ isLoading, setIsLoading ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  const updateEmail = (value) => {
    if (value) {
      setEmail(value.toLowerCase());
    }
  };

  const resetPassword = () => {
    window.location.assign('/admin/forgot_password');
  };

  const login = (e) => {
    e.preventDefault();
    !email && notifier.error('Email required.');
    !password && notifier.error('Password required.');
    if (email && password) {
      setIsLoading(true);
      api.post('admins/login', { email, password }).then(({ data }) => {
        storage.set('token', data.token);

        setTimeout(() => {
          window.location.assign('/admin');
        }, 100);
      }).catch((err) => {
        setIsLoading(false);
        notifier.bad(err);
      });
    }
  };

  return (
    <Container className={'AdminLoginForm form-container'}>
      {isLoading ? (
        <AppLoader />
      ) : (
        <Form onSubmit={(e) => login(e)}>
          <FormGroup>
            <Label for={'email'}>Email</Label>
            <Input key={'email'} name={'email'} id={'email'} placeholder={'Email'} autoComplete={'off'} onChange={(e) => updateEmail(e.target.value)}></Input>
          </FormGroup>
          <FormGroup>
            <Label for={'password'}>Password</Label>
            <Input key={'password'} name={'password'} id={'password'} type={'password'} placeholder={'Password'} autoComplete={'off'} onChange={(e) => setPassword(e.target.value)}></Input>
          </FormGroup>
          <ButtonBasic>Login</ButtonBasic>
          <ButtonBasic className={'ml-3'} onClick={resetPassword}>Forgot Password</ButtonBasic>
        </Form>
      )}
    </Container>
  );
};

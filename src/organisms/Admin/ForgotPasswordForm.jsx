import React, { useState, useCallback } from 'react';
import { api, notifier } from '../../lib';
import { Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { AppLoader, ButtonBasic } from '../../atoms';

export const AdminForgotPasswordForm = (props) => {
  const [ isLoading, setIsLoading ] = useState();
  const [ email, setEmail ] = useState();
  const [ emailSent, setEmailSent ] = useState(false);

  const redirectToLogin = () => {
    window.location.assign('/admin/login');
  };

  const resetPassword = useCallback((e) => {
    e.preventDefault();

    setIsLoading(true);

    api.post('admins/forgot_password', { email }).then(({ data }) => {
      setIsLoading(false);
      setEmailSent(true);
    }).catch((err) => {
      setIsLoading(false);
      notifier.bad(err);
    });
  }, [ email ]);

  return (
    <Container className={'AdminForgotPasswordForm form-container'}>
      {isLoading ? (
        <AppLoader />
      ) : (emailSent ? (
        <div className="mt-5">
          <p>An email has been sent to {email} for you to reset your password.</p>
          <ButtonBasic onClick={redirectToLogin}>Login</ButtonBasic>
        </div>
      ) : (
        <Form onSubmit={(e) => resetPassword(e)}>
          <FormGroup>
            <Label for={'email'}>Email</Label>
            <Input key={'email'} name={'email'} id={'email'} placeholder={'Email'} autoComplete={'email'} onChange={(e) => setEmail(e.target.value)} required></Input>
          </FormGroup>
          <ButtonBasic>Submit</ButtonBasic>
        </Form>
      ))}
    </Container>
  );
};

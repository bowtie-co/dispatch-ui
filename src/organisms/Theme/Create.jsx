import React, { Fragment, useState } from 'react';
import { Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { ButtonBasic } from '../../atoms';

export const ThemeCreate = (props) => {
  const { submitTheme } = props;
  const [ projectName, setProjectName ] = useState('');

  return (
    <div className={'ThemeCreate'}>
      <Container fluid>
        <Fragment>
          <Form onSubmit={(e) => submitTheme(e, { projectName })}>
            <FormGroup>
              <Label for='projectName'>Project Name</Label>
              <Input key='projectName' required type='text' name='projectName' id='projectName' onChange={(e) => setProjectName(e.target.value)} />
            </FormGroup>
            <ButtonBasic>Submit</ButtonBasic>
          </Form>
        </Fragment>
      </Container>
    </div>
  );
};

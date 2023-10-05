import React, { Fragment, useState, useCallback } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { notifier } from '../../lib';
import { ButtonBasic } from '../../atoms';

export const AdminUserForm = (props) => {
  const { account, adminUser, onSubmit, onDelete, isAdmin } = props;

  const [ userData, setUserData ] = useState(adminUser ? {...adminUser} : {});

  const isAdminSelf = account && adminUser && account._id === adminUser._id;

  const adminRoleOptions = [
    { value: 'moderator', label: 'Moderator' },
    { value: 'editor', label: 'Editor' },
    { value: 'admin', label: 'Admin' }
  ];

  const updateField = useCallback((name, value) => {
    setUserData({ ...userData, [name]: value });
  }, [ userData ]);

  const inputOnChange = (e) => updateField(e.target.name, e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirm_password) {
      notifier.warning('Passwords do not match');
    } else if (typeof onSubmit === 'function') {
      onSubmit(userData);
    } else {
      console.warn('Missing/invalid "onSubmit" handler provided. Expected "function", was:', typeof onSubmit);
    }

    return false;
  };

  return (
    <div className={'AdminUserForm'}>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        {isAdmin && (
          <Fragment>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input key='name' type='text' name='name' id='name' onChange={inputOnChange} defaultValue={userData.name} />
            </FormGroup>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input key='email' type='email' name='email' id='email' onChange={inputOnChange} defaultValue={userData.email} />
            </FormGroup>
            <FormGroup>
              <Label for='role'>Role</Label>
              <Select options={adminRoleOptions} key='role' type='text' name='role' id='role' onChange={(e) => updateField('role', e.value)} defaultValue={adminRoleOptions.find(opt => opt.value === userData.role)} />
            </FormGroup>
          </Fragment>
        )}

        {isAdminSelf && (
          <Fragment>
            <FormGroup>
              <Label for='password'>New Password</Label>
              <Input key='password' type='password' name='password' id='password' autoComplete='nope' onChange={inputOnChange} />
            </FormGroup>
            <FormGroup>
              <Label for='confirm_password'>Confirm Password</Label>
              <Input key='confirm_password' type='password' name='confirm_password' id='confirm_password' autoComplete='nope' onChange={inputOnChange} />
            </FormGroup>
          </Fragment>
        )}

        <ButtonBasic>Save</ButtonBasic>
        <ButtonBasic className={'btn-danger'} onClick={onDelete}>Delete</ButtonBasic>
      </Form>
    </div>
  );
};

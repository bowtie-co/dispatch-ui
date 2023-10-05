import React from 'react';
import { api, notifier } from '../../lib';
import { Container, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { ButtonBasic } from '../../atoms';

export const AdminFanPageModal = ({ post, isOpen, ...props}) => {
  const { setPosts, setSelectedPost } = props;

  const dismiss = () => {
    setSelectedPost(null);
  };

  const remove = () => {
    api.deletePlain(`posts/${post._id}`).then(() => {
      notifier.success('Submission has been removed.');

      api.get('posts').then(({ data }) => {
        setPosts(data);
        dismiss();
      }).catch((err) => notifier.bad(err));
    }).catch((err) => notifier.bad(err));
  };

  return (
    <Modal className={'AdminFanPageModal'} isOpen={isOpen} toggle={() => dismiss()} size={'md'} centered>
      <ModalHeader toggle={() => dismiss()}></ModalHeader>
      <ModalBody>
        <Container>
          <h4>Are you sure you want to remove this submission?</h4>
          <h5 className={'mb-4'}>This will delete the user's image or post.</h5>
          <div className={'flex space-between'}>
            <ButtonBasic className={'btn-success'} onClick={() => remove()}>Yes</ButtonBasic>
            <ButtonBasic className={'btn-danger'} onClick={() => dismiss()}>No</ButtonBasic>
          </div>
        </Container>
      </ModalBody>
    </Modal>
  );
};

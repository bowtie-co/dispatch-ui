import React, { useEffect, useState } from 'react';
import { Col, Alert, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { ButtonBasic } from '../../atoms';
import { PostImage} from '../../molecules';

export const AdminModerationModal = ({ posts, post, isOpen, ...props}) => {
  const { postAction, setSelectedPost, theme } = props;

  const defaultComment = 'Rejected for inappropriate content';
  const [ inappropriateRejection, setInappropriateRejection ] = useState(false);
  const [ otherRejection, setOtherRejection ] = useState(false);
  const [ comment, setComment ] = useState(defaultComment);
  const [ alertMsg, setAlertMsg ] = useState();
  const [ alertColor, setAlertColor ] = useState();
  const [ previousIndex, setPreviousIndex ] = useState();
  const [ nextIndex, setNextIndex ] = useState();
  const [ disableActions, setDisableActions ] = useState();
  const [ disablePrevious, setDisablePrevious ] = useState();
  const [ disableNext, setDisableNext ] = useState();

  const dismiss = () => {
    setSelectedPost(null);
  };

  const clearAlert = () => setAlertMsg();

  const previous = () => {
    setSelectedPost(posts[previousIndex]);
    setAlertMsg();
    setDisableActions(false);
  };

  const next = () => {
    setSelectedPost(posts[nextIndex]);
    setAlertMsg();
    setDisableActions(false);
  };

  const approve = () => {
    clearAlert();
    setDisableActions(true);
    postAction(post._id, 'approve');
    setAlertMsg('Post approved.');
    setAlertColor('success');
  };

  const reject = () => {
    clearAlert();
    if (comment) {
      setDisableActions(true);
      postAction(post._id, 'reject', comment);
      setAlertMsg('Post rejected.');
      setAlertColor('success');
    } else {
      setAlertMsg('Please provide a reason for rejection.');
      setAlertColor('danger');
    }
  };

  const handleInappropriateRejection = () => {
    setInappropriateRejection(true);
    setOtherRejection(false);
  };

  const handleOtherRejection = () => {
    setOtherRejection(true);
    setInappropriateRejection(false);
  };

  useEffect(() => setComment(inappropriateRejection ? defaultComment : ''), [ inappropriateRejection ]);

  useEffect(() => {
    const index = posts.findIndex(p => p._id === post._id);
    setDisablePrevious(index <= 0);
    setDisableNext(index >= posts.length - 1);
    setPreviousIndex(index - 1);
    setNextIndex(index + 1);
  }, [ posts, post ]);

  return (
    <Modal className={'AdminModerationModal'} isOpen={isOpen} toggle={dismiss} size={'lg'} centered>
      <ModalHeader toggle={dismiss}></ModalHeader>
      <ModalBody>
        <PostImage post={post} theme={theme}/>
        <div className={'moderation-modal-content'}>
          <Form>
            <div className={'row mb-3'}>
              <Col sm={6} className={'text-center'}>
                <ButtonBasic className={'btn-primary'} onClick={approve} disabled={disableActions}>Approve</ButtonBasic>
              </Col>
              <Col sm={6} className={'text-center'}>
                <ButtonBasic className={'btn-warning'} onClick={reject} disabled={disableActions}>Reject</ButtonBasic>
              </Col>
            </div>

            {alertMsg && <Alert className={'text-center'} color={alertColor} isOpen>{alertMsg}</Alert>}

            <FormGroup>
              <Input key={'default'} id={'default'} name={'reason'} value={'default'} type={'radio'} checked={inappropriateRejection} onChange={() => handleInappropriateRejection()}/>
              <Label style={{marginLeft: '42px'}} for={'default'}>Rejected for inappropriate content</Label>
              <Input key={'other'} id={'other'} name={'reason'} value={'other'} type={'radio'} checked={otherRejection} onChange={() => handleOtherRejection()}/>
              <Label style={{marginLeft: '42px'}} for={'other'}>Other (describe):</Label>
              <textarea maxLength="256" disabled={inappropriateRejection} value={comment} onChange={(e) => setComment(e.target.value)} />
              </FormGroup>
          </Form>

          <div className={'moderation-modal-nav flex space-between'}>
            <button className={'btn-link'} onClick={previous} disabled={disablePrevious}><strong>&laquo;</strong> <em>Previous</em></button>
            <button className={'btn-link'} onClick={next} disabled={disableNext}><em>Next</em> <strong>&raquo;</strong></button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

import React from 'react';
import { Container } from 'reactstrap';

export const AppPostRemoved = (props) => {
  // const { translate } = props;

  return (
    <section className={'AppPostRemoved'}>
      <Container className={'not-found-header'}>
      </Container>
      <Container className={'not-found-content'}>
        <h1 className={'my-4'} style={{ color: 'black' }}>Submission Removed</h1>
        <h4 style={{ color: 'black' }}>Your post has been removed from the system.</h4>
      </Container>
    </section>
  );
};

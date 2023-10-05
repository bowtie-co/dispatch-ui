import React from 'react';
import { Container } from 'reactstrap';

export const AppUnsubscribed = (props) => {
  // const { translate } = props;

  return (
    <section className={'AppUnsubscribed'}>
      <Container className={'not-found-header'}>
      </Container>
      <Container className={'not-found-content'}>
        <h1 className={'my-4'} style={{ color: 'black' }}>Unsubscribed</h1>
        <h4 style={{ color: 'black' }}>You have been unsubscribed. You will no longer receive email from this list.</h4>
      </Container>
    </section>
  );
};

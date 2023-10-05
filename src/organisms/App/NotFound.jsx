import React from 'react';
import { Container } from 'reactstrap';

export const AppNotFound = (props) => {
  const { translate } = props;

  return (
    <section className={'AppNotFound'}>
      <Container className={'not-found-header'}>
      </Container>
      <Container className={'not-found-content'}>
        <h1 className={'my-4'} style={{ color: 'black' }}>{translate('general.not_found')}</h1>
        <h4 style={{ color: 'black' }}>{translate('general.oops')} ...</h4>
      </Container>
    </section>
  );
};

import React, { Fragment, useState, useEffect } from 'react';
import { notifier } from '../../lib';
import { Alert, Row, Col } from 'reactstrap';

export const AppAlert = ({ children, ...props }) => {
  const [ messages, setMessages ] = useState(notifier.load());
  const dismissAlert = (msg) => notifier.clearMsg(msg);

  useEffect(() => {
    const loadMessages = (data) => {
      setMessages(notifier.load());
    };

    notifier.on('change', loadMessages);

    return () => notifier.off('change', loadMessages);
  }, []);

  useEffect(() => {
    messages.forEach(notifier.readMsg.bind(notifier));
  }, [ messages ]);

  if (messages && messages.length > 0) {
    return (
      <section className='notifications'>
        <Row>
          <Col>
            {messages.map(msg =>
              <Alert key={msg.id} color={msg.color} type={msg.type} isOpen toggle={() => dismissAlert(msg)} className={`${msg.type} pre-wrap`}>
                {msg.body}
              </Alert>
            )}
          </Col>
        </Row>
      </section>
    );
  } else {
    return <Fragment />;
  }
};

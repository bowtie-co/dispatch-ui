import React from 'react';
import { Card, Row, Col } from 'reactstrap';

export const AdminTotals = ({data, ...props}) => {
  return (
    <Card className={'AdminTotals'}>
      <Row>
        <Col>
          <p>Page Views</p>
          <h2>{data.post_view}</h2>
        </Col>
        <Col>
          <p>Email Opens</p>
          <h2>{data.email_open}</h2>
        </Col>
        <Col>
          <p>Twitter Shares</p>
          <h2>{data.share_twitter}</h2>
        </Col>
        <Col>
          <p>Facebook Shares</p>
          <h2>{data.share_facebook}</h2>
        </Col>
        <Col>
          <p>Post Downloads</p>
          <h2>{data.share_download}</h2>
        </Col>
      </Row>
    </Card>
  );
};

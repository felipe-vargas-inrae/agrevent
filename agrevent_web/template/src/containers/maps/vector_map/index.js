import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Map from './components/Map';
import {translate} from 'react-i18next';

class VectorMap extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>{t('maps.vector_map.title')}</h3>
            <h3 className='page-subhead subhead'>Use this elements, if you want to show some hints or additional
              information</h3>
          </Col>
        </Row>
        <Row>
          <Map/>
        </Row>
      </Container>
    )
  }
}

export default translate('common')(VectorMap);

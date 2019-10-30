import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import BasicMap from './components/BasicMap';
import PinWithInfoWindow from './components/PinWithInfoWindow';
import MonochromeMap from './components/MonochromeMap';
import {translate} from 'react-i18next';

class GoogleMap extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>{t('maps.google_map.title')}</h3>
            <h3 className='page-subhead subhead'>Use this elements, if you want to show some hints or additional
              information</h3>
          </Col>
        </Row>
        <Row>
          <BasicMap/>
          <PinWithInfoWindow/>
          <MonochromeMap/>
        </Row>
      </Container>
    )
  }
}

export default translate('common')(GoogleMap);

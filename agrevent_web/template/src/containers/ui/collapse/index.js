import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import MinimalCollapse from './components/MinimalCollapse'
import BoxedCollapse from './components/BoxedCollapse'
import BoxedCollapseFullWidth from './components/BoxedCollapseFullWidth'
import {translate} from 'react-i18next';

class Collapse extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>{t('ui_elements.collapse.title')}</h3>
            <h3 className='page-subhead subhead'>Use this elements, if you want to show some hints or additional
              information</h3>
          </Col>
        </Row>
        <Row>
          <MinimalCollapse/>
          <BoxedCollapse/>
          <BoxedCollapseFullWidth/>
        </Row>
      </Container>
    )
  }
}

export default translate('common')(Collapse);

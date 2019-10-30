import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import DefaultTabs from './components/DefaultTabs';
import DefaultTabsBorderedTop from './components/DefaultTabsBorderedTop';
import JustifyTabs from './components/JustifyTabs';
import JustifyTabsBorderedTop from './components/JustifyTabsBorderedTop';
import JustifyTabsBorderedBottom from './components/JustifyTabsBorderedBottom';
import DefaultTabsBorderedBottom from './components/DefaultTabsBorderedBottom';
import VerticalTabs from './components/VerticalTabs';
import VerticalTabsColored from './components/VerticalTabsColored';
import {translate} from 'react-i18next';

class Tabs extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>{t('ui_elements.tabs.title')}</h3>
            <h3 className='page-subhead subhead'>Use this elements, if you want to show some hints or additional
              information</h3>
          </Col>
        </Row>
        <Row>
          <DefaultTabs/>
          <DefaultTabsBorderedTop/>
          <JustifyTabs/>
          <JustifyTabsBorderedTop/>
          <JustifyTabsBorderedBottom/>
          <DefaultTabsBorderedBottom/>
          <VerticalTabs/>
          <VerticalTabsColored/>
        </Row>
      </Container>
    )
  }
}

export default translate('common')(Tabs);

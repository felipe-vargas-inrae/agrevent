import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import BasicTable from './components/BasicTable';
import BorderedTable from './components/BorderedTable';
import HeadAccentTable from './components/HeadAccentTable';
import ColoredStringTable from './components/ColoredStringTable';
import HoverColoredStringTable from './components/HoverColoredStringTable';
import InverseStyleTable from './components/InverseStyleTable';
import ResponsiveTable from './components/ResponsiveTable';
import {translate} from 'react-i18next';

class BasicTables extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>{t('tables.basic_tables.title')}</h3>
            <h3 className='page-subhead subhead'>Use this elements, if you want to show some hints or additional
              information</h3>
          </Col>
        </Row>
        <Row>
          <BasicTable/>
          <BorderedTable/>
          <HeadAccentTable/>
          <ColoredStringTable/>
          <HoverColoredStringTable/>
          <InverseStyleTable/>
          <ResponsiveTable/>
        </Row>
      </Container>
    )
  }
}

export default translate('common')(BasicTables);

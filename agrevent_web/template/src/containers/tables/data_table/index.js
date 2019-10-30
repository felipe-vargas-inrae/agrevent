import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Table from './components/DataTable';
import {translate} from 'react-i18next';

class DataTable extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>{t('tables.data_table.title')}</h3>
            <h3 className='page-subhead subhead'>Use this elements, if you want to show some hints or additional
              information</h3>
          </Col>
        </Row>
        <Row>
          <Table/>
        </Row>
      </Container>
    )
  }
}

export default translate('common')(DataTable);

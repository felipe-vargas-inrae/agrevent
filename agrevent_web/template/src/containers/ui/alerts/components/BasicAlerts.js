import React, {PureComponent} from 'react';
import Alert from '../../../../components/Alert';
import {Card, CardBody, Col} from 'reactstrap';
import {translate} from 'react-i18next';

class BasicAlerts extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Col md={12} lg={12} xl={6}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>{t('ui_elements.alerts.basic_alerts')}</h5>
              <h5 className='subhead'>Basic configuration of alert</h5>
            </div>
            <Alert color='info'>
              <p><span className='bold-text'>Information:</span> Learning day desirous informed expenses material
                returned six the.
                She enabled invited exposed him another.</p>
            </Alert>
            <Alert color='success'>
              <p><span className='bold-text'>Congratulations!</span> Learning day desirous informed expenses
                material returned six the. She enabled invited exposed him another.</p>
            </Alert>
            <Alert color='warning'>
              <p><span className='bold-text'>Attention!</span> Learning day desirous informed
                expenses material returned six the. She enabled invited exposed him another.</p>
            </Alert>
            <Alert color='danger'>
              <p><span className='bold-text'>Warning!</span> Learning day desirous informed expenses
                material returned six the. She enabled invited exposed him another.</p>
            </Alert>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default translate('common')(BasicAlerts);

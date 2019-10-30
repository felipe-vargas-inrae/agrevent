import React, {PureComponent} from 'react';
import Alert from '../../../../components/Alert';
import {Card, CardBody, Col} from 'reactstrap';
import {translate} from 'react-i18next';

class BorderedAlertsWithIcons extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Col md={12} lg={12} xl={6}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>{t('ui_elements.alerts.bordered_alerts_with_icons')}</h5>
              <h5 className='subhead'>Use basic alert with class <span className='red-text'>alert--bordered</span></h5>
            </div>
            <Alert color='info' className='alert--bordered' icon>
              <p><span className='bold-text'>Information:</span> Learning day desirous informed expenses material
                returned six the.
                She enabled invited exposed him another.</p>
            </Alert>
            <Alert color='success' className='alert--bordered' icon>
              <p><span className='bold-text'>Congratulations!</span> Learning day desirous informed expenses
                material returned six the. She enabled invited exposed him another.</p>
            </Alert>
            <Alert color='warning' className='alert--bordered' icon>
              <p><span className='bold-text'>Attention!</span> Learning day desirous informed
                expenses material returned six the. She enabled invited exposed him another.</p>
            </Alert>
            <Alert color='danger' className='alert--bordered' icon>
              <p><span className='bold-text'>Warning!</span> Learning day desirous informed expenses
                material returned six the. She enabled invited exposed him another.</p>
            </Alert>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default translate('common')(BorderedAlertsWithIcons);

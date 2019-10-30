import React, {PureComponent} from 'react';
import {Card, CardBody, Col, Progress} from 'reactstrap';
import {translate} from 'react-i18next';

class DataProgressBar extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Col md={12} lg={6}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>{t('ui_elements.progress_bars.data_progress_bar')}</h5>
              <h5 className='subhead'>Use default progress with text</h5>
            </div>
            <div className='progress-wrap progress-wrap--middle'>
              <Progress value={70}>70%</Progress>
            </div>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default translate('common')(DataProgressBar);

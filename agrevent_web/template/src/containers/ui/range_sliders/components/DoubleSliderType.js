import React, {PureComponent} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import Range from '../../../../components/range_slider/Range';
import {translate} from 'react-i18next';

class DoubleSliderType extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Col md={12} lg={6} xs={12}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>{t('ui_elements.range_sliders.double_slider_type')}</h5>
              <h5 className='subhead'>Use default range</h5>
            </div>
            <Range min={0} max={1000} value={[350, 635]} tipFormatter={value => `$${value}`}/>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default translate('common')(DoubleSliderType);

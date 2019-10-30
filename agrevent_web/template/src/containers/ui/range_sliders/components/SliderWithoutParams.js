import React, {PureComponent} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import Slider from '../../../../components/range_slider/Slider';
import {translate} from 'react-i18next';

class SliderWithoutParams extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Col md={12} lg={6} xs={12}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>{t('ui_elements.range_sliders.slider_without_params')}</h5>
              <h5 className='subhead'>Use default slider</h5>
            </div>
            <Slider min={0} max={100}/>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default translate('common')(SliderWithoutParams);

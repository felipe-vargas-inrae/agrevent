import React, {PureComponent} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import {translate} from 'react-i18next';

class Blockquote extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Col md={12} lg={6}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>{t('ui_elements.typography.blockquote')}</h5>
              <h5 className='subhead'>Use default <span className='red-text'>blockquote</span></h5>
            </div>
            <blockquote>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            </blockquote>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default translate('common')(Blockquote);

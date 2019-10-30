import React, {PureComponent} from 'react';
import Panel from '../../../../components/Panel';
import {translate} from 'react-i18next';

const Dog = process.env.PUBLIC_URL + '/img/for_store/dog/1.png';

class BasicCard extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Panel md={12} lg={6} xl={3} xs={12}>
        <div className='dashboard__product'>
          <div className='dashboard__product-img'>
            <img src={Dog} alt=''/>
          </div>
          <h5 className='bold-text dashboard__product-title'>{t('dashboard_commerce.basic_card')}</h5>
          <h5 className='subhead dashboard__product-subhead'>Knowledge nay estimable questions repulsive daughters
            boy.</h5>
          <p><a href=''>View in the item list</a></p>
        </div>
      </Panel>
    )
  }
}

export default translate('common')(BasicCard);

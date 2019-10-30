import React, {PureComponent} from 'react';
import Panel from '../../../../components/Panel';
import BuyBTC from './BuyBTC';
import SellBTC from './SellBTC';
import {translate} from 'react-i18next';

class PlaceOrder extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Panel xl={6} lg={12} title={t('dashboard_crypto.trade_history')}
             subhead='You can buy or sell a cryptocurrency'>
        <div className='dashboard__place-order'>
          <BuyBTC onSubmit/>
          <SellBTC onSubmit/>
        </div>
      </Panel>
    )
  }
}

export default translate('common')(PlaceOrder);

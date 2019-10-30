import React, {PureComponent} from 'react';
import {PieChart, Pie} from 'recharts';
import Panel from '../../../../components/Panel';
import {translate} from 'react-i18next';

const data01 = [{value: 80, fill: '#4ce1b6'},
  {value: 20, fill: '#eeeeee'}];

const data02 = [{value: 50, fill: '#ff4861'},
  {value: 50, fill: '#eeeeee'}];

class SalesStatistic extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Panel md={12} lg={6} xl={3} xs={12} title={t('dashboard_commerce.sales_statistic')}
             subhead='Top selling items statistic by last month'>
        <div className='dashboard__stat'>
          <div className='dashboard__stat-chart'>
            <PieChart height={120} width={120}>
              <Pie data={data01} dataKey='value' cx={55} cy={55} innerRadius={55} outerRadius={60}/>
            </PieChart>
            <p className='dashboard__stat-label' style={{color: '#4ce1b6'}}>80%</p>
          </div>
          <div className='dashboard__stat-info'>
            <p>Top selling items statistic by last month</p>
            <h4 className='dashboard__-stat-number'>
              $23,747.00
            </h4>
          </div>
        </div>
        <div className='dashboard__stat'>
          <div className='dashboard__stat-chart'>
            <PieChart width={120} height={120}>
              <Pie data={data02} dataKey='value' cx={55} cy={55} innerRadius={55} outerRadius={60}/>
            </PieChart>
            <p className='dashboard__stat-label' style={{color: '#ff4861'}}>50%</p>
          </div>
          <div className='dashboard__stat-info'>
            <p>Top selling items statistic by last month</p>
            <h4 className='dashboard__stat-number'>
              $23,747.00
            </h4>
          </div>
        </div>
      </Panel>
    )
  }
}

export default translate('common')(SalesStatistic);

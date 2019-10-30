import React, {PureComponent} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import {Polar} from 'react-chartjs-2';
import {translate} from 'react-i18next';

const data = {
  datasets: [{
    data: [11, 16, 7, 3, 14],
    backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
    label: 'My dataset',
    borderColor: 'rgba(255,255,255,0.54)'
  }],
  labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue']
};

const options = {
  legend: {
    position: 'bottom',
  },
  scale: {
    gridLines: {
      color: 'rgb(204, 204, 204)',
      borderDash: [3,3]
    },
    ticks: {
      fontColor: 'rgb(204, 204, 204)'
    }
  }
};

class PolarArea extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Col md={12} lg={12} xl={6}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>{t('charts.react_chartjs.polar_area')}</h5>
            </div>
            <Polar data={data} options={options}/>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default translate('common')(PolarArea);

import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import HorizontalForm from './components/HorizontalForm';
import VerticalForm from './components/VerticalForm';
//import showResults from './components/Show';
import {translate} from 'react-i18next';
//import  * as actions  from '../../../redux/actions/sensorActions'
//import  {connectSensor}  from '../../../redux/actions/sensorActions'
import { connect } from 'react-redux';
//import { bindActionCreators} from "redux";

var mapStateToProps = (state)=>{
  return {
    sensor: state.sensor
  };
}

// var mapDispatchToProps = (dispatch)=>{
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   }
// }

class SensorForm extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {formSensorInfo:{}}
  }

  showResults= (values)=>{
    this.setState({formSensorInfo:values})
    //this.props.dispatch(connectSensor(values));
  }
  
  render() {
    const {t} = this.props;

    console.log("render", this.state)

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>{t('sensor.title')}</h3>
            <h3 className='page-subhead subhead'>This panel shows sensor information and realtime data</h3>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <HorizontalForm onSubmit={this.showResults}/>
          </Col>
          <Col md={6}>
            <VerticalForm sensorInfo={this.state.formSensorInfo}/>
          </Col>
            
        </Row>
      </Container>
    )
  }
}

export default connect(mapStateToProps) (translate('common')(SensorForm));

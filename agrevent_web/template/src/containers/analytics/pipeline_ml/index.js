import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
//import showResults from './components/Show';
import {translate} from 'react-i18next';
//import  * as actions  from '../../../redux/actions/sensorActions'
//import  {connectSensor}  from '../../../redux/actions/sensorActions'
import { connect } from 'react-redux';
//import { bindActionCreators} from "redux";
import PipelineML from './components/PipelineML'
import MachineLearningLayout from './components/MachineLearningLayout'
var mapStateToProps = (state)=>{
  return { 
    dataset:state.analytics.joinerDataset
  };
}

// var mapDispatchToProps = (dispatch)=>{
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   }
// }

class ReviewJoiner extends PureComponent {

  constructor(props) {
    super(props);
  }
  render() {
    const {t} = this.props;
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>Machine Learning Modelling </h3>
            <h3 className='page-subhead subhead'> You can run machine learning models </h3>
          </Col>
        </Row>
        <Row>
          {/* <Col md={3}>
            
          </Col>
          <Col md={3}>
            <PipelineML> </PipelineML>
          </Col> */}
          <Col md={12}>
            <MachineLearningLayout></MachineLearningLayout>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default connect(mapStateToProps) (translate('common')(ReviewJoiner));

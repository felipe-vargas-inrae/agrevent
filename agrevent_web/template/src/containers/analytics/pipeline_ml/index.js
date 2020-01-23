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
import { withRouter, Link } from 'react-router-dom';


var mapStateToProps = (state)=>{
  return { 
    dataset:state.analytics.joinerDataset
    //dataset:sparkResponse
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
    const {t, dataset} = this.props;

    if (dataset==null || dataset.length===0){
      return (
        <Container>
          <Row> <p> No avalaible, please go to <Link to='/analytics/preprocessing'> pre-processing </Link> </p>
          </Row>
      </Container>)
    }
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
            <MachineLearningLayout columns={dataset.columns}></MachineLearningLayout>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(connect(mapStateToProps) (translate('common')(ReviewJoiner)));

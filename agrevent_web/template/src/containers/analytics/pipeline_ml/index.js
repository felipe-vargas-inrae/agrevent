import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {translate} from 'react-i18next';
import { connect } from 'react-redux';
import MachineLearningLayout from './components/MachineLearningLayout'
import MachineLearningResponse from './components/MachineLearningResponse'
import { withRouter, Link } from 'react-router-dom';


var mapStateToProps = (state)=>{
  return { 
    dataset:state.analytics.joinerDataset,
    //dataset:sparkResponse
    responseMachineLearning:state.analytics.responseMachineLearning
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
    this.state={}
  }
  render() {
    const {t, dataset, responseMachineLearning} = this.props;

    if (dataset==null || dataset.length===0){
      return (
        <Container>
          <Row> <p> No avalaible, please go to <Link to='/analytics/preprocessing'> pre-processing </Link> </p>
          </Row>
          <Row>
          <MachineLearningResponse response={responseMachineLearning}></MachineLearningResponse>

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
          <Col md={12}>
            <MachineLearningLayout columns={dataset.columns}></MachineLearningLayout>
            <MachineLearningResponse response={responseMachineLearning}></MachineLearningResponse>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(connect(mapStateToProps) (translate('common')(ReviewJoiner)));

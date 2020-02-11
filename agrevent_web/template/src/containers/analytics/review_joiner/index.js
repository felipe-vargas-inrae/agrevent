import React, {PureComponent} from 'react';
import {Col, Container, Row, ButtonToolbar, Button} from 'reactstrap';
//import showResults from './components/Show';
import {translate} from 'react-i18next';
//import  * as actions  from '../../../redux/actions/sensorActions'
//import  {connectSensor}  from '../../../redux/actions/sensorActions'
import { connect } from 'react-redux';
//import { bindActionCreators} from "redux";
import PlotHeatMap from './components/PlotHeatMap'

//import DatasetTable from './components/DataTable'
import MaterialTable from './components/MaterialTable'
import { withRouter, Link } from 'react-router-dom';

import sparkResponse from './components/db/reponse_spark'
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

  handleSubmit = (e)=>{

    this.props.history.push('/analytics/pipeline_ml');
  }
  
  render() {
    const {t, dataset} = this.props;

    console.log(dataset)

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
            <h3 className='page-title'>Data Viz Review  </h3>
            <h3 className='page-subhead subhead'> You can see here a report about the data </h3>
          </Col>
        </Row>

        <PlotHeatMap dataset={dataset.rows} columns={dataset.columns}></PlotHeatMap>
        
        <MaterialTable dataset={dataset.rows} columns={dataset.columns}></MaterialTable>


        <Row>
          <ButtonToolbar className='form__button-toolbar'>
            <Button color='primary' onClick={this.handleSubmit}> Continue to Modelling </Button>
          </ButtonToolbar>

        </Row>



      </Container>
    )
  }
}

export default withRouter(connect(mapStateToProps) (translate('common')(ReviewJoiner)))

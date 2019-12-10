
import { connect } from 'react-redux';
import React,{Component} from 'react'
import { 
  updateJoinerDataset
} from '../../../../redux/actions/analyticsActions';


import { withRouter } from 'react-router-dom';

import JoinerForm from '../forms/JoinerForm'
import {Card, CardBody,   Col} from 'reactstrap';
import axios from 'axios';
import datasetJoiner from './db/PipelineResult'

import {API_PREPROCESSING_PIPELINES} from '../../constans'

const mapStateToProps = (state) => {
    
    return {
      pipelinesList:state.analytics.pipelinesList
    };
}
const mapDispatchToProps = (dispatch) => {

  // en este espacio se crean funciones locales que se enlazan a acciones importadas
  return {
    updateJoinerDataset:(datasetJoiner)=>{
      dispatch(updateJoinerDataset(datasetJoiner))
    }
    
  }
}

class Joiner extends Component {
    componentWillMount() {
      
    }
    componentWillUnmount() {
     
    };
    handleSubmit = (e)=>{
      
      let values={}
      for (let key in e ){
        const value=e[key]
        if(typeof(value)==='object'){
          values[key]=value.value
        }
        else {
          values[key]=value
        }
      }


      const requestData= {pipelineList:this.props.pipelinesList,joinner: values}
      
      // this.props.updateJoinerDataset(datasetJoiner)

      // debugger

      // this.props.history.push('/analytics/review_joiner');

      

      axios({
        method: 'post',
        url: API_PREPROCESSING_PIPELINES,
        data:requestData,
        headers: []
      }).then((response)=>{

        console.log('response axios', response)
        this.props.updateJoinerDataset(datasetJoiner)
        this.props.history.push('/analytics/review_joiner')
      });
    }

    constructor(props) {
      super(props);
      this.state = {
      };
      this.handleSubmit=this.handleSubmit.bind(this)
    }
    render(){
      
      const pipelinesList= this.props.pipelinesList;
      
      const list= pipelinesList.map((item,i)=>{
        return  {value: item.name, label: item.name}
      })

      // style={{"background":amber[200]}}
      return ( 
        <Col sm="12" md="12">
        <Card style={{width:"560px"}} > 
          <CardBody  >  
            <div className='card__title'>
              <h5 className='bold-text'>
                Joiner
                
              </h5>
              <h5 className='subhead'>Combine the pipelines to create a consilidated dataframe</h5>
            </div>
        
            <JoinerForm onSubmit={this.handleSubmit} pipelinesList={this.props.pipelinesList} ></JoinerForm>
        </CardBody>
        </Card>
        </Col>

      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Joiner));


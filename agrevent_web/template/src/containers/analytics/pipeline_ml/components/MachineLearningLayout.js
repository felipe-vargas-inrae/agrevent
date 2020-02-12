
import { connect } from 'react-redux';
import React,{Component} from 'react'

import DatasetML from './db/DatasetMLInfo'
import {updateMachineLearningResponse} from '../../../../redux/actions/analyticsActions'
import MachineLearningForm from '../forms/MachineLearningForm';
import axios from 'axios';

import {API_ML} from '../../../../app/Constans' 

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateMachineLearningResponse:(newResponse)=>{
      dispatch(updateMachineLearningResponse(newResponse))
    }
  }
}

class MachineLearningLayout extends Component {
    componentWillMount() {
    }
    constructor(props) {
      super(props);
      // this.state = {
      //   features:DatasetML.columns,
      //   models: DatasetML.models
      // }
      this.state = {
        features:this.props.columns,
        models: DatasetML.models
      }
      this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit (e){
      console.log(e)

      debugger 
      const listVariables=[]
      // for (const x in e ){
      //   if(typeof(e[x])==='boolean'){
      //     if (e[x]){
      //       listVariables.push(x)
      //     }
      //   }
      // }
      
      const request={} 
      request.target= e.targetVariable.value
      request.ModelML= e.ModelML.value
      request.listVariables=e.featuresSelected.split(',')

      console.log(request)

      axios({
        method: 'post',
        url: API_ML,
        data:request,
        headers: []
      }).then((response)=>{

        
        //this.setState({processing:false })
         
        console.log(response)
        response.data.predictions= JSON.parse(response.data.predictions)
        this.props.updateMachineLearningResponse(response.data)
        // //this.props.history.push('/analytics/pipeline_ml');
        // this.props.history.push('/analytics/review_joiner');
        
      
      });
    }


    render(){
        
        return  (<div>
          <MachineLearningForm  onSubmit={this.handleSubmit}  features={this.state.features} models={this.state.models}></MachineLearningForm>
        </div>)
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(MachineLearningLayout);


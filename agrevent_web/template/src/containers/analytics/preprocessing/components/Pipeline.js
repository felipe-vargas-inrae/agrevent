
import { connect } from 'react-redux';
import React,{Component} from 'react'
import {Field, reduxForm} from 'redux-form';

import ListPipelines from './db/PipelineListFactory';

import PipelineDetail from './PipelineDetail'

import {updatePipelinesList, deleteItemPipelinesList} from '../../../../redux/actions/analyticsActions'


const mapStateToProps = (state) => {
    
  return { 
    pipelinesList: state.analytics.pipelinesList,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {

    updatePipelinesList:(newPipelineList)=>{
      dispatch(updatePipelinesList(newPipelineList))
    },
    deleteItemPipelinesList:(pipelineName)=>{
      dispatch(deleteItemPipelinesList(pipelineName))
    }
  }
}

class PipelinesList extends Component {
    componentWillMount() {
      this.props.updatePipelinesList(ListPipelines)
    }
    constructor(props) {
      super(props);
      this.state = {
      };
      this.deletePipeline=this.deletePipeline.bind(this)
    }

    deletePipeline(pipelineName){
      
      this.props.deleteItemPipelinesList(pipelineName)
    }
    render(){
        const pipelinesList = this.props.pipelinesList;
        console.log("in render pipeline list",pipelinesList)
        const list= pipelinesList.map((item,i)=>{
          return  (<PipelineDetail key={i} pipeline={item} 
            deletePipeline={this.deletePipeline}
           
            ></PipelineDetail>)
        })
        return ( 
        <div>
          {list}
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PipelinesList);


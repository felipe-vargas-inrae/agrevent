
import { connect } from 'react-redux';
import React,{Component} from 'react'
import {Field, reduxForm} from 'redux-form';

import { 
    //fetchDataframes, fetchDataframesSuccess,fetchDataframesFailure,
    updateDataframesList, pushItemPipelinesList, updateTransformationTypes
} from '../../../../redux/actions/analyticsActions';

import DataframesInfo from './db/DataframesInfo'
import TransformationsTypesInfo from './db/TransformationsTypes'
import DataframeListForm from '../forms/DataframeListForm'


import NotificationMessages from '../components/NotificationsMessages'

const mapStateToProps = (state) => {
    
    return { 
      dataframesList: state.analytics.dataframesList,
      pipelinesList:state.analytics.pipelinesList
    };
}
const mapDispatchToProps = (dispatch) => {

  // en este espacio se crean funciones locales que se enlazan a acciones importadas
  return {
    updateDataframesList:(newDataframesListList)=>{
      dispatch(updateDataframesList(newDataframesListList))
    },
    pushItemPipelinesList:(pipelineItem)=>{
      dispatch(pushItemPipelinesList(pipelineItem))
    },
    updateTransformationTypes:(transformationsTypesList)=>{
      dispatch(updateTransformationTypes(transformationsTypesList))
    }
  }
}

const isNameIncluded = (currentName, pipelinesList)=>{
  const NOT_INCLUDED= -1
  const pipelinesListName = pipelinesList.map((item)=>{ return item.name});
  const index=pipelinesListName.indexOf(currentName);
  return index > NOT_INCLUDED
}

class DataframeList extends Component {
    componentWillMount() {
      this.props.updateDataframesList(DataframesInfo)
      this.props.updateTransformationTypes(TransformationsTypesInfo)
      
      this.notify=new NotificationMessages()
    }
    componentWillUnmount() {
      this.notify.destroy();
    };
    handleSubmit = (e)=>{
      console.log("inside submit ", e);
      if(isNameIncluded(e.name, this.props.pipelinesList)){
        //launch alert
        
        this.notify.errorMessages("Pipeline name was already used")
      }

      else {
        const pipeline= {name:e.name, methods :[ { method:"read", params:[{name:"dataframeName",value:e.dataframeName.value,type:"value"}] }] }
        this.props.pushItemPipelinesList(pipeline)
      }
    }

    constructor(props) {
      super(props);
      this.state = {
      };
      this.handleSubmit=this.handleSubmit.bind(this)
    }
    render(){
      
      const dataframesList= this.props.dataframesList;
      
      const list= dataframesList.map((item,i)=>{
        return  {value: item.name, label: item.name}
      })
      return ( 
        <DataframeListForm onSubmit={this.handleSubmit} dataframes={list} ></DataframeListForm>
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataframeList);



import { connect } from 'react-redux';
import React,{Component} from 'react'
import {Field, reduxForm} from 'redux-form';

import { 
    fetchDataframes, fetchDataframesSuccess,fetchDataframesFailure
} from '../../../../redux/actions/analyticsActions';

import renderSelectField from '../../../../components/form/Select';

import DataframeListForm from '../forms/DataframeListForm'


const mapStateToProps = (state) => {
    console.log("map to props")
    return { 
      dataframesFetch: state.analytics.dataframesFetch,
    };
}
const mapDispatchToProps = (dispatch) => {

  // en este espacio se crean funciones locales que se enlazan a acciones importadas
  return {
    fetchDataframes: () => {
      dispatch(fetchDataframes()).then((response) => {
            !response.error ? dispatch(fetchDataframesSuccess(response.payload.data)) : dispatch(fetchDataframesFailure(response.payload.data));
          });
    }
  }
}

class DataframeList extends Component {
    componentWillMount() {
        this.props.fetchDataframes();
    }
    showDetail(item){
      console.log(item);
      //this.props.showEditSensor(item) // notify store global
      //this.setState({...this.state, selectedId:item.id})
    }

    handleSubmit = (e)=>{
      console.log("inside submit ", e);
      console.log()
      //e.preventDefault();
    }
    constructor(props) {
      super(props);
      this.state = {
      };
      //this.showDetail=this.showDetail.bind(this)
      this.handleSubmit=this.handleSubmit.bind(this)
    }
    render(){
        const { dataframes, loading, error } = this.props.dataframesFetch;
        console.log("in render list",dataframes)
        const list= dataframes.map((item,i)=>{
          return  {value: item.id, label: item.title}
        })
        if(loading){
          return (<p>Loading</p>)
        }
        if(error){
          return (<p>error</p>)
        }
        return ( 
         <DataframeListForm onSubmit={this.handleSubmit} dataframes={list} ></DataframeListForm>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataframeList);


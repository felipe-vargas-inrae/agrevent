
import { fetchSensors, fetchSensorsFailure,fetchSensorsSuccess, showEditSensor, hideEditSensor } from '../../../../redux/actions/sensorActions';
import { connect } from 'react-redux';
import React,{Component} from 'react'

import {ListGroup, ListGroupItem } from "reactstrap"

const mapStateToProps = (state) => {
  return { 
    sensorsList: state.sensor.sensorsList,
    panelsSensor: state.sensor.panelsSensor
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSensors: () => {
      dispatch(fetchSensors()).then((response) => {
            !response.error ? dispatch(fetchSensorsSuccess(response.payload.data)) : dispatch(fetchSensorsFailure(response.payload.data));
          });
    },
    showEditSensor:(obj)=>{
      dispatch(showEditSensor(obj));
    }
  }
}

class SensorsList extends Component {
    componentWillMount() {
        this.props.fetchSensors();
    }
    showDetail(item){
      console.log(item);
      this.props.showEditSensor(item)

      this.setState({...this.state, selectedId:item.id})
    }

    constructor(props) {
      super(props);
      this.state = {
      };
      this.showDetail=this.showDetail.bind(this)
    }

    render(){
        const { sensors, loading, error } = this.props.sensorsList;
        const { create , edit} = this.props.panelsSensor;
        console.log("sensor",sensors)

        const list= sensors.map((item,i)=>{

          let selectClass=""
          if(item.id===this.state.selectedId && edit ){
            selectClass="active"
          }
          
          return (<ListGroupItem 
          key={i} 
          style={{"cursor":"pointer"}}
          onClick={() => this.showDetail(item)}
          className={selectClass}
          
           > {item.title}</ListGroupItem>)
        } )

        if(loading){
          return (<p>Loading</p>)
        }
        if(error){
          return (<p>error</p>)
        }

        return ( <ListGroup>{list}</ListGroup>)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SensorsList);

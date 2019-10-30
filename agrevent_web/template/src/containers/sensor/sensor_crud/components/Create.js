
import { connect } from 'react-redux';
import React, { Component } from 'react';
import CreateForm from '../forms/CreateForm'
const mapStateToProps = (state) => {

  
  return {
    panelsSensor: state.sensor.panelsSensor
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
class SensorCreate extends Component {
  componentWillMount() {
    //this.props.fetchSensors();
  }
  render() {
    const { create } = this.props.panelsSensor;
    const ReactModal = (<div className={create ? '':'d-none'}>
      <h2>Add</h2>
      <hr></hr>
      <CreateForm handleSubmit={this.create}/>
    </div>)
    return  ReactModal 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SensorCreate);

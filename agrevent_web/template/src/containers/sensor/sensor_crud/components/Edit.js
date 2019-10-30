
import { connect } from 'react-redux';
import React, { Component } from 'react';
import CreateForm from '../forms/CreateForm'
const mapStateToProps = (state) => {
  console.log("call state to prop in create panel", state)
  return {
    panelsSensor: state.sensor.panelsSensor
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
class SensorEdit extends Component {
  componentWillMount() {
    //this.props.fetchSensors();
  }
  render() {
    const { edit , sensor} = this.props.panelsSensor;

    const sensorText=JSON.stringify(sensor)
    const ReactModal = (<div className={edit ? '' : 'd-none'}>
      <h2>Edit</h2>
      <hr></hr>
      
      <p>{sensorText}</p>
      <CreateForm handleSubmit={this.edit} />
    </div>)
    return ReactModal
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SensorEdit);

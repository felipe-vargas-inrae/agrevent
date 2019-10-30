import React, {PureComponent} from 'react';
import {Col, Container, Row, Card, CardBody, Button} from 'reactstrap';
import SensorsList from './components/List';
import SensorCreate from './components/Create';
import SensorEdit from './components/Edit';
import {translate} from 'react-i18next';
import {connect} from "react-redux";

import {showCreateSensor,hideCreateSensor} from "../../../redux/actions/sensorActions"

class SensorCrud extends PureComponent {
  constructor(props) {
    super(props)
    this.showCreate=this.showCreate.bind(this)
    this.hideCreate=this.hideCreate.bind(this)
  }
  showCreate(){
    
    this.props.dispatch(showCreateSensor());
  }
  hideCreate(){
    
    this.props.dispatch(hideCreateSensor());
  }

  render() {
    const {t} = this.props;

    console.log("render", this.state)
    
    return (
      <Container>
        <Row>
          <Col md={6}>
            <Card>
              <CardBody>
                  <Button  color="primary" onClick={this.showCreate} >Add Sensor </Button>
                  <Button  color="primary" onClick={this.hideCreate} >Hide Panel </Button>
                  <SensorsList ></SensorsList>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardBody>  
                <SensorCreate />
                <SensorEdit />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default  connect(state => {
  // return {panelsSensor: state.sensor.panelsSensor}
})(translate('common')(SensorCrud))

import React, {PureComponent} from 'react';
import {Col, Container, Row, Card, CardBody, Button} from 'reactstrap';
import DataframeList from './components/DataframeList';
import Pipeline from './components/Pipeline';
import {translate} from 'react-i18next';
import {connect} from "react-redux";
import Joiner from './components/Joiner';

//import {showCreateSensor,hideCreateSensor} from "../../../redux/actions/sensorActions"

class Preprocessing extends PureComponent {
  constructor(props) {
    super(props)
    // this.showCreate=this.showCreate.bind(this)
    // this.hideCreate=this.hideCreate.bind(this)
  }

  render() {
    const {t} = this.props;

    console.log("render index.js", this.state)
    
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>Data Pre-processing </h3>
            <h3 className='page-subhead subhead'> You can build data pipelines starting with a dataframe    </h3>
          </Col>
        </Row>
        
        <DataframeList ></DataframeList>
        

       
        <Pipeline ></Pipeline>

      <Row>
        <Joiner />
      </Row>   
      </Container>
    )
  }
}

export default  connect(state => {
  // return {panelsSensor: state.sensor.panelsSensor}
})(translate('common')(Preprocessing))

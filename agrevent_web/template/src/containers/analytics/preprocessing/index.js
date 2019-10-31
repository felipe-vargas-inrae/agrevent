import React, {PureComponent} from 'react';
import {Col, Container, Row, Card, CardBody, Button} from 'reactstrap';
import DataframeList from './components/DataframeList';
import {translate} from 'react-i18next';
import {connect} from "react-redux";

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
            <Card>
              <CardBody>
                  {/* <Button  color="primary"  >Add Dataframe </Button> */}
                  <DataframeList ></DataframeList>
              </CardBody>
            </Card>
          </Col>
          {/* <Col md={6}>
            <Card>
              <CardBody>  
                { <SensorCreate />
                <SensorEdit /> }
              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </Container>
    )
  }
}

export default  connect(state => {
  // return {panelsSensor: state.sensor.panelsSensor}
})(translate('common')(Preprocessing))

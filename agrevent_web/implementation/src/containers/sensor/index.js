import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import ExampleCard from './components/ExampleCard'
import SensorForm from "./components/SensorForm"

export default class SensorPage extends PureComponent {
  render() {
    return (
      <Container className='dashboard'>
        <Row>
          <Col md={6}>
            <h3 className='page-title'>Sensor Connection</h3>
            <SensorForm />

          </Col>
        </Row>
        <Row>
            <Col md={6}>
                <ExampleCard/>
            </Col>
        </Row>
      </Container>
    )
  }
}


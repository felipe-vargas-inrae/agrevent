import React, {PureComponent} from 'react';
import {Col, Row, Container} from 'reactstrap';

const background = process.env.PUBLIC_URL + '/img/landing/bottom_bg.png';

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className='landing__footer'>
        <img className='landing__footer-background' src={background} alt=''/>
        <Container>
          <Row>
            <Col md={12}>
              <p className='landing__footer-text'>&copy;2020 Universidad del Valle, Cali, Colombia Developed  by
                <a href='https://www.linkedin.com/in/felipex10/'> Felipe Vargas-Rojas</a></p>
            </Col>
          </Row>
        </Container>
      </footer>
    )
  }
}
import React, {PureComponent} from 'react';
import {Col, Row, Container} from 'reactstrap';
import {Link} from 'react-router-dom';

const background = process.env.PUBLIC_URL + '/img/landing/header_bg.png';
const img = process.env.PUBLIC_URL + '/img/landing/macbook.png';

const imgLogo = process.env.PUBLIC_URL + '/img/landing/logo_light2.png';

export default class Header extends PureComponent {
  render() {
    return (
      <div className='landing__header' style={{backgroundImage: 'url(' + background + ')'}}>
        <Container>
          <Row>
            <Col md={12}>

              <p>
                <img className='landing__header-img' src={imgLogo} alt='logo'></img>
              </p>
              <h2 className='landing__header-title'>Welcome!! to AgrevenT your user-friendly platform for <b>Big Data Analytics</b> based on Agronomic Data</h2>
              
              
              <Link className='landing__btn landing__btn--header' to='/analytics/preprocessing' target='_blank'>Go to
                AgrevenT</Link>
              {/* <img className='landing__header-img' src={img} alt='macbook'/> */}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
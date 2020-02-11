import React, {PureComponent} from 'react';
import {Col, Row, Container} from 'reactstrap';
import scrollToComponent from 'react-scroll-to-component';
import Header from './components/Header';
import Technologies from './components/Technologies';
import Demos from './components/Demos';
import Features from './components/Features';
import Purchase from './components/Purchase';
import Footer from './components/Footer';
import FeatureRequest from './components/FeatureRequest';

const logo = process.env.PUBLIC_URL + '/img/landing/logo_svg.svg';

export default class Landing extends PureComponent {
  render() {
    return (
      <div className='landing'>
        <div className='landing__menu'>
          
        </div>
        <Header/>
        {/* <span ref={(section) => {
          this.About = section;
        }}/> */}
        {/* <Technologies/>
        <span ref={(section) => {
          this.Demos = section;
        }}/> */}
        {/* <Demos/>
        <span ref={(section) => {
          this.FeatureRequest = section;
        }}/>
        <FeatureRequest/>
        <span ref={(section) => {
          this.Features = section;
        }}/>
        
        <Purchase/> */}
        <Features/>
        <Footer/>
      </div>
    )
  }
}
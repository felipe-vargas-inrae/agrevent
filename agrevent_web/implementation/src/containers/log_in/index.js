import React, {PureComponent} from 'react';
import LogInForm from './components/LogInForm';
import {Link} from 'react-router-dom';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';

export default class LogIn extends PureComponent {
  
  render() {

    return (
      <div className='account'>
        <div className='account__wrapper'>
          <div className='account__card'>
            <div className='account__head'>
              <h3 className='account__title'>Welcome to <span className='account__logo'>IoT<span
                className='account__logo-accent'>++</span></span></h3>
              <h4 className='account__subhead subhead'>From sensors to decisions</h4>
            </div>
            <LogInForm onSubmit/>
            <div className='account__or'>
              <p>Or Easily Using</p>
            </div>
            <div className='account__social'>
              <Link className='account__social-btn account__social-btn--facebook'
                    to='/pages/one'><FacebookIcon/></Link>
              <Link className='account__social-btn account__social-btn--google'
                    to='/pages/one'><GooglePlusIcon/></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles

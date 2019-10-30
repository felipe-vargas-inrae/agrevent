import React, {PureComponent} from 'react';
import {Field, reduxForm} from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import {Link} from 'react-router-dom';
import renderCheckBoxField from '../../../components/form/CheckBox';

class SensorForm extends PureComponent {

  

  handleSubmit(e){
    e.preventDefault();
    alert("submit data ");
  }
  
 
  
  render() {
    //const {handleSubmit} = this.props;
    
    return (
      <form className='form' >

        <h3>{this.state}</h3>
        <div className='form__form-group'>
          <label className='form__form-group-label'>Device Name</label>
          <div className='form__form-group-field'>
            <div className='form__form-group-icon'>
              <AccountOutlineIcon/>
            </div>
            <Field
              name='name'
              component='input'
              type='text'
              placeholder='Name'
            />
          </div>
        </div>
        <button type="submit">Connect</button>
        
      </form>
    )
  }
}

export default reduxForm({
  form: 'sensor_form',
})(SensorForm);

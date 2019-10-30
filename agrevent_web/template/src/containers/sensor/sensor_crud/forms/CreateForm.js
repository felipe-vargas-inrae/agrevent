import React, {PureComponent} from 'react';
import {Container,Row,Card, CardBody, Col, Button, ButtonToolbar} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import renderFileInputField from '../../../../components/form/FileInput';
import renderSelectField from '../../../../components/form/Select';
//import renderMultiSelectField from '../../../../components/form/MultiSelect';

import {translate} from 'react-i18next';

class CreateForm extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {handleSubmit, reset, t} = this.props;
    
    return (
      <Container >
        <Row>
          <Col md={12} lg={12}>
           <Card>
          <CardBody>
          
            <div className='card__title'>
              <h5 className='bold-text'>{t('sensor.sensor_form.title')}</h5>
              <h5 className='subhead'>Fill this form if you want to connect a new device</h5>
            </div>
            <form className='form form--horizontal' onSubmit={handleSubmit}>
              <div className='form__form-group'>
                <label className='form__form-group-label'>URL Service</label>
                <div className='form__form-group-field'>
                  <Field
                    name='url'
                    component='input'
                    type='text'
                    placeholder='set the service url'
                  />
                </div>
              </div>
              <div className='form__form-group'>
                <label className='form__form-group-label'>Field with description</label>
                <div className='form__form-group-field'>
                  <Field
                    name='descriptionInput'
                    component='input'
                    type='text'
                  />
                </div>
                <span className='form__form-group-description'>
                  Zealously now pronounce existence add you instantly say offending.
                </span>
              </div>
              <div className='form__form-group'>
                <label className='form__form-group-label'>Dropdown</label>
                <div className='form__form-group-field'>
                  <Field
                    name='select'
                    component={renderSelectField}
                    options={[
                      {value: 'one', label: 'One'},
                      {value: 'two', label: 'Two'},
                    ]}
                  />
                </div>
              </div>
              
              <div className='form__form-group'>
                <label className='form__form-group-label'>
                  Add file
                </label>
                <div className='form__form-group-field'>
                  <Field
                    name='file'
                    component={renderFileInputField}
                  />
                </div>
              </div>
              <ButtonToolbar className='form__button-toolbar'>
                <Button color='primary' type='submit'>Connect</Button>
                <Button type='button' onClick={reset}>
                  Closed
                </Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
        </Row>
      </Container>
    )
  }
}

export default reduxForm({
  form: 'horizontal_form', // a unique identifier for this form
})(translate('common')(CreateForm));

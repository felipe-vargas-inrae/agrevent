import React, {PureComponent} from 'react';
import {Container,Row,Card, CardBody, Col, Button, ButtonToolbar} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
//import renderFileInputField from '../../../../components/form/FileInput';
import renderSelectField from '../../../../components/form/Select';
//import renderMultiSelectField from '../../../../components/form/MultiSelect';

import validate from './validate'; 
import {translate} from 'react-i18next';

const renderField = ({input, label, placeholder, type, meta: {touched, error}}) => (
  <div className='form__form-group-input-wrap'>
    <input {...input} placeholder={placeholder} type={type}/>
    {touched && error && <span className='form__form-group-error'>{error}</span>}
  </div>
);
class DataframeListForm extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {dataframes ,handleSubmit, reset, t} = this.props;
    
    return (
      <Container >
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <CardBody>
                <div className='card__title'>
                  <h5 className='bold-text'>Dataframes </h5>
                  <h5 className='subhead'>Add some dataframe to create the pipeline over it</h5>
                </div>
                <form className='form form--horizontal' onSubmit={handleSubmit}>
                  
                  <div className='form__form-group'>
                    {/* <label className='form__form-group-label'>Dataframes</label> */}
                    <label className='form__form-group-label'>Initial Dataframe</label>
                    <div className='form__form-group-field'>
                      <Field
                        name='dataframeName'
                        component={renderSelectField}
                        options={dataframes}
                      />
                    </div>                    
                  </div>
                  <div className='form__form-group'>
                    <label className='form__form-group-label'>Pipeline Name</label>
                    <div className='form__form-group-field'>
                      <Field
                        name='name'
                        component={renderField}
                        type='text'
                        placeholder='Name'
                      />
                    </div>
                  </div>
                  <ButtonToolbar className='form__button-toolbar'>
                    <Button color='primary' type='submit'>Add</Button>
                    {/* <Button type='button' onClick={reset}>
                      Reset
                    </Button> */}
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
  form: 'dataframe_list', validate, // a unique identifier for this form
})(translate('common')(DataframeListForm));

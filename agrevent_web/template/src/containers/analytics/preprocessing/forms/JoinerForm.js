import React, { PureComponent } from 'react';
import { Container, Row, Card, CardBody, Col, Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
//import renderFileInputField from '../../../../components/form/FileInput';
import renderSelectField from '../../../../components/form/Select';
//import renderMultiSelectField from '../../../../components/form/MultiSelect';
import { formValueSelector, getFormValues } from 'redux-form';  // ES6

import { connect } from 'react-redux';
import validate from './validate';
import { translate } from 'react-i18next';

const renderField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div className='form__form-group-input-wrap'>
    <input {...input} placeholder={placeholder} type={type} />
    {touched && error && <span className='form__form-group-error'>{error}</span>}
  </div>
);
const required = value => value ? undefined : 'This field shouldn’t be empty'
const PIPELINE="Pipeline"
class JoinerForm extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  componentWillMount(){
    
  }
  componentWillUpdate(){
    
  }
  componentWillReceiveProps(nextProps) {
    
    const newPipelineList =  nextProps.pipelinesList;
  
    if (newPipelineList !== this.props.pipelinesList) {
      this.props.reset(); 
    }
  }

  render() {
    const { pipelinesList, handleSubmit, reset, t, formValues } = this.props;
    

    
    const values= formValues || {} 
    // get current used pipelines in join
    const usedPipelines=Object.keys(values).filter((key)=>{
      return key.includes(PIPELINE)
    }).map((key)=>{
      return values[key].value
    })
    
    const listOption = pipelinesList.filter((item)=>{
      // filter used pipelines from list
      return !usedPipelines.includes(item.name)
    }).map((item)=>{
      return {value: item.name, label: item.name}
    })
    
    


    let fieldsjoin = []
    const myLength = pipelinesList.length
    if (myLength > 1) {
      for (let i = 1; i < myLength; i++) {

        const leftColumnName = 'leftColumn' + i
        const rightColumnName = 'rightColumn' + i
        const rightPipelineName = 'rightPipeline' + i

        const fieldsInline = (
          <Row key={i} className="justify-content-end">
            <div className='col-md-3'>
              <div className='form__form-group'>
                <label className='form__form-group-label'>Left Column </label>
                <div className='form__form-group-field'>
                  <Field
                    name={leftColumnName}
                    component={renderField}
                    type='text'
                    validate={required}
                   
                  />
                </div>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form__form-group'>
                <label className='form__form-group-label'>Right Column </label>
                <div className='form__form-group-field'>
                  <Field
                    name={rightColumnName}
                    component={renderField}
                    type='text'
                    validate={required}
                  />
                </div>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='form__form-group'>
                <label className='form__form-group-label'>Right Pipeline </label>
                <div className='form__form-group-field'>
                  <Field
                    name={rightPipelineName}
                    component={renderSelectField}
                    options={listOption}
                    
                    validate={required}
                  />
                </div>
              </div>
            </div>
          </Row>
        )
        fieldsjoin.push(fieldsInline)
      }
    }
    


    

    return (

      <form className='form' onSubmit={handleSubmit}>


          <div className='form__form-group row'>
            <Col className="col-md-6">
            <label className='form__form-group-label '>Left Pipeline</label>
            <div className='form__form-group-field '>
              <Field
                name='leftPipeline'
                component={renderSelectField}
                options={listOption}
                
                validate={required}
              />
            </div>
            </Col>
          </div>

        {fieldsjoin}


        <ButtonToolbar className='form__button-toolbar'>
          <Button color='success' type='submit'>Save Pre-processing, Continue  </Button>
        </ButtonToolbar>
      </form>

    )
  }
}

let myForm= reduxForm({
  form: 'joiner' // a unique identifier for this form
})(translate('common')(JoinerForm));

const selector = formValueSelector('joiner')

myForm = connect(
  state => {
    return {
      formValues: getFormValues('joiner')(state)
    }
  }
)(myForm)

export default myForm

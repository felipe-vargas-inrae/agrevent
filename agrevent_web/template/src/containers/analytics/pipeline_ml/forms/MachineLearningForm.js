import React, {PureComponent} from 'react';
import {Container,Row,Card, CardBody, Col, Button, ButtonToolbar} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';

//import renderFileInputField from '../../../../components/form/FileInput';
import renderSelectField from '../../../../components/form/Select';
//import renderMultiSelectField from '../../../../components/form/MultiSelect';
import renderCheckBoxField from '../../../../components/form/CheckBox';
 
import Select from 'react-select';

import {translate} from 'react-i18next';

const RenderField = ({input, label, placeholder, type, meta: {touched, error}}) => (
  <div className='form__form-group-input-wrap'>
    <input {...input} placeholder={placeholder} type={type}/>
    {touched && error && <span className='form__form-group-error'>{error}</span>}
  </div>
);


const required = value => value ? undefined : 'This field shouldn’t be empty'

class MachineLearningForm extends PureComponent {
  componentDidMount(){
    
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.onChangeTargetOption=this.onChangeTargetOption.bind(this)
    this.handleSelectChange= this.handleSelectChange.bind(this)
    this.onChangeMLModel=this.onChangeMLModel.bind(this)
  }

  handleSelectChange (value) {
    console.log('You\'ve selected:', value);
    this.setState({ featuresSelected: value });
    this.props.change('featuresSelected', value)
  }

  

  onChangeTargetOption(e){
    this.setState({targetVariable: e.value})
    this.setState({featuresSelected:null})
    this.props.change('featuresSelected', null)
  }

  onChangeMLModel(e){
    this.setState({ModelML: e.value})
  }
  render() {
    const {features ,models, handleSubmit, reset, t} = this.props;

    const {featuresSelected, targetVariable, ModelML} = this.state
    
    const listmodels= models.map((item)=>{
      return {value:item, label:item}
    })
    
    

    const listOption= features.map((item)=>{
      const disabled = item === targetVariable ? true:false 
      return {value:item, label:item, disabled: disabled}
    })
    
    return (
      
        <Row>
          <Col md={12} lg={12}>
            <Card className="">
              <CardBody>

              <div className='card__title'>
                <h5 className='bold-text'>
                  Parameter tuning 
                  
                </h5>
                <h5 className='subhead'>Select the information to run the model</h5>
              </div>
                <form  className="form form--vertical" onSubmit={handleSubmit}>

                    <div className='form-row' style={{width: "100%"}}>  
                      
                      <div className='col-md-4 col-sm-12'>
                        <label> Target Variable(Y)</label><br></br>
                        <div className='form__form-group'>
                          <div className='form__form-group-field'>
                            <Field
                              name="targetVariable"
                              component={renderSelectField}
                              options={listOption}
                              validate={required}
                              onChange = {this.onChangeTargetOption}
                              value= {targetVariable}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-4' style={{ maxWidth: "260px"}}>
                        <label>Features(Xi)</label><br></br>
                        
                        <Select
                          name="featuresList"
                          disabled={false}
                          multi
                          onChange={this.handleSelectChange}
                          options={listOption}
                          removeSelected={true}
                          simpleValue
                          value={featuresSelected}
                        />
                      </div>
                      <div className='col-md-4 col-sm-12'>
                        <label> ML Regression Models </label><br></br>
                          <div className='form__form-group'>
                            <div className='form__form-group-field'>
                              <Field
                                name="ModelML"
                                component={renderSelectField}
                                options={listmodels}
                                validate={required}
                                value={ModelML}
                                onChange={this.onChangeMLModel}
                              />
                            </div>
                        </div>
                          {
                            ModelML && featuresSelected && targetVariable? 
                            <ButtonToolbar className='form__button-toolbar'>
                              <Button color='primary' type='submit'>Run ML Model</Button>
                            </ButtonToolbar> : null 
                          }
                      </div>
                    </div>
                  
                </form>
                
              
              </CardBody>

              </Card>
          </Col>
        </Row>
    )
  }
}

export default reduxForm({
  form: 'machine_learning_form' // a unique identifier for this form
})(translate('common')(MachineLearningForm));

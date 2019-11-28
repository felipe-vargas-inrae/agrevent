import React, {PureComponent} from 'react';
import {Container,Row,Card, CardBody, Col, Button, ButtonToolbar} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';

//import renderFileInputField from '../../../../components/form/FileInput';
import renderSelectField from '../../../../components/form/Select';
//import renderMultiSelectField from '../../../../components/form/MultiSelect';
import renderCheckBoxField from '../../../../components/form/CheckBox';
 
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
  }

  

  render() {
    const {features ,models, handleSubmit, reset, t} = this.props;
    
    const listmodels= models.map((item)=>{
      return {value:item, label:item}
    })
    
    const featuresLayout=features.map((item, index)=>{
      const name= item.name
      const label = name + " ("+item.type+")"
      return (<div key={index} className='form__form-group'>
                  <div className='form__form-group-field'>
                    <Field
                      name={name}
                      component={renderCheckBoxField}
                      label={label}
                      defaultChecked={true}
                    />
                  </div>
                </div>)
    })

    const listOption= features.map((item)=>{return {value:item.name, label:item.name}})
    
    return (
      <Container >
        <Row>
          <Col md={12} lg={12}>
            <Card className="">
              <CardBody>
                <form  className="form form--vertical" onSubmit={handleSubmit}>

                    <div className='form-row'>  
                      <div className='col-md-4' style={{ maxWidth: "260px"}}>
                        <h4>Features(Xi)</h4><br></br>
                        {featuresLayout}
                      </div>
                      <div className='col-md-4 col-sm-12'>
                        <h4> Target Variable(Y)</h4><br></br>
                        <div className='form__form-group'>
                          <div className='form__form-group-field'>
                            <Field
                              name="targetVariable"
                              component={renderSelectField}
                              options={listOption}
                              validate={required}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-4 col-sm-12'>
                        <h4> ML Models </h4><br></br>
                          <div className='form__form-group'>
                            <div className='form__form-group-field'>
                              <Field
                                name="ModelML"
                                component={renderSelectField}
                                options={listmodels}
                                validate={required}
                              />
                            </div>
                        </div>
                        <ButtonToolbar className='form__button-toolbar'>
                          <Button color='primary' type='submit'>Run ML Model</Button>
                        </ButtonToolbar>
                      </div>
                    </div>
                  
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
  form: 'machine_learning_form' // a unique identifier for this form
})(translate('common')(MachineLearningForm));

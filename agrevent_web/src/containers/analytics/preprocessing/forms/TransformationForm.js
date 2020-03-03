import React, {PureComponent} from 'react';
import {Container,Row,Card, CardBody, Col, Button, ButtonToolbar} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';

//import renderFileInputField from '../../../../components/form/FileInput';
import renderSelectField from '../../../../components/form/Select';
//import renderMultiSelectField from '../../../../components/form/MultiSelect';

 
import {translate} from 'react-i18next';

const RenderField = ({input, label, placeholder, type, meta: {touched, error}}) => (
  <div className='form__form-group-input-wrap'>
    <input {...input} placeholder={placeholder} type={type}/>
    {touched && error && <span className='form__form-group-error'>{error}</span>}
  </div>
);

const required = value => value ? undefined : 'This field shouldn’t be empty'

class TransformationForm extends PureComponent {
  componentDidMount(){
    
  }
  constructor(props) {
    super(props);
    this.onChange=this.onChange.bind(this)
    this.state = {};
  }

  onChange(e){
    
    this.setState(()=>{
      return {selectTransformation:e }
    })
  }

  render() {
    const {transformationsTypesList ,handleSubmit, reset, t} = this.props;
    
    let paramsContainer=[]
    const selected=this.state.selectTransformation
    if(selected){

     
      paramsContainer = selected.params.map((item,i)=>{
        return  (
      <div key={i} className='form__form-group'>
        <div className='form__form-group-field'>
        <Field component={RenderField} name={item.name}  type='text'
         placeholder={item.name} validate={required}/>
         </div>
      </div>
         
         )
      })
    }
    
    return (
      <Container className="theme-light">
        <Row>
          <Col md={12} lg={12}>
            <Card className="border border-info">
              <CardBody>
                <form  className="form form--vertical" onSubmit={handleSubmit}>
                <div className='form-row'>  
                  <div className='col-md-12'>
                    <div  className='form__form-group'>
                      <label className='form__form-group-label'>Method</label>
                      <div className='form__form-group-field'>
                        <Field
                          name='transformation'
                          component={renderSelectField}
                          options={transformationsTypesList}
                          onChange={this.onChange}
                          validate={required}
                        />
                      </div>
                    </div>

                    
                    
                  </div>
                  <div className='col-md-12'>
                    <label>Params </label>
                  </div>
                  <div className='col-md-12'>
                    {paramsContainer}
                    <ButtonToolbar className='form__button-toolbar'>
                      <Button color='primary' type='submit'>Add</Button>
                      {/* <Button type='button' onClick={reset}>
                        Reset
                      </Button> */}
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
  form: 'dataframe_transformation' // a unique identifier for this form
})(translate('common')(TransformationForm));

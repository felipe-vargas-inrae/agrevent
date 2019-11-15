import React, {PureComponent} from 'react';
import {Container,Row,Card, CardBody, Col, Button, ButtonToolbar} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
//import renderFileInputField from '../../../../components/form/FileInput';
import renderSelectField from '../../../../components/form/Select';
//import renderMultiSelectField from '../../../../components/form/MultiSelect';

import validate from './validate_transform'; 
import {translate} from 'react-i18next';

const RenderField = ({input, label, placeholder, type, meta: {touched, error}}) => (
  <div className='form__form-group-input-wrap'>
    <input {...input} placeholder={placeholder} type={type}/>
    {touched && error && <span className='form__form-group-error'>{error}</span>}
  </div>
);

const required = value => value ? undefined : 'Required'

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
        return  (<li className='form__form-group-field' key={i}><Field component={RenderField} name={item.name}  type='text' placeholder={item.name} validate={required}/></li>)
      })
    }
    
    return (
      <Container >
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <CardBody>
                <div className='card__title'>
                  <h5 className='bold-text'>Dataframes  </h5>
                  <h5 className='subhead'>Add some dataframe to create the pipeline over it</h5>
                </div>
                <form className='form form--vertical' onSubmit={handleSubmit}>
                  
                  <div className='form__form-group'>
                    <label className='form__form-group-label'>Select a transformation</label>
                    <div className='form__form-group-field'>
                      <Field
                        name='transformation'
                        component={renderSelectField}
                        options={transformationsTypesList}
                        onChange={this.onChange}
                      />
                    </div>                    
                  
                  <div className='form__form-group'></div>
                    <label className='form__form-group-label'>Params</label>
                    <ul>{paramsContainer}</ul>
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
  form: 'dataframe_transformation' // a unique identifier for this form
})(translate('common')(TransformationForm));

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonToolbar, Modal} from 'reactstrap';
import TransformationForm from '../forms/TransformationForm'
export default class ModalTransformation extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    color: PropTypes.string.isRequired,
    colored: PropTypes.bool,
    header: PropTypes.bool,
    btn: PropTypes.string.isRequired
  };
  
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTransformation=this.deleteTransformation.bind(this);
    this.pushTransformation=this.pushTransformation.bind(this)
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  deleteTransformation(name, i){
    this.props.deleteTransformation(name, i)
  }

  pushTransformation(name, transformation){
    this.props.pushTransformation(name, transformation)
  }

  handleSubmit=(values)=>{
    
    const transformation = {}

    transformation.method=values.transformation.method
    transformation.params = values.transformation.params.map((currentParam)=>{
      const paramName=currentParam.name
      return {...currentParam, value:values[paramName] }
    })
    const myPipeline = this.props.pipeline;
    this.pushTransformation(myPipeline.name, transformation)
  }
  
  render() {
    let Icon;
    const myPipeline = this.props.pipeline;

    const listTypes= this.props.transformationsTypesList.map((item,i)=>{
      return  {...item, value: item.method, label: item.method}
    })

    const methods= myPipeline.methods.map((item2,i)=>{ 
      return (<li key={i}> <p > {item2.method}  </p> <span onClick={()=>{
        this.deleteTransformation(myPipeline.name, i)
      }}> Delete </span> </li>)
    })

    return (
      <div>
        <Button color={this.props.color} onClick={this.toggle}>{this.props.btn}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}
               className={`modal-dialog--${this.props.color} ${this.props.colored ? 'modal-dialog--colored' : ''} ${this.props.header ? 'modal-dialog--header' : ''}`}>
          <div className='modal__header'>
            <span className='lnr lnr-cross modal__close-btn' onClick={this.toggle}/>
            {this.props.header ? '' : Icon}
            <h4 className='bold-text  modal__title'>Pipeline Modification </h4>
          </div>
          <div className='modal__body'>
            
            {myPipeline.name}

            {methods}

          </div>
          

          < TransformationForm 
          transformations={this.props.transformations} 
          transformationsTypesList = {listTypes}
          onSubmit={this.handleSubmit}
          ></TransformationForm>
        </Modal>
      </div>
    );
  }
}
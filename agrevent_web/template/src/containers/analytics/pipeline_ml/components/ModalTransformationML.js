import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Button, ButtonToolbar, Modal, ListGroupItem, ListGroup, Col, Row } from 'reactstrap';
import TransformationFormML from '../forms/TransformationFormML'
import LayersIcon from 'mdi-react/LayersIcon'
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';


export default class ModalTransformationML extends PureComponent {
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
    this.deleteTransformation = this.deleteTransformation.bind(this);
    this.pushTransformation = this.pushTransformation.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  deleteTransformation( i) {
    this.props.deleteTransformationML( i)
  }

  pushTransformation( transformation) {
    this.props.pushTransformationML( transformation)
  }

  handleSubmit = (values) => {
    debugger 
    const transformation = {}

    transformation.method = values.transformation.method
    transformation.params = values.transformation.params.map((currentParam) => {
      const paramName = currentParam.name
      return { ...currentParam, value: values[paramName] }
    })
    const myPipeline = this.props.pipeline;
    this.pushTransformation( transformation)
  }

  render() {
    let Icon;
    const myPipeline = this.props.pipeline;

    const listTypes = this.props.transformationsTypesListML.map((item, i) => {
      return { ...item, value: item.method, label: item.method }
    })

    const methods = myPipeline.methods.map((item2, i) => {

      const params = item2.params.map((item) => {
        let result = {}
        result[item.name] = item.value
        return result
      })

      const closeButton= (<a href="#" className="float-right text-danger" onClick={() => { this.deleteTransformation( i) }}>
          <DeleteForeverIcon />
        </a>)
      const paramsString = JSON.stringify(params)
      
      return (
        <ListGroupItem key={i}>
          <p >
            <span className="text-uppercase">{item2.method}</span>
            {closeButton}
            <br></br>
            {paramsString}

          </p>

        </ListGroupItem>
      )
    })


    return (
      <div>
        <Button color={this.props.color} onClick={this.toggle} >
          <LayersIcon></LayersIcon>
          {this.props.btn}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}
          className={`modal-dialog--${this.props.color} ${this.props.colored ? 'modal-dialog--colored' : ''} ${this.props.header ? 'modal-dialog--header' : ''}`}>
          <div className='modal__header'>
            <span className='lnr lnr-cross modal__close-btn' onClick={this.toggle} />
            {this.props.header ? '' : Icon}
            <h4 className='bold-text  modal__title'>Pipeline Modification  </h4>
          </div>
          <div className='modal__body'>
            <Row>
              <Col md={5}>
                < TransformationFormML
                  transformationsTypesList={listTypes}
                  onSubmit={this.handleSubmit}
                ></TransformationFormML>
              </Col>
              <Col md={7}>
                <Card>
                  <CardBody>
                    <div className='card__title'>
                      <h5 className='bold-text'>{myPipeline.name} </h5>
                      <h5 className='subhead'>Ordered list of transformations</h5>
                    </div>
                    <ListGroup >
                      {methods}
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>

            </Row>
          </div>
        </Modal>
      </div>
    );
  }
}
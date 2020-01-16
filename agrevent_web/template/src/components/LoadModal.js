
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {  Modal, Spinner} from 'reactstrap';

export default class LoadModal extends PureComponent {
  static propTypes = {
    // title: PropTypes.string,
    // message: PropTypes.string,
    // color: PropTypes.string.isRequired,
    // colored: PropTypes.bool,
    // header: PropTypes.bool,
    // btn: PropTypes.string.isRequired,
    //isOpen:PropTypes.bool
  };
  
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    
    //this.toggle = this.toggle.bind(this);
  }
  
//   toggle() {
//     this.setState({
//       modal: !this.state.modal
//     });
//   }
  
  render() {
    let Icon;
    
    
    return (
      <div>
        {/* <Button color={this.props.color} onClick={this.toggle}>{this.props.btn}</Button> */}
        <Modal isOpen={true} 
            // toggle={this.toggle}
               className={`modal-dialog--${this.props.color} ${this.props.colored ? 'modal-dialog--colored' : ''} ${this.props.header ? 'modal-dialog--header' : ''}`}>
          <div className='modal__header'>
            {/* <span className='lnr lnr-cross modal__close-btn' onClick={this.toggle}/> */}
            {this.props.header ? '' : Icon}
            <h4 className='bold-text  modal__title'> Processing in Spark...</h4>
          </div>
          <div className='modal__body'>
            <Spinner color="info"/>
          </div>
          {/* <ButtonToolbar className='modal__footer'>
            <Button onClick={this.toggle}>Cancel</Button>{' '}
            <Button outline={this.props.colored} color={this.props.color} onClick={this.toggle}>Ok</Button>
          </ButtonToolbar> */}
        </Modal>
      </div>
    );
  }
}


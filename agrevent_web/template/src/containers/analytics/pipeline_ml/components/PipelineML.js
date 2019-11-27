
import { connect } from 'react-redux';
import React,{Component} from 'react'
import ModalTransformationML from './ModalTransformationML';

import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import transformationsTypesListML from './db/TransformationsTypesListML'
import {deleteTransformationML, pushTransformationML} from '../../../../redux/actions/analyticsActions'
import {ListGroup, ListGroupItem,CardText,CardTitle,Card, CardBody,  Button, Col, ButtonGroup, ButtonToolbar} from 'reactstrap';


const mapStateToProps = (state) => {
    return {
       pipelineML:state.analytics.pipelineML
    }
}
const mapDispatchToProps = (dispatch) => {
  return {

    deleteTransformationML: ( i)=>{
      dispatch(deleteTransformationML( i))
    },
    pushTransformationML:( method)=>{
      dispatch(pushTransformationML( method))
    }
  }
}

class PipelineDetail extends Component {
    componentWillMount() {
    }
    constructor(props) {
      super(props);
      this.state = {
        transformationsTypesListML:transformationsTypesListML
      };
    }
   
    render(){
        const myPipeline = this.props.pipelineML;
        
        
        const methods= myPipeline.methods.map((item2,i)=>{ 
          return (
            <ListGroupItem key={i}><p> <span className="text-uppercase">{item2.method}</span> </p></ListGroupItem>
          
          )
        })
        const title= myPipeline.name
        
        return  (
        
        <Card> 
          <CardBody>  
            <div className='card__title'>
              <h5 className='bold-text'>
                {title} 
                
              </h5>
              <h5 className='subhead'>Ordered list of transformations</h5>
            </div>
            <ListGroup >
              {methods} 
            </ListGroup>

            <ButtonToolbar>
              <ModalTransformationML color='primary' title='Congratulations!'  btn='Modify'
                      message='Expect warmly its tended garden him esteem had remove off. Effects dearest staying
                    now sixteen nor improve.'
                    pipeline={myPipeline}

                    deleteTransformationML={this.props.deleteTransformationML}
                    pushTransformationML={this.props.pushTransformationML}
                    transformationsTypesListML ={this.state.transformationsTypesListML}
                    header
                    /> 
            </ButtonToolbar>
          </CardBody>
        </Card>)
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(PipelineDetail);


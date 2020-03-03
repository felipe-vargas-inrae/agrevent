
import { connect } from 'react-redux';
import React,{Component} from 'react'
import ModalTransformation from './ModalTransformation';

import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';

import {deleteTransformation, pushTransformation} from '../../../../redux/actions/analyticsActions'
import {ListGroup, ListGroupItem,CardText,CardTitle,Card, CardBody,  Button, Col, ButtonGroup, ButtonToolbar} from 'reactstrap';


const mapStateToProps = (state) => {
    return {
      transformationsTypesList:state.analytics.transformationsTypesList
    }
}
const mapDispatchToProps = (dispatch) => {
  return {

    deleteTransformation: (pipelineName, i)=>{
      dispatch(deleteTransformation(pipelineName, i))
    },
    pushTransformation:(pipelineName, method)=>{
      dispatch(pushTransformation(pipelineName, method))
    }
  }
}

class PipelineDetail extends Component {
    componentWillMount() {
    }

    constructor(props) {
      super(props);
      this.state = {
      };
      this.delete=this.delete.bind(this)
    }
   
    delete(){
      const pipelineName=this.props.pipeline.name
      this.props.deletePipeline(pipelineName)
    }
    
    render(){
        const myPipeline = this.props.pipeline;
        
        
        const methods= myPipeline.methods.map((item2,i)=>{ 
          return (
            <ListGroupItem key={i}><p> <span className="text-uppercase">{item2.method}</span> </p></ListGroupItem>
          
          )
        })
        const title= myPipeline.name
        
        //<Button className='icon' outline><p><SettingsIcon/> Settings</p></Button>
        return  (
        <Col sm="6" md="4">
        <Card> 
          <CardBody>  
            <div className='card__title'>
              <h5 className='bold-text'>
                {title} 
                <a href="#" className="float-right text-danger"  onClick={this.delete}> 
                  <DeleteForeverIcon />
                </a>
              </h5>
              <h5 className='subhead'>Ordered list of transformations</h5>
            </div>

            <ListGroup >
              {methods} 
            </ListGroup>


            

            <ButtonToolbar>
              
              <ModalTransformation color='primary' title='Congratulations!'  btn='Modify'
                      message='Expect warmly its tended garden him esteem had remove off. Effects dearest staying
                    now sixteen nor improve.'
                    pipeline={myPipeline}

                    deleteTransformation={this.props.deleteTransformation}
                    pushTransformation={this.props.pushTransformation}
                    transformationsTypesList ={this.props.transformationsTypesList}

                    header

                    />
        
              
         
              
            </ButtonToolbar>
          </CardBody>
        </Card></Col>)
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(PipelineDetail);


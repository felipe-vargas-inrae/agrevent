
import { connect } from 'react-redux';
import React,{Component} from 'react'
import ModalTransformation from './ModalTransformation';

import {deleteTransformation, pushTransformation} from '../../../../redux/actions/analyticsActions'

import {Button} from 'reactstrap';

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
          return (<p key={i}> {item2.method}  </p>)
        })
        const title= (<h3>{myPipeline.name}</h3>)
        
        //<Button className='icon' outline><p><SettingsIcon/> Settings</p></Button>
        return  (
        <div> 
        {title} {methods} 
        <ModalTransformation color='primary' title='Congratulations!'  btn='Default'
                    message='Expect warmly its tended garden him esteem had remove off. Effects dearest staying
                  now sixteen nor improve.'
                  pipeline={myPipeline}

                  deleteTransformation={this.props.deleteTransformation}
                  pushTransformation={this.props.pushTransformation}
                  transformationsTypesList ={this.props.transformationsTypesList}

                  />

        <Button onClick={this.delete}>Delete </Button> 
        </div>)
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(PipelineDetail);


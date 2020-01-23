
import { connect } from 'react-redux';
import React,{Component} from 'react'
import ModalTransformationML from './ModalTransformationML';

import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import DatasetML from './db/DatasetMLInfo'
import {deleteTransformationML, pushTransformationML} from '../../../../redux/actions/analyticsActions'
import {ListGroup, ListGroupItem,CardText,CardTitle,Card, CardBody,  Button, Col, ButtonGroup, ButtonToolbar} from 'reactstrap';
import MachineLearningForm from '../forms/MachineLearningForm';


const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

class MachineLearningLayout extends Component {
    componentWillMount() {
    }
    constructor(props) {
      super(props);
      // this.state = {
      //   features:DatasetML.columns,
      //   models: DatasetML.models
      // }
      this.state = {
        features:this.props.columns,
        models: DatasetML.models
      }
      this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit (e){
      console.log(e)
      const listVariables=[]
      for (const x in e ){
        if(typeof(e[x])==='boolean'){
          if (e[x]){
            listVariables.push(x)
          }
        }
      }
      
      const request={} 
      request.target= e.targetVariable.value
      request.ModelML= e.ModelML.value
      request.listVariables=listVariables

      console.log(request)

    }
    render(){
        
        return  (<div>
          <MachineLearningForm  onSubmit={this.handleSubmit}  features={this.state.features} models={this.state.models}></MachineLearningForm>
        </div>)
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(MachineLearningLayout);


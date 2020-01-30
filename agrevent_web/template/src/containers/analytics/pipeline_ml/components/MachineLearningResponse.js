
import { connect } from 'react-redux';
import React,{Component} from 'react'



const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

class MachineLearningResponse extends Component {
    componentWillMount() {
    }
    constructor(props) {
      super(props);
      this.state={}
    }



    render(){
        
        const {response}= this.props
        debugger
        if(response.predictions){
          

          return  (<div>
            Hello I have the predictions
          </div>)
        }

        return  (<div>
          Response will be display here 
        </div>)
        
        
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(MachineLearningResponse);


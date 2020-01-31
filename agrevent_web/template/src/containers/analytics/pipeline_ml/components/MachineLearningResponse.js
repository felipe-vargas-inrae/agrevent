
import { connect } from 'react-redux';
import React,{Component} from 'react'
import Plot from 'react-plotly.js';

const projectField = (predictions, field)=>{

  return predictions.map((item)=>{
    return item[field]
  })
}

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
      if(this.props.response.predictions){
        this.setState(
          {
            "xAxis": projectField(this.props.response.predictions,'MV'),
            "yAxis": projectField(this.props.response.predictions,'prediction')
          
          })
      }
    }
    constructor(props) {
      super(props);
      this.state={}
    }
    
    componentWillUpdate(nextProps) {

      
    }
    


    render(){
        
        const {response}= this.props
        debugger


        if(response.predictions){
          

          return  (<div>
            <h3>Hello I have the predictions</h3>

            <Plot
                data={[
                  {
                    x: this.state.xAxis,
                    y: this.state.yAxis,
                    cmax:1000,
                    mode: 'markers',
                    type: 'scatter',
                    colorscale:"balance",
                    layout:{
                      xaxis:{
                        nticks: 7,
                        fixedrange: [-100, 100]
                      },yaxis:{nticks: 7,
                        fixedrange: [-100, 100]}, 
                      height:600,
                      width:600
                    }
                  }

                ]}
                // layout={{ width:  height: 800 }}
                layout={{height: 800,xaxis:{automargin:true},yaxis:{automargin: true}}}
              />
          </div>)
        }

        return  (<div>
          Response will be display here 
        </div>)
        
        
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(MachineLearningResponse);


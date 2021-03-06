
import { connect } from 'react-redux';
import React,{Component} from 'react'
import Plot from 'react-plotly.js';
import {Card, CardBody, Col , Row} from 'reactstrap';




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
      debugger
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
      this.handleSelectChange= this.handleSelectChange.bind(this)
      
    }
    
    componentWillUpdate(nextProps) {

      
    }
    
    handleSelectChange (value) {
      console.log('You\'ve selected:', value);
      this.setState({ value });
    }


    render(){
        
        const {response}= this.props
        

        const { value } = this.state;


        if(response.predictions){
          
          const xmin= Math.min(this.state.xAxis)
          const xmax= Math.max(this.state.xAxis)
          const range=[xmin,xmax]

          return  (
            <Row>
            <Col md={12} lg={12}>
          <Card className="">
            <CardBody>

            <div className='card__title'>
                <h5 className='bold-text'>
                  Model Results
                  
                </h5>
                <h5 className='subhead'>Look here the model results</h5>
              </div>
         
            <p>{response.messageR2}</p>
            <p>{response.messageRMSE}</p>

            <Plot
                data={[
                  {
                    x: this.state.xAxis,
                    y: this.state.yAxis,
                    mode: 'markers',
                    type: 'scatter',
                    name: "Predictions"
                  },

                  {
                    x: this.state.xAxis,
                    y: this.state.xAxis,
                    type: 'scatter',
                    name: "1:1"
                  }

                ]}
                // layout={{ width:  height: 800 }}
                layout={{height: 500, width: 500 ,
                  xaxis:{automargin:true, range:range, title:{text: 'Observed'}},
                  yaxis:{automargin: true, range:range,  title:{text: 'Predicted'} }}}
              />


              
          </CardBody>
          </Card>
          </Col>
          </Row>
          )
        }

        return  null
        
        
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(MachineLearningResponse);


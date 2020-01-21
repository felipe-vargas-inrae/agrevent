import React from 'react';
import Plot from 'react-plotly.js';
import { Card,Row, Col, CardBody } from 'reactstrap';

import { connect } from 'react-redux';
import axios from 'axios';
import {API_JOINER_CORRELATIONS} from '../../../../app/Constans'




const getCorrelations=()=>{
  return axios({
    method: 'get',
    url: API_JOINER_CORRELATIONS,
    headers: []
  })
}

const getKeys = (dataset)=> {

  const keys=[]
  for (const x in dataset)
  {
    keys.push(x)
  }
  return keys
}

const getRows=(dataset)=>{

  const values=[]
  for (const x in dataset)
  {

    const myRow= dataset[x]
    const value=[]
    for (const y in myRow ){
      value.push(myRow[y])
    }

    values.push(value)
  }

  return values

}
/**
 * necesito una tabla para pintar el joiner
 * necesito pedir al servidor 
 * 
 */

class PlotHeatMap extends React.Component {

  constructor(props) {
    super(props);
    
    // var y0 = [];
    // var y1 = [];
    // for (var i = 0; i < 50; i++) {
    //   y0[i] = Math.random();
    //   y1[i] = Math.random() + 1;
    // }

    // var trace1 = {
    //   y: y0,
    //   type: 'box'
    // };

    // var trace2 = {
    //   y: y1,
    //   type: 'box'
    // };
    // this.state= { trace1: trace1, trace2: trace2 }

    this.state={}

  }

  componentWillUnmount(){

  }
  componentDidMount(){

    getCorrelations().then((response)=>{
      debugger
      this.setState( {data:getRows(response.data),headers:getKeys(response.data)})
      console.log("data arrive")
    })
  }
  render() {
    
    //const {trace1, trace2} = this.state
    // const {dataset} = this.props

    
      /* <div>
          {JSON.stringify(this.props.joinerDataset)}
        </div> 

        { <Plot
          data={[trace1, trace2]}
          layout={{ width: 450, height: 340, title: 'Box Plot for Numerical Features' }}
        /> */

    console.log("state in plot ly render ", this.state)

    if(!this.state.headers){
      return <div>loading ... </div>
    }
    return (
      <Row>

        <Col>

          <Card>

            <CardBody>

              <div className='card__title'>
                <h5 className='bold-text'>
                  Correlation for Numerical Features
              </h5>
              </div>
              <Plot
                data={[
                  {
                    x: this.state.headers,
                    y: this.state.headers,
                    z: this.state.data,
                    type: 'heatmap'
                  }

                ]}
                // layout={{ width: 1000, height: 800 }}
                layout={{ width:800, height: 600,xaxis:{automargin:true},yaxis:{automargin: true}}}
              />

            </CardBody>

          </Card>
        </Col>
      </Row>
    )
  }
}

export default PlotHeatMap
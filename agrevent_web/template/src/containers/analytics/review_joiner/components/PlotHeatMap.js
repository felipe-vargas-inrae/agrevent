import React from 'react';
import Plot from 'react-plotly.js';
import { Row } from 'reactstrap';

import { connect } from 'react-redux';
import axios from 'axios';
import {API_JOINER_CORRELATIONS} from '../../../../app/Constans'
import {Link, withRouter} from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    joinerDataset:state.analytics.joinerDataset
  }
}
const mapDispatchToProps = (dispatch) => {
return {}
}


const getCorrelations=()=>{
  return axios({
    method: 'get',
    url: API_JOINER_CORRELATIONS,
    headers: []
  })
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

    getCorrelations().then((response)=>{
      debugger
      this.setState= { response:response }
    })

    
  }
  componentDidMount(){}
  render() {
    
    //const {trace1, trace2} = this.state
    const {joinerDataset} = this.props

    
    if (joinerDataset==null || joinerDataset.length===0){
      return (<Row> <p> No avalaible, please go to <Link to='/analytics/preprocessing'> pre-processing </Link> </p></Row>)
    }


    return (
      <Row>

        {/* <div>
          {JSON.stringify(this.props.joinerDataset)}
        </div> */}

        {/* <Plot
          data={[trace1, trace2]}
          layout={{ width: 450, height: 340, title: 'Box Plot for Numerical Features' }}
        /> */}

        <Plot
          data={[
            {
              x: ["v1", "v2", "v3"],
              y: ["v1", "v2", "v3"],
              z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
              type: 'heatmap'
            }

          ]}
          layout={{ width: 450, height: 340, title: 'Correlation for Numerical Features' }}
        />
      </Row>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlotHeatMap))
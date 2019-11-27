import React from 'react';
import Plot from 'react-plotly.js';
import { Row } from 'reactstrap';

class PlotHeatMap extends React.Component {

  constructor(props) {
    super(props);
    
    var y0 = [];
    var y1 = [];
    for (var i = 0; i < 50; i++) {
      y0[i] = Math.random();
      y1[i] = Math.random() + 1;
    }

    var trace1 = {
      y: y0,
      type: 'box'
    };

    var trace2 = {
      y: y1,
      type: 'box'
    };
    this.state= { trace1: trace1, trace2: trace2 }
    
  }
  componentDidMount() {
   
  }
  render() {
    
    const {trace1, trace2} = this.state
    return (
      <Row>
        <Plot
          data={[trace1, trace2]}
          layout={{ width: 450, height: 340, title: 'Box Plot for Numerical Features' }}
        />

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

export default PlotHeatMap
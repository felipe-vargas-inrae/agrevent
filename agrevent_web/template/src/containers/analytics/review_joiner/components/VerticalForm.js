import React, {Component} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import {translate} from 'react-i18next';
import { stringify } from 'querystring';

class VerticalForm extends Component {
  
  constructor(props) {
    super(props);
    console.log("Object build ",props)
    this.state={
      sensorInfo:{},
      realtimeData:[]
    }
  }
  // state={
  //   sensorInfo:{}
  // }
  componentWillReceiveProps({sensorInfo}) {
    this.setState({...this.state,sensorInfo:sensorInfo},
      ()=>{
        this.connectToService()
      } 
    )
  }
  
  connectToService(){
    console.log("connect state", this.state)
    const sensorInfo= this.state.sensorInfo
    console.log("connect",sensorInfo)

    if(!sensorInfo.url){
      console.log("No url ", sensorInfo.url)
      return
    }

    const subscribe = {
      type: "subscribe",
      channels: [
        {
          name: "ticker",
          product_ids: ["BTC-USD"]
        }
      ]
    };

    // url "wss://ws-feed.gdax.com"
    try {
      this.ws = new WebSocket(sensorInfo.url);
    } catch (e) {
      if (e instanceof DOMException) {
          alert('Invalid address!');
      } else {
          throw e;
      }
      return
    }
    

    this.ws.onerror = (error) => {
      console.error(error);
      this.ws.close();
    }

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(subscribe));
    }

    this.ws.onmessage = e => {
      const value = JSON.parse(e.data);
      if (value.type !== "ticker") {
        return;
      }

      const arrayData=this.state.realtimeData
      arrayData.unshift(value)
      this.setState({realtimeData:arrayData })
      console.log("this",this)
      console.log(value)
    }
  }

  componentWillUnmount() {
    if(this.ws){
      this.ws.close();
    }
    
  }

  render() {
    const { t} = this.props;

    console.log("render child",this.state);

    let List= this.state.realtimeData.map((item,i)=>{
      //const strItem= stringify(item)
      return (<li key={i}>{item.price},{item.time} </li>)
    });
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>{t('sensor.sensor_form.realt_data')}</h5>
              <h5 className='subhead'>This data is gather from the sensor in real time</h5>
            </div>

            <p>Place to put the chart</p>
            <ul>{List}</ul>
          </CardBody>
        </Card>
      </Col>
    )
  }
}
export default (translate('common')(VerticalForm));

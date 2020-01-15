import React, {PureComponent} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import EditTable from '../../../../components/table/EditableTable';
import Pagination from '../../../../components/Pagination';



const extractKeys= (dataset)=>{

  return dataset[0].keys().map((item)=>{ return {key:item,name:item,sortable:false}})
}
export default class DatasetTable extends PureComponent {
  
  constructor(props) {
    super(props);
    // this.heads = [
    //   {
    //     key: 'work',
    //     name: 'Work',
    //     sortable: true
    //   }
    // ];
    debugger
    if(this.props.dataset.length>0){
      this.state = {
        rows: this.props.dataset,
        pageOfItems: [],
        heads:extractKeys(this.props.dataset)
      };
      console.log(this.state)
    }
    else{
      this.state = {
        rows: [],
        pageOfItems: [],
        heads:[]
      };
    }
    
    this.createRows = this.createRows.bind(this);
    this.getRandomDate = this.getRandomDate.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Uso tipico (no olvides de comparar los props):
    if (this.props.dataset !== prevProps.dataset) {
      console.log("dataset diferente")
    }
  }
  
  onChangePage(pageOfItems) {
    this.setState({pageOfItems: pageOfItems});
  }
  
  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };
  
  createRows = (numberOfRows) => {
    
    return [];
  };
  
  render() {
    console.log("render table")
    return (
      <Col md={12} lg={12}>
        {/* <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>data table</h5>
              <h5 className='subhead'>Use table with column's option <span className='red-text'>sortable</span></h5>
            </div>
            <p>Show
              <select className='select-options'>
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='30'>30</option>
              </select>
              entries
            </p>
            <EditTable heads={this.heads} rows={this.state.rows}/>
            <Pagination items={this.state.rows} onChangePage={this.onChangePage}/>
          </CardBody>
        </Card> */}
      </Col>
    )
  }
}
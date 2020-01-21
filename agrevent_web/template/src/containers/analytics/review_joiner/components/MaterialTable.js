import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import PropTypes, { number } from 'prop-types';
import { forwardRef } from 'react';

import { Card,Row, Col, CardBody } from 'reactstrap';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const extractKeys= (dataset)=>{
  return Object.keys(dataset[0]).map((item)=>{ return {title:item,field:item}})
}


const roundNumbers=(dataset)=>{

  return dataset.map((item)=>{

    const newRow ={}
    for(const column in item){
      if(typeof(item[column])=="number"){
        newRow[column]=  Math.round(item[column] * 100) / 100
      }
      else {
        newRow[column]= item[column]
      }
    }

    return newRow
    
  })

}

const tableIcons = {
    // Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    // Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    // Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    // DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    // Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    // Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default class MaterialTableDataset extends Component {

    static propTypes = {
      dataset: PropTypes.array.isRequired
    };
    constructor(props){
      super(props);
      
      if(this.props.dataset.length>0){
        debugger
        this.state = {
          data: roundNumbers(this.props.dataset),
          heads:extractKeys(this.props.dataset)
        };
        console.log(this.state)
      }
      else{
        this.state = {
          data: [],
          heads:[]
        };
      }

      
    }
    render() {
      return (

        
        // <div style={{ maxWidth: "99%" }}>
        //   <MaterialTable
        //     icons={tableIcons}
        //     columns={[
        //       { title: "Adıaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", field: "name" },
        //       { title: "Soyadıaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", field: "surname" },
        //       { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
        //       {
        //         title: "Doğum Yeri",
        //         field: "birthCity",
        //         lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
        //       }
        //     ]}
        //     data={[
        //       { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }
        //     ]}
        //     title="Dataset info"
        //   />
        // </div>
        <Row>

          <Col>
          <Card>

            <CardBody>

            <div className='card__title'>
              <h5 className='bold-text'>
                Dataset info
                
              </h5>
              {/* <h5 className='subhead'>Combine the pipelines to create a consilidated dataframe</h5> */}
            </div>
        <div style={{ maxWidth: "99%" }}>
          <MaterialTable
            icons={tableIcons}
            columns={this.state.heads}
            data={this.state.data}
            title=" "
            
          />
        </div>
        </CardBody>
        </Card>
        </Col>
        </Row>
      );
    }
  }
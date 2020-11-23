import React, {Component} from 'react';
import {baseUrl} from '../shared/baseUrl';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class DeployedModelOutput extends Component{
  constructor(props){
    super(props);

    this.state = {
      id:"",
      payload:"",
      loading:0,
      data:""
    }
    this.handleChangeID = this.handleChangeID.bind(this);
    this.handleChangePayload = this.handleChangePayload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangePayload(e){
    this.setState({payload:e.target.value});
  }
  handleChangeID(e){
    this.setState({id:e.target.value});
  }
  handleSubmit(){
      console.log(this.state.payload);
      this.setState({loading:1});
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: this.state.payload
    };
    fetch(baseUrl+'api?model_id='+this.state.id, requestOptions)
        .then(response => response.json())
        .then(outputdata=>{
            this.setState({data:JSON.stringify(outputdata,null,' '),loading:2})
        } );
    this.setState({id:"",payload:""});
  }

  render(){
    
    const Output = ()=>{
        if(this.state.loading===1){
            return(
                <div className="row">
                    <div className="col-12">
                        <p>Loading...</p>
                    </div>
                </div>
                
            );
        }
        else if(this.state.loading===2){
            return(
                <div className="row m-2">
                    <div className="col-12" style={{color:"green"}}>
                        Output
                    </div>
                    <div className="col-12 m-1">
                        {this.state.data}
                    </div>
                </div>
                
            )
        }
        else{
            return(
                <div className="row">
                </div>   
            ) 
        }
    };
    return (
      <div className="App container">
        <div className="row mt-5">
          <div className="col-12 App-header">
            Automatic Deployment
          </div>
          
        </div>
        <div className="mt-5  row">
          <div className="col-6 ModelForm">
            <div className="row" style={{alignItems:"center"}}>
              <input className="col-10" type="number" value={this.state.id}
              onChange={this.handleChangeID} placeholder="Enter Model ID"/>
            </div>
            <div className="row mt-2">
              <textarea
                className="col-10" 
                value={this.state.payload}
                onChange={this.handleChangePayload}
                rows={10} placeholder="Enter Payload"
                
              />
              {/* <input className="col-10" type="textarea" value={this.state.payload}
              onChange={this.handleChangePayload} placeholder="Enter Payload"/> */}
            </div>
            <div className="row mt-2 ml-5">
              <Button variant="primary ml-3" onClick={this.handleSubmit}>
                Output
              </Button>
              <Link to="/home" className="ml-2 btn btn-primary">
                Deploy Model
              </Link>
            </div>
          </div> 
          <div className="col-6 Logs">
            <Output/>
          </div> 
        </div>
        
      </div>
    );
  }
}

export default DeployedModelOutput;

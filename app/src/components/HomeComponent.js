import React, {Component} from 'react';
import {baseUrl} from '../shared/baseUrl';
import {Button,ButtonGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      url:"",
      name:"",
      modelID:"",
      logstate:0,
      logs:""
    }
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(e){
    this.setState({name:e.target.value});
  }
  handleChangeUrl(e){
    this.setState({url:e.target.value});
  }
  handleSubmit(){
    this.setState({logstate:1});
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "url": this.state.url, "folder_name": this.state.name })
    };
    fetch(baseUrl+'create-api', requestOptions)
        .then(response => response.json())
        .then(data => {this.setState({modelID:data});
              console.log(data);
              this.setState({url:"",name:""});
              window.setInterval(this.Logrequest,3000);})
  }
  Logrequest = ()=>{
    if(this.state.modelID){
      console.log("in");
      const requestOptions = {method:'GET'};
      fetch(baseUrl+'logs?model_id='+this.state.modelID,requestOptions)
          .then(response => response.text())
          .then(data=>this.setState({logs:data.split('\n'),logstate:2}));
    }
  };
  render(){

    
    const Logs = ()=>{
        if(this.state.logstate===1){
          return(
            <pre style={{color:"white"}}>
              Loading...
            </pre> 
          );
        }
        else if(this.state.logstate===2){
          return(
            <div className=" m-1">
              {
                this.state.logs.map((item,index)=>(
                  <div key={index}>
                    {item}
                  </div>
                ))
              }
            </div>
          );
        }
        else{
          return null;
        }
    };
    return (
      <div className="App container">
        <div className="row mt-5">
          <div className="col-12 App-header">
            Automatic Deployment
          </div>
          <div className="Link">
            {
              this.state.modelID?"Model ID: "+this.state.modelID+", use this once model is deployed.":null
            }
          </div>
          
        </div>
        <div className="mt-5 ">
            <div className="row Input">
              <input className="col-8" type="text" value={this.state.url}
               placeholder="Enter git URL" onChange={this.handleChangeUrl}/>
              <ButtonGroup className="col-4">
                <Button  variant="primary" onClick={this.handleSubmit}>
                  Submit
                </Button>
                {/* <Link to="/deployedmodels"> */}
                <Link to="/deployedmodels" className="ml-2 btn btn-primary">Use Model</Link>
                {/* </Link> */}
              </ButtonGroup>
            </div>
            <div className="LogOutput mt-4">
              <div className="Logs">
                <Logs/>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;

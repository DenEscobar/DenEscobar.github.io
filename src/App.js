import React, { Component } from 'react';
import './App.css';
import Response from "./components/Response.js"

class App extends Component{
  constructor(props){
  super(props);
  this.state={
    data : [],
    prompt: "",
    response: ""
  };

}


  async readStream(res){
    const reader = res.getReader();
    const data = reader.read().then(function processText({done, value}){
      let numArray = value
      let preJson = new TextDecoder().decode(numArray);
      let data= JSON.parse(preJson)
      let responseData = data["choices"][0]["text"]
      return responseData
    })
    return data
  }


  inputHandler = e =>{
    this.setState({[e.target.name]:e.target.value})
  }



  submitHandler = async e => {
    e.preventDefault();
    const res =  await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
      },
      body:JSON.stringify({
        prompt: `${this.state.prompt}`,
        temperature: 0.5,
        max_tokens: 64,
      })
    });
    const data = await this.readStream(res.body)
    let addData = this.state.data
    addData.unshift([this.state.prompt, data])
    this.setState({
      data:addData,
      prompt: ""
    })
  }

  render(
  ){
    return (
      <div className="main">
        <div className="title">Ask your ai-migo</div>
        <form onSubmit={this.submitHandler} >
          <label>What do you wanna know?
          <input type="text" name="prompt" id="prompt" className="promptBox" value={this.state.prompt} onChange={this.inputHandler} required></input>
          </label>
          <input type="submit" value="Submit" className="submit"/>
        </form>
        <div>
        {(this.state.data).map(item =>(
            <Response prompt={item[0]} res={item[1]}  />
        ))}
          
        </div>
  
      <div className="returnBox">
  
      </div>
  
      </div>
    );
  }
}

export default App;

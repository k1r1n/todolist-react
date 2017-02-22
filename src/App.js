import React, { Component } from 'react';
import './App.css';

class App extends Component {
  getInitialState(){
    console.log("init")
    return { /* something here */};
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {items: [], text: ''};
    console.log(JSON.parse(localStorage.getItem("data")))
  }

  render() {
    return (
      <div className="App">

        <div className="ui piled segment container ">
          <h4 className="ui header">TO DO LIST</h4>
          <List items={this.state.items} />
          <div className="ui middle aligned divided list fluid">
            <div className="item">
              <div className="content">

                <form className="ui form" onSubmit={this.handleSubmit}>
                  <div className="fields">
                    <div className="field">
                      <input type="text" name="list" onChange={this.handleChange} value={this.state.text} placeholder="Lsit"/>
                    </div>

                  </div>
                </form>

              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }
  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var todoList = []
    // var todoList = {
    //   id: Date.now(),
    //   text: this.state.text,
    //   status:'incomplate'
    // };
    this.setState((prevState) => ({
      items: prevState.items.concat(todoList),
      text: ''
    }));
    todoList.push({"id": Date.now(),"text": this.state.text,"status":'incomplate'})
    localStorage.setItem("data",JSON.stringify(todoList))
  }
}

class List extends React.Component {
  render() {
    var list = this.props.items;
    if (localStorage.getItem("data")){
      //this.setState({'items':['text':'subin']});
      //JSON.parse(localStorage.getItem("data"))
      // this.setState = {
      //   'items' : JSON.parse(localStorage.getItem("data"))
      // }
      //list = JSON.parse(localStorage.getItem("data"))
      console.log(list)
    }
    return (

        <div className="ui middle aligned divided list">
          {list.map(item => (
            <div className="item" key={item.id}>
              <div className="right floated content">
                <button className="ui button red icon"><i className="trash icon"></i></button>
              </div>
              <div className="content">
                <div className="ui checkbox">
                  <input type="checkbox" name="example"/>
                  <label>
                    <div className="header">{item.text}</div>
                    Description
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

    );
  }
}

export default App;

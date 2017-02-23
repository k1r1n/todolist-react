import React, { Component } from 'react';
import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {items: [], text: ''};
    this.todo = []
    if(JSON.parse(localStorage.getItem("data")))
        this.todo = JSON.parse(localStorage.getItem('data')) || [];

  }

  render() {
    return (
      <div className="App">
        <div className="ui piled segment container ">
          <h4 className="ui header">TO DO LIST ({this.todo.length})</h4>
          <List items={this.state.items} />
          <div className="ui middle aligned divided list fluid">
            <div className="item">
              <div className="content">
                <form className="ui form" onSubmit={this.handleSubmit}>
                  <div className="field">
                    <input type="text" name="list" onChange={this.handleChange} value={this.state.text} placeholder="List" />
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
    var todoList = {
      id: Date.now(),
      text: this.state.text,
      status:'incomplate'
    };
    var todos = this.todo;
    todos.push(todoList)
    localStorage.setItem('data', JSON.stringify(todos));
    this.setState((prevState) => ({
      items: prevState.items.concat(todoList),
      text: ''
    }));
  }
}

class List extends React.Component {
  //this.handleRemove = this.handleRemove.bind(this);
  render() {
    var list = this.props.items;
    if (localStorage.getItem("data")){
      list = JSON.parse(localStorage.getItem('data')) || [];
    }
    return (
      <div className="ui middle aligned divided list">
        {list.map((item,index) => (
          <div className="item" key={item.id}>
            <div className="right floated content">
              <button className="ui button red icon" onClick={this.handleRemove.bind(item,index)}><i className="trash icon"></i></button>
            </div>
            <div className="content">
              <div className="ui checkbox">
                <input type="checkbox" name="example" onClick={this.handleCheck.bind(item,index)} />
                <label>
                  <div className="header">{item.text}</div>
                  Description
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  handleCheck(index,item){
    console.log(this)
  }
  handleRemove(index,item){
    var todos = JSON.parse(localStorage.getItem('data')) || [];
    todos.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(todos));
    //this.setState({ items: todos });
    //this.items = todos
    console.log(this.state.items)
    //console.log(i,item,index)

  }

}


export default App;

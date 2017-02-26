import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Image, Modal } from 'semantic-ui-react'
import './App.css';
var count = 0
var todo  = []
var filterStr = "ALL"
var ListModal = []
class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {items: [], text: ''};

    if(JSON.parse(localStorage.getItem("data")))
      todo = JSON.parse(localStorage.getItem('data')) || [];
      count = todo.length
  }

  render() {
    return (
      <div className="App">
        <div className="ui piled segment container ">
          <h4 className="ui header">TO DO LIST ({count})</h4>
          <List filter="boy" items={this.state.items} />
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
            <div className="field">
              <button name="ALL" className="ui button mini" onClick={this.handleFilter.bind(this)}>ALL</button>
              <button name="COMPLETE" className="ui button green mini" onClick={this.handleFilter.bind(this)}>COMPLETE</button>
              <button name="INCOMPLETE" className="ui button red mini" onClick={this.handleFilter.bind(this)}>INCOMPLETE</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  handleFilter(e){
    filterStr = e.target.name
    ReactDOM.render(<App/>,document.getElementById('root'))
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
      status:false
    };
    var todos = todo;
    todos.push(todoList)
    localStorage.setItem('data', JSON.stringify(todos));
    count = todos.length
    this.setState((prevState) => ({
      items: prevState.items.concat(todoList),
      text: ''
    }));
  }

}

class List extends React.Component {
  render() {
    var list = this.props.items;
    if (localStorage.getItem("data")){
      list   = JSON.parse(localStorage.getItem('data')) || [];
    }
    //
    // const Modals = () => (
    //
    //   <Modal className="small"
    //   trigger={
    //     <Button className="ui button yellow icon" onClick={this.handleEdit.bind(todo.status)}>
    //       <i className="edit icon"></i>
    //     </Button>}>
    //     <Modal.Header>Edit Todo</Modal.Header>
    //     <Modal.Content image >
    //       <Image wrapped size='medium' src='http://semantic-ui.com/images/avatar2/large/rachel.png' />
    //       <Modal.Description>
    //       <div className="ui form">
    //         <div className="field">
    //           <label>List</label>
    //           <input type="text"/>
    //         </div>
    //         <div className="field">
    //           <label>Description</label>
    //           <textarea></textarea>
    //         </div>
    //         <button className="ui button blue">Update</button>
    //       </div>
    //       </Modal.Description>
    //     </Modal.Content>
    //   </Modal>
    // )
    return (
      <div className="ui middle aligned divided list">
        {list.filter(function(todo) {
          if(filterStr === "COMPLETE")
            return todo.status
          else if(filterStr === "INCOMPLETE")
            return !todo.status
          else
            return true
        }).map((item,index) => (
          <div className="item " key={item.id}>
            <div className="right floated content">

              <button className="ui button red icon" onClick={this.handleRemove.bind(item,index)}><i className="trash icon"></i></button>
            </div>
            <div className="content">
              <div className="ui checkbox">
                <input type="checkbox" name="example" checked={item.status} value={item.status} onChange={this.handleCheck.bind(this,item.id)}/>
                <label>
                  <div className={"header " + (item.status ? 'complate' : 'incomplate')}>
                  {item.text}
                  </div>
                  Description
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  handleEdit(item){
    console.log(item)
  }
  handleCheck(id,e){
    for(var i = 0; i < todo.length; i++) {
      if(todo[i].id === id) {
        todo[i].status = e.target.checked
        localStorage.setItem('data', JSON.stringify(todo));
        ReactDOM.render(<App/>,document.getElementById('root'))
      }
    }
  }
  handleRemove(index,item){
    var todos = JSON.parse(localStorage.getItem('data')) || [];
    todos.splice(index, 1);
    todo.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(todos));
    --count
    ReactDOM.render(<App/>,document.getElementById('root'))
  }
}


export default App;

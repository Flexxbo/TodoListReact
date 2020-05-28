import React, { Component } from "react";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import { v1 as uuidv1 } from "uuid";

class App extends Component {
  state = {
    items: [],
    id: uuidv1(),
    item: "",
    editItem: false,
  };

  // + Component did Mount for loading/reloading page and waiting for data be fetched
  componentDidMount() {
    fetch("https://todolistfstack.herokuapp.com/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        this.setState({ items: data });
      });
  }

  // ! not connected put request yet
  handleChange = (event) => {
    this.setState({
      item: event.target.value,
    });
  };

  // + handle submit pushes to database immediately
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.editItem === false) {
      const newItem = {
        id: this.state.id,
        title: this.state.item,
      };
      /*
       *this I will only need if I use array instead of database
       *   const updatedItems = [...this.state.items, newItem];
       *
       *   this.setState({
       *    items: updatedItems,
       *   item: "",
       *  id: uuidv1(),
       * editItem: false,
       * });
       */

      fetch("https://todolistfstack.herokuapp.com/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
        .then((response) => {
          //console.log(newItem);
          //console.log(this.state.items);
          return response.text();
        })
        .then((data) => {
          alert(data);
          this.componentDidMount();
        });
    } else {
      fetch(`https://todolistfstack.herokuapp.com/todo/${this.state.id}`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: this.state.selectedItem.title }),
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  handleEdit = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);

    const selectedItem = this.state.items.find((item) => item.id === id);

    console.log(selectedItem);
    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id: id,
    });
  };

  /* fetch(`http://localhost:3001/todo/${id}`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: selectedItem.title }),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      }); */

  clearList = () => {
    //*this I need if I use array instead of database
    //*this.setState({ items: [] });
    fetch(`https://todolistfstack.herokuapp.com/todo`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        this.componentDidMount();
      });
  };

  handleDelete = (id) => {
    console.log("this is id deleted", id);
    /*
     *this I will only need if I use array instead of database
     *const filteredItems = this.state.items.filter((item) => item.id !== id);
     *this.setState({
     *  items: filteredItems,
     *});
     */
    fetch(`https://todolistfstack.herokuapp.com/todo/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        this.componentDidMount();
      });
  };

  /* handleEdit = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);
    const selectedItem = this.state.items.find((item) => item.id === id);
    console.log(selectedItem);
    fetch(`http://localhost:3001/todo/${id}`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedItem.title),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
 
  };
  */

  render() {
    //console.log("logging state", this.state);
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center"> todo input </h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              /* editItem={this.state.editItem}*/
            />
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              /*  handleEdit={this.handleEdit}*/
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

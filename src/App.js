import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  //url variable
  const url = "https://dogsgb1207.herokuapp.com"
  //list of dogs state
  const [dogs, setDogs] = React.useState([])

  //empty dog
  const emptyDog = {
    name: "",
    age: 0,
    img: ""
  }
  //state to track dog to edit
  const [selectedDog, setSelectedDog] = React.useState(emptyDog)

  //create function to get list of dogs
  const getDogs = () => {
    fetch(url + "/dog")
    .then(response => response.json())
    .then(data => {
      setDogs(data)
    })
  }
  //fetch dogs when page loads
  React.useEffect(() => {
    getDogs()
  }, [])
  //handle create function for creating dogs
  const handleCreate = (newDog) => {
    fetch(url + "/dog", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDog)
    })
    .then(() => {
      getDogs()
    })
  }
  //function for selected dog
  const selectDog = (dog) => {
    setSelectedDog(dog)
  }
  //handle update of dog
  const handleUpdate = (dog) => {
    fetch(url + "/dog/" + dog._id,{
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dog)
    })
    .then(() => {
      getDogs()
    })
  }

  //deletes a dog
  const deleteDog = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete"
    })
    .then(() => {
      getDogs()
    })
  }

  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <Link to="/create">
      <button>Create a Dog</button>
      </Link>
      <hr />
      <main>
        <Switch>
          <Route 
            exact 
            path="/" 
            render={(rp) => <Display {...rp} dogs={dogs}selectDog={selectDog} deleteDog={deleteDog}/>}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;

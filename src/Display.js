import React from "react";

const Display = (props) => {
  //destructure dogs from props
  const {dogs} = props
  //loading function for if dogs exist
  const loaded = () => {
    return (
    <div className="dog-container" style={{textAlign: "center"}}>
    {dogs.map(dog => {
      return (<article className="dog-div" key={dog._id}>
        <img src={dog.img} alt='dog-for-adoption'/>
        <h1>{dog.name}</h1>
        <h3>Age: {dog.age}</h3>
        <div className="edit-button">
          <button onClick={() => {
            props.selectDog(dog)
            props.history.push("/edit")
          }}>Edit</button>
          <button onClick={() => {
            props.deleteDog(dog)
          }}>Delete</button>
        </div>
      </article>)
    })}
    </div>)
  }

  const loading = () => {
    return <h1>Loading...</h1>
  }
    return dogs.length > 0 ? loaded() : loading()
    
  }
export default Display

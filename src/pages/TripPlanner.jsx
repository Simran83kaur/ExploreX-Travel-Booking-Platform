import { useState } from "react";

function TripPlanner() {

  const [activity, setActivity] = useState("");
  const [trip, setTrip] = useState([]);

  function addActivity() {

    if (activity.trim() === "") return;

    setTrip([...trip, activity]);

    setActivity("");
  }

  function deleteActivity(index) {

    const updatedTrip = trip.filter((_, i) => i !== index);

    setTrip(updatedTrip);

  }

  return (

    <div className="container py-5">

      <h1 className="mb-4">
        Trip Planner
      </h1>

      <div className="d-flex gap-3">

        <input
          type="text"
          className="form-control"
          placeholder="Add activity..."
          value={activity}
          onChange={(e)=>setActivity(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={addActivity}
        >
          Add
        </button>

      </div>

      <div className="mt-5">

        {

          trip.length===0 ?

          <h5>No activities added.</h5>

          :

          trip.map((item,index)=>(

            <div
              key={index}
              className="d-flex justify-content-between align-items-center border rounded p-3 mb-3"
            >

              <span>

                Day {index+1} : {item}

              </span>

              <button
                className="btn btn-danger"
                onClick={()=>deleteActivity(index)}
              >

                Delete

              </button>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default TripPlanner;
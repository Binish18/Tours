import { useEffect, useState } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [loading,setLoading]=useState(true)
  const [tours,setTours]=useState([]) // array of objects

  // remove tour id daleingein or jo mach na hui usko new array return kardein gein
  //In summary, this function is designed to remove a tour from the 'tours' array based on its ID. It filters out the tour with the provided ID and updates the state with the new filtered array. This kind of functionality is commonly used in React applications when you want to update the UI to reflect changes in the underlying data, such as removing an item from a list.
  const removeTour=(id)=>{
    const newTours = tours.filter((tour)=>tour.id !== id)
    setTours(newTours);
  }
  const fetchtours =async()=>{
   setLoading(true)
   try {
    const response = await fetch(url);
    const tours = await response.json()
    //console.log(tours)
    setTours(tours)
   } catch (e) {
    console.log(e)
   }
   setLoading(false)
  }
  useEffect(()=>{
   fetchtours();

  },[])
  if(loading){
    return <main>
      <Loading/>
    </main>
  }
  if(tours.length === 0){
    return <main>
      <div className="title">
      <h2>no tours left</h2>
      <button type="button" style={{marginTop:'2rem'}} className="btn" onClick={()=>fetchtours()}>Refresh</button>
      </div>
    </main>
  }
  return <main>
     <Tours tours={tours} removeTour={removeTour}/>;
  </main>
 
};
export default App;

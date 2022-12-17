import React, { useEffect } from "react";
import MotorcycleCard from "./MotorcycleCard";
import { useSelector, useDispatch } from "react-redux"
import { selectAllMotorcycles, getMotorcyclesStatus, getMotorcyclesError, fetchMotoData } from "../redux/motorcycleSlice";


function Page2() {

  //This is our mock data
  // const { MotoData } = props;

  const dispatch = useDispatch();
  const MotoData = useSelector(selectAllMotorcycles);
  const motorcycleStatus = useSelector(getMotorcyclesStatus);
  const motorcycleError = useSelector(getMotorcyclesError);

  useEffect(() => {
    if (motorcycleStatus === "idle") {
      dispatch(fetchMotoData());
    }
  }, [motorcycleStatus, dispatch])
  //Motorcycles that we add to our mock data will automatically be added.
  //Style each motorcyle in MotorcycleCard.jsx

  console.log("motorcycleStatus", motorcycleStatus)
  
  let mappedMotorcycles;
  if (motorcycleStatus === "loading") {
    mappedMotorcycles = <p>"Loading..."</p>;
  } else if (motorcycleStatus === "succeeded") {
    mappedMotorcycles = MotoData.map((motorcycle, i) => {
      return (
        <div key={i}>
          <MotorcycleCard motorcycle={motorcycle} />
        </div>
      )
    })
  }else if(motorcycleStatus === "failed"){
    mappedMotorcycles = <p>{motorcycleError}</p>
  }

  // const mappedMotorcycles = MotoData.map((motorcycle, i) => {
  //   return (
  //     <div className="container">
  //       <div className="row">
  //         <div className="col-md-2text-center mt-5">
  //           <div key={i}>
  //             <MotorcycleCard motorcycle={motorcycle} />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });
  return (
    <div className="mappedMotorcycles">
      {/* <h1 className="font-weight-light">Hello, this is Test</h1> */}
      {mappedMotorcycles}
    </div>
  );
}
export default Page2;

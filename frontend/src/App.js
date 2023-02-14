// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { getOneSpot, getSpots } from "./store/spots";
import SpotIndex from "./components/SpotIndex";
import CreateSpotForm from "./components/CreateSpotForm"
import SpotDetail from "./components/SpotDetail";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  if(sessionStorage.getItem('singleSpotId')){
    const spotRestore = async () =>{
      await dispatch(getOneSpot(sessionStorage.getItem('singleSpotId')))
    }
    spotRestore()
  }
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getSpots())
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="page-content">
        {isLoaded && (
          <Switch>
            <Route exact path='/'>
              <SpotIndex />
            </Route>
            {sessionUser && (
              <Route path='/spots/new'>
                <CreateSpotForm />
              </Route>
            )}
            <Route path='/spots/:spotId'>
              <SpotDetail />
            </Route>
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;

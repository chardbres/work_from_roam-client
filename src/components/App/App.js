import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import AutoAlert from '../AutoAlert/AutoAlert.js'
import Search from '../Search/Search'
import GoogleMap from '../GoogleMap/GoogleMap'
import ReviewCreate from '../Review/ReviewCreate'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import ChangePassword from '../ChangePassword/ChangePassword'
import SignOut from '../SignOut/SignOut'
import Header from '../Header/Header'
import NavBar from '../NavBar/NavBar'
import WorkSpace from '../WorkSpace/WorkSpace'
import WorkSpaceCreate from '../WorkSpace/WorkSpaceCreate.js'
import ListView from '../ListView/ListView'
import WorkspaceFilter from '../WorkspaceFilter/WorkspaceFilter'

import './App.scss'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      allData: [],
      poiLocation: null,
      mapCenter: { lat: 42.3601, lng: -71.0589},
      bounds: null,
      placeId: null,
      placeData: null,
      searchLocation: null,
      workSpaceId: null,
      currentWorkspace: null,
      user: null,
      userLocation: null,
      alerts: [],
      // List of filter fields
      filters_wifi: true,
      filters_outlet: true,
      filters_coffee: true,
      filters_food: true,
      filters_noise: '',
      filters_bathroom: '',
      filters_seating:''
    }

    // Handler that allows the WorkspaceFilter to update the App filter state
    this.filterHandler = this.filterHandler.bind(this)
  }

  // Function passed as props to WorkspaceFilter child, that allows the filter component to update the filters states here in App
  filterHandler = (filter, value) => {
    this.setState({ [filter]: value })
  }
  // ~~~~~~~~~~~~~~~~~~~~

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant, image }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant, image }] })
  }

  render() {
    console.log(this.state)
    console.log(this.filters)
    const { alerts, user } = this.state

    return (
<div>
<Fragment>

        {alerts.map((alert, index) => (
            <AutoAlert
              key={index}
              heading={alert.heading}
              variant={alert.variant}
              message={alert.message}
              image={alert.image}
            />
          ))}

        <Route path='/work_spaces/:id/create-review'>
          <ReviewCreate
            user={user}
            alert={this.alert}
            placeId={this.state.placeId}
            placeData={this.state.placeData}
            location={this.state.poiLocation}
            data={this.state.allData}
            currentWorkspace={this.state.currentWorkspace}
            setApp={this.setState.bind(this)}
          />
        </Route>

        <Route path='/workspace' render={() => (
           <WorkSpace
              data={this.state.currentWorkspace}
              placeData={this.state.placeData}
            />
         )} />

        <Route path='/sign-up' render={() => (
           <SignUp alert={this.alert} setUser={this.setUser} />
         )} />

         <Route path='/sign-in' render={() => (
            <SignIn user={user} alert={this.alert} setUser={this.setUser} />
          )} />

          <Route user={user} path='/change-password' render={() => (
              <ChangePassword user={user} />
            )} />

          <Route user={user} path='/sign-out' render={() => (
              <SignOut clearUser={this.clearUser} alert={this.alert} user={user} />
            )} />

          <Route user={user} path='/nav' render={() => (
              <Header clearUser={this.clearUser} user={user} />
            )} />

            <Route user={user} path='/create-workspace' render={() => (
            <WorkSpaceCreate
              user={user}
              placeId={this.state.placeId}
              placeData={this.state.placeData}
              location={this.state.poiLocation}
              setApp={this.setState.bind(this)}
            />
          )} />



        <Route path='/'>
          <div className="App">
          {/* Group makes up the search functions at the top of the page */}
            <div className='search-group'>
              <NavBar />
              <div>
                <Search setApp={this.setState.bind(this)}
                        mapCenter={this.state.mapCenter}
                />
              </div>
              <WorkspaceFilter filterHandler = {this.filterHandler}/>
            </div>
          {/* ~~~~~~~~~~~~~~~~~~~~ */}
            <GoogleMap
              center={this.state.mapCenter}
              coordinates={this.state.coordinates}
              placeData={this.state.placeData}
              //
              setApp={this.setState.bind(this)}
              allData={this.state.allData}
              mapCenter={this.state.mapCenter}
              poiLocation={this.state.poiLocation}
              searchLocation={this.state.searchLocation}
              userLocation={this.state.userLocation}
            />
            <ListView allData={this.state.allData} />
          </div>
        </Route>
      </Fragment>
      </div>


    )
  }
}

export default App

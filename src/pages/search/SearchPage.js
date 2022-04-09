import React from "react";
import { Local_routes, ApiRoute } from "../../util/routes";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContent } from "../../components/Toast";
import { Loader } from "../../components/Loader";
import { ErrorComp } from "../../components/Error";
import { Message } from "../../components/Message";
import Geocode from "react-geocode";
import FreelancerHomePageCard from "../../components/FreelancerHomePageCard";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { withTranslation } from "react-i18next";
class SearchPage extends React.Component {
  state = {
    SearchPageServiceProviders: null,
    address: "",
    noData: null,
    lat: null,
    lng: null,
    err: null,
    search: "",
    providerName:"",
    currentLocation: false,
  };
  handleChange = (address) => {
    this.setState({ address });
    this.toogleLocationfrominput(true);
  };
  handleInputChange=(e)=>{
    this.setState({providerName:e.target.value})
  }
  handleSelect = (address) => {
    this.setState({ address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({ lat: latLng.lat, lng: latLng.lng });
      })
      .catch((error) => console.error("Error", error));
    this.toogleLocationfrominput(false);
  };
  async componentDidMount() {
    var input = document.getElementById("locationsearch");
    input.addEventListener("focusin", () => {
      this.toogleLocationfrominput(true);
    });
    input.addEventListener("focusout", () => {
      setTimeout(() => {
        this.toogleLocationfrominput(false);
      }, 100);
    });

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    var query = urlParams.get("query");
    if (query !== null) {
      localStorage.setItem("search_page__data_set", "set");
      localStorage.setItem("lat", urlParams.get("lat"));
      localStorage.setItem("lng", urlParams.get("lng"));
      localStorage.setItem("address", urlParams.get("address"));
    }
    if (localStorage.getItem("search_page__data_set") !== "set") {
      this.setState({ forceRedirect: true });
    } else {
      const lat = localStorage.getItem("lat");
      const lng = localStorage.getItem("lng");
      const address =
        localStorage.getItem("address") == "null"
          ? ""
          : localStorage.getItem("address");

      await this.setState({
        lat,
        lng,
        address,
      });
      this.getSearchPageServices();
    }
  }

  //handle Location Search

  handleSearch =async  () => {
    const { t } = this.props;
    // if (this.state.address == "" && this.state.providerName=="") {
    //   toast(() => ToastContent(t("alerts.filleOneFeild")), {
    //     toastId: "infoToast",
    //     hideProgressBar: true,
    //     type: toast.TYPE.ERROR,
    //     autoClose: 2000,
    //   });
    //   return;
    // }
if(this.state.address==""){
  await this.setState({lat:0,
    lng:0})
}
    //set to initial sate so that loader will apear
  await  this.setState({
      SearchPageServiceProviders: null,
      noData: null,
     
      err: null,
    });
    this.toogleLocationfrominput(false);
    this.getSearchPageServices();
  };
  //handle icon click
  handleIconClick = (address) => {
    var input = document.getElementById("locationsearch");
    input.focus();
    this.setState({ address });
    this.tooglecurrentLocation();
  };

  /// toogle location

  tooglecurrentLocation = () => {
    this.setState({ currentLocation: !this.state.currentLocation });
  };
  //toolge from input
  toogleLocationfrominput = (value) => {
    this.setState({ currentLocation: value });
  };
  //get current location
  CurrentLocation = () => {
    const { t } = this.props;
    toast.dismiss();
    toast(() => ToastContent(t("alerts.gettingCurrentlocation")), {
      toastId: "infoToast",
      hideProgressBar: true,
      type: toast.TYPE.INFO,
      autoClose: 2000,
    });
    navigator.geolocation.getCurrentPosition((position) => {
      // Get address from latitude & longitude.
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
        .then((response) => {
          const address = response.results[0].formatted_address;
          this.setState({ address: address });

          toast.dismiss();
        })
        .catch((error) => {
          console.error(error);
        });
    });
    this.toogleLocationfrominput(false);
  };
  //Get the Api response
  getSearchPageServices() {
    
    var Params = {
      region_id: 1,
      addLng: parseFloat(this.state.lng),
      addLat: parseFloat(this.state.lat),
      customer_id: 1,
      provider_name:this.state.providerName
    };
    axios
      .post(ApiRoute.HomePageServiceProvider, Params)
      .then((res) => {
        if (res.data.error != "0") {
          this.setState({ noData: res.data.message });
          this.setState({ SearchPageServiceProviders: "err" });
          
        } else {
          let SearchPageServiceProviders = res.data;
          this.setState({ SearchPageServiceProviders });
          
        }
      })
      .catch((err) => {
        this.setState({ SearchPageServiceProviders: err });
        this.setState({ err: err });
      });
  }
  //render method
  render() {
    const { t } = this.props;
    const { SearchPageServiceProviders, err, forceRedirect } = this.state;
    if (forceRedirect) {
      return <Redirect to={Local_routes.home} />;
    }
    return (
      <React.Fragment>
        <div className="container" style={{ marginTop: "3rem" }}>
          <div className="row">
            {/* <!-- Search --> */}
            <div className="col-md-12 col-sm-10">
              <div
                className="main-search-input gray-style margin-top-0 margin-bottom-10"
                style={{
                  flexDirection: "row",
                  width: "100%",
                  borderRadius: "50px",
                  padding: "15px",
                }}
              >
                <div className="main-search-input-item">
                  <input
                    type="text"
                    placeholder={t("searchpage.providername")}
                    value={this.state.providerName}
                    onChange={(e)=>this.handleInputChange(e)}
                  />
                </div>

                <div className="main-search-input-item location">
                  <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <input
                          {...getInputProps({
                            placeholder: "Search Places ...",
                            className: "location-search-input",
                          })}
                          id="locationsearch"
                        />
                        <div
                          className="autocomplete-dropdown-container"
                          style={{
                            border: `${
                              suggestions.length == 0
                                ? "0px solid rgba(0,0,0,0.2)"
                                : "1px solid rgba(0,0,0,0.2)"
                            }`,
                            boxShadow: "1px 2px 10px rgba(0,0,0,0.4)",
                            padding: `${
                              suggestions.length == 0 ? "0px" : "10px"
                            }`,
                            backgroundColor: "white",
                            width: "100%",
                            borderRadius: "3px",
                            position: "absolute",
                            zIndex: 100,
                          }}
                        >
                          {this.state.currentLocation ? (
                            <div
                              className="main-search-input-item location suggestion-item--active"
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                marginLeft: "0rem",
                                borderRight: "none",
                                color: "#4b74b9",
                                cursor: "pointer",
                                padding: "0px 10px",
                              }}
                              onClick={() => this.CurrentLocation()}
                            >
                              <a>
                                <i
                                  style={{ color: "#4b74b9" }}
                                  className="fa fa-location-arrow"
                                ></i>
                              </a>
                              <p style={{ fontSize: "14px" }}>
                                Current Location
                              </p>
                            </div>
                          ) : null}
                          {loading && (
                            <div
                              style={{
                                backgroundColor: "white",
                                width: "100%",
                                border: "1px solid rgba(0,0,0,0.2)",
                              }}
                            >
                              {t("alerts.loading")}
                            </div>
                          )}
                          {suggestions.map((suggestion, index) => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? {
                                  backgroundColor: "#fafafa",
                                  cursor: "pointer",
                                }
                              : {
                                  backgroundColor: "#ffffff",
                                  cursor: "pointer",
                                };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                                key={index}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>

                  <a
                    style={{ marginRight: "2rem" }}
                    className='Location-marker'
                    onClick={() => this.handleIconClick("")}
                  >
                    <i className="fa fa-map-marker"></i>
                  </a>
                </div>

                {/* <div className="main-search-input-item">
                  <select
                    data-placeholder="All Categories"
                    className="chosen-select"
                  >
                    <option>All Categories</option>
                    <option>Shops</option>
                    <option>Hotels</option>
                    <option>Restaurants</option>
                    <option>Fitness</option>
                    <option>Events</option>
                  </select>
                </div> */}

                <button
                  style={{ marginTop: ".4rem" }}
                  className="button"
                  onClick={() => this.handleSearch()}
                >
                  {t("searchpage.search")}
                </button>
              </div>
            </div>
            {/* <!-- Search Section / End --> */}

            <div className="col-md-12" style={{padding:"0px"}}>
              {/* <!-- Sorting - Filtering Section --> */}
              <div className="row margin-bottom-25 margin-top-30">
                {/* <div className="col-md-6">
                 
                  <div className="layout-switcher">
                    <a className="grid active">
                      <i className="fa fa-th"></i>
                    </a>
                    <a className="list">
                      <i className="fa fa-align-justify"></i>
                    </a>
                  </div>
                </div> */}

                {/* <div className="col-md-6">
                  <div className="fullwidth-filters">
                  
                    <div className="panel-dropdown wide float-right">
                      <a href="#">More Filters</a>
                      <div className="panel-dropdown-content checkboxes">
                    
                        <div className="row">
                          <div className="col-md-6">
                            <input id="check-a" type="checkbox" name="check" />
                            <label htmlFor="check-a">
                              Elevator in building
                            </label>

                            <input id="check-b" type="checkbox" name="check" />
                            <label htmlFor="check-b">Friendly workspace</label>

                            <input id="check-c" type="checkbox" name="check" />
                            <label htmlFor="check-c">Instant Book</label>

                            <input id="check-d" type="checkbox" name="check" />
                            <label htmlFor="check-d">Wireless Internet</label>
                          </div>

                          <div className="col-md-6">
                            <input id="check-e" type="checkbox" name="check" />
                            <label htmlFor="check-e">
                              Free parking on premises
                            </label>

                            <input id="check-f" type="checkbox" name="check" />
                            <label htmlFor="check-f">
                              Free parking on street
                            </label>

                            <input id="check-g" type="checkbox" name="check" />
                            <label htmlFor="check-g">Smoking allowed</label>

                            <input id="check-h" type="checkbox" name="check" />
                            <label htmlFor="check-h">Events</label>
                          </div>
                        </div>

                       
                        <div className="panel-buttons">
                          <button className="panel-cancel">Cancel</button>
                          <button className="panel-apply">Apply</button>
                        </div>
                      </div>
                    </div>
                 
                    <div className="panel-dropdown float-right">
                      <a href="#">Distance Radius</a>
                      <div className="panel-dropdown-content">
                        <input
                          className="distance-radius"
                          type="range"
                          min="1"
                          max="100"
                          step="1"
                          data-title="Radius around selected destination"
                        />
                        <div className="panel-buttons">
                          <button className="panel-cancel">Disable</button>
                          <button className="panel-apply">Apply</button>
                        </div>
                      </div>
                    </div>
                  
                    <div className="sort-by">
                      <div className="sort-by-select">
                        <select
                          data-placeholder="Default order"
                          className="chosen-select-no-single"
                        >
                          <option>Default Order</option>
                          <option>Highest Rated</option>
                          <option>Most Reviewed</option>
                          <option>Newest Listings</option>
                          <option>Oldest Listings</option>
                        </select>
                      </div>
                    </div>
                    
                  </div>
                </div> */}
              </div>
              {/* <!-- Sorting - Filtering Section / End --> */}

              <div className="row">
                {/* <!-- Listing Item --> */}
                {SearchPageServiceProviders == null ? (
                  <Loader Title={t("alerts.loading")} />
                ) : err !== null ? (
                  <ErrorComp errorDescription={t("alerts.unexpectederror")} />
                ) : this.state.noData !== null ? (
                  <Message
                    MessageDescription={t("alerts.noproviderfound")}
                  />
                ) : (
                  SearchPageServiceProviders.data.map(
                    (ServiceProvider, index) => {
                      return (
                        <div className="col-lg-4 col-md-6" key={index}>
                          <FreelancerHomePageCard
                            ServiceProvider={ServiceProvider}
                            key={index}
                          />
                        </div>
                      );
                    }
                  )
                )}
                {/* <!-- Listing Item / End --> */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(SearchPage);

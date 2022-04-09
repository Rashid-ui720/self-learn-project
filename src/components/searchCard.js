import React from "react";
import { Local_routes } from "../util/routes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContent } from "./Toast";
import Geocode from "react-geocode";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { withTranslation } from "react-i18next";
import { IconButton } from "@material-ui/core";
class SearchCard extends React.Component {
  state = {
    search: "",
    address: "",
    Search_lat: null,
    search_lng: null,
    geocoder: null,
    goSearchPage: false,
    currentLocation: false,
  };
  handleChange = (address) => {
    this.setState({ address });
    this.toogleLocationfrominput(true);
  };
  //handle icon click
  handleIconClick = (address) => {
    var input = document.getElementById("locationsearch");
    input.focus();
    this.setState({ address });
    this.tooglecurrentLocation();
  };
  handleSelect = (address) => {
    this.setState({ address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({ Search_lat: latLng.lat, search_lng: latLng.lng });
      })
      .catch((error) => console.error("Error", error));
    this.toogleLocationfrominput(false);
  };
  componentDidMount() {
    var input = document.getElementById("locationsearch");
    input.addEventListener("focusin", () => {
      this.toogleLocationfrominput(true);
    });
    input.addEventListener("focusout", () => {
      setTimeout(() => {
        this.toogleLocationfrominput(false);
      }, 100);
    });
    navigator.geolocation.getCurrentPosition((position) => {
      // Get address from latitude & longitude.
      this.setState({
        Search_lat: position.coords.latitude,
        search_lng: position.coords.longitude,
      });
      Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
        .then((response) => {
          const address = response.results[0].formatted_address;
          this.setState({ address: address });

         
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  //Handle Search

  handleSearch = () => {
    const { t } = this.props;
    toast.dismiss();
    if (this.state.address == "") {
      toast(() => ToastContent(t("alerts.locationcarderror")), {
        toastId: "infoToast",
        hideProgressBar: true,
        type: toast.TYPE.ERROR,
        autoClose: 2000,
      });
      return;
    }
    this.toogleLocationfrominput(false);
    this.setState({ goSearchPage: true });
  };

  // //get current location
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
  /// toogle location

  tooglecurrentLocation = () => {
    this.setState({ currentLocation: !this.state.currentLocation });
  };

  //toolge from input
  toogleLocationfrominput = (value) => {
    this.setState({ currentLocation: value });
  };
  render() {
    const { t } = this.props;
    if (this.state.goSearchPage) {
      return (
        <Redirect
          to={{
            pathname: Local_routes.searchPage,
            search: `&query=${true}&lat=${this.state.Search_lat}&lng=${
              this.state.search_lng
            }&address=${this.state.address}`,
          }}
        />
      );
    }
    return (
      <div className="main-search-input">
        <div className="main-search-input-headline">
          <h2>{t("searchCard.title")}</h2>
          <h4>{t("searchCard.descrip")}</h4>
        </div>

        <div
          className="main-search-input-item location"
          style={{ width: "100%", borderRight: "none" }}
        >
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            shouldFetchSuggestions={true}
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
                    placeholder: t("searchCard.searchplaces"),
                    className: "location-search-input",
                  })}
                  id="locationsearch"
                />
                <div
                  className="autocomplete-dropdown-container"
                  style={{
                    border: `${
                      suggestions.length == 0
                        ? "0px solid rgba(0,0,0,0.5)"
                        : "1px solid rgba(0,0,0,0.5)"
                    }`,
                    boxShadow: "1px 2px 10px rgba(0,0,0,0.4)",
                    padding: `${suggestions.length == 0 ? "0px" : "10px"}`,
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
                      <p style={{ fontSize: "14px" }}>Current Location</p>
                    </div>
                  ) : null}
                  {loading && <div>{t("alerts.loading")}</div>}
                  {suggestions.map((suggestion, index) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
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
          <a onClick={() => this.handleIconClick("")}>
            <i className="fa fa-map-marker"></i>
          </a>
        </div>

        <button
          className="button"
          style={{ marginTop: "2rem", alignSelf: "center" }}
          onClick={() => this.handleSearch()}
        >
          {t("searchCard.search")}
        </button>
      </div>
    );
  }
}

export default withTranslation()(SearchCard);

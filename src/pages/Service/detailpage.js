import React from "react";
import FreelancerHomePageCard from "../../components/FreelancerHomePageCard";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import { Loader } from "../../components/Loader";
import { Link, Redirect } from "react-router-dom";
import { Local_routes, ApiRoute } from "../../util/routes";
import OverView from "../../components/overview";
import Location from "../../components/Location";
import Gallary from "../../components/Gallary";
import Reviews from "../../components/reviews";
import DetailSideBar from "../../components/DetailSidebar";
import Services from "../../components/Services";
import { ErrorComp } from "../../components/Error";
import { withTranslation } from "react-i18next";

class ServiceDetailPage extends React.Component {
  state = {
    U_id: null,
    forceRedirect: false,
    serviceProviderDetails: null,
    selectedServices:[],
    totalDuration: 0,
    err: null,
  };

  async componentDidMount() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    const queryString = new Buffer(window.location.search, "base64").toString(
      "ascii"
    );

    const urlParams = new URLSearchParams(queryString);

    var query = urlParams.get("query");
    if (query !== null) {
      localStorage.setItem("detail_page__data_set", "set");
      localStorage.setItem("U_id", urlParams.get("U_id").trim());
    }
    if (localStorage.getItem("detail_page__data_set") !== "set") {
      this.setState({ forceRedirect: true });
    } else {
      const U_id = localStorage.getItem("U_id");

      await this.setState({
        U_id,
      });

      this.getServiceproviderDetail(this.state.U_id);
    }
  }

  //Get the Api response
  getServiceproviderDetail(U_id) {
    var bodyFormData = new FormData();
    bodyFormData.append("user_id", U_id);

    axios
      .post(ApiRoute.ServiceProviderDetails, bodyFormData)
      .then((res) => {
        let serviceProviderDetails = res.data.data;
        this.setState({ serviceProviderDetails });
      })
      .catch((err) => {
        this.setState({ err: err });
      });
  }

  getSelectedServicesFromServiceElement(servicesarray , duration){
    this.setState({selectedServices: servicesarray , totalDuration: duration})
  }

  //render method
  render() {
    const { t } = this.props;
    const { U_id, forceRedirect, serviceProviderDetails, err } = this.state;
  
    if (forceRedirect) {
      return <Redirect to={Local_routes.home} />;
    }
    // error
    if (err != null) {
      return <ErrorComp errorDescription={t("alerts.unexpectederror")} />;
    }
    // Loader
    if (serviceProviderDetails == null ) {
      return <Loader Title={t("alerts.loading")} />;
    }


    return (
      <div>
        <div className="container">
          <div className="row sticky-wrapper">
            <div className="col-lg-8 col-md-8 padding-right-30">
              {/* <!-- Titlebar --> */}
              <div id="titlebar" className="listing-titlebar">
                <div className="listing-titlebar-title">
                  <h2>
                    {serviceProviderDetails.full_name}
                    <span className="listing-tag">
                      {serviceProviderDetails.user_type}
                    </span>
                  </h2>
                  <span>
                    <a href="#listing-location" className="listing-address">
                      <i className="fa fa-map-marker"></i>
                      {serviceProviderDetails.provider_address == ""
                        ? "No address given"
                        : serviceProviderDetails.provider_address}
                    </a>
                  </span>
                  <div>
                    <a href="javascript:void(0)" className="listing-address">
                      <i className="fa fa-scissors"></i>&nbsp;
                       Work Place: &nbsp; 
                      {serviceProviderDetails.current_workplace == ""
                        ? " "
                        : serviceProviderDetails.current_workplace}
                    </a>
                  </div>
                </div>
              </div>

              {/* <!-- Listing Nav --> */}
              <div id="listing-nav" className="listing-nav-container">
                <ul className="listing-nav">
                  <li>
                    <a href="#listing-pricing-list">
                      {t("detailpage.services")}
                    </a>
                  </li>
                  <li>
                    <a href="#listing-overview">{t("detailpage.about")}</a>
                  </li>

                  <li>
                    <a href="#listing-gallery">{t("detailpage.gallery")}</a>
                  </li>
                  {serviceProviderDetails.provider_lat !== "" ||
                  serviceProviderDetails.provider_long !== "" ? (
                    <li>
                      <a href="#listing-location">{t("detailpage.location")}</a>
                    </li>
                  ) : null}
                  <li>
                    <a href="#listing-reviews">{t("detailpage.reviews")}</a>
                  </li>
                </ul>
              </div>
              {/* sERVICES */}
              <Services
                services={serviceProviderDetails.user_services}
                provider_id={this.state.U_id}
                provider_pre_book_percentage={
                  serviceProviderDetails.provider_pre_book_percentage
                }
                provider_pre_booking_type={serviceProviderDetails.provider_pre_booking_type}
                provider_address={serviceProviderDetails.provider_address} 
                area_lat={ serviceProviderDetails.provider_lat}
                area_long={serviceProviderDetails.provider_long}
                getSelectedServicesFromServiceElement={(services , duration) => this.getSelectedServicesFromServiceElement(services , duration)}
              />
              {/* <!-- Overview --> */}
              <OverView serviceProviderDetails={serviceProviderDetails} />

              {/* <!-- Slider --> */}
              <Gallary
                workimage_url={serviceProviderDetails.workimage_url}
                certificate_url={serviceProviderDetails.certificate_url}
                user_Performed={serviceProviderDetails.user_Performed}
                user_certificate={serviceProviderDetails.user_certificate}
                noimage={t("detailpage.noimage")}
              />

              {/* <!-- Location --> */}
              {serviceProviderDetails.provider_lat !== "" ||
              serviceProviderDetails.provider_long !== "" ? (
                <Location
                  address={{
                    area_lat: serviceProviderDetails.provider_lat,
                    area_long: serviceProviderDetails.provider_long,
                    area_address:serviceProviderDetails.provider_address
                  }}
                />
              ) : null}
              {/* <!-- Reviews --> */}
              <Reviews
                rating_detail={serviceProviderDetails.rating_detail}
                latestReview={serviceProviderDetails.latestReview}
                rating={serviceProviderDetails.rating}
                provider_id={serviceProviderDetails.user_id}
              />
            </div>

            {/* <!-- Sidebar
            ================================================== --> */}
            <DetailSideBar
              name={serviceProviderDetails.full_name}
              email={serviceProviderDetails.email}
              phonenumber={serviceProviderDetails.mobile}
              profileImage={serviceProviderDetails.image}
              providertiming={serviceProviderDetails.providertiming}
              selectedServices={this.state.selectedServices}
              totalDuration={this.state.totalDuration}
            />
            {/* <!-- Sidebar / End --> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(ServiceDetailPage);

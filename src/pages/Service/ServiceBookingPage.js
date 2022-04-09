import React from "react";

import axios from "axios";
import { Loader } from "../../components/Loader";
import { Link, Redirect } from "react-router-dom";
import { Local_routes, ApiRoute } from "../../util/routes";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BookingSummary from "../../components/bookingsumary";
import CheckoutForm from "../../components/paymentform";
import { withTranslation } from "react-i18next";
class ServiceBookingPage extends React.Component {
  
  state = {
    price_type: null,
    provider_pre_book_percentage: null,
    provider_address:null,
    area_lat:null,
    area_long:null,
    servicecategory: null,
    serviceSubcategory: null,
    service_price: null,
    service_duration: 0,
    service_id: null,
    provider_id: null,
    forceRedirect: false,
    timeSlots: null,
    err: null,
    selectedSlot: null,
    ProviderPercentage: 0,
    provider_pre_booking_type:"",
    admin_charged_commission: 0,
    sitfastFee: 0,
    date: new Date(),
    dateChanges: false,
    ClosedDays: null,
    adminCommissionPercentage : 0,
    adminChargedFee: 0
  };

  //handle calander
  DateChange = async (date) => {
    await this.setState({
      date: date,
      err: null,
      timeSlots: null,
      selectedSlot: null,
      dateChanges: true,
    });

    //get timeslots
    this.getTimeStols(this.state.date);
  };
  //handle selected slot

  SeletcSlot = (slot) => {
    this.setState({ selectedSlot: slot });
  };

  async componentDidMount() {
    //get url params
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    var query = urlParams.get("query");

    if (query !== null) {
      let selectedserviceprice = 0;
      let selectedserviceduration = 0;
      this.props.location.state.services.map((service) => {
        selectedserviceprice += parseInt(service.price);
        selectedserviceduration += parseInt(service.duration);
      });

      localStorage.setItem("service_page__data_set", "set");
      localStorage.setItem(
        "provider_id",
        new Buffer(urlParams.get("U_id"), "base64").toString("ascii").trim()
      );
      localStorage.setItem(
        "service_id",
        new Buffer(urlParams.get("service_id"), "base64")
          .toString("ascii")
          .trim()
      );
      localStorage.setItem("servicecategory", urlParams.get("servicecategory"));
      localStorage.setItem(
        "serviceSubcategory",
        urlParams.get("serviceSubcategory")
      );
      localStorage.setItem("service_price", selectedserviceprice);
      localStorage.setItem("service_duration", selectedserviceduration);
      localStorage.setItem("price_type", urlParams.get("provider_pre_booking_type"));
      localStorage.setItem("provider_address", urlParams.get("provider_address"));
      localStorage.setItem("area_lat", urlParams.get("area_lat"));
      localStorage.setItem("area_long", urlParams.get("area_long"));
      localStorage.setItem(
        "provider_pre_book_percentage",
        urlParams.get("provider_pre_book_percentage")
      );
      localStorage.setItem("provider_pre_booking_type",urlParams.get("provider_pre_booking_type").trim())
      
    }
    //get local storage data
    if (localStorage.getItem("service_page__data_set") !== "set") {
      this.setState({ forceRedirect: true });
    } else {
      const provider_id = localStorage.getItem("provider_id");
      const service_id = localStorage.getItem("service_id");
      const servicecategory = localStorage.getItem("servicecategory");
      const serviceSubcategory = localStorage.getItem("serviceSubcategory");
      const service_price = localStorage.getItem("service_price");
      const service_duration = localStorage.getItem("service_duration");
      const price_type = localStorage.getItem("price_type");
      const provider_address = localStorage.getItem("provider_address");
      const area_lat = localStorage.getItem("area_lat");
      const area_long = localStorage.getItem("area_long");
      const provider_pre_book_percentage = localStorage.getItem(
        "provider_pre_book_percentage"
      );
      const provider_pre_booking_type = localStorage.getItem(
        "provider_pre_booking_type"
      ).trim();
   
      //set to  state
      await this.setState({
        provider_id,
        service_id,
        servicecategory,
        serviceSubcategory,
        service_price,
        service_duration,
        price_type,
        provider_address,
        area_lat,
        area_long,
        provider_pre_book_percentage,
        provider_pre_booking_type
      });
    }
    //get time slots
    //this.getTimeStols(this.state.date);
    this.getTimings();
  }
  //disable date
  disabeDate = (activeStartDate, date, view) => {
    for (let i = 0; i < this.state.ClosedDays.length; i++) {
      if (date.getDay() == this.state.ClosedDays[i]) {
        return true;
      }
    }
  };
  //get Timings
  getTimings = () => {
    var bodyFormData = new FormData();
    var disabledDaysNumbers = [];
    bodyFormData.append("freelancer_id", parseInt(this.state.provider_id));
    axios
      .post(ApiRoute.getServiceProviderTimings, bodyFormData)
      .then(async (res) => {
        
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].is_available == "0") {
            if (res.data.data[i].current_day == "Monday") {
              disabledDaysNumbers.push(1);
            }
            if (res.data.data[i].current_day == "Tuesday") {
              disabledDaysNumbers.push(2);
            }
            if (res.data.data[i].current_day == "Wednesday") {
              disabledDaysNumbers.push(3);
            }
            if (res.data.data[i].current_day == "Thursday") {
              disabledDaysNumbers.push(4);
            }
            if (res.data.data[i].current_day == "Friday") {
              disabledDaysNumbers.push(5);
            }
            if (res.data.data[i].current_day == "Saturday") {
              disabledDaysNumbers.push(6);
            }
            if (res.data.data[i].current_day == "Sunday") {
              disabledDaysNumbers.push(0);
            }
          }
        }

        this.setState({ ClosedDays: disabledDaysNumbers });
        await this.setState({adminCommissionPercentage : res.data.admin_commission_percentage})
        await this.setState({adminChargedFee : res.data.admin_charged_fee})
        localStorage.setItem(
          "admin_charged_fee",
          res.data.admin_charged_fee
        );
        localStorage.setItem(
          "admin_commission_percentage",
          res.data.admin_commission_percentage
        );
      })
      .catch((err) => {
        this.setState({ err: err });
      });
  };
  //get arranged date
  getArrangedDate = (date) => {
    var today = new Date(date);

    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    return date;
  };
  //get Times Slots
  getTimeStols = async (date) => {
    const { provider_id, service_id } = this.state;
    var bodyFormData = new FormData();
    bodyFormData.append("provider_id", parseInt(provider_id));
    bodyFormData.append("durations", localStorage.getItem("service_duration"));
    bodyFormData.append("date", await this.getArrangedDate(date));
    
    axios
      .post(ApiRoute.ProviderTimeSlots, bodyFormData)
      .then((res) => {
      
        if (res.data.error == 1) {
          this.setState({ err: res.data.message });
        } else {
          if (res.data.data.response) {
            this.setState({ timeSlots: res.data.data.times });
          } else {
            this.setState({ err: res.data.data.times });
          }
        }
      })
      .catch((err) => {
        this.setState({ err: err });
      });
  };

  //calculate the
  calculateDipositAmount = () => {
    let ProviderPercentage =0;
    if(this.state.provider_pre_booking_type=="fixed"){
     
      ProviderPercentage =this.state.provider_pre_book_percentage
      
    }
    else{
      ProviderPercentage =
      (parseFloat(this.state.service_price) / 100) *
      parseFloat(this.state.provider_pre_book_percentage);
    }
    //this.setState({ ProviderPercentage: ProviderPercentage });
    return parseFloat(ProviderPercentage);
  };
  //calculate sit fast fee

  calculateSitfastfee = () => {
    let admin_commission_percentage = localStorage.getItem("admin_commission_percentage") === ' ' ? this.state.adminCommissionPercentage : localStorage.getItem("admin_commission_percentage");
    let admin_charged_fee = localStorage.getItem("admin_charged_fee") === ' ' ? this.state.adminChargedFee : localStorage.getItem("admin_charged_fee");
    const admin_charged_commission = (this.calculateDipositAmount() / 100) *parseFloat(admin_commission_percentage);
    //   localStorage.getItem("admin_commission_percentage")
    //this.setState({ admin_charged_commission: admin_charged_commission });
    const sitfastFee = admin_charged_commission + parseFloat(admin_charged_fee);
    //  localStorage.getItem("admin_charged_fee")
    //this.setState({ sitfastFee: sitfastFee });
    return sitfastFee;
  };

  // calculate admin_charged_commission
  admin_charged_commission = () => {
    const admin_charged_commission = (this.calculateDipositAmount() / 100) * 4;
    return admin_charged_commission;
  };
  render() {
    const { t } = this.props;
    const {
      provider_id,
      service_id,
      timeSlots,
      forceRedirect,
      err,
    } = this.state;
  
    if (forceRedirect) {
      return <Redirect to={Local_routes.home} />;
    }
    if (localStorage.getItem("userData") == null) {
      return <Redirect to={Local_routes.home} />;
    }
    return (
      <React.Fragment>
        <div id="titlebar">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 style={{color:"#37517e"}}>{t("servicebookingpage.booking")}</h2>

                {/* <!-- Breadcrumbs --> */}
                <nav id="breadcrumbs">
                  <ul>
                    <li>
                      <Link
                        to={{
                          pathname: Local_routes.detail,
                          search: new Buffer(`&query=${true}&U_id=
             ${provider_id}`).toString("base64"),
                        }}
                      >
                        {t("servicebookingpage.services")}
                      </Link>
                    </li>
                    <li>{t("servicebookingpage.booking")}</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* // <!-- Content
    // ================================================== -->
    
    // <!-- Container --> */}
        <div className="container">
          <div className="row">
            {/* <!-- Content
            ================================================== --> */}
            
            <div className=" col-md-12 padding-right-30">
              <h3 className="margin-top-0 margin-bottom-30">
                {t("servicebookingpage.selectdateandtime")}
              </h3>
              {this.state.ClosedDays == null ? (
                <Loader Title={t("alerts.loading")} />
              ) : (
                <Calendar
                  onChange={(date) => this.DateChange(date)}
                  minDate={new Date()}
                  value={this.state.date}
                  tileDisabled={({ activeStartDate, date, view }) =>
                    this.disabeDate(activeStartDate, date, view)
                  }
                />
              )}
              <div
                className="timeslotcontainer col-lg-12 margin-bottom-30"
                style={{ marginTop: "2rem" }}
              >
                {this.state.dateChanges ? (
                  timeSlots == null && err == null ? (
                    <Loader Title={t("servicebookingpage.loadinftimeslot")} />
                  ) : err !== null ? (
                    <div className="col-md-12">
                      <h3 style={{ width: "100%", textAlign: "center" }}>
                        {t("servicebookingpage.noslot")}
                      </h3>
                    </div>
                  ) : (
                    timeSlots.map((time, index) => {
                      if (time.status == "Available") {
                        return (
                          <div
                            className="col-md-2 timeslot"
                            style={{ marginBottom: "1rem" }}
                            key={index}
                          >
                            <button
                              className={
                                this.state.selectedSlot == time.slot
                                  ? "timeslotbutton_active"
                                  : "timeslotbutton"
                              }
                              style={{ width: "100%", borderRadius: "0px" }}
                              onClick={() => this.SeletcSlot(time.slot)}
                            >
                              {time.slot}
                            </button>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })
                  )
                ) : null}
              </div>
            </div>
              </div>
              </div>


              <div className="container">
            {/* <div
              className="pricing-list-container"
              style={{ backgroundColor: "#f8f8f8" }}
            >
              <ul>
                <li>
                  <h5> {t("servicebookingpage.athhead")}</h5>
                  <p> {t("servicebookingpage.athdesc")}</p>
                  <p> {t("servicebookingpage.athdesc1")}</p>
                </li>
              </ul>
            </div> */}
            <div className="notification error closeable">
				<p><span>{t("servicebookingpage.athhead")}!</span> {t("servicebookingpage.athdesc")}<br/> {t("servicebookingpage.athdesc1")}</p>
				<a className="close" href="#"></a>
			</div>
 
          <div className="row">

            {/* <!-- Sidebar
            ================================================== --> */}
            
            <BookingSummary
              selectedSlot={this.state.selectedSlot}
              date={this.getArrangedDate(this.state.date)}
              service_duration={this.state.service_duration}
              service_price={this.state.service_price}
              service_subcategory={this.state.serviceSubcategory}
              depositAmount={this.calculateDipositAmount()}
              sitfastFee={this.calculateSitfastfee()}
              provider_pre_booking_type={this.state.provider_pre_booking_type}
              selectedService={this.props.location.state.services}
            />
            <CheckoutForm
              provider_id={this.state.provider_id}
              service_duration={this.state.service_duration}
              service_price={this.state.service_price}
              service_id={this.state.service_id}
              selectedService={this.props.location.state.services}
              date={this.getArrangedDate(this.state.date)}
              selectedSlot={this.state.selectedSlot}
              price_type={this.state.price_type}
              duration={this.state.service_duration}
              total_hour={this.state.service_duration}
              
              depositAmount={this.calculateDipositAmount()}
              sitfastFee={this.calculateSitfastfee()}
              area_long={this.state.area_long}
              area_lat={this.state.area_lat}
              provider_address={this.state.provider_address}
              admin_charged_commission={this.admin_charged_commission()}
              service_type={0}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(ServiceBookingPage);

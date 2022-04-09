import React from "react";
import SideBar from "../../components/SideBar";
import { withTranslation } from "react-i18next";
import { ApiRoute } from "../../util/routes";
import axios from "axios";
import { Message } from "../../components/Message";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooglesidebar: false,
      apiResData: "",
      bookingData: null,
      err: null,
    };
  }

  toogleSideBar = () => {
    this.setState({ tooglesidebar: !this.state.tooglesidebar });
  };

  componentDidMount() {
    this.dashboardData();
    this.bookingGet();
  }

  dashboardData() {
    var userData = JSON.parse(localStorage.getItem("userData"));

    var bodyFormData = new FormData();

    bodyFormData.append("customer_id", userData.data.data.user_id);
    axios
      .post(ApiRoute.getCustomerDashboardData, bodyFormData)
      .then((res) => {
        this.setState({ apiResData: res.data });
      })
      .catch((err) => {
        // this.setState({ err: err });
      });
  }

  bookingGet() {
    var userData = JSON.parse(localStorage.getItem("userData"));
    var bodyFormData = new FormData();

    bodyFormData.append("customer_id", userData.data.data.user_id);
    axios
      .post(ApiRoute.UserSideBookingRecieved, bodyFormData)
      .then((res) => {
        let ResponseArray = res.data.data;
        let sortedArray = [];
        for (let i = ResponseArray.length - 1; i >= 0; i--) {
          sortedArray.push(ResponseArray[i]);
        }

        this.setState({ bookingData: { data: sortedArray } });
      })
      .catch((err) => {
        this.setState({ err: err });
      });
  }

  render() {
    const { t } = this.props;
    var userData = JSON.parse(localStorage.getItem("userData"));
    const { bookingData, err } = this.state;

    return (
      <div id="wrapper" className="dashboardMargin">
        <a
          onClick={() => this.toogleSideBar()}
          className="dashboard-responsive-nav-trigger"
        >
          <i className="fa fa-reorder"></i> {t("dashboard.dasboardNavigation")}
        </a>

        <SideBar tooglesidebar={this.state.tooglesidebar} />

        <div className="dashboard-content">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="dashboard-stat welcomeCard">
                <div className="dashboard-stat-content ">
                  <h5>{t("dashboard.welcome")}</h5>
                  <span>
                    {userData.data.data.first_name +
                      " " +
                      userData.data.data.last_name}
                  </span>
                </div>
                <div className="welcomBadge">
                  <img src="./images/badge.svg" alt="badge" />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="dashboard-stat color-1">
                <div className="dashboard-stat-content">
                  <h4>
                    {this.state.apiResData.data !== undefined
                      ? this.state.apiResData.data.total_booking
                      : "0"}
                  </h4>{" "}
                  <span>{t("dashboard.totalbookings")}</span>
                </div>
                <div className="dashboard-stat-icon">
                  <i className="im im-icon-Calendar"></i>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="dashboard-stat color-3">
                <div className="dashboard-stat-content">
                  <h4>
                    {" "}
                    {this.state.apiResData.data !== undefined
                      ? this.state.apiResData.data.total_reviews
                      : "0"}
                  </h4>{" "}
                  <span>{t("dashboard.totalReview")}</span>
                </div>
                <div className="dashboard-stat-icon">
                  <i className="im im-icon-Add-UserStar"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="dashboard-list-box margin-top-0">
                <h4>{t("dashboard.bookingrequests")}</h4>
                <ul>
                  {bookingData === null ? (
                    <></>
                  ) : bookingData.error == "1" ? (
                    <Message MessageDescription={t("alerts.nothingFound")} />
                  ) : (
                    bookingData.data.map((data, index) => {
                      return (
                        <li className="pending-booking" key={index}>
                          <div className="list-box-listing bookings">
                            <div
                              className="list-box-listing-img"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div className="BookingCardImg">
                                <span>
                                  {data.user_image ==
                                  "https://secure.sitfast.app/Salons/App/upload/" ? (
                                    <img
                                      style={{ width: "1-0%", height: "100%" }}
                                      src="./images/userAvtar.webp"
                                      alt=""
                                    />
                                  ) : (
                                    <img
                                      style={{ width: "1-0%", height: "100%" }}
                                      src={data.user_image}
                                      alt=""
                                    />
                                  )}
                                </span>
                              </div>
                              {/* <img src={data.user_image!=="https://secure.sitfast.app/Salons/App/upload/"?data.user_image:"./images/userAvtar.webp"}  alt=""  /> */}
                            </div>
                            <div className="list-box-listing-content bookingContainer">
                              <div className="inner">
                                <h3>
                                  {data.full_name}{" "}
                                  <span
                                    className={`booking-status  ${
                                      data.order_status == "0"
                                        ? "pending"
                                        : "orderCompleted"
                                    } bookingStatus`}
                                  >
                                    <i
                                      className={`sl sl-icon-${
                                        data.approve_status == "0"
                                          ? "clock"
                                          : "check"
                                      }`}
                                    ></i>
                                    {data.approve_status == "0"
                                      ? t("dashboard.pending")
                                      : data.order_status == "0"
                                      ? t("dashboard.accepted")
                                      : t("dashboard.completed")}
                                  </span>
                                </h3>

                                <div className="inner-booking-list">
                                  <h5>{t("dashboard.orderId")}:</h5>
                                  <ul className="booking-list">
                                    <li className="highlighted">
                                      #{data.order_id}
                                    </li>
                                  </ul>
                                </div>
                                <div className="inner-booking-list">
                                  <h5>{t("dashboard.bookinguser")}:</h5>
                                  <ul className="booking-list">
                                    <li className="highlighted">
                                      {data.user_type}
                                    </li>
                                  </ul>
                                </div>

                                <div className="inner-booking-list">
                                  <h5>{t("dashboard.bookingdate")}:</h5>
                                  <ul className="booking-list">
                                    <li className="highlighted">
                                      {data.date} - {data.time}
                                    </li>
                                  </ul>
                                </div>

                                <div className="inner-booking-list">
                                  <h5>{t("dashboard.freelanceremail")}:</h5>
                                  <ul className="booking-list">
                                    <li className="highlighted">
                                      {" "}
                                      {data.provider_email}
                                    </li>
                                  </ul>
                                </div>
                                <div className="inner-booking-list">
                                  <h5>{t("dashboard.location")}:</h5>
                                  <ul className="booking-list">
                                    <li className="highlighted">
                                      {data.order_address}
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="inner innerRight">
                                <h3></h3>
                                <div className="inner-booking-list">
                                  <h5>{t("dashboard.paymentmode")}:</h5>
                                  <ul className="booking-list">
                                    <li className="highlighted">
                                      {data.payment_mode}
                                    </li>
                                  </ul>
                                </div>

                                <div className="inner-booking-list">
                                  <h5>{t("dashboard.reservatinfees")}:</h5>
                                  <ul className="booking-list">
                                    <li className="highlighted">
                                      ${data.reservation_fees}
                                    </li>
                                  </ul>
                                </div>

                                <div className="inner-booking-list">
                                  <h5>
                                    {t("dashboard.freelancerphonenumber")}:
                                  </h5>
                                  <ul className="booking-list">
                                    <li className="highlighted">
                                      {data.freelancer_mobile_number}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row col-12">
                            <div className="list-box-listing-content bookingContainer">
                              <div className="inner-booking-list">
                                <div className="col-12">
                                  <h5>{t("dashboard.bookingdetail")}:</h5>
                                </div>
                                <ul className="booking-list">
                                  {data.service.map((data2, index) => {
                                    return (
                                      <div>
                                        <li className="highlighted" key={index}>
                                          {data2.sub_category}
                                        </li>
                                        &nbsp;&nbsp;<h5>{t("dashboard.serviceprice")}:</h5>
                                        <li className="highlighted" key={index}>
                                          ${data2.price}
                                        </li>
                                        &nbsp;&nbsp;<h5>{t("servicebookingpage.durtion")}:</h5>
                                        <li className="highlighted" key={index}>
                                          {data2.total_hour} mins
                                        </li>
                                      </div>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Dashboard);

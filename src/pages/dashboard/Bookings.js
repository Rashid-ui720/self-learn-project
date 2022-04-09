import React from "react";
import SideBar from "../../components/SideBar";
import { ApiRoute } from "../../util/routes";
import axios from "axios";
import { ErrorComp } from "../../components/Error";
import { Loader } from "../../components/Loader";
import { withTranslation } from "react-i18next";
import { Message } from "../../components/Message";
class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      bookingData: null,
      tooglesidebar: false,
    };
  }

  toogleSideBar = () => {
    this.setState({ tooglesidebar: !this.state.tooglesidebar });
  };
  componentDidMount() {
    this.getHomePageServices();
  }

  getHomePageServices() {
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
    const { bookingData, err } = this.state;
    const { t } = this.props;

    // error
    if (err != null) {
      return <ErrorComp errorDescription={t("alerts.unexpectederror")} />;
    }

    // Loader
    if (bookingData == null) {
      return <Loader Title={t("alerts.loading")} />;
    }

    return (
      <div id="wrapper" className="dashboardMargin">
        <a
          onClick={() => this.toogleSideBar()}
          className="dashboard-responsive-nav-trigger"
        >
          <i className="fa fa-reorder"></i> {t("dashboard.dasboardNavigation")}
        </a>

        <SideBar tooglesidebar={this.state.tooglesidebar} />
        <div>
          <div className="dashboard-content">
            {/* <div id="titlebar">
              <div className="row">
                <div className="col-md-12">
                  <h2>{t("dashboard.bookings")}</h2>
                </div>
              </div>
            </div> */}

            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="dashboard-list-box margin-top-0">
                  {/* <div className="booking-requests-filter">
                    <div className="sort-by">
                      <div className="sort-by-select">
                        <select
                          data-placeholder="Default order"
                          className="chosen-select-no-single"
                        >
                          <option>All Listings</option>
                          <option>Burger House</option>
                          <option>Tom's Restaurant</option>
                          <option>Hotel Govendor</option>
                        </select>
                      </div>
                    </div>

                    <div id="booking-date-range">
                      <span></span>
                    </div>
                  </div> */}

                  <div id="small-dialog" className="zoom-anim-dialog mfp-hide">
                    <div className="small-dialog-header">
                      <h3>Send Message</h3>
                    </div>
                    <div className="message-reply margin-top-0">
                      <textarea
                        cols="40"
                        rows="3"
                        placeholder="Your Message to Kathy"
                      ></textarea>
                      <button className="button">Send</button>
                    </div>
                  </div>

                  <h4>{t("dashboard.bookingrequests")}</h4>
                  <ul>
                    {bookingData.error == "1" ? (
                      <Message MessageDescription={t("alerts.nothingFound")} />
                    ) : (
                      bookingData.data.map((data, index) => {
                        return (
                          <li className="pending-booking" key={index}>
                            <div className="list-box-listing bookings">
                              <div
                                className="list-box-listing-img"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div className="BookingCardImg">
                                  <span>
                                    {data.user_image ==
                                    "https://secure.sitfast.app/Salons/App/upload/" ? (
                                      <img
                                        style={{
                                          width: "1-0%",
                                          height: "100%",
                                        }}
                                        src="./images/userAvtar.webp"
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        style={{
                                          width: "1-0%",
                                          height: "100%",
                                        }}
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
                                    {data.full_name}
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
                                    <h5>{t("dashboard.location")}:</h5>
                                    <ul className="booking-list">
                                      <li className="highlighted">
                                        {data.order_address}
                                      </li>
                                    </ul>
                                  </div>
                                  {/* <div className="inner-booking-list">
                                  <h5>{t("dashboard.reservation")}:</h5>
                                  <ul className="booking-list">
                                    <li className="highlighted">
                                      ${data.reservation_fees}
                                    </li>
                                  </ul>
                                </div> */}

                                  {/* <div className="inner-booking-list">
                                  <h5>Client:</h5>
                                  <ul className="booking-list">
                                    <li>John Smith</li>
                                    <li>john@example.com</li>
                                    <li>123-456-789</li>
                                  </ul>
                                </div>

                                <a
                                  href="#small-dialog"
                                  className="rate-review popup-with-zoom-anim"
                                >
                                  <i className="sl sl-icon-envelope-open"></i>{" "}
                                  Send Message
                                </a> */}
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
                                    <h5>{t("dashboard.freelanceremail")}:</h5>
                                    <ul className="booking-list">
                                      <li className="highlighted">
                                        {" "}
                                        {data.provider_email}
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
                            {/* <div className="buttons-to-right">
                            <a href="#" className="button gray reject">
                              <i className="sl sl-icon-close"></i> Reject
                            </a>
                            <a href="#" className="button gray approve">
                              <i className="sl sl-icon-check"></i> Approve
                            </a>
                          </div> */}
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
      </div>
    );
  }
}

export default withTranslation()(Bookings);

import React from "react";
import { Link } from "react-router-dom";
import { Local_routes } from "../util/routes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContent } from "../components/Toast";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { withTranslation } from "react-i18next";
import ServiceElement from "./ServiceElement";
class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activeTab2: false,
      activeTab1: true,
      userData: null,
      showDescription: false,
      selectedIndex: null,
      selectedServices: [],
      totalDuration: 0,
      showBookBtn: false
    };
  }
  //toogle how description
  toogleshwoDescripton = (index) => {
    this.setState({
      showDescription: !this.state.showDescription,
      selectedIndex: index,
    });
  };
  componentDidMount() {
    const user_data = JSON.parse(localStorage.getItem("userData"));

    this.setState({ userData: user_data });
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  ShowLoginMessage = () => {
    const { t } = this.props;
    this.onOpenModal();
    toast.dismiss();
    toast(() => ToastContent(t("alerts.sigininmessgae")), {
      toastId: "infoToast",
      hideProgressBar: true,
      type: toast.TYPE.INFO,
      autoClose: 2000,
    });
  };

  getSelectedServices = (servicesarray, totalduration) => {
    if(servicesarray.length > 0){
      this.setState({showBookBtn : true})
    }else{
      this.setState({showBookBtn : false})
    }
    this.setState({
      selectedServices: servicesarray,
      totalDuration: totalduration,
    });
    this.props.getSelectedServicesFromServiceElement(servicesarray , totalduration)
  };

  render() {
    const { t } = this.props;
    const {
      services,
      provider_id,
      provider_pre_book_percentage,
      provider_pre_booking_type,
    } = this.props;
    const { activeTab1, activeTab2 } = this.state;
    return (
      <div id="listing-pricing-list" className="listing-section">
        <h3 className="listing-desc-headline  margin-bottom-30">
          {t("detailpage.services")}
        </h3>

        <div className="">
          <div className="pricing-list-container">
            {/* <!-- Food List --> */}
            {/* <h4>{services[0].category}</h4> */}
            <ul>
              {services.length == 0 ? (
                <li>
                  <h5> {t("detailpage.noservice")}</h5>
                </li>
              ) : (
                services.map((service, index) => {
                  return (
                    <ServiceElement
                      ShowLoginMessage={this.ShowLoginMessage}
                      service={service}
                      key={index}
                      userData={this.state.userData}
                      provider_id={provider_id}
                      provider_pre_book_percentage={
                        provider_pre_book_percentage
                      }
                      provider_address={this.props.provider_address}
                      area_lat={this.props.area_lat}
                      area_long={this.props.area_long}
                      provider_pre_booking_type={provider_pre_booking_type}
                      getSelectedServices={(servicesarray, totalduration) =>
                        this.getSelectedServices(servicesarray, totalduration)
                      }
                    />
                    //       <li key={index}>
                    //         <div className="serviceLeftContent">

                    //          <div className="ServiceImage">
                    //       <img
                    //         style={{ width: "1-0%", height: "100%" }}
                    //         src="./images/userAvtar.webp"
                    //         alt=""
                    //       />
                    // </div>

                    //        <div className="serviceLeftInfo">
                    //         <h5>{service.sub_category}</h5>
                    //         <p className={this.state.showDescription && this.state.selectedIndex==index?"":"serviceDescription"}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    //         <small className="showorlessbutton" onClick={()=>this.toogleshwoDescripton(index)}>{this.state.showDescription && this.state.selectedIndex==index?t("detailpage.showless"):t("detailpage.showmore")}</small>
                    //         </div>
                    //         </div>
                    //         <span
                    //           style={{
                    //             display: "flex",
                    //             alignItems: "center",
                    //             justifyContent: "center",
                    //             flexDirection: "row",
                    //           }}
                    //           className="MobileViewServicePrice"
                    //         >
                    //           <div
                    //             style={{
                    //               display: "flex",
                    //               alignItems: "center",
                    //               justifyContent: "center",
                    //               flexDirection: "column",
                    //               marginRight: "16px",
                    //             }}
                    //             className="MobileViewServicePriceRow"
                    //           >
                    //             <p style={{ textAlign: "center", fontWeight: "700" }}>
                    //               {service.price}$
                    //             </p>
                    //             <p
                    //               style={{
                    //                 textAlign: "flex-end",
                    //                 fontSize: "14px",
                    //               }}
                    //               className="serviceTiemMobile"
                    //             >
                    //               {service.duration}min
                    //             </p>
                    //           </div>

                    //           {this.state.userData == null ? (
                    //             <a
                    //               onClick={() => this.ShowLoginMessage()}
                    //               style={{ marginTop: "0rem" }}
                    //               className="send-message-to-owner button popup-with-zoom-anim"
                    //             >
                    //               {t("detailpage.booknow")}
                    //             </a>
                    //           ) : (
                    //             <Link
                    //               to={{
                    //                 pathname: Local_routes.bookService,
                    //                 search: `&query=${true}&U_id= ${new Buffer(
                    //                   provider_id
                    //                 ).toString("base64")}&service_id=${new Buffer(
                    //                   service.id
                    //                 ).toString("base64")}&servicecategory=${
                    //                   service.category
                    //                 }&serviceSubcategory=${
                    //                   service.sub_category
                    //                 }&service_price=${service.price}&duration=${
                    //                   service.duration
                    //                 }&price_type=${
                    //                   service.pricetype
                    //                 }&provider_pre_book_percentage=${provider_pre_book_percentage}
                    //                 &provider_address=${this.props.provider_address}
                    //                 &area_lat=${this.props.area_lat}
                    //                 &area_long=${this.props.area_long}`,
                    //               }}
                    //               style={{ marginTop: "0rem" }}
                    //               className="send-message-to-owner button popup-with-zoom-anim"
                    //             >
                    //               {t("detailpage.booknow")}
                    //             </Link>
                    //           )}
                    //         </span>
                    //       </li>
                  );
                })
              )}
            </ul>
            <div className="" style={{textAlign:"right"}}>
              {this.state.showBookBtn === true ? 
                this.state.userData == null ? (
                  <a
                    onClick={() => this.props.ShowLoginMessage()}
                    style={{ marginTop: "0rem" }}
                    className="send-message-to-owner button popup-with-zoom-anim"
                  >
                    {t("detailpage.booknow")}
                  </a>
                ) : (
                  
                  <Link
                    to={{
                      pathname: Local_routes.bookService,
                      state: { services:this.state.selectedServices },
                      search:`&query=${true}&U_id=${new Buffer(
                        provider_id
                      ).toString("base64")}&service_id=${new Buffer(
                        this.state.selectedServices
                      ).toString(
                        "base64"
                      )}&duration=${this.state.totalDuration}&provider_pre_book_percentage=${provider_pre_book_percentage}&provider_pre_booking_type=${provider_pre_booking_type}&provider_address=${this.props.provider_address}&area_lat=${this.props.area_lat}&area_long=${this.props.area_long}`,
                    }}
                    style={{ marginTop: "0rem" , padding:"12px 40px" , textAlign:"right" }}
                    className="send-message-to-owner button popup-with-zoom-anim"
                  >
                    {t("detailpage.booknow")}
                  </Link>
                )
              :
              <small>Please select any service for further processs</small> 
              }
            </div>
          </div>
        </div>
        <Modal center open={this.state.open} onClose={this.onCloseModal}>
          <div className="zoom-anim-dialog">
            {/* <!--Tabs --> */}
            <div className="sign-in-form">
              <ul className="tabs-nav" style={{ marginTop: "10%" }}>
                <li className="">
                  <a
                    onClick={() =>
                      this.setState({
                        activeTab1: !activeTab1,
                        activeTab2: false,
                      })
                    }
                    style={
                      !activeTab1
                        ? {
                            fontSize: 20,
                            cursor: "pointer",
                          }
                        : {
                            fontSize: 20,
                            cursor: "pointer",
                            color: "#7AC3EC",
                            borderBottomColor: "#7AC3EC",
                          }
                    }
                  >
                    {t("form.login")}
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      this.setState({
                        activeTab2: !activeTab2,
                        activeTab1: false,
                      })
                    }
                    style={
                      !activeTab2
                        ? {
                            fontSize: 20,
                            cursor: "pointer",
                          }
                        : {
                            fontSize: 20,
                            cursor: "pointer",
                            color: "#7AC3EC",
                            borderBottomColor: "#7AC3EC",
                          }
                    }
                  >
                    {t("form.register")}
                  </a>
                </li>
              </ul>

              <div className="tabs-container alt">
                {activeTab2 ? <Register /> : <Login />}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withTranslation()(Services);

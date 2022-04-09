import React from "react";
import { withTranslation } from "react-i18next";
import SelectedServiceComponent from "./SelectedServiceComponent"
class DetailSideBar extends React.Component {
  //render method
  render() {
    const {
      name,
      email,
      phonenumber,
      profileImage,
      providertiming,
      t,
    } = this.props;
    return (
      <div className="col-lg-4 col-md-4 margin-top-75 sticky">
        {/* <!-- Verified Badge --> */}
        {/* <div
          className="verified-badge with-tip"
          data-tip-content="Listing has been verified and belongs the business owner or manager."
        >
          <i className="sl sl-icon-check"></i> {t("detailpage.verifiedlisting")}
        </div> */}

        {/* <!-- Opening hours Now --> */}
        <div
          className="boxed-widget opening-hours margin-top-35"
          style={{ zIndex: 1 }}
        >
          {/* <div className="listing-badge now-open">Now Open</div> */}
          <h3>
            <i className="sl sl-icon-clock"></i> {t("detailpage.openinghours")}
          </h3>
          <ul>
            {providertiming.map((time, index) => {
              return (
                <li key={index}>
                  {time.current_day}{" "}
                  {time.is_available == 0 ? (
                    <span>Closed</span>
                  ) : (
                    <span>
                      {time.barber_start_time} - {time.barber_end_date}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        {/* <!-- Panel Dropdown --> */}

        {/* <!-- Opening hours Now / End --> */}
        {/* Selected Service Area */}
        { this.props.selectedServices.length > 0 ?
          <SelectedServiceComponent 
            selectedServices={this.props.selectedServices}
            totalDuration={this.props.totalDuration}
          />
          : null
        }
        {/* <!-- Contact --> */}
        <div
          className="boxed-widget margin-top-35"
          style={{ zIndex: 1, marginBottom: "3rem" }}
        >
          <div className="hosted-by-title">
            <span>
              <h4>{name}</h4>
            </span>
            <div className="profileCardImg" style={{position:"absolute",right:"0px",top:"-8px"}}>
                <span>
                  {profileImage ==
                  "https://secure.sitfast.app/Salons/App/upload/" ? (
                    <img
                      style={{ width: "1-0%", height: "100%" }}
                      src="./images/userAvtar.webp"
                      alt=""
                    />
                  ) : (
                    <img
                      style={{ width: "1-0%", height: "100%" }}
                      src={profileImage}
                      alt=""
                    />
                  )}
                </span>
               
              </div>
            {/* <a  className="hosted-by-avatar" >
              <img src={profileImage!=="https://secure.sitfast.app/Salons/App/upload/"?profileImage:'./images/userAvtar.webp'} alt="" />
            </a> */}
          </div>
          <ul className="listing-details-sidebar">
            <li>
              <i className="sl sl-icon-phone"></i>
              <a href={`tel:${phonenumber}`}>{phonenumber}</a>
            </li>

            <li>
              <i className="fa fa-envelope-o"></i>{" "}
              <a href={`mailto: ${email}`}>{email}</a>
            </li>
          </ul>
        </div>

        {/* <!-- Contact / End--> */}
      </div>
    );
  }
}

export default withTranslation()(DetailSideBar);

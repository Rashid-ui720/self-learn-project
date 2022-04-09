import React from "react";
import { Link } from "react-router-dom";
import { Local_routes } from "../util/routes";

import { withTranslation } from "react-i18next";

let servicesarray = [];
let totalduration = 0;
class ServiceElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: false,
    };
  }

  //toogle how description
  toogleshwoDescripton = () => {
    this.setState({ showDescription: !this.state.showDescription });
  };

  addSelectedService = (service) => {
    var match = false;
    var rowindex = 0;
    if (servicesarray.length === 0) {
      servicesarray.push(service);
      totalduration += parseInt(service.duration);
    } else {
      servicesarray.map((oldservice, index) => {
        if (oldservice.id === service.id) {
          match = true;
          rowindex = index;
        }
      });

      if (match) {
        servicesarray.splice(rowindex, 1);
        totalduration -= parseInt(service.duration);
      } else {
        servicesarray.push(service);
        totalduration += parseInt(service.duration);
      }
    }

    this.props.getSelectedServices(servicesarray , totalduration)
  };
  
  render() {
    const { t } = this.props;
    const {
      service,
      provider_id,
      provider_pre_book_percentage,
      provider_pre_booking_type,
    } = this.props;
    return (
      <li key={this.props.key} className="ServiceMobileView">
        <div className="serviceLeftContent">
          <div class="round-checkbox">
            <input
              type="checkbox"
              id={`${"checkbox_" + service.id}`}
              onClick={() => this.addSelectedService(service)}
            />
            <label for={`${"checkbox_" + service.id}`}></label>
          </div>
          {/* <div className="ServiceImage">
            <img
              style={{ width: "1-0%", height: "100%" }}
              src={
                service.image == null ||
                service.image ===
                  "https://secure.sitfast.app/Salons/App/serviceimage/" ||
                service.image ===
                  "https://admin.sitfastapp.com/upload/" ||
                service.image ===
                  "https://admin.sitfastapp.com/serviceimage/"
                  ? "./images/service_default.png"
                  : service.image
              }
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "images/service_default.png";
              }}
            />
          </div> */}

          <div
            className={`serviceLeftInfo ${
              service.description == "" ? "withNodescriotion" : ""
            }`}
          >
            <h5>{service.sub_category}</h5>
            {service.description == "" ? null : (
              <>
                <p
                  className={
                    this.state.showDescription ? "" : "serviceDescription"
                  }
                >
                  {service.description}
                </p>
                <small
                  className="showorlessbutton"
                  onClick={() => this.toogleshwoDescripton()}
                >
                  {this.state.showDescription
                    ? t("detailpage.showless")
                    : t("detailpage.showmore")}
                </small>
              </>
            )}
          </div>
        </div>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
          className="MobileViewServicePrice"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginRight: "16px",
            }}
            className="MobileViewServicePriceRow"
          >
            <p style={{ textAlign: "center", fontWeight: "700" }}>
              {service.price}$
            </p>
            <p
              style={{
                textAlign: "flex-end",
                fontSize: "14px",
              }}
              className="serviceTiemMobile"
            >
              {service.duration}min
            </p>
          </div>

          {/* {this.props.userData == null ? (
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
                search: `&query=${true}&U_id= ${new Buffer(
                  provider_id
                ).toString("base64")}&service_id=${new Buffer(
                  service.id
                ).toString("base64")}&servicecategory=${
                  service.category
                }&serviceSubcategory=${service.sub_category}&service_price=${
                  service.price
                }&duration=${service.duration}&price_type=${
                  service.pricetype
                }&provider_pre_book_percentage=${provider_pre_book_percentage}
                              &provider_pre_booking_type=${provider_pre_booking_type}
                              &provider_address=${this.props.provider_address}
                              &area_lat=${this.props.area_lat}
                              &area_long=${this.props.area_long}`,
              }}
              style={{ marginTop: "0rem" }}
              className="send-message-to-owner button popup-with-zoom-anim"
            >
              {t("detailpage.booknow")}
            </Link>
          )} */}
        </span>
      </li>
    );
  }
}

export default withTranslation()(ServiceElement);

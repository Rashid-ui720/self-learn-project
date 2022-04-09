import React from "react";
import { Link } from "react-router-dom";
import { Local_routes } from "../util/routes";
import { withTranslation } from "react-i18next";
class SelectedServiceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: false,
    };
  }
  render() {
    return (
      <div
        className="boxed-widget margin-top-35"
        style={{ zIndex: 1, marginBottom: "3rem" }}
      >
        {this.props.selectedServices.map((service) => {
          return (
            <div className="hosted-by-title" style={{padding:"0px" , paddingBottom:"5px"}}>
              <span>
                <h4 style={{marginLeft:"35px"}}>{service.sub_category}</h4>
                <span style={{marginLeft:"35px"}}>${service.price}</span>
                <span style={{marginLeft:"35px" , float:"right"}}>{service.duration} mins</span>
              </span>
              <div
                className="profileCardImg"
                style={{ position: "absolute", left: "20px", top: "0px" }}
              >
                <span>
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
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withTranslation()(SelectedServiceComponent);

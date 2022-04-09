import React from "react";
import { Link, withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

class ManageClients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t } = this.props;
    return (
      <div id="wrapper">
        <div id="static-content" className="sticky-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <img
                  style={{ marginRight: "15%", width: "90%" }}
                  src="./images/static1.webp"
                />
              </div>

              <div className="col-md-3">
                {/* <img style={{ marginRight: '15%', width: '90%' }} src="./images/staticimg2.jpg" /> */}
              </div>

              <div
                className="col-md-4"
                style={{ color: "#9F9F9F", paddingTop: "10%" }}
              >
                <div className="text-widget">
                  <img
                    style={{ marginRight: 10 }}
                    className="footer-logo"
                    src="images/icon_favicom.webp"
                    alt=""
                  />{" "}
                  <span>{t("manageclients.title")}</span>
                </div>
                <h3 style={{ fontSize: 30, fontWeight: "600" }}>
                  {t("manageclients.descrip")}
                </h3>
                <a
                  href="https://apps.apple.com/us/app/sitfast/id1522129699"
                  target="__blank"
                >
                  <img
                    style={{ width: "40%", cursor: "pointer" }}
                    src="./images/appstorebanner.webp"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.sitfastsalons"
                  target="__blank"
                >
                  <img
                    style={{ width: "40%", marginLeft: 10, cursor: "pointer" }}
                    src="./images/googleplaystorebanner.webp"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(ManageClients));

import React from "react";
import { Link } from "react-router-dom";
import { Local_routes } from "../../util/routes";
import { withTranslation } from "react-i18next";
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  render() {
    const { t } = this.props;
    return (
      <div id="wrapper">
        <div className="aboutcOVER">
          <img
            style={{ width: "100%", height: "100%" }}
            src="./images/slider3.webp"
          />
        </div>
        {/* 

<!-- Content
================================================== --> */}

        {/* <!-- Container --> */}
        <div className="container">
          <div className="row" style={{ marginTop: "5rem" }}>
            <div className="col-md-12">
              <h4 className="headline with-border margin-top-0 margin-bottom-35">
                {t("about.h1")}
              </h4>
              <blockquote>{t("about.p1")}</blockquote>
            </div>
          </div>
          {/* Bullets poiints */}
          <div className="row" style={{ marginLeft: "2rem" }}>
            <div className="col-md-12">
              <h4 className="headline margin-bottom-25 margin-top-40">
                {t("about.h2")}
              </h4>

              <div className="col-md-6">
                <ul className="list-4 color">
                  <li> {t("about.bl1")}</li>
                  <li> {t("about.bl2")}</li>
                  <li> {t("about.bl3")}</li>
                  <li> {t("about.bl4")}</li>
                  <li> {t("about.bl5")}</li>
                  <li> {t("about.bl6")}</li>
                  <li> {t("about.bl7")}</li>
                </ul>
              </div>
              <div className="col-md-6">
                <img
                  style={{ marginRight: "15%", width: "85%",  }}
                  src="./images/client_about.webp"
                />
              </div>
            </div>
          </div>

          {/* bullet poits 2 */}
          <div className="row" style={{ marginLeft: "2rem", marginBottom: "5rem" }}>
            <div className="col-md-12">
              <h4 className="headline margin-bottom-25 margin-top-40">
                {t("about.h3")}
              </h4>

              <div className="col-md-6">
                <ul className="list-4 color">
                  <li> {t("about.bl8")}</li>
                  <li> {t("about.bl9")}</li>
                  <li> {t("about.bl10")}</li>
                  <li> {t("about.bl11")}</li>
                  <li> {t("about.bl12")}</li>
                  <li> {t("about.bl13")}</li>
                  <li> {t("about.bl14")}</li>
                  <li> {t("about.bl15")}</li>
                  <li> {t("about.bl16")}</li>
                </ul>
              </div>
              <div className="col-md-6">
                <img
                  style={{ marginRight: "15%", width: "85%" }}
                  src="./images/prof_about.webp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(About);

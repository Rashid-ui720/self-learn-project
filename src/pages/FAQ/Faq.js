import React from "react";
import { Link } from "react-router-dom";
import { Local_routes } from "../../util/routes";
import { withTranslation } from "react-i18next";
class Faq extends React.Component {
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
        <div id="titlebar">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>{t("faq.header")}</h2>

                {/* <!-- Breadcrumbs --> */}
                <nav id="breadcrumbs">
                  <ul>
                    <li>
                      <Link to={Local_routes.home}>Home</Link>
                    </li>
                    <li>{t("faq.header")}</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* 

<!-- Content
================================================== --> */}

        {/* <!-- Container --> */}
        <div className="container" style={{ marginBottom: "6rem" }}>
          <div className="row">
            {/* Customers */}
            <div className="col-md-6">
              <h4 className="headline margin-top-70 margin-bottom-30">
                {t("faq.title1")}
              </h4>

              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q1")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a1")}</p>
                  </div>
                </div>
              </div>
              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q2")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a2")}</p>
                  </div>
                </div>
              </div>
              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q3")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a3")}</p>
                  </div>
                </div>
              </div>
              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q4")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a4")}</p>
                  </div>
                </div>
              </div>
              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q5")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a5")}</p>
                  </div>
                </div>
              </div>
              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q6")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a6")}</p>
                  </div>
                </div>
              </div>
              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q7")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a7")}</p>
                  </div>
                </div>
              </div>
              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q8")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a8")}</p>
                  </div>
                </div>
              </div>
              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q9")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a9")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider */}
            <div className="col-md-6">
              <h4 className="headline margin-top-70 margin-bottom-30">
                {t("faq.title2")}
              </h4>
              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q10")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a10")}</p>
                  </div>
                </div>
              </div>

              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q1")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a11")}</p>
                  </div>
                </div>
              </div>
              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q12")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a12")}</p>
                  </div>
                </div>
              </div>

              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q13")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a13")}</p>
                  </div>
                </div>
              </div>

              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q15")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a15")}</p>
                  </div>
                </div>
              </div>
              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q16")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a16")}</p>
                  </div>
                </div>
              </div>

              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q17")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a17")}</p>
                  </div>
                </div>
              </div>

              <div className="style-11">
                <div className="toggle-wrap">
                  <span className="trigger ">
                    <a href="#">
                      {t("faq.q18")}
                      <i className="sl sl-icon-plus"></i>
                    </a>
                  </span>
                  <div className="toggle-container">
                    <p>{t("faq.a18")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Faq);

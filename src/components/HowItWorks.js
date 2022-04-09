import React from "react";
import { withTranslation } from "react-i18next";

class HowItWorks extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <section
          className="fullwidth padding-top-75 padding-bottom-70"
         
          style={{backgroundColor:"#f9f9f9"}}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <h3 className="headline centered headline-extra-spacing">
                  <strong className="headline-with-separator">
                    {t("howitworks.title")}
                  </strong>
                  <span className="margin-top-25">
                    {t("howitworks.description")}
                  </span>
                </h3>
              </div>
            </div>

            <div className="row icons-container">
              <div className="col-md-4">
                <div className="icon-box-2 with-line howitWorksBox">
                  <i className="im im-icon-Android"></i>
                  <h3>{t("howitworks.step1")}</h3>
                  <p>{t("howitworks.step1descrip")}</p>
                  {/* {localStorage.getItem("lang") == null ||
                  localStorage.getItem("lang") == "" ||
                  localStorage.getItem("lang") == "spa" ? (
                    <>
                      <br />
                      <br />
                      <br />
                    </>
                  ) : (
                    <>
                      <br />
                      <br />
                    </>
                  )} */}
                </div>
              </div>

              <div className="col-md-4">
                <div className="icon-box-2 with-line howitWorksBox">
                  <i className="im im-icon-Checked-User"></i>
                  <h3>{t("howitworks.step2")}</h3>
                  <p>{t("howitworks.step2descrip")}</p>
                </div>
              </div>

              <div className="col-md-4 ">
                <div className="icon-box-2 howitWorksBox">
                  <i className="im im-icon-Mail-withAtSign"></i>
                  <h3>{t("howitworks.step3")}</h3>
                  <p>{t("howitworks.step3descrip")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withTranslation()(HowItWorks);

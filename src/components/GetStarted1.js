import React from "react";
import { withTranslation } from "react-i18next";

class GetStarted1 extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <section
          className="fullwidth padding-top-75 padding-bottom-70"
          style={{ backgroundColor: "#7AC3EC" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <h3 className="headline centered headline-extra-spacing">
                  <strong
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 60,
                      paddingBottom: "2rem",
                    }}
                    className="headline-with-separator"
                  >
                    {t("getstarted1.title")}
                  </strong>
                  <span
                    style={{ color: "black", fontWeight: "600", fontSize: 18 }}
                    className="margin-top-25"
                  >
                    {t("getstarted1.discription")}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default withTranslation()(GetStarted1);

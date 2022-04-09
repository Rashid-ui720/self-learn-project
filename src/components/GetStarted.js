import React from "react";
import { Parallax } from "react-parallax";
import { withTranslation } from "react-i18next";
class GetStarted extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <Parallax bgImage={"images/slider-bg-02.jpg"} strength={500}>
        <div className="text-content white-font">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-8">
                <h2>{t("homepage.getstartedtitle")}</h2>
                <p>{t("homepage.getstartedDesc")}</p>
                <a
                  href="listings-list-with-sidebar.html"
                  className="button margin-top-25"
                >
                  {t("homepage.getstartedbtn")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Parallax>
    );
  }
}
export default withTranslation()(GetStarted);

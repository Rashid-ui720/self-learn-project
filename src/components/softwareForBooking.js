import React from "react";
import { withTranslation } from "react-i18next";

class SoftwareForBooking extends React.Component {
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
                    {t("business.softwareh1")}
                  </strong>
                  <span className="margin-top-25">
                  {t("business.softwaredesc")}
                  </span>
                </h3>
              </div>
            </div>

            <div className="row icons-container">
            <div className="div-block-7">
                <div className="business-image-parent-div">
                    <a  className="div-block-92 w-inline-block">
                        <div className="business-img"></div>
                        <div className="text-block-38">{t("business.salon")}</div>
                     </a>
                    <a  className="div-block-92 w-inline-block">
                        <div className="business-img barber"></div><div className="text-block-38">{t("business.barber")}</div>
                    </a>
                    <a  className="div-block-92 w-inline-block">
                            <div className="business-img spa"></div><div className="text-block-38">{t("business.spa")}</div>
                    </a>
                    <a  className="div-block-92 w-inline-block">
                        <div className="business-img fitness"></div><div className="text-block-38">{t("business.fitness")}</div>
                    </a></div>
                   </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withTranslation()(SoftwareForBooking);

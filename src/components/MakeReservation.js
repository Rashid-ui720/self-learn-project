import React from "react";
import { Link, withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

class MakeReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const { t } = this.props;
    return (
      <div id="wrapper">
        <div id="static-content" className="sticky-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4" style={{ color: "#9F9F9F", paddingTop: '10%' }}>
                <div className="text-widget">
                  <img style={{ marginRight: 10 }} className="footer-logo" src="images/icon_favicom.png" alt="" /> <span>{t("makereservation.title")}</span>
                </div>
                <h3 style={{ fontSize: 30, fontWeight: '600' }}>{t("makereservation.descrip")}</h3>
                <img style={{ width: '40%' }} src="./images/appstorebanner.jpg" />
                <img style={{ width: '40%', marginLeft: 10 }} src="./images/googleplaystorebanner.jpg" />
              </div>

              <div className="col-md-3">
                {/* <img style={{ marginRight: '15%', width: '90%' }} src="./images/staticimg2.jpg" /> */}
              </div>
              <div className="col-md-5">
                <img style={{ marginRight: '15%', width: '90%' }} src="./images/staticimg2.jpg" />
              </div>
            </div>
         
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(MakeReservation));

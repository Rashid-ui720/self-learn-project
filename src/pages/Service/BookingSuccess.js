import React from "react";
import { Link } from "react-router-dom";
import { Local_routes } from "../../util/routes";
import { withTranslation } from "react-i18next";
class BookingSuccess extends React.Component {
  componentDidMount() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <div id="titlebar" style={{marginBottom:"0px",padding:"55px 0px"}}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>{t("bookingsuccesspage.bookingprocesses")}</h2>

                {/* <!-- Breadcrumbs --> */}
                <nav id="breadcrumbs">
                  <ul>
                    <li>
                      <Link to={Local_routes.home}>
                        {t("bookingsuccesspage.home")}
                      </Link>
                    </li>
                    <li>{t("bookingsuccesspage.bookingprocesses")}</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="booking-confirmation-page">
                <i style={{fontSize:"132px"}} className="fa fa-check-circle"></i>
                <h2 className="margin-top-20">
                  {t("bookingsuccesspage.thanks")}
                </h2>
                <p>{t("bookingsuccesspage.receiveemail")}</p>
                <Link to={Local_routes.home} className="button margin-top-30">
                  {t("bookingsuccesspage.goback")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(BookingSuccess);

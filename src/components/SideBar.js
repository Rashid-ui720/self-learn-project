import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Local_routes } from "../util/routes";

import { withTranslation } from "react-i18next";
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: window.location.pathname,
    };
  }

  logoutUser() {
    localStorage.removeItem("userData");
    this.props.history.push("/");
    window.location.reload();
  }


  render() {
    const { t } = this.props;
    const { activeLink } = this.state;

    return (
      <div id="dashboardNav" className={`dashboard-nav ${this.props.tooglesidebar?'active':""}`}>
        <div className="dashboard-nav-inner">
          <ul data-submenu-title="">
            <li className={activeLink === "/" ? "active" : ""}>
              <Link to={Local_routes.home}>
                <i className="sl sl-icon-home"></i> {t("sidebar.home")}
              </Link>
            </li>
          </ul>

          <ul data-submenu-title="Main">
            <li className={activeLink === "/dashboard" ? "active" : ""}>
              <Link to={Local_routes.dashboard}>
                <i className="sl sl-icon-settings"></i> {t("sidebar.dashboard")}
              </Link>
            </li>
            <li className={activeLink === "/bookings" ? "active" : ""}>
              <Link to={Local_routes.bookings}>
                <i className="fa fa-calendar-check-o"></i>{" "}
                {t("sidebar.bookings")}
              </Link>
            </li>
          </ul>

          <ul data-submenu-title="Account">
            <li className={activeLink === "/profile" ? "active" : ""}>
              <Link to={Local_routes.profile}>
                <i className="sl sl-icon-user"></i> {t("sidebar.myprofile")}
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => this.logoutUser()}>
                <i className="sl sl-icon-power"></i> {t("sidebar.logout")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(SideBar));

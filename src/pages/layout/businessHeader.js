import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Local_routes } from "../../util/routes";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";
import { withTranslation } from "react-i18next";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Login from "../auth/Login";
import Register from "../auth/Register";
import "react-responsive-modal/styles.css";
import FormControl from "@material-ui/core/FormControl";

import { Modal } from "react-responsive-modal";

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
class BusinessHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: window.location.pathname,
      check: false,
      Drawer: false,
      open: false,
      activeTab2: false,
      activeTab1: true,
      lang:
        localStorage.getItem("lang") == null ||
        localStorage.getItem("lang") == ""
          ? "spa"
          : localStorage.getItem("lang"),
      userData: JSON.parse(localStorage.getItem("userData")),
    };
  }

  //handl lang
  handleLanguageChange = (event) => {
    let newLang = event.target.value;
    this.setState({ lang: newLang });
    this.props.i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  //handle drawer naviggation
  toogledrawer = (value) => {
    this.setState({ Drawer: value });
  };
  componentDidMount() {
    const user_data = localStorage.getItem("userData");
    if (user_data === null) {
      this.setState({ check: false });
    } else if (user_data !== null) {
      this.setState({ check: true });
    }

    //event listner on path name change
    this.props.history.listen((location, action) => {
      if (location.pathname === Local_routes.dashboard) {
        this.setState({ check: true });
      }
      if (
        location.pathname === Local_routes.bookService ||
        location.pathname === Local_routes.faq
      ) {
        window.location.reload();
      }

      this.toogleActiveLink(location.pathname);
    });
  }

  toogleActiveLink(path) {
    this.setState({ activeLink: path });
  }

  render() {
    const { check, activeLink, activeTab1, activeTab2, userData } = this.state;
    const { t } = this.props;
    return (
      <div id="wrapper">
        {/* drawer */}
        <Drawer
          open={this.state.Drawer}
          onClose={() => this.toogledrawer(false)}
        >
          <div
            role="presentation"
            onClick={() => this.toogledrawer(false)}
            onKeyDown={() => this.toogledrawer(false)}
          >
            <List>
              <ListItem>
                <div
                  className="header-widget drawer-widget"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <FormControl
                    variant="outlined"
                    // className={this.state.classes.formControl}
                    style={{ marginLeft: "1rem" }}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      {t("header.language")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      className="drawerLangSelect"
                      value={this.state.lang}
                      onChange={(e) => this.handleLanguageChange(e)}
                      label="Age"
                    >
                      <MenuItem value={"en"}>English</MenuItem>
                      <MenuItem value={"spa"}>Spanish</MenuItem>
                    </Select>
                  </FormControl>
                  <br></br>

                  <a
                    href={Local_routes.businessLogin}
                    target="__blank"
                    style={{ cursor: "pointer" }}
                    className="sign-in popup-with-zoom-anim drawerSigninPopup"
                  >
                    <i className="sl sl-icon-login"></i> {t("header.signin")}
                  </a>
                  <br></br>

                  <a
                    href={Local_routes.businessSignup}
                    target="__blank"
                    style={{ cursor: "pointer" }}
                    className="sign-in popup-with-zoom-anim drawerSigninPopup"
                  >
                    <i className="im im-icon-Checked-User"></i>{" "}
                    {t("form.register")}
                  </a>
                </div>
              </ListItem>
              <h2 style={{ color: "white" }}>{t("header.menu")}</h2>
              <ListItem button>
                <Link
                  className={
                    this.state.activeLink == Local_routes.home ? "current" : ""
                  }
                  style={{ color: "white" }}
                  to={Local_routes.home}
                >
                  {t("header.client")}
                </Link>
              </ListItem>
              <Divider style={{ backgroundColor: "white" }} />

              <ListItem button>
                <Link
                  style={{ color: "white" }}
                  className={
                    this.state.activeLink == "/business" ? "current" : ""
                  }
                  to={Local_routes.business}
                >
                  {t("header.business")}
                </Link>
              </ListItem>
            </List>
          </div>
        </Drawer>
        {/*     <!-- Wrapper --> */}
        <header
          className="no-shadow"
          id="header-container"
          style={{ backgroundColor: "white" }}
        >
          {/* <!-- Header --> */}
          <div
            id="header"
            className="not-sticky"
            style={{ backgroundColor: "white", boxShadow: "none" }}
          >
            <div className="container headerContainer">
              {/* <!-- Left Side Content --> */}
              <div className="left-side">
                {/* <!-- Logo --> */}
                <div id="logo">
                  <Link to="/">
                    <img src="images/logo.webp" alt="" />
                  </Link>
                </div>

                {/* <!-- Mobile Navigation --> */}

                <div
                  className="hmburgerMenu"
                  onClick={() => this.toogledrawer(true)}
                >
                  <button
                    className="hamburger hamburger--collapse"
                    type="button"
                  >
                    <span className="hamburger-box">
                      <span className="hamburger-inner"></span>
                    </span>
                  </button>
                </div>

                <nav id="navigation" className="style-1">
                  <ul id="responsive">
                    <li>
                      <Link
                        className={
                          this.state.activeLink == Local_routes.home
                            ? "current"
                            : ""
                        }
                        to={Local_routes.home}
                      >
                        {t("header.client")}
                      </Link>
                    </li>

                    <li>
                      <Link
                        className={
                          this.state.activeLink == "/business" ? "current" : ""
                        }
                        to={Local_routes.business}
                      >
                        {t("header.business")}
                      </Link>
                    </li>
                  </ul>
                </nav>

                {/* <!-- Main Navigation / End --> */}
              </div>
              {/* LOgged in r Logged out Links */}
              <div className="right-side">
                <div className="header-widget">
                  <a
                    href={Local_routes.businessLogin}
                    target="__blank"
                    style={{ cursor: "pointer" }}
                    className="sign-in popup-with-zoom-anim"
                  >
                    <i className="sl sl-icon-login"></i> {t("header.signin")}
                  </a>
                  <a
                    href={Local_routes.businessSignup}
                    target="__blank"
                    style={{ cursor: "pointer" }}
                    className="sign-in popup-with-zoom-anim"
                  >
                    <i className="im im-icon-Checked-User"></i>{" "}
                    {t("form.register")}
                  </a>

                  <FormControl
                    variant="outlined"
                    // className={this.state.classes.formControl}
                    style={{ marginLeft: "1rem" }}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      {t("header.language")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      value={this.state.lang}
                      onChange={(e) => this.handleLanguageChange(e)}
                      label="Age"
                    >
                      <MenuItem value={"en"}>English</MenuItem>
                      <MenuItem value={"spa"}>Spanish</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Header / End --> */}
        </header>
      </div>
    );
  }
}

export default withRouter(withTranslation()(BusinessHeader));

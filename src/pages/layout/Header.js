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
import { Modal } from "react-responsive-modal";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import BusinessHeader from "./businessHeader";
class Header extends React.Component {
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

  //logout user in drawer
  logoutUser() {
    localStorage.removeItem("userData");
    this.props.history.push("/");
    window.location.reload();
  }
  render() {
    const { check, activeLink, activeTab1, activeTab2, userData } = this.state;
    const { t } = this.props;
    if (activeLink == Local_routes.business) {
      return <BusinessHeader />;
    }
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
                <div className="header-widget drawer-widget">
                  {check && userData?.user_type != "Freelancer" ? (
                    <div className="user-menu">
                      <div className="user-name">
                       
                        <span>
                        
                          {userData.data.data.user_image === "https://admin.sitfastapp.com/upload/" || userData.data.data.user_image === 'null' ? (
                            <img
                              style={{ width: "1-0%", height: "100%" }}
                              src="./images/user_default.png"
                              alt=""
                              onError={(e)=>{e.target.onerror = null; e.target.src="./images/user_default.png"}}
                            />
                          ) : (
                            <img
                              style={{ width: "1-0%", height: "100%" }}
                              src={userData.data.data.user_image}
                              alt=""
                              onError={(e)=>{e.target.onerror = null; e.target.src="./images/user_default.png"}}
                            />
                          )}
                        </span>
                        Hi, {userData.data.data.first_name}
                      </div>
                    </div>
                  ) : (
                    <a
                      onClick={() => this.onOpenModal()}
                      style={{ cursor: "pointer" }}
                      className="sign-in popup-with-zoom-anim drawerSigninPopup"
                    >
                      <i className="sl sl-icon-login"></i> {t("header.signin")}
                    </a>
                  )}
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
                </div>
              </ListItem>
              {check ? (
                <>
                  <ListItem button>
                    {" "}
                    <Link
                      style={{ color: "white" }}
                      to={Local_routes.dashboard}
                    >
                      <i className="sl sl-icon-settings"></i>{" "}
                      {t("header.dashboard")}
                    </Link>
                  </ListItem>
                  <ListItem button>
                    {" "}
                    <Link style={{ color: "white" }} to={Local_routes.bookings}>
                      <i className="fa fa-calendar-check-o"></i>{" "}
                      {t("header.bookings")}
                    </Link>
                  </ListItem>
                  <ListItem button>
                    {" "}
                    <Link
                      to="/"
                      style={{ color: "white" }}
                      onClick={() => this.logoutUser()}
                    >
                      <i className="sl sl-icon-power"></i> {t("header.Logout")}
                    </Link>
                  </ListItem>
                </>
              ) : null}
              <ListItem>
                <h2 style={{ color: "white" }}>{t("header.menu")}</h2>
              </ListItem>
              <ListItem button>
                <Link
                  className={
                    this.state.activeLink == Local_routes.home ? "current" : ""
                  }
                  style={{ color: "white" }}
                  to={Local_routes.home}
                >
                  {t("header.home")}
                </Link>
              </ListItem>
              <Divider style={{ backgroundColor: "white" }} />
              <ListItem button>
                <Link
                  style={{ color: "white" }}
                  className={this.state.activeLink == "/about" ? "current" : ""}
                  to={Local_routes.about}
                >
                  {t("header.about")}
                </Link>
              </ListItem>
              <Divider style={{ backgroundColor: "white" }} />
              <ListItem button>
                <Link
                  style={{ color: "white" }}
                  className={this.state.activeLink == "/FAQ" ? "current" : ""}
                  to={Local_routes.faq}
                >
                  {t("header.faq")}
                </Link>
              </ListItem>
              <Divider style={{ backgroundColor: "white" }} />
              <ListItem button>
                <a
                  style={{ color: "white" }}
                 
                  href={Local_routes.business}
                  target="__blank"
                >
                  {t("header.business")}
                </a>
              </ListItem>
              <Divider style={{ backgroundColor: "white" }} />
            </List>
            <ListItem
              button
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Link
                style={{ marginTop: "0rem", color: "white" }}
                className="send-message-to-owner booknowbtnHeader button popup-with-zoom-anim"
                to={{
                  pathname: Local_routes.searchPage,
                  search: `&query=true&lat=0&lng=0&address=null`,
                }}
              >
                {t("detailpage.booknow")}
              </Link>
            </ListItem>
          </div>
        </Drawer>
        {/*     <!-- Wrapper --> */}
        <header
          id="header-container"
          style={{ backgroundColor: "white" }}
          className={
            activeLink === "/dashboard" ||
            activeLink === "/bookings" ||
            activeLink === "/profile"
              ? "fixed fullwidth dashboard"
              : "no-shadow"
          }
        >
          {/* <!-- Header --> */}
          <div
            id="header"
            className="not-sticky"
            style={{ backgroundColor: "white" }}
          >
            <div className="container headerContainer">
              {/* <!-- Left Side Content --> */}
              <div className="left-side">
                {/* <!-- Logo --> */}
                <div id="logo">
                  {activeLink === "/dashboard" ||
                  activeLink === "/bookings" ||
                  activeLink === "/profile" ? (
                    <Link to="/" className="dashboard-logo">
                      <img src="images/logo.webp" alt="" />
                    </Link>
                  ) : (
                    <Link to="/">
                      <img src="images/logo.webp" alt="" />
                    </Link>
                  )}
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

                {/* <!-- Main Navigation --> */}
                {activeLink === "/dashboard" ||
                activeLink === "/profile" ||
                activeLink === "/bookings" ? (
                  <></>
                ) : (
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
                          {t("header.home")}
                        </Link>
                      </li>

                      <li>
                        <Link
                          className={
                            this.state.activeLink == "/about" ? "current" : ""
                          }
                          to={Local_routes.about}
                        >
                          {t("header.about")}
                        </Link>
                      </li>

                      <li>
                        <Link
                          className={
                            this.state.activeLink == "/FAQ" ? "current" : ""
                          }
                          to={Local_routes.faq}
                        >
                          {t("header.faq")}
                        </Link>
                      </li>

                      <li>
                      <a
               
                 
                  href={Local_routes.business}
                  target="__blank"
                >
                          {t("header.business")}
                        </a>
                      </li>
                      <li>
                        <Link
                          to={{
                            pathname: Local_routes.searchPage,
                            search: `&query=true&lat=0&lng=0&address=null`,
                          }}
                          style={{ marginTop: "0rem", color: "white" }}
                          className=" booknowbtnHeader button "
                        >
                          {t("detailpage.booknow")}
                        </Link>
                      </li>
                    </ul>
                  </nav>
                )}

                {/* <!-- Main Navigation / End --> */}
              </div>
              {/* LOgged in r Logged out Links */}
              {check && userData?.user_type !== "Freelancer" ? <LoggedInLinks check={check}/> : <LoggedOutLinks />}
            </div>
          </div>
          {/* <!-- Header / End --> */}
        </header>

        {/* Modal for Mobile View */}
        <Modal
          center
          open={this.state.open}
          style={{ zIndex: 100 }}
          onClose={this.onCloseModal}
        >
          <div className="zoom-anim-dialog">
            {/* <!--Tabs --> */}
            <div className="sign-in-form">
              <ul className="tabs-nav" style={{ marginTop: "10%" }}>
                <li className="">
                  <a
                    onClick={() =>
                      this.setState({
                        activeTab1: !activeTab1,
                        activeTab2: false,
                      })
                    }
                    style={
                      !activeTab1
                        ? {
                            fontSize: 20,
                            cursor: "pointer",
                          }
                        : {
                            fontSize: 20,
                            cursor: "pointer",
                            color: "#7AC3EC",
                            borderBottomColor: "#7AC3EC",
                          }
                    }
                  >
                    {t("form.login")}
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      this.setState({
                        activeTab2: !activeTab2,
                        activeTab1: false,
                      })
                    }
                    style={
                      !activeTab2
                        ? {
                            fontSize: 20,
                            cursor: "pointer",
                          }
                        : {
                            fontSize: 20,
                            cursor: "pointer",
                            color: "#7AC3EC",
                            borderBottomColor: "#7AC3EC",
                          }
                    }
                  >
                    {t("form.register")}
                  </a>
                </li>
              </ul>

              <div className="tabs-container alt">
                {activeTab2 ? <Register /> : <Login />}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Header));

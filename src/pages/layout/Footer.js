import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Local_routes } from "../../util/routes";
import { withTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContent } from "../../components/Toast";
import Login from "../auth/Login";
import Register from "../auth/Register";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      open: false,
      activeTab2: false,
      activeTab1: false,
      user_data: null,
      businessFooter: false,
    };
  }
  onOpenModal = (type) => {
    this.setState({ open: true });
    if (type == "signup") {
      this.setState({ activeTab2: true });
      this.setState({ activeTab1: false });
    } else {
      this.setState({ activeTab1: true });
      this.setState({ activeTab2: false });
    }
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  GotoMyaccount = () => {
    const { t } = this.props;

    this.onOpenModal();
    toast.dismiss();
    toast(() => ToastContent(t("alerts.sigininmessgae")), {
      toastId: "infoToast",
      hideProgressBar: true,
      type: toast.TYPE.INFO,
      autoClose: 2000,
    });
  };
  componentDidMount() {
    
    if (
      this.props.location.pathname === "/dashboard" ||
      this.props.location.pathname === "/bookings" ||
      this.props.location.pathname === "/profile"
    ) {
      this.setState({ check: true });
    }

    const user_data = JSON.parse(localStorage.getItem("userData"));
    this.setState({ user_data: user_data });
    this.props.history.listen((location, action) => {
      if (
        location.pathname === Local_routes.dashboard ||
        location.pathname === Local_routes.profile ||
        location.pathname === Local_routes.bookings
      ) {
        this.setState({ check: true });
      } else {
        this.setState({ check: false });
      }

      if (location.pathname == Local_routes.business) {
        this.setState({ businessFooter: true });
      } else {
        this.setState({ businessFooter: false });
      }
    });
  }

  render() {
    const { activeTab1, activeTab2 } = this.state;
    const { t } = this.props;
    if (this.state.check) {
      
      return <div></div>;
    }

    return (
      <div id="wrapper">
        <div id="footer" className="sticky-footer">
          {/* <!-- Main --> */}
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-sm-6" style={{ color: "#9F9F9F" }}>
                <img className="footer-logo" src="images/logo.webp" alt="" />
                <br />
                <br />
                <p>{t("footer.about")}</p>
              </div>

              <div className="col-md-4 col-sm-6 ">
                <h4>{t("footer.helpfullinks")}</h4>
                <ul className="footer-links">
                  <li>
                    {this.state.businessFooter ? (
                      <a
                        style={{ cursor: "pointer" }}
                        href={Local_routes.businessLogin}
                        target="__blank"
                      >
                        {t("footer.login")}
                      </a>
                    ) : (
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => this.onOpenModal("login")}
                      >
                        {t("footer.login")}
                      </a>
                    )}
                  </li>
                  <li>
                    {this.state.businessFooter ? (
                      <a
                        style={{ cursor: "pointer" }}
                        href={Local_routes.businessSignup}
                        target="__blank"
                      >
                        {t("footer.signup")}
                      </a>
                    ) : (
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => this.onOpenModal("signup")}
                      >
                        {t("footer.signup")}
                      </a>
                    )}
                  </li>
                  {this.state.businessFooter ? null : (
                    <li>
                      {this.state.user_data == null ? (
                        <a onClick={() => this.GotoMyaccount()}>
                          {t("footer.myaccount")}
                        </a>
                      ) : (
                        <Link to={Local_routes.dashboard}>
                          {" "}
                          {t("footer.myaccount")}
                        </Link>
                      )}
                    </li>
                  )}
                  <li>
                    <a href="javascript:void(0)">{t("footer.privacypolicy")}</a>
                  </li>
                </ul>

                <ul className="footer-links">
                  <li>
                    <Link to={Local_routes.faq}>{t("footer.faq")}</Link>
                  </li>
                  <li>
                    <a href="javascript:void(0)">{t("footer.blog")}</a>
                  </li>
                  <li>
                    <Link to={Local_routes.about}>{t("footer.aboutus")}</Link>
                  </li>
                  {/* <li>
                    <Link to={Local_routes.contact}>{t("footer.contact")}</Link>
                  </li> */}
                </ul>
                <div className="clearfix"></div>
              </div>

              <div className="col-md-3  col-sm-12">
                <h4>{t("footer.Contactus")}</h4>
                <div className="text-widget">
                  {/* <span>{t("footer.office")} 123, Puerto Rico</span> <br />
                  {t("footer.phone")}:{" "}
                  <a href={`tel:(123) 123-456`}>
                    <span>(123) 123-456 </span>
                  </a>
                  <br /> */}
                  {t("footer.email")}:
                  <span>
                    {" "}
                    <a href={`mailto:support@sitfastapp.com`}>
                      support@sitfastapp.com
                    </a>
                  </span>
                  <br />
                </div>

                <ul className="social-icons margin-top-20">
                  <li>
                    <a
                      className="facebook"
                      href=" https://www.facebook.com/SitFast-112149780650164/"
                      target="__blank"
                    >
                      <i className="icon-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram"
                      href="https://www.instagram.com/sitfastapp/"
                      target="__blank"
                    >
                      <i className="icon-instagram"></i>
                    </a>
                  </li>
                  {/* <li>
                    <a className="gplus" href="#">
                      <i className="icon-gplus"></i>
                    </a>
                  </li>
                  <li>
                    <a className="vimeo" href="#">
                      <i className="icon-vimeo"></i>
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>

            {/* <!-- Copyright --> */}
            <div className="row">
              <div className="col-md-12">
                <div className="copyrights">{t("dashboard.copyright")}</div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Footer / End --> */}

        {/* <!-- Back To Top Button --> */}
        <div id="backtotop">
          <a href="#"></a>
        </div>
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

export default withRouter(withTranslation()(Footer));

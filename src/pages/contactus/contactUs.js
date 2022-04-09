import React from "react";
import { Link } from "react-router-dom";
import { Local_routes } from "../../util/routes";
import { withTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContent } from "../../components/Toast";

import GoogleMapReact from "google-map-react";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
class Contactus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", subject: "", comments: "" };
  }
  componentDidMount() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  //handle change
  HnadleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  //handle message send
  sendMessage = () => {
    const { t } = this.props;
    const { name, email, subject, comments } = this.state;
    toast.dismiss();
    if ((name == "" || email == "" || subject == "", comments == "")) {
      toast(() => ToastContent(t("alerts.fillfeilds")), {
        toastId: "infoToast",
        hideProgressBar: true,
        type: toast.TYPE.ERROR,
        autoClose: 2000,
      });
      return;
    }

    toast(() => ToastContent(t("alerts.messagesent")), {
      toastId: "infoToast",
      hideProgressBar: true,
      type: toast.TYPE.SUCCESS,
      autoClose: 2000,
    });
  };
  render() {
    const { t } = this.props;
    return (
      <div id="wrapper">
        {/* <div id="titlebar">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>{t("contactus.contactus")}</h2>

                <nav id="breadcrumbs">
                  <ul>
                    <li>
                      <Link to={Local_routes.home}>{t("contactus.home")}</Link>
                    </li>
                    <li>{t("contactus.contactus")}</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div> */}

        <div className="contact-map margin-bottom-60">
          {/* <!-- Google Maps --> */}
          <div id="singleListingMap-container">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyCnJVk-xSuqetNgmZsmAHY983QxVGmM7WY",
              }}
              defaultCenter={{
                lat: parseFloat(18.371396),
                lng: parseFloat(-66.070109),
              }}
              defaultZoom={11}
            >
              <AnyReactComponent
                lat={parseFloat(18.371396)}
                lng={parseFloat(-66.070109)}
                text={
                  <i
                    className="fa fa-map-marker"
                    style={{ color: "#d41128", fontSize: "30px" }}
                  ></i>
                }
              />
            </GoogleMapReact>
          </div>
          {/* <!-- Google Maps / End --> */}

          {/* <!-- Office --> */}
          <div className="address-box-container">
            <div
              className="address-container"
              style={{ background: "url(images/our-office.jpg)" }}
            >
              <div className="office-address">
                <h3>{t("contactus.ouroffice")}</h3>
                <ul>
                  <li>Office Street 304</li>
                  <li>Puerto Rico</li>
                  <li>{t("footer.phone")} (123) 123-456 </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4 className="headline margin-bottom-30">
                {t("contactus.findusthere")}
              </h4>

              <div className="sidebar-textbox">
                <p>{t("contactus.desc")}</p>

                <ul className="contact-details">
                  <li>
                    <i className="im im-icon-Phone-2"></i>
                    <a href={`tel:(123) 123-456`}>
                      <strong> {t("footer.phone")}:</strong>{" "}
                      <span>(123) 123-456 </span>
                    </a>
                  </li>

                  <li>
                    <i className="im im-icon-Globe"></i>{" "}
                    <strong> {t("contactus.web")}:</strong>
                    <span>
                      <a href="https://sitfast.app/" target="__blank">
                        www.sitfast.app
                      </a>
                    </span>
                  </li>
                  <li>
                    <i className="im im-icon-Envelope"></i>{" "}
                    <strong> {t("footer.email")}:</strong>{" "}
                    <span>
                      <a href={`mailto:support@sitfast.app`}>support@sitfast.app</a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-8">
              <section id="contact">
                <h4 className="headline margin-bottom-35">
                  {t("contactus.contactform")}
                </h4>

                <div id="contact-message"></div>

                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <input
                        name="name"
                        type="text"
                        id="name"
                        onChange={(e) => this.HnadleChange(e)}
                        value={this.state.name}
                        placeholder={t("form.fullname")}
                        required="required"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div>
                      <input
                        name="email"
                        type="email"
                        id="email"
                        onChange={(e) => this.HnadleChange(e)}
                        value={this.state.email}
                        placeholder={t("form.email")}
                        pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$"
                        required="required"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <input
                    name="subject"
                    type="text"
                    id="subject"
                    onChange={(e) => this.HnadleChange(e)}
                    value={this.state.subject}
                    placeholder={t("contactus.subject")}
                    required="required"
                  />
                </div>

                <div>
                  <textarea
                    name="comments"
                    cols="40"
                    rows="3"
                    id="comments"
                    onChange={(e) => this.HnadleChange(e)}
                    value={this.state.comments}
                    placeholder={t("contactus.message")}
                    spellCheck="true"
                    required="required"
                  ></textarea>
                </div>

                <input
                  type="submit"
                  className="submit button"
                  id="submit"
                  value={t("contactus.submitmessage")}
                  onClick={() => this.sendMessage()}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Contactus);

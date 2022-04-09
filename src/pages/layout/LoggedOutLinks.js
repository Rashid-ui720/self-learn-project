import React from "react";

import Login from "../auth/Login";
import Register from "../auth/Register";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withTranslation } from "react-i18next";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
class LoggedOutLinks extends React.Component {
  state = {
    open: false,
    activeTab2: false,
    activeTab1: true,
    lang:
      localStorage.getItem("lang") == null || localStorage.getItem("lang") == ""
        ? "spa"
        : localStorage.getItem("lang"),
  };

  
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  //handl lang
  handleLanguageChange = (event) => {
    let newLang = event.target.value;
    this.setState({ lang: newLang });
    this.props.i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };
  render() {
    const { activeTab1, activeTab2 } = this.state;
    const { t } = this.props;
    return (
      <React.Fragment>
        <div className="right-side">
          <div className="header-widget">
            <a
              onClick={() => this.onOpenModal()}
              style={{ cursor: "pointer" }}
              className="sign-in popup-with-zoom-anim"
            >
              <i className="sl sl-icon-login"></i> {t("header.signin")}
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
      </React.Fragment>
    );
  }
}

export default withTranslation()(LoggedOutLinks);

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Local_routes } from "../../util/routes";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withTranslation } from "react-i18next";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
class LoggedInLinks extends React.Component {
  state = {
    userData: JSON.parse(localStorage.getItem("userData")),
    lang:
      localStorage.getItem("lang") == null || localStorage.getItem("lang") == ""
        ? "spa"
        : localStorage.getItem("lang"),
  };

  logoutUser() {
    localStorage.removeItem("userData");
    this.props.history.push("/");
    window.location.reload();
  }
  //handl lang
  handleLanguageChange = (event) => {
    let newLang = event.target.value;
    this.setState({ lang: newLang });
    this.props.i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };
  render() {
    const { t } = this.props;
    const { userData } = this.state;
    

    return (
      <>
        {/* <div class="left-side">
          <div className="user-name">
					  <h2>Welcome, {userData.data.data.first_name}!</h2>
          </div>
        </div> */}

        <div className="right-side">
          {/* <!-- Header Widget --> */}
          <div className="header-widget">
            {/* <!-- User Menu --> */}
            <div className="user-menu">
              <div className="user-name">
                <span>
                  {userData.data.data.user_image ==
                  "https://admin.sitfastapp.com/upload/" ? (
                    <img
                      style={{ width: "1-0%", height: "100%" }}
                      src="./images/userAvtar.webp"
                      alt=""
                    />
                  ) : (
                    <img
                      style={{ width: "1-0%", height: "100%" }}
                      src={userData.data.data.user_image}
                      alt=""
                    />
                  )}
                </span>
                Hi, {userData.data.data.first_name}
              </div>

              <ul>
                <li>
                  <Link to={Local_routes.dashboard}>
                    <i className="sl sl-icon-settings"></i>{" "}
                    {t("header.dashboard")}
                  </Link>
                </li>

                <li>
                  <Link to={Local_routes.bookings}>
                    <i className="fa fa-calendar-check-o"></i>{" "}
                    {t("header.bookings")}
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => this.logoutUser()}>
                    <i className="sl sl-icon-power"></i> {t("header.Logout")}
                  </Link>
                </li>
              </ul>
            </div>
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
          {/* <!-- Header Widget / End --> */}
        </div>
      </>
    );
  }
}

export default withRouter(withTranslation()(LoggedInLinks));

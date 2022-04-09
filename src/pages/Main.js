import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Local_routes } from "../util/routes";
import Header from "./layout/Header";
import Home from "./home/Home";
import Four_o_FourPage from "./404Page";
import Footer from "./layout/Footer";
import ServiceDetailPage from "./Service/detailpage";
import ServiceBookingPage from "./Service/ServiceBookingPage";
import Dashboard from "../pages/dashboard/Dashboard";
import Bookings from "../pages/dashboard/Bookings";
import Profile from "../pages/dashboard/Profile";
import { ToastContainer } from "react-toastify";
import BookingSuccess from "../pages/Service/BookingSuccess";
import SearchPage from "./search/SearchPage";
import About from "./About/About";
import Faq from "./FAQ/Faq";
import Contactus from "./contactus/contactUs";
import Business from "./business/business"
class Main extends React.Component {
  state = {};
  render() {
    return (
      <>
        <Header />
        <div className="bodyPadding"></div>
        <Switch>
          <Route exact path={Local_routes.home} component={Home}></Route>
          <Route
            exact
            path={Local_routes.detail}
            component={ServiceDetailPage}
          />
          <Route
            exact
            path={Local_routes.bookService}
            component={ServiceBookingPage}
          />
          <Route exact path={Local_routes.dashboard} component={Dashboard} />
          <Route exact path={Local_routes.bookings} component={Bookings} />
          <Route
            exact
            path={Local_routes.bookingSucess}
            component={BookingSuccess}
          />
          <Route exact path={Local_routes.searchPage} component={SearchPage} />
          <Route exact path={Local_routes.profile} component={Profile} />
          <Route exact path={Local_routes.about} component={About} />
          <Route exact path={Local_routes.faq} component={Faq} />
          <Route exact path={Local_routes.contact} component={Contactus} />
          {/* <Route exact path={Local_routes.business} component={Business} /> */}

          <Route path="*" exact={true} component={Four_o_FourPage} />
        </Switch>

        <Footer />

        <ToastContainer />
      </>
    );
  }
}

export default Main;

import React from "react";
import FreelancerHomePageCard from "../../components/FreelancerHomePageCard";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import { ApiRoute } from "../../util/routes";
import { Loader } from "../../components/Loader";
import { ErrorComp } from "../../components/Error";
import HomeBannerSlider from "../../components/HomeBannerSlider";
import SearchCard from "../../components/searchCard";
import GetStarted1 from "../../components/GetStarted1";
import HowItWorks from "../../components/HowItWorks";
import ManageClients from "../../components/ManageClients";
import MakeReservation from "../../components/MakeReservation";
// import Blog from "../../components/Blog";
// import GetStarted from "../../components/GetStarted";
import { withTranslation } from "react-i18next";
class Home extends React.Component {
  state = {
    HomePageServiceProviders: null,
    err: null,
  };

  componentDidMount() {
    this.getHomePageServices();
  }

  //Get the Api response
  getHomePageServices() {
    var Params = {
      region_id: 1,
      addLng: 0,
      addLat: 0,
      customer_id: 1,
    };
    axios
      .post(ApiRoute.HomePageServiceProvider, Params)
      .then((res) => {
        let HomePageServiceProviders = res.data;
        this.setState({ HomePageServiceProviders });
      
      })
      .catch((err) => {
        this.setState({ HomePageServiceProviders: err });
        this.setState({ err: err });
      });
  }

  //render method
  render() {
    const { t } = this.props;
    const { HomePageServiceProviders, err } = this.state;
    
    // // error
    if (err != null) {
      return <ErrorComp errorDescription={t("alerts.unexpectederror")} />;
    }

    // Loader
    if (HomePageServiceProviders == null) {
      return <Loader Title={t("alerts.loading")} />;
    }
    
    localStorage.setItem(
      "admin_charged_fee",
      HomePageServiceProviders.admin_charged_fee
    );
    localStorage.setItem(
      "admin_commission_percentage",
      HomePageServiceProviders.admin_commission_percentage
    );
    return (
      <React.Fragment>
        <SearchCard />
        <HomeBannerSlider />

        <div className="container margin-top-70 ">
          {/* FreeLancer Portion */}
          <div className="row">
            <div className="col-md-12">
              <h3 className="headline centered margin-bottom-45">
                <strong className="headline-with-separator">
                  {t("homepage.freelancetitle")}
                </strong>
                <span>{t("homepage.discoverfreelancer")}</span>
              </h3>
            </div>
            {HomePageServiceProviders == null ? (
              <Loader Title={t("alerts.loading")} />
            ) : err != null || HomePageServiceProviders.error != 0 ? (
              <ErrorComp errorDescription={t("alerts.unexpectederror")} />
            ) : (
              <div className="col-md-12">
                {/* Freelancer slider */}
                <OwlCarousel
                  className="owl-theme"
                  nav={true}
                  dots={false}
                  margin={10}
                  responsive={{
                    0: {
                      items: 1,
                    },
                    600: {
                      items: 2,
                    },
                    1000: {
                      items: 4,
                    },
                  }}
                >
                  {/* Free lancer cards */}
                  {HomePageServiceProviders.data.map(
                    (ServiceProvider, index) => {
                      return (
                        <FreelancerHomePageCard
                          ServiceProvider={ServiceProvider}
                          key={index}
                        />
                      );
                    }
                  )}
                </OwlCarousel>
              </div>
            )}
          </div>
        </div>
        <HowItWorks />
        {/* <MakeReservation/> */}
        {/* <ManageClients /> */}
        <br></br>
        {/* <GetStarted1 /> */}
        {/* <Blog /> */}
      </React.Fragment>
    );
  }
}

export default withTranslation()(Home);

import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Slider from "react-animated-slider";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import "react-animated-slider/build/horizontal.css";
// import "./Slider/slider-styles.css";
// import "./Slider/slider-animations.css";

const content = [
  {
    button: "Read More",
    image: "./images/slider1.webp",
    user: "Luan Gjokaj",
    userProfile: "https://i.imgur.com/JSW6mEk.png",
  },
  {
    button: "Discover",
    image: "./images/slider2.webp",
    user: "Erich Behrens",
    userProfile: "https://i.imgur.com/0Clfnu7.png",
  },
  {
    button: "Buy now",
    image: "./images/slider3.webp",
    user: "Bruno Vizovskyy",
    userProfile: "https://i.imgur.com/4KeKvtH.png",
  },
  {
    button: "Buy now",
    image: "./images/slider4.webp",
    user: "Bruno Vizovskyy",
    userProfile: "https://i.imgur.com/4KeKvtH.png",
  },
  {
    button: "Buy now",
    image: "./images/slider5.webp",
    user: "Bruno Vizovskyy",
    userProfile: "https://i.imgur.com/4KeKvtH.png",
  },
];

class BusinessBannerSlider extends React.Component {
  state = {};
  render() {
    return (
      <div className="rev_slider_wrapper fullwidthbanner-container" style={{height:"unset"}}>
        <div>
        <OwlCarousel
                  className="owl-theme"
                
                 autoPlay={true}
                 loop
                  dots={false}
                  responsive={{
                    0: {
                      items: 1,
                    },
                  
                  }}
                >
                  {/* Free lancer cards */}
                  {content.map(
                    (item, index) => {
                      return (
                        <div
                        key={index}
                        className="slider-content"
                        style={{
                          width:"100%",
                          height:"100%"
                        }}
                      >
                          <img src={item.image}></img>
                          </div>
                      );
                    }
                  )}
                </OwlCarousel>
         
        </div>
      </div>
    );
  }
}

export default BusinessBannerSlider;

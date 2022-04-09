import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Slider from "react-animated-slider";
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

class HomeBannerSlider extends React.Component {
  state = {};
  render() {
    return (
      <div className="rev_slider_wrapper fullwidthbanner-container">
        <div>
          <Slider className="slider-wrapper " autoplay={1000}>
            {content.map((item, index) => (
              <div
                key={index}
                className="slider-content"
                style={{
                  background: `url('${item.image}') no-repeat center center`,
                }}
              >
                {/* <div className="inner">
                  <button>{item.button}</button>
                </div> */}
                {/* <section>
                  <img src={item.userProfile} alt={item.user} />
                  <span>
                    Posted by <strong>{item.user}</strong>
                  </span>
                </section> */}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

export default HomeBannerSlider;

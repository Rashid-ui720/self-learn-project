import logo from "./logo.svg";
import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import Main from "./pages/Main";
import { BrowserRouter as Router } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import Geocode from "react-geocode";
function App() {
  //'pk_test_51GxM5uFtH8kYoSTyoCfy2yH35r9j0x0QEwpMRewV4k3VcgMmrnokcMbmscTl0KiDMnLfAbgtv9Fnw4H1KBIVPxhu009bR6lkXF'
  //pk_live_51GxM5uFtH8kYoSTyuHCPyoYCDsYO3UfRQ3DYNEZN4ojao5nvEs65tgHw4AFdRTa9tloKYV3YOKyox5i4JndaEuly00iJxTMgw1
  
  // const stripePromise = loadStripe(
  //   "pk_test_51GxM5uFtH8kYoSTyoCfy2yH35r9j0x0QEwpMRewV4k3VcgMmrnokcMbmscTl0KiDMnLfAbgtv9Fnw4H1KBIVPxhu009bR6lkXF"
  // );
  
  const stripePromise = loadStripe(
    "pk_live_51GxM5uFtH8kYoSTyuHCPyoYCDsYO3UfRQ3DYNEZN4ojao5nvEs65tgHw4AFdRTa9tloKYV3YOKyox5i4JndaEuly00iJxTMgw1"
  );
  Geocode.setApiKey("AIzaSyCnJVk-xSuqetNgmZsmAHY983QxVGmM7WY");
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Main />
      </Elements>
    </Router>
  );
}

export default App;

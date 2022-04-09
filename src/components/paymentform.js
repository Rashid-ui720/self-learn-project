import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./paymentCardsection";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContent } from "./Toast";
import { ApiRoute, Local_routes } from "../util/routes";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { withTranslation } from "react-i18next";

class CheckoutForm extends React.PureComponent {
  state = {
    paymentSuccess: null,
    selectedSlot: null,
  };
  componentDidUpdate() {
    this.LoadAthMovilJs();
  }
  async componentDidMount() {
    this.setState({ selectedSlot: this.props.PayloadData.selectedSlot });
    this.LoadAthMovilJs();
    //in case of ath error do not show it on the screen it  not lookes good
  }
  LoadAthMovilJs = async () => {
    let servicesdata = this.getSelectedServices();
    localStorage.setItem("servicesdata", JSON.stringify(servicesdata));
    const scriptAth = document.createElement("script");

    scriptAth.src = "scripts/AthMovil.js";
    scriptAth.async = true;

    const script = document.createElement("script");

    script.src = "https://www.athmovil.com/api/js/v3/athmovilV3.js";
    script.async = true;
    await document.body.appendChild(scriptAth);
    document.body.appendChild(script);
  };

  getSelectedServices = () => {
    let array2 = [];
    this.props.PayloadData.selectedService.map((service , index) => {
      array2.push({
        service_id: service.id,
        price: service.price,
        price_type: service.pricetype,
        duration: service.duration,
        total_hour: service.duration,
        service_type: this.props.PayloadData.service_type,
      })
    })
    return array2;
  }

  //handle Stripe Checkout
  handleSubmit = async (event) => {
    const {
      provider_id,
      service_duration,
      service_price,
      service_id,
      date,
      selectedSlot,
      price_type,
      duration,
      total_hour,
      depositAmount,
      sitfastFee,
      admin_charged_commission,
      service_type,
      area_long,
  area_lat,
  provider_address,
      t,
      selectedService
    } = this.props.PayloadData;
    event.preventDefault();
    toast.dismiss();

    //check  required parameters
    if (
      date == "" ||
      date == null ||
      selectedSlot == "" ||
      selectedSlot == null
    ) {
      toast(() => ToastContent(t("alerts.selectdateandtime")), {
        toastId: "infoToast",
        hideProgressBar: true,
        type: toast.TYPE.ERROR,
        autoClose: 2000,
      });
      return;
    }
    // handle payment
    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      toast(() => ToastContent(result.error.message), {
        toastId: "infoToast",
        hideProgressBar: true,
        type: toast.TYPE.ERROR,
        autoClose: 10000,
      });
    } else {
      toast(() => ToastContent(t("alerts.pleasewait")), {
        toastId: "infoToast",
        hideProgressBar: true,
        type: toast.TYPE.INFO,
      });

      const user_data = JSON.parse(localStorage.getItem("userData"));
      let Payload = {
        provider_id: provider_id,
        customer_id: user_data?.data?.data?.user_id ? user_data.data.data.user_id : user_data.user_id,
        date: date,
        time: selectedSlot,
        address_type: "1",
        address: provider_address,
        lat:area_lat,
        lng: area_long,
        order_service: this.getSelectedServices(),
        total_hour: total_hour,
        service_type: service_type,
        another_service: [],
        bill_amount: service_price,
        stripe_token: result.token.id,
        stripe_amount: parseInt((depositAmount + sitfastFee) * 100),
        payment_mode: "Reservation",
        reservation_fees: depositAmount,
        isSaveCard: "DoNotSaveCardWithPayment",
        id: "",
        admin_charged_fixed_amount: "1.5",
        admin_charged_commission: admin_charged_commission,
      };
      axios
        .post(ApiRoute.StripePayment, Payload)
        .then((res) => {
         

          if ((res.data.message = "success")) {
            toast.dismiss();
            toast(() => ToastContent(t("alerts.paymentmade")), {
              toastId: "infoToast",
              hideProgressBar: true,
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });

            this.setState({ paymentSuccess: res.data });
          }
        })
        .catch((err) => {
          toast.dismiss();
          toast(() => ToastContent(t("alerts.paymentfail")), {
            toastId: "infoToast",
            hideProgressBar: true,
            type: toast.TYPE.ERROR,
            autoClose: 2000,
          });
        });
      
    }
  };

  ShowMessage = () => {
    const { t } = this.props.PayloadData;
    toast(() => ToastContent(t("alerts.selectdateandtime")), {
      toastId: "infoToast",
      hideProgressBar: true,
      type: toast.TYPE.ERROR,
      autoClose: 2000,
    });
  };
  render() {
    const { t, provider_id,
      service_duration,
      service_price,
      service_id,
      date,
      selectedSlot,
      price_type,
      duration,
      total_hour,
      depositAmount,
      sitfastFee,
      admin_charged_commission,
      service_type,
      area_long,
  area_lat,
  provider_address,
      selectedService,
} = this.props.PayloadData;
  
  const user_data = JSON.parse(localStorage.getItem("userData"));
    if (this.state.paymentSuccess !== null) {
      return <Redirect to={Local_routes.bookingSucess} />;
    }
    
    return (
      <div className="col-lg-6 col-md-6  margin-bottom-60">
        
        <div
          className="boxed-widget opening-hours summary margin-top-0"
          style={{ zIndex: 1 }}
        >
          <div className="product-info">
            <h3>
              <i className="fa fa-credit-card"></i>
              {t("servicebookingpage.payment")}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
            className="AthButtonResponsove"
          >
            <div
              style={{
                width: "70%",
              }}
            >
              <img
                src="/images/payment.webp"
                className="movilImage"
                style={{
                  display:
                    this.props.PayloadData.selectedSlot == null
                      ? "block"
                      : "none",
                }}
                onClick={() => this.ShowMessage()}
                alt="ATH MOVIL"
              ></img>

              <div
                id="ATHMovil_Checkout_Button"
                style={{
                  display:
                    this.props.PayloadData.selectedSlot != null
                      ? "block"
                      : "none",
                }}
              ></div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: "4rem",
              maxHeight: "3rem",
            }}
          >
            <h3> {t("servicebookingpage.or")}</h3>
          </div>
          <form onSubmit={this.handleSubmit} style={{ marginTop: "0rem" }}>
            <CardSection />
            <ul>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "2rem",
                }}
              >
                <button type="submit" className="button " style={{backgroundColor:"#19b453"}}>
                  {t("servicebookingpage.paynow")}
                </button>
              </li>
            </ul>
          </form>
        </div>

{/* This data is used tto implement the ath movil */}
        <div style={{display:"none"}}>
          <p id="provider_id">{provider_id}</p>
          <p id="service_duration">{service_duration}</p>
          <p id="service_price">{service_price}</p>
          <p id="service_id">{service_id}</p>
          <p id="date">{date}</p>
          <p id="selectedSlot">{`${selectedSlot}`}</p>
          <p id="address_type">{"1"}</p>
          <p id="provider_address">{provider_address}</p>
          <p id="area_lat">{area_lat}</p>
          <p id="area_long">{area_long}</p>
          <p id="price_type">{price_type}</p>
          <p id="duration">{duration}</p>
          <p id="total_hour">{total_hour}</p>
          <p id="depositAmount">{`${depositAmount}`}</p>
          <p id="sitfastFee">{`${sitfastFee}`}</p>
          <p id="admin_charged_commission">{`${admin_charged_commission}`}</p>
          <p id="service_type">{service_type}</p>
          <p id="admin_charged_fixed_amount">{"1.5"}</p>
          <p id="provider_id">{provider_id}</p>
          <p id="customer_id">{user_data?.data?.data?.user_id ? user_data.data.data.user_id :  user_data.user_id}</p>
        

        </div>


       
      </div>
    );
  }
}

export default withTranslation()(function InjectedCheckoutForm({
  provider_id,
  service_duration,
  service_price,
  service_id,
  date,
  selectedSlot,
  price_type,
  duration,
  total_hour,
  depositAmount,
  sitfastFee,
  admin_charged_commission,
  service_type,
  area_long,
  area_lat,
  provider_address,
  t,
  selectedService,
}) {
  const PayloadData = {
    provider_id,
    service_duration,
    service_price,
    service_id,
    date,
    selectedSlot,
    price_type,
    duration,
    total_hour,
    depositAmount,
    sitfastFee,
    admin_charged_commission,
    service_type,
    area_long,
  area_lat,
  provider_address,
    t,
    selectedService,
  };
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm
          stripe={stripe}
          elements={elements}
          PayloadData={PayloadData}
        />
      )}
    </ElementsConsumer>
  );
});

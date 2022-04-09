import React, { useMemo } from "react";
import { CardElement } from "@stripe/react-stripe-js";

const useOptions = () => {
  const CARD_ELEMENT_OPTIONS = useMemo(() => ({
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        iconColor: "rgb(240, 57, 122)",
        color: "rgb(240, 57, 122)",
        fontSize: "16px",
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#CFD7DF",
        },
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238",
        },
      },
    },
  }));
  return CARD_ELEMENT_OPTIONS;
};

export default function CardSection() {
  const options = useOptions();
  return <CardElement options={options} className="stripepaymentcard" />;
}

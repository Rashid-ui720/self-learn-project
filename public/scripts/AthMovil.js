// console.log("hello" , this.props.PayloadData.selectedService);
ATHM_Checkout = {
    env: "production",
    publicToken: "5866ca9e8b6b6f0cf0f2b1e18c49d801cfb8cc7b",
    // env: 'sandbox',
    // publicToken: 'sandboxtoken01875617264',
    timeout: 6000,
  
    theme: "btn",
    lang: "en",
  
    total: document.getElementById("totalAmount").innerHTML,
    tax: 0.0,
    subtotal: 0.0,
  
    metadata1: "",
    metadata2: "",
  
    items: [],
    onCancelledPayment: function (response) {
      swal("Oops!", "Your Payment has canceled!", "error");
    },
    onExpiredPayment: function (response) {
      swal("Oops!", "Your Payment is expired!", "error");
    },
    onCompletedPayment: function (response) {
        if(document.getElementById("provider_id").innerHTML!==""){
      
      const user_data = JSON.parse(localStorage.getItem("userData"));
      let Payload = {
        provider_id: document.getElementById("provider_id").innerHTML,
        customer_id:user_data.data.data.user_id,
        date:document.getElementById("date").innerHTML,
        time: document.getElementById("selectedSlot").innerHTML,
        address_type:"1",
        address:document.getElementById("provider_address").innerHTML,
        lat:document.getElementById("area_lat").innerHTML,
        lng:document.getElementById("area_long").innerHTML,
        order_service: JSON.parse(localStorage.getItem("servicesdata")),
        another_service: [],
        bill_amount: document.getElementById("service_price").innerHTML,
      
        stripe_amount:parseInt((parseFloat(document.getElementById("depositAmount").innerHTML )  + parseFloat(document.getElementById("sitfastFee").innerHTML)) * 100),
        payment_mode: "Reservation",
        reservation_fees:document.getElementById("depositAmount").innerHTML,
        isSaveCard: "DoNotSaveCardWithPayment",
        id: "",
        admin_charged_fixed_amount: "1.5",
        admin_charged_commission:document.getElementById("admin_charged_commission").innerHTML,
        transaction_id:response.dailyTransactionID
      };
  
    
       
      document.getElementById("provider_id").innerHTML=""
  
      fetch('https://admin.sitfastapp.com/api/Order/book_movil', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Payload),
  })
  .then(response => response.json())
  .then(data => {
  if(data.error!==0){
    swal("Oops!", "There is an eror while saving order please contact sitfast support!", "error");
  }
   else{
    window.location.replace("/bookingsuccess");
   }
  
   
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
    },
  };

// console.log("hello" , this.props.PayloadData.selectedService);
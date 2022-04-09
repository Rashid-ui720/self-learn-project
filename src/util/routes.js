//local routes of the website
export const Local_routes = {
  home: "/",
  detail: "/detail",
  bookService: "/bookservice",
  dashboard: "/dashboard",
  dashboard: "/dashboard",
  bookings: "/bookings",
  profile: "/profile",
  bookingSucess: "/bookingsuccess",
  searchPage: "/searchPage",
  about: "/about",
  faq: "/FAQ",
  contact: "/contact-us",
  business: "https://sitfast.business/",
  businessLogin: "https://sitfast.business/login",
  businessSignup: "https://sitfast.business/register",
};

//api routes
// const BaseUrl = "https://admin.sitfastapp.com/api/";
const BaseUrl = "https://admin.sitfastapp.com/api/";
export const ApiRoute = {
  HomePageServiceProvider: BaseUrl + "Order/search_2",
  ServiceProviderDetails: BaseUrl + "Freelancer/profile_get",
  StripePayment: BaseUrl + "Order/book",
  ProviderTimeSlots: BaseUrl + "Freelancer/get_provider_time_slot",
  UserSideBookingRecieved: BaseUrl + "Customer/getBookingDetailbyStatus",
  LoginUser: BaseUrl + "Registration/login",
  RegisterUser: BaseUrl + "Registration",
  getServiceProviderTimings: BaseUrl + "Freelancer/getDaysAndTiming",
  verifyemail: BaseUrl + "Registration/verifyUserEmail",
  verifyPhone: BaseUrl + "Registration/verifyUserPhone",
  sendOtp: BaseUrl + "Registration/verfiyUserRegistration",
  editCustomerProfile: BaseUrl + "Registration/profile_update",
  forgetPassword: BaseUrl + "Registration/update_forget_password",
  getCustomerDashboardData: BaseUrl + "User/getCustomerDataForDashboard",
  addReview: BaseUrl + "Order/review",
};

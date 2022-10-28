let base_url = "https://medicare-democrate.herokuapp.com/api/v1";
module.exports = {
  /** Authentication APIs */
  signupAPI: base_url + "/signup",
  loginAPI: base_url + "/login",
  verifyEmailOtpAPI: base_url + "/verify/otp",
  userProfileAPI: base_url + "/user/detail/",
  updateUserProfileAPI: base_url + "/user/update/me",
  sendEmailOtpAPI: base_url + "/send/verification-mail",
  getProductAPI: base_url + "/product",
  postProductAPI: base_url + "/product",
  getUserbyPhone: base_url + "/phone/detail",
  postRoutineAPI: base_url + "/routine/log",
  getmyDetails: base_url + "/user/detail/me",
  getRoutineAPI: base_url + "/routine/list",
  updateRoutineAPI: base_url + "/routine/edit/",
};



// require('dotenv').config()
// const accountSid = process.env.TWILIO_ACCOUNT_SID
// const authToken = process.env.TWILIO_AUTH_TOKEN
// const serviceSid =process.env.TWILIO_SERVICE_SID
// const client = require('twilio')(accountSid, authToken);

// module.exports = {
//   sendOtp: (mobile) => {
//     console.log(mobile,"00");
//     return new Promise((resolve, reject) => {
//       client.verify.v2
//         .services(serviceSid)
//         .verifications.create({ to: `+91${mobile}`, channel: "sms" })
//         .then((verification) => {
//           console.log(verification.sid);
//           resolve(verification.sid);
//         });
//     });
//   },
//    verifyOtp : (mobileNo, otp) => {
//     console.log("mobile and otp");
//     console.log(mobileNo, otp);
//     return new Promise((resolve, reject) => {
//       client.verify
//         .v2.services(serviceSid)
//         .verificationChecks
//         .create({
//           to: `+91${mobileNo}`,
//           code: `${otp}`
//         })
//         .then((verificationCheck) => {
//           resolve(verificationCheck);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
// }
// };
  

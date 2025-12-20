// import appClient from "../apiClient";



// //SignIn User//
// export async function logInUser(data: { email: string; password: string }) {
//   try {
//     const response = await appClient.post("/api/users", data);
//     if (!response) throw new Error("failed to login");
//     console.log("Login Successful:", response);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

// //SignUp Users//
// export async function signupUserAccount(data: {
//   phone: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }) {
//   try {
//     const response = await appClient.post("/api/auth/signup/accountInfo", data);

//     if (!response) throw new Error("Failed to Login");
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function signupUserPersonalInfo(data: {
//   firstname: string;
//   lastname: string;
//   address: string;
//   dob: string;
//   gender: string;
//   course: string;
//   level: string;
//   university: string;
// }) {
//   try {
//     const response = await appClient.post("/auth/signup/personalInfo", data);
//     if (!response) throw new Error("Failed to Login");
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function signupUserPhoto(formData: FormData) {
//   try {
//     const response = await appClient.post(
//       "/auth/signup/uploadProfilePhoto",
//       formData
//     );

//     if (!response) throw new Error("Failed to Login");
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function signupUserDocument(data: {
//   idType: string;
//   idFront: File;
//   idBack: File;
//   admissionLetter: File;
// }) {
//   try {
//     const formData = new FormData();
//     formData.append("idType", data.idType);
//     formData.append("idFront", data.idFront);
//     formData.append("idBack", data.idBack);
//     formData.append("admissionLetter", data.admissionLetter);

//     const response = await appClient.post("/auth/uploadDocuments", formData);

//     if (!response) throw new Error("Failed to Login");
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

// // export async function signupUserId(data: { formData: FormData }) {
// //   try {
// //     const response = await request("/auth/signup/uploadId", {
// //       method: "POST",
// //       body: data,
// //     });

// //     if (!response) throw new Error("Failed to Login");
// //     return response;
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }
// /////////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////////////
// export async function finalSignup(data: any) {
//   try {
//     const response = await appClient.post("/auth/signup", data);
//     return response.data;
//   } catch (error: any) {
//     const message = error.response?.data?.message || "Signup failed";
//     throw new Error(message);
//   }
// }

// export async function verifyEmail(data: any) {
//   try {
//     const response = await appClient.post("/api/auth/verifyEmail", data);
//     return response.data;
//   } catch (error: any) {
//     const message =
//       error.response?.data?.message || "Email Verification Failed";
//     throw new Error(message);
//   }
// }

// export async function resendVerificationEmail(data: any) {
//   try {
//     const response = await appClient.post("/auth/resend-email", data);
//     return response.data;
//   } catch (error: any) {
//     const message =
//       error.response?.data?.message || "Resend Email Verification Failed";
//     throw new Error(message);
//   }
// }

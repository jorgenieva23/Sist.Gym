// import axios from "axios";
// import { IAccessTokenResponse } from "../utils/types";

// export async function requestNewAccessToken(refreshToken: string) {
//   try {
//     const response = await axios.post("/user/refreshToken", {
//       headers: {
//         Authorization: `Bearer ${refreshToken}`,
//       },
//     });
//     if (response.status === 200) {
//       const json = (await response.data) as IAccessTokenResponse;
//       if (json.error) {
//         throw new Error(json.error);
//       }
//       return json.accessToken;
//     }
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// export async function retrieveUserInfo(accessToken: string) {
//   try {
//     const response = await axios.get("/user/getUserId/:id", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error("Unable to retrieve user information.");
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(
//         error.response?.data?.error || "Unable to retrieve user information."
//       );
//     } else {
//       throw new Error("Unable to retrieve user information.");
//     }
//   }
// }

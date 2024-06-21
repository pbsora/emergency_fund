import axios from "axios";
import { cookies } from "next/headers";

// const API = axios.create({
//   baseURL: "http://localhost:5065/api",
//   withCredentials: true,
//   headers: {
//     Cookie: `token=${cookies().get("token")?.value}`,
//   },
// });

// export const internalFetch = (
//   url: string,
//   options: RequestInit = {}
// ) => {
//   return fetch("http://localhost:5065/api/" + url, {
//     ...options,
//     credentials: "include",
//     headers: {
//       Cookie: `token=${cookies().get("token")?.value}`,
//     },
//   });
// };

class FetchWrapper {
  baseURL: string;
  constructor() {
    this.baseURL = process.env.CLIENT_URL as string;
  }

  get(url: string) {
    url = url.charAt(0) === "/" ? url.slice(1) : url;
    return fetch(this.baseURL + url, {
      method: "get",
      credentials: "include",
      headers: {
        Cookie: `token=${cookies().get("token")?.value}`,
      },
    });
  }

  post(url: string, data: unknown) {
    url = url.charAt(0) === "/" ? url.slice(1) : url;
    return fetch(this.baseURL + url, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Cookie: `token=${cookies().get("token")?.value}`,
      },
      body: JSON.stringify(data),
    });
  }
}

export const API = new FetchWrapper();

export default API;

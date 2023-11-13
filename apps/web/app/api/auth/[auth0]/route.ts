import { handleAuth } from "@auth0/nextjs-auth0";

// export const GET = handleAuth({
//   login: handleLogin({
//     authorizationParams: {
//       prompt: "login",
//     },
//     returnTo: "/conversation/new",
//   }),
//   signup: handleLogin({
//     authorizationParams: {
//       prompt: "signup",
//       screen_hint: "signup",
//     },
//     returnTo: "/", // This is the default behavior
//   }),
// });

export const GET = handleAuth();

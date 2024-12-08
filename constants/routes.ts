//  centralizing your URLs into a constants file is a great practice.
//  It reduces the risk of errors, simplifies updates, and improves code maintainability.

const ROUTES = {
  HOME: "/",
  ASK_QUESTION: "/ask-question",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  COLLECTION: "/collection",
  COMMUNITY: "/community",
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/questions/${id}`,
};

export default ROUTES;

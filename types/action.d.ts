interface SignUpWithCredentialsParams {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface SignInWithCredentialsParams {
  email: string;
  password: string;
}

interface SignInWithOAuthParams {
  provider: "github" | "google";
  providerAccountId: string;
  user: {
    name: string;
    username: string;
    email: string;
    image: string;
  };
}

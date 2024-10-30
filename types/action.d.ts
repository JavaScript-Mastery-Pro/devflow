type ActionSuccessResponse = { success: boolean; data?: unknown };

type ActionErrorResponse = {
  success: boolean;
  status: number;
  error: { message: string; errors?: Record<string, string[]> };
};

type ActionResponse = ActionSuccessResponse | ActionErrorResponse;

interface signUpWithCredentialsParams {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface signInWithCredentialsParams {
  email: string;
  password: string;
}

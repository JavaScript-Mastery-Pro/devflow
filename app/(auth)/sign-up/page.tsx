"use client";

import AuthForm from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => (
  <AuthForm
    formType="SIGN_UP"
    schema={SignUpSchema}
    defaultValues={{ username: "", name: "", email: "", password: "" }}
    onSubmit={(data) => Promise.resolve({ success: true, data })}
  />
);

export default SignUp;

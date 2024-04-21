import { Link, Form, useActionData } from "react-router-dom";

import useSignup from "../hooks/useSignup";
import { FcGoogle } from "react-icons/fc";
import FormInput from "../components/FormInput";
import useLogin from "../hooks/useLogin";
import { useEffect } from "react";
export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("Email");
  let password = formData.get("Password");

  return { password, email };
};
const Signin = () => {
  const userSignin = useActionData();
  const { signInEmailAndPassword } = useLogin();
  useEffect(() => {
    if (userSignin) {
      signInEmailAndPassword(userSignin.email, userSignin.password);
    }
  }, [userSignin]);
  const { signUpWithGoogle, user, error } = useSignup();
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="max-w-96 w-full">
        <Form method="POST">
          <FormInput type="email" label="Email:" name="Email" />
          <FormInput type="password" label="Password:" name="Password" />
          <div>
            <button
              className="btn btn-secondary w-full mb-3 text-xl"
              type="submit"
            >
              Submit
            </button>
            <button
              onClick={signUpWithGoogle}
              className="btn btn-primary w-full  mb-5"
            >
              <FcGoogle className="text-3xl" />
              <span className="text-2xl">Google</span>
            </button>
            <p className="text-center">
              If you don't have an account,{" "}
              <Link className="link text-blue-500" to="/signup">
                SignUp
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signin;

import { Link, Form, useActionData } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import { FcGoogle } from "react-icons/fc";
import FormInput from "../components/FormInput";
import { useEffect } from "react";
export const action = async ({ request }) => {
  let formData = await request.formData();
  let username = formData.get("Name");
  let email = formData.get("Email");
  let password = formData.get("password");
  let url = formData.get("photoURL");

  return { username, password, email, url };
};
const Signup = () => {
  let userSignup = useActionData();
  console.log(userSignup);
  const { signUpWithGoogle, signupWithPasswordAndEmail, user, error } =
    useSignup();
  useEffect(() => {
    if (userSignup) {
      signupWithPasswordAndEmail(userSignup.email, userSignup.password);
    }
  }, [userSignup]);
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="max-w-96 w-full">
        <Form method="POST">
          <FormInput type="text" label="User name:" name="displayName" />
          <FormInput type="url" label="Photo URL:" name="photoURL" />
          <FormInput type="email" label="Email:" name="Email" />
          <FormInput type="password" label="Password:" name="password" />
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
              Do you have already an account?{" "}
              <Link className="link text-blue-500" to="/signin">
                Login
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;

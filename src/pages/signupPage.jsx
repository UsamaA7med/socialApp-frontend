import { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resendOTP, signup } from "../store/authSlice/thunk";
import { addToast } from "@heroui/toast";

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(null);
  const navigate = useNavigate();
  const disptach = useDispatch();
  console.log(submitted);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    disptach(signup(data)).then((data) => {
      if (!data.error) {
        addToast({
          title: "Account created",
          description:
            "Your account has been created , you must verify your email address",
          color: "success",
        });
        navigate(`/auth/verification/${data.meta.arg.email}`);
        disptach(resendOTP(data.email));
      } else {
        addToast({
          title: "Error",
          description: data.payload.message,
          color: "danger",
        });
      }
    });
  };

  return (
    <div className="w-full min-h-screen gap-6 flex flex-col justify-center items-center space-y-4">
      <div>
        <p className="text-5xl font-bold">Join us</p>
      </div>
      <Form onReset={() => setSubmitted(null)} onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 min-w-60 ">
          <Input
            labelPlacement="outside"
            name="username"
            placeholder="Enter your username"
            maxLength={25}
            minLength={3}
          />
          <Input
            labelPlacement="outside"
            name="fullname"
            placeholder="Enter your full name"
            maxLength={25}
            minLength={3}
          />

          <Input
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />

          <Input
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
          />

          <div className="flex flex-col gap-2">
            <Button className="w-full" color="primary" type="submit">
              Signup
            </Button>
            <p>already have an account ?</p>
            <Button
              onPress={() => navigate("/auth/login")}
              className="w-full"
              color="default"
              type="reset"
            >
              Login
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

import { Form, Input, Button, Spinner } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, resendOTP } from "../store/authSlice/thunk";
import { addToast } from "@heroui/toast";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    const datax = Object.fromEntries(new FormData(e.currentTarget));
    dispatch(login(datax)).then((data) => {
      if (!data.error) {
        addToast({
          title: "Logged in",
          description: "Logged in successfully",
          color: "success",
        });
      } else {
        if (data.payload.message.includes("verified")) {
          navigate(`/auth/verification/${datax.email}`);
          dispatch(resendOTP(datax.email));
        }
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
        <p className="text-5xl font-bold">Let's start</p>
      </div>
      <Form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 min-w-60 ">
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
              Login
            </Button>
            <p>Don't have an account ?</p>
            <Button
              onPress={() => navigate("/auth/signup")}
              className="w-full"
              color="default"
              type="reset"
            >
              Signup
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

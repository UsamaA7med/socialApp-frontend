import { Button, Form, InputOtp } from "@heroui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resendOTP, verifyOTP } from "../store/authSlice/thunk";
import { addToast } from "@heroui/toast";

const VerificationAccountPage = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(resendOTP(email)).then((data) => {
      if (!data.error) {
        addToast({
          title: "OTP sent",
          description: "Check your email for the OTP code",
          color: "success",
        });
      } else {
        addToast({
          title: "Error",
          description: data.payload.message,
          color: "danger",
        });
      }
    });
  }, [dispatch, email]);
  const [resendOtpCount, setResendOtpCount] = useState(true);
  setTimeout(() => {
    setResendOtpCount(false);
  }, 1000 * 60 * 5);
  return (
    <div className="flex w-full min-h-screen flex-col justify-center items-center gap-2">
      <div>
        <p className="text-2xl">Verify your account</p>
      </div>
      <Form
        className="flex w-full flex-col items-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const otp = formData.get("otp");
          dispatch(verifyOTP({ email, otp })).then((data) => {
            if (!data.error) {
              addToast({
                title: "Account verified",
                description: "You can now log in",
                color: "success",
              });
              navigate("/auth/login");
            } else {
              addToast({
                title: "Verification failed",
                description: "invalid OTP code",
                color: "danger",
              });
            }
          });
          setOtp(otp);
        }}
      >
        <InputOtp
          isRequired
          aria-label="OTP input field"
          length={4}
          name="otp"
          placeholder="Enter code"
        />
        <div className="flex gap-2">
          <Button type="submit" color="primary">
            Verify
          </Button>
          <Button
            isDisabled={resendOtpCount}
            onPress={() => dispatch(resendOTP(email))}
          >
            Resend
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default VerificationAccountPage;

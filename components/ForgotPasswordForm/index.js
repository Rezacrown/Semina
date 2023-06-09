import React, { useState, useEffect } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { postData } from "../../utils/fetchData";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
// import decoded from "jwt-decode";

export default function FormSignin() {
  const router = useRouter();
  const query = useSearchParams();
  const pathname = usePathname();

  const queryOtp = query.get("otp");
  const queryId = query.get("setnew");

  const [isLoading, setIsLoading] = useState(false);
  const [confirmForgot, setConfirmForgot] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    id: "",
  });

  useEffect(() => {
    checkQuery()
  }, [queryId, queryOtp, confirmForgot.email]);
  
  
  const checkQuery = () => {
    if (queryOtp === "??" && !confirmForgot.email) {
    router.push("/forgot-password");
    }
  }

  const handleChange = (e) => {
    setConfirmForgot({ ...confirmForgot, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.name === "otp") {
      e.preventDefault();
      handleCheckingOtp();
    }
    if (e.key === "Enter" && e.target.name === "email") {
      e.preventDefault();
      handleForgotPassword();
    }
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    await postData("/api/v1/auth/forgot-password", confirmForgot)
      .then((res) => {
        setConfirmForgot({ ...confirmForgot, id: res?.data?.id });
        setIsLoading(false);
        router.push({
          pathname: "/forgot-password",
          query: { otp: "??" },
        });
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err?.response?.data?.msg || "something error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleCheckingOtp = async () => {
    setIsLoading(true);
    await postData("api/v1/auth/checking/otp", confirmForgot)
      .then((res) => {
        setConfirmForgot({ ...confirmForgot, ValidOtp: res?.data?.statusOtp });
        console.log(confirmForgot)
        router.push({
          pathname: "/forgot-password",
          query: { otp: queryOtp, setnew: "password" },
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await postData("api/v1/auth/forgot-password/confirm", confirmForgot)
      .then((res) => {
        toast.success("Change Password Berhasil", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => router.push("/signin"), 3500);
        setIsLoading(false);
      })
      .catch((err) =>{
        setIsLoading(false)
        console.log(err)
      });
  };

  return (
    <>
      {queryOtp === "??" && confirmForgot.email ? (
        <>
          <h4 style={{ color: "#ffff" }}>
            {confirmForgot?.ValidOtp
              ? "Masukan New Password"
              : "Masukan Kode Otp"}
          </h4>

          {confirmForgot?.ValidOtp === true ? (
            <form className="form-login d-flex flex-column mt-4 mt-md-0 p-30">
              <TextInput
                label={"New Password"}
                type={"password"}
                name="password"
                value={confirmForgot.password}
                placeholder={"type Your password here"}
                onChange={(e) => handleChange(e)}
              />
              <TextInput
                label={"Confirm New Password"}
                type={"password"}
                name="confirmPassword"
                value={confirmForgot.confirmPassword}
                placeholder={"confirm your password"}
                onChange={(e) => handleChange(e)}
              />

              <div className="mt-3">
                <Button

                  variant={"btn-navy"}
                  action={() => handleSubmit()}
                  disabled={isLoading}
                >
                  Set New Password
                </Button>
              </div>
            </form>
          ) : (
            <form className="form-login d-flex flex-column mt-4 mt-md-0 p-30">
              <TextInput
                label={"otp"}
                type={"text"}
                name="otp"
                value={confirmForgot.otp}
                placeholder={"type Your otp here"}
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) => handleKeyDown(e)}
              />

              <div className="mt-3">
                <Button
                  name="button-otp"
                  variant={"btn-navy"}
                  action={() => handleCheckingOtp()}
                  disabled={isLoading}
                >
                  Forgot Password
                </Button>
              </div>
            </form>
          )}
        </>
      ) : (
        <form className="form-login d-flex flex-column mt-4 mt-md-0 p-30">
          <TextInput
            label={"Email"}
            type={"email"}
            name="email"
            value={confirmForgot.email}
            placeholder={"type Your Email here"}
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
          />
          <div className="mt-3">
            <Button
              variant={"btn-navy"}
              action={() => handleForgotPassword()}
              disabled={isLoading}
            >
              Forgot Password
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

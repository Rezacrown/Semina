// import Link from "next/link";
import React, { useState, useEffect } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import { useRouter, useSearchParams } from "next/navigation";
import { postData, putData } from "../../utils/fetchData";
import { toast } from "react-toastify";

export default function FormSignin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");

  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState("");
  const [stackOtp, setStatckOtp] = useState(0)
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  });


  useEffect(() => {
    if (stackOtp >= 3) {
      toast.error("Kode Otp 3x Salah tolong signup ulang", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setStatckOtp(0)
      setTimeout(() => {
        router.push("/signup");
      }, 3000);
    }
  }, [stackOtp]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (keyword === "otp") {
      setIsLoading(true)
      await putData("/api/v1/active", {
        otp: otp,
        email: form.email,
      }).then((res) => {
        if (res?.data) {
          toast.success("berhasil aktipkan akun", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsLoading(false)
          router.push("/signin");
        }
      }).catch((err) => {
        console.log(stackOtp)
        setStatckOtp(stackOtp + 1);
        setIsLoading(false)
      }
      )
    } else {
       setIsLoading(true)
      postData("/api/v1/auth/signup", form).then((res) => {
        if (res?.data) {
          toast.success("berhasil signup", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
           setIsLoading(false)
          router.push({ pathname: "/signup", query: { keyword: "otp" } });
        }
      }).catch((err)=>  setIsLoading(false))
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit()
    }
  };

  return (
    <form className="form-login d-flex flex-column mt-4 mt-md-0">
      {keyword === "otp" ? (
        <TextInput
          label={"otp"}
          type={"text"}
          value={otp}
          name="otp"
          placeholder="Enter opt here"
          onChange={(e) => {
            setOtp(e.target.value);
          }}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
      ) : (
        <>
          <TextInput
            label={"First Name"}
            type={"text"}
            value={form.firstName}
            name="firstName"
            placeholder="First name here"
            onChange={handleChange}
            disabled={isLoading}
          />
          <TextInput
            label={"Last Name"}
            type={"text"}
            name="lastName"
            value={form.lastName}
            placeholder="First name here"
            onChange={handleChange}
            disabled={isLoading}
          />

          <TextInput
            label={"Email"}
            type={"email"}
            name="email"
            value={form.email}
            placeholder={"Type your email here"}
            onChange={handleChange}
            disabled={isLoading}
          />

          <TextInput
            label={"Password (6 characters)"}
            type={"password"}
            value={form.password}
            name="password"
            placeholder="Type your password"
            onChange={handleChange}
            disabled={isLoading}
          />

          <TextInput
            label={"Role"}
            type={"text"}
            value={form.role}
            name="role"
            placeholder="ex: Product Designer"
              onChange={handleChange}
              disabled={isLoading}
          />
        </>
      )}

      <div className="d-grid mt-2">
        <Button
          variant={"btn-green"}
          // onKeyDown={handleKeyDown}
          action={() => handleSubmit()}
          disabled={isLoading}
        >
          {keyword === "code" ? "Verification" : "Sign Up"}
        </Button>
      </div>
    </form>
  );
}

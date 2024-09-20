import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, restUI } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUpSchema, signUpType } from "@validations/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useCheckEmailAvilability from "@hooks/useCheckEmailAvilability";
import React from "react";

const useRegiter = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors: errorForm },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  console.log(errorForm.firstName?.message);
  const submitHandler: SubmitHandler<signUpType> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
  };

  const {
    entredEmail,
    checkEmailAvilability,
    emailAvilabilitySatus,
    resetCheckEmailAvilability,
  } = useCheckEmailAvilability();
  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");

    const { isDirty, invalid } = getFieldState("email");
    const value = e.target.value;

    if (isDirty && !invalid && entredEmail !== value) {
      checkEmailAvilability(value);
    }

    if (isDirty && invalid && entredEmail) {
      resetCheckEmailAvilability();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(restUI());
    };
  }, []);

  return {
    error,
    loading,
    errorForm,
    accessToken,
    emailAvilabilitySatus,
    register,
    handleSubmit,
    submitHandler,
    emailOnBlurHandler,
  };
};

export default useRegiter;

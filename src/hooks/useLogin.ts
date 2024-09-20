import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, restUI } from "@store/auth/authSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInSchema, signUpType } from "@validations/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, loading, accessToken } = useAppSelector((state) => state.auth);
  const [searchParam, steSearchParam] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors: errorForm },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const submitHandler: SubmitHandler<signUpType> = (data) => {
    console.log(data);
    if (searchParam.get("message")) {
      steSearchParam("");
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    return () => {
      dispatch(restUI());
    };
  }, []);

  return {
    error,
    loading,
    accessToken,
    errorForm,
    searchParam,
    register,
    handleSubmit,
    submitHandler,
  };
};

export default useLogin;

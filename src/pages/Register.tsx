import { Navigate } from "react-router-dom";
import { Button, Form, Col, Row, Spinner } from "react-bootstrap";
import { Heading } from "@components/index";
import { Input } from "@components/Form/Input";
import useRegiter from "@hooks/useRegiter";

const Register = () => {
  const {
    error,
    loading,
    errorForm,
    accessToken,
    emailAvilabilitySatus,
    register,
    handleSubmit,
    submitHandler,
    emailOnBlurHandler,
  } = useRegiter();

  if (accessToken) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Heading title="User Register" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Input
              lable="First Name"
              name="firstName"
              register={register}
              error={
                !!errorForm.firstName?.message ? errorForm.firstName?.message : ""
              }
            />
            <Input
              lable="Last Name"
              name="lastName"
              register={register}
              error={!!errorForm.lastName?.message ? errorForm.lastName?.message : ""}
            />
            <Input
              lable="Email address"
              name="email"
              register={register}
              error={
                !!errorForm.email?.message
                  ? errorForm.email?.message
                  : emailAvilabilitySatus === "notAvilable"
                  ? "this email is already use. "
                  : emailAvilabilitySatus === "faild"
                  ? "Error From the server"
                  : ""
              }
              onBlur={emailOnBlurHandler}
              formText={
                emailAvilabilitySatus === "checking"
                  ? "we're currntly checking the avilabilty of this email address. please wait moment"
                  : ""
              }
              success={
                emailAvilabilitySatus === "avilable"
                  ? "this email is avilable for use "
                  : ""
              }
            />
            <Input
              lable="password"
              name="password"
              register={register}
              error={!!errorForm.password?.message ? errorForm.password?.message : ""}
              type="password"
            />
            <Input
              lable="Confirm Password"
              name="confirmPassword"
              register={register}
              error={
                !!errorForm.confirmPassword?.message
                  ? errorForm.confirmPassword?.message
                  : ""
              }
              type="password"
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: "#fff" }}
              disabled={
                emailAvilabilitySatus === "checking"
                  ? true
                  : false || loading === "pending"
              }
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error && (
              <p style={{ color: "#dc3545", marginBottom: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;

import { Navigate } from "react-router-dom";
import { Button, Form, Col, Row, Alert, Spinner } from "react-bootstrap";
import { Heading } from "@components/index";
import { Input } from "@components/Form/Input";
import useLogin from "@hooks/useLogin";

const Login = () => {
  const {
    error,
    loading,
    accessToken,
    errorForm,
    searchParam,
    register,
    handleSubmit,
    submitHandler,
  } = useLogin();

  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParam.get("message") === "account_created" && (
            <Alert variant="success">
              Your Account has Created, Please Login
            </Alert>
          )}
          {searchParam.get("message") === "login_required" && (
            <Alert variant="success">
              You need to login first to see your content
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Input
              name="email"
              lable="Email Address"
              register={register}
              error={!!errorForm.email?.message ? errorForm.email?.message : ""}
            />
            <Input
              type="password"
              name="password"
              lable="Password"
              register={register}
              error={!!errorForm.password?.message ? errorForm.password?.message : ""}
            />
            <Button variant="info" type="submit" style={{ color: "#fff" }}>
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

export default Login;

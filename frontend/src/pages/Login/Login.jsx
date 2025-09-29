import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import {
  LoginWrapper,
  LoginCard,
  FormGroup,
  Input,
  Button,
  Title,
  SubText,
  LinkText,
  TestCred,
  Label,
} from "./LoginStyles";
import FullscreenSpinner from "../../ui/Spinner";

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login, isLoggedIn } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSuccess = () => {
    toast.success("Logged in successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:3000/api/v1/auth/login",
        { ...inputValue },
        { withCredentials: true }
      );

      const { success, token, user } = data;
      if (success) {
        handleSuccess();
        login(token, user);
        setInputValue({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch {
      toast.error("Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <FullscreenSpinner />;

  return (
    <LoginWrapper>
      <LoginCard>
        <Title>Login to Your Account</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              disabled={loading}
            />
            <TestCred>email: test@test.com</TestCred>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              disabled={loading}
            />
            <TestCred>password: test1234</TestCred>
          </FormGroup>

          <Button type="submit" disabled={loading}>
            Login
          </Button>

          <SubText>
            Don’t have an account? <LinkText to="/signup">Sign Up</LinkText>
          </SubText>
          <SubText>
            <LinkText to="/forgot-password">Forgot Password?</LinkText>
          </SubText>
        </form>
      </LoginCard>
    </LoginWrapper>
  );
}

export default Login;

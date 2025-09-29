import {
  Button,
  FormGroup,
  Input,
  Label,
  LinkText,
  SignupCard,
  SignupWrapper,
  SubText,
  Title,
} from "./SignupStyles";

function Signup() {
  return (
    <SignupWrapper>
      <SignupCard>
        <Title>Create New Account</Title>

        <FormGroup>
          <Label>Name</Label>
          <Input type="text" name="Name" placeholder="Enter your name"></Input>
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label>New Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </FormGroup>

        <Button>Signup</Button>

        <SubText>
          Have an account? <LinkText to="/login">Login</LinkText>
        </SubText>
      </SignupCard>
    </SignupWrapper>
  );
}

export default Signup;

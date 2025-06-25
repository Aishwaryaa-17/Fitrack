// import React, { useState } from "react";
// import styled from "styled-components";
// import TextInput from "./TextInput";
// import Button from "./Button";
// import { UserSignIn } from "../api";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../redux/reducers/userSlice";
// import { showSuccess, showError } from '../utils/alert';

// const Container = styled.div`
//   width: 100%;
//   max-width: 500px;
//   display: flex;
//   flex-direction: column;
//   gap: 36px;
// `;

// const Title = styled.div`
//   font-size: 30px;
//   font-weight: 800;
//   color: ${({ theme }) => theme.text_primary};
// `;

// const Span = styled.div`
//   font-size: 16px;
//   font-weight: 400;
//   color: ${({ theme }) => theme.text_secondary + 90};
// `;

// const SignIn = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [buttonDisabled, setButtonDisabled] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const validateInputs = () => {
//     if (!email || !password) {
//       alert("Please fill in all fields");
//       return false;
//     }
//     return true;
//   };
  

//   const handleSignIn = async () => {
//     if (!validateInputs()) return;

//     setLoading(true);
//     setButtonDisabled(true);

//     try {
//       const res = await UserSignIn({ email, password });

//       if (res && res.data) {
//         dispatch(loginSuccess(res.data)); // expects { user, token }
//         alert("Login Success");
//       } else {
//         alert("Unexpected response from server");
//         console.log("Server response:", res);
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       alert(err?.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//       setButtonDisabled(false);
//     }
//   };

//   return (
//     <Container>
//       <div>
//         <Title>Welcome to FiTrack 👋</Title>
//         <Span>Please login with your details here</Span>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//           flexDirection: "column",
//         }}
//       >
//         <TextInput
//           label="Email Address"
//           placeholder="Enter your email address"
//           value={email}
//           handelChange={(e) => setEmail(e.target.value)}
//         />
//         <TextInput
//           label="Password"
//           placeholder="Enter your password"
//           password
//           value={password}
//           handelChange={(e) => setPassword(e.target.value)}
//         />
//         <Button
//           text="SignIn"
//           onClick={handleSignIn}
//           isLoading={loading}
//           isDisabled={buttonDisabled}
//         />
//       </div>
//     </Container>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { showSuccess, showError } from "../utils/alert"; // ✅ SweetAlert2 alerts

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      showError("Missing Fields", "Please fill in all fields");
      return false;
    } else {
      const fitEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!fitEmailRegex.test(email)) {
        showError("Invalid Email", "Please enter a valid email address.");
        return false;
      }
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setButtonDisabled(true);

    try {
      const res = await UserSignIn({ email, password });

      if (res && res.data) {
        dispatch(loginSuccess(res.data)); // expects { user, token }
        showSuccess("Login Successful", "Welcome back to FiTrack!");
      } else {
        showError("Unexpected Response", "Unexpected response from server");
        console.log("Server response:", res);
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Login failed. Please try again.";
      if (errorMessage.toLowerCase().includes("email")) {
        showError("Incorrect Email", "This email address is not registered.");
      } else if (errorMessage.toLowerCase().includes("password")) {
        showError("Incorrect Password", "The password you entered is incorrect.");
      } else {
        showError("Login Failed", errorMessage);
      }
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to FiTrack 👋</Title>
        <Span>Please login with your details here</Span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="SignIn"
          onClick={handleSignIn}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignIn;


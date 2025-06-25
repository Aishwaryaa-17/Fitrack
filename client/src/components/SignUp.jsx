// import React, { useState } from "react";
// import styled from "styled-components";
// import TextInput from "./TextInput";
// import Button from "./Button";
// import { UserSignUp } from "../api";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../redux/reducers/userSlice";

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

// const SignUp = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [buttonDisabled, setButtonDisabled] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const validateInputs = () => {
//     if (!name || !email || !password) {
//       alert("Please fill in all fields");
//       return false;
//     }
  
//     const fitEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!fitEmailRegex.test(email)) {
//       alert("Invalid Email! Please enter a valid email address.");
//       return false;
//     }
  
//     return true;
//   };
  

//   const handleSignUp = async () => {
//     if (!validateInputs()) return;

//     setLoading(true);
//     setButtonDisabled(true);

//     try {
//       const res = await UserSignUp({ name, email, password });

//       if (res && res.data) {
//         dispatch(loginSuccess(res.data)); // Make sure res.data has user + token
//         alert("Account Created Successfully");
//       } else {
//         alert("Unexpected server response");
//         console.log("Response:", res);
//       }
//     } catch (err) {
//       console.error("Signup error:", err);
//       alert(err?.response?.data?.message || "Signup failed. Please try again.");
//     } finally {
//       setLoading(false);
//       setButtonDisabled(false);
//     }
//   };

//   return (
//     <Container>
//       <div>
//         <Title>Create New Account 👋</Title>
//         <Span>Please enter details to create a new account</Span>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//           flexDirection: "column",
//         }}
//       >
//         <TextInput
//           label="Full name"
//           placeholder="Enter your full name"
//           value={name}
//           handelChange={(e) => setName(e.target.value)}
//         />
//         <TextInput
//           label="Email Address"
//           placeholder="Enter your email"
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
//           text="SignUp"
//           onClick={handleSignUp}
//           isLoading={loading}
//           isDisabled={buttonDisabled}
//         />
//       </div>
//     </Container>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { showSuccess, showError } from "../utils/alert"; // ✅ import SweetAlert2 utilities

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

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const validateInputs = () => {
    if (!name || !email || !password) {
      showError("Missing Fields", "Please fill in all fields");
      return false;
    }
    const fitEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!fitEmailRegex.test(email)) {
      showError("Invalid Email", "Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setButtonDisabled(true);

    try {
      const res = await UserSignUp({ name, email, password });

      if (res && res.data) {
        dispatch(loginSuccess(res.data)); // expects { user, token }
        showSuccess("Account Created", "Welcome to FiTrack!");
      } else {
        showError("Server Error", "Unexpected response from server");
        console.log("Response:", res);
      }
    } catch (err) {
      console.error("Signup error:", err);
      showError("Signup Failed", err?.response?.data?.message || "Please try again.");
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Create New Account 👋</Title>
        <Span>Please enter details to create a new account</Span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <TextInput
          label="Full name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email"
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
          text="SignUp"
          onClick={handleSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignUp;


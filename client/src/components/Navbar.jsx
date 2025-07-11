// import React, { useState } from "react";
// import styled from "styled-components";
// import LogoImg from "../utils/Images/Logo.png";
// import { Link as LinkR, NavLink } from "react-router-dom";
// import { MenuRounded } from "@mui/icons-material";
// import { Avatar } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { logout } from "../redux/reducers/userSlice";

// const Nav = styled.div`
//   background-color: ${({ theme }) => theme.bg};
//   height: 80px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1rem;
//   position: sticky;
//   top: 0;
//   z-index: 10;
//   color: white;
//   border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
// `;
// const NavContainer = styled.div`
//   width: 100%;
//   max-width: 1400px;
//   padding: 0 24px;
//   display: flex;
//   gap: 14px;
//   align-items: center;
//   justify-content: space-between;
//   font-size: 1rem;
// `;
// const NavLogo = styled(LinkR)`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   gap: 16px;
//   padding: 0 6px;
//   font-weight: 600;
//   font-size: 18px;
//   text-decoration: none;
//   color: ${({ theme }) => theme.black};
// `;
// const Logo = styled.img`
//   height: 42px;
// `;
// const Mobileicon = styled.div`
//   color: ${({ theme }) => theme.text_primary};
//   display: none;
//   @media screen and (max-width: 768px) {
//     display: flex;
//     align-items: center;
//   }
// `;

// const NavItems = styled.ul`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 32px;
//   padding: 0 6px;
//   list-style: none;

//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `;
// const Navlink = styled(NavLink)`
//   display: flex;
//   align-items: center;
//   color: ${({ theme }) => theme.text_primary};
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 1s slide-in;
//   text-decoration: none;
//   &:hover {
//     color: ${({ theme }) => theme.primary};
//   }
//   &.active {
//     color: ${({ theme }) => theme.primary};
//     border-bottom: 1.8px solid ${({ theme }) => theme.primary};
//   }
// `;

// const UserContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: flex-end;
//   gap: 16px;
//   align-items: center;
//   padding: 0 6px;
//   color: ${({ theme }) => theme.primary};
// `;
// const TextButton = styled.div`
//   text-align: end;
//   color: ${({ theme }) => theme.secondary};
//   cursor: pointer;
//   font-size: 16px;
//   transition: all 0.3s ease;
//   font-weight: 600;
//   &:hover {
//     color: ${({ theme }) => theme.primary};
//   }
// `;

// const MobileMenu = styled.ul`
//   display: flex;
//   flex-direction: column;
//   align-items: start;
//   gap: 16px;
//   padding: 0 6px;
//   list-style: none;
//   width: 90%;
//   padding: 12px 40px 24px 40px;
//   background: ${({ theme }) => theme.bg};
//   position: absolute;
//   top: 80px;
//   right: 0;
//   transition: all 0.6s ease-in-out;
//   transform: ${({ isOpen }) =>
//     isOpen ? "translateY(0)" : "translateY(-100%)"};
//   border-radius: 0 0 20px 20px;
//   box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
//   opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
//   z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
// `;

// const Navbar = ({ currentUser }) => {
//   const dispatch = useDispatch();
//   const [isOpen, setisOpen] = useState(false);
//   return (
//     <Nav>
//       <NavContainer>
//         <Mobileicon onClick={() => setisOpen(!isOpen)}>
//           <MenuRounded sx={{ color: "inherit" }} />
//         </Mobileicon>
//         <NavLogo to="/">
//           <Logo src={LogoImg} />
//           FiTrack
//         </NavLogo>

//         <MobileMenu isOpen={isOpen}>
//           <Navlink to="/">Dashboard</Navlink>
//           <Navlink to="/workouts">Workouts</Navlink>
//           <Navlink to="/tutorials">Tutorials</Navlink>
//           <Navlink to="/blogs">Blogs</Navlink>
//           <Navlink to="/contact">Contact</Navlink>
//         </MobileMenu>

//         <NavItems>
//           <Navlink to="/">Dashboard</Navlink>
//           <Navlink to="/workouts">Workouts</Navlink>
//           {/* <Navlink to="/tutorials">Tutorials</Navlink> */}
//           <Navlink to="/blogs">Blogs</Navlink>
//           <Navlink to="/contact">Contact</Navlink>
//         </NavItems>

//         <UserContainer>
//           <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
//           <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
//         </UserContainer>
//       </NavContainer>
//     </Nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import styled from "styled-components";
import LogoImg from "../utils/Images/Logo.png";
import { Link as LinkR, NavLink } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";
import { showConfirmation, showSuccess } from "../utils/alert"; // ✅ SweetAlert2 popup functions

// Styled components (your original styles)

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;
const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled(LinkR)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 6px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;
const Logo = styled.img`
  height: 42px;
`;
const Mobileicon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 1s slide-in;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
`;

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
  padding: 0 6px;
  color: ${({ theme }) => theme.primary};
`;
const TextButton = styled.div`
  text-align: end;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* align items to the left */
  gap: 12px;
  padding: 16px 20px;
  list-style: none;

  width: 100%; /* ✅ full width to prevent overflow */
  max-width: 100vw; /* ✅ hard cap on width */
  box-sizing: border-box; /* ✅ include padding in width */
  
  background: ${({ theme }) => theme.bg};
  position: absolute;
  top: 80px;
  right: 0;
  
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};

  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;


// ✅ Main Component
const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // ✅ SweetAlert2 confirmation and logout
  const handleLogout = async () => {
    const result = await showConfirmation("Are you sure?", "You will be logged out.");
    if (result.isConfirmed) {
      dispatch(logout()); // redux logout
      showSuccess("Logged Out", "You have been successfully logged out.");
    }
  };

  return (
    <Nav>
      <NavContainer>
        <Mobileicon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded sx={{ color: "inherit" }} />
        </Mobileicon>

        <NavLogo to="/">
          <Logo src={LogoImg} />
          FiTrack
        </NavLogo>

        <MobileMenu isOpen={isOpen}>
          <Navlink to="/">Dashboard</Navlink>
          <Navlink to="/workouts">Workouts</Navlink>
          <Navlink to="/blogs">Blogs</Navlink>
          <Navlink to="/contact">Contact</Navlink>
        </MobileMenu>

        <NavItems>
          <Navlink to="/">Dashboard</Navlink>
          <Navlink to="/workouts">Workouts</Navlink>
          <Navlink to="/blogs">Blogs</Navlink>
          <Navlink to="/contact">Contact</Navlink>
        </NavItems>

        <UserContainer>
          <Avatar src={currentUser?.img}>{currentUser?.name?.[0]}</Avatar>
          <TextButton onClick={handleLogout}>Logout</TextButton>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;

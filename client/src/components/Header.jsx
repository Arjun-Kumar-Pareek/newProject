import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoWalletOutline } from "react-icons/io5";

const Header = () => {
  const [userData, setUserData] = useState({});
  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/view-user", {
        method: "GET",
        headers: {},
      });
      if (response.ok) {
        const completeRes = await response.json();
        const completeData = completeRes.data;
        setUserData(completeData);
      } else {
        const errorResponse = await response.json();
        console.log("Error on fetchUser function :", errorResponse.message);
      }
    } catch (error) {
      console.log("Error on fetchUser function :", error.message);
    }
  };

  fetchUser();

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ColorFox</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/my-portfolio">My Portfolio</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <IoWalletOutline style={{ color: "white", fontSize: "30px" }} />
            <span style={{ color: "white", fontSize: "15px" }}>
              {userData.totalMoney}
            </span>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

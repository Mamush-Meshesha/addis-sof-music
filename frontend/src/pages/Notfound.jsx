import { useLocation } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import {
  Container,
  ContentWrapper,
  Title,
  Description,
  HomeLink,
} from "../components/styled/Notfound";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Container>
      <ContentWrapper>
        <Title>404</Title>
        <Description>Oops! Page not found</Description>
        <HomeLink href="/">Return to Home</HomeLink>
      </ContentWrapper>
    </Container>
  );
};

export default NotFound;

import styled from "@emotion/styled";
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6; 
`;

const ContentWrapper = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.25rem; 
  font-weight: bold;
  margin-bottom: 1rem; 
`;

const Description = styled.p`
  font-size: 1.25rem; 
  color: #4b5563; 
  margin-bottom: 1rem; 
`;

const HomeLink = styled.a`
  color: #3b82f6; 
  text-decoration: underline;

  &:hover {
    color: #1d4ed8; 
  }
`;

export { Container, ContentWrapper, Title, Description, HomeLink };

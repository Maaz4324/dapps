import React from "react";
import styled from "styled-components";
import wellness from "../../images/wellness.jpg";
import neckpain from "../../images/neckpain.jpg";
import backpain from "../../images/backpain.jpg";
import pediatric from "../../images/pediatric.jpg";
import pregnancy from "../../images/pregnancy.jpg";
import headaches from "../../images/headache.jpg";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

function Illness() {
  return (
    <IllnessContainer>
      <Container>
        <Fade left>
          <Link to="/neckpain" style={{ textDecoration: "none" }}>
            <Box className="neckpain">
              <H3>NECK PAIN</H3>
            </Box>
          </Link>
        </Fade>
        <Fade left>
          <Link to="/backpain" style={{ textDecoration: "none" }}>
            <Box className="backpain">
              <H3>BACK PAIN</H3>
            </Box>
          </Link>
        </Fade>
        <Fade left>
          <Link to="/headache" style={{ textDecoration: "none" }}>
            <Box className="headaches">
              <H3>HEADACHES</H3>
            </Box>
          </Link>
        </Fade>
        <Fade left>
          <Link to="/pediatric" style={{ textDecoration: "none" }}>
            <Box className="pediatric">
              <H3>PEDIATRIC CARE</H3>
            </Box>
          </Link>
        </Fade>
        <Fade left>
          <Link to="/pregnancy" style={{ textDecoration: "none" }}>
            <Box className="pregnancy">
              <H3>PREGNANCY</H3>
            </Box>
          </Link>
        </Fade>
        <Fade left>
          <Link to="/wellness" style={{ textDecoration: "none" }}>
            <Box className="wellness">
              <H3>WELLNESS</H3>
            </Box>
          </Link>
        </Fade>
      </Container>
    </IllnessContainer>
  );
}

export default Illness;

const IllnessContainer = styled.div`
  background-color: var(--lightblue);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .neckpain {
    background-image: linear-gradient(
        rgba(123, 123, 123, 0.5),
        rgba(122, 122, 122, 0.5)
      ),
      url(${neckpain});
    &:hover {
      background-image: linear-gradient(
          rgba(183, 183, 183, 0.5),
          rgba(183, 183, 183, 0.5)
        ),
        url(${neckpain});
    }
  }
  .backpain {
    background-image: linear-gradient(
        rgba(123, 123, 123, 0.5),
        rgba(122, 122, 122, 0.5)
      ),
      url(${backpain});
    &:hover {
      background-image: linear-gradient(
          rgba(183, 183, 183, 0.5),
          rgba(183, 183, 183, 0.5)
        ),
        url(${backpain});
    }
  }
  .wellness {
    background-image: linear-gradient(
        rgba(123, 123, 123, 0.5),
        rgba(122, 122, 122, 0.5)
      ),
      url(${wellness});
    &:hover {
      background-image: linear-gradient(
          rgba(183, 183, 183, 0.5),
          rgba(183, 183, 183, 0.5)
        ),
        url(${wellness});
    }
  }
  .pregnancy {
    background-image: linear-gradient(
        rgba(123, 123, 123, 0.5),
        rgba(122, 122, 122, 0.5)
      ),
      url(${pregnancy});
    &:hover {
      background-image: linear-gradient(
          rgba(183, 183, 183, 0.5),
          rgba(183, 183, 183, 0.5)
        ),
        url(${pregnancy});
    }
  }
  .pediatric {
    background-image: linear-gradient(
        rgba(123, 123, 123, 0.5),
        rgba(122, 122, 122, 0.5)
      ),
      url(${pediatric});
    text-align: center;
    &:hover {
      background-image: linear-gradient(
          rgba(183, 183, 183, 0.5),
          rgba(183, 183, 183, 0.5)
        ),
        url(${pediatric});
    }
  }
  .headaches {
    background-image: linear-gradient(
        rgba(123, 123, 123, 0.5),
        rgba(122, 122, 122, 0.5)
      ),
      url(${headaches});
    &:hover {
      background-image: linear-gradient(
          rgba(183, 183, 183, 0.5),
          rgba(183, 183, 183, 0.5)
        ),
        url(${headaches});
    }
  }
`;

const Box = styled.div`
  margin: 20px;
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const H3 = styled.h3`
  word-wrap: break-word;
  color: black;
`;

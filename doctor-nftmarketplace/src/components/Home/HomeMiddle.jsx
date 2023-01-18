import React from "react";
import styled from "styled-components";
import office from "../../images/office.jpg";

function HomeMiddle() {
  return (
    <HomeMiddleContainer>
      <Container>
        <H1>
          Working with New Leaf Chiropractic will make a difference in your
          health.
        </H1>
        <Content>
          <Left>
            <H2>WHAT SETS US APART</H2>
            <Para>
              We are very family-oriented in our office, seeing babies, and
              elderly alike, as well as pregnant moms and athletes. We know that
              taking care of the spine, no matter who you are, is crucial for
              overall health. We get to know everyone that walks into our office
              and focus on them and their specific needs, so we are not a
              "one-size-fits-all" place. We use very specific diagnostic testing
              to assess each individual and provide them with a specific care
              plan designed for them. <br /> We also are trained and certified
              in one of the most well-researched Chiropractic techniques in the
              world, the Torque Release Technique. This technique works with the
              nervous system to make sure the body is able to communicate with
              the brain. We are also certified in Webster's Technique, which
              helps prepare a pregnant mom's pelvis to achieve the optimal
              environment for the baby to grow and thrive. This technique also
              helps maintain a body healthy for labor and delivery of the baby.
            </Para>
          </Left>
          <Right>
            <H2>COMMON CONDITIONS WE HELP</H2>
            <Para>
              The nervous system controls how the body works, and if there is
              pressure on the nerves, many issues can occur. Issues such as
              headaches/migraines, neck pain, back pain, sciatica in adults and
              ear infections, asthma and several other conditions in kids.{" "}
              <br /> We simply remove the interference in the body and allow it
              to do what it was designed to do. In the 2 years we have been
              opened we have seen issues improve and resolved such as
              infertility, digestive issues, knee pain and other joint
              dysfunctions to name a few. <br /> We also see many babies and
              children with issues such as asthma, allergies, autism, cerebral
              palsy, bed-wetting, earaches and frequent illnesses as well.{" "}
              <br /> The many medications these kids are on only mask their
              issues, but Chiropractic care has been proven to alleviate many of
              these conditions in children.
            </Para>
          </Right>
        </Content>
      </Container>
    </HomeMiddleContainer>
  );
}

export default HomeMiddle;

const HomeMiddleContainer = styled.div`
  background-image: linear-gradient(
      rgba(223, 223, 223, 0.5),
      rgba(222, 222, 222, 0.5)
    ),
    url(${office});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: start;
  padding: 30px;
  background-color: #e5e5e5;
  @media (max-width: 1047px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Right = styled.div`
  width: 45%;
  padding-left: 30px;
  @media (max-width: 1047px) {
    padding-left: 0px;
    width: 100%;
  }
`;

const Left = styled.div`
  width: 45%;
  padding-right: 30px;
  @media (max-width: 1047px) {
    padding-left: 0px;
    width: 100%;
  }
`;

const Para = styled.p`
  color: var(--gray);
`;

const H1 = styled.h1`
  text-align: center;
`;

const H2 = styled.h2`
  font-size: 24px;
`;

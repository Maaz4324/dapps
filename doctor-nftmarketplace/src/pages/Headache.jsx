import React from "react";
import styled from "styled-components";
import headache1 from "../images/headache1.jpg";
import HomeFoot from "../components/Home/HomeFoot";
import OfficeHour from "../components/OfficeHour";

function Headache() {
  return (
    <HeadacheContainer>
      <Container>
        <Left>
          <H1>DEALING WITH HEADACHES AND MIGRAINES</H1>
          <ImgContainer>
            <img src={headache1} alt="" />
          </ImgContainer>
          <Para>
            Headaches are not fun, and migraines are another level of awful.
            Living with either of these issues can make you feel grumpy, and in
            the worst-case scenario, leave you unable to function. Medication
            can help in the short term, but when the problem is ongoing or
            re-occurring, pills are not enough. Oftentimes, the source of your
            headaches and migraines is structural, and therefore with proper
            treatment it is possible to permanently overcome this debilitating
            issue. Headache relief at our Miami chiropractic clinic may be the
            solution your looking for.
          </Para>
          <Line></Line>
          <H3>HEADACHES AND MIGRAINES IN MIAMI</H3>
          <Para>
            Whether you are dealing with a persistent ache in your head, or the
            worst symptoms associated with migraines, including light and noise
            intolerance, nausea, vomiting, hallucinations, depression, and
            irritation the cause may be a structural issue. When the spine moves
            out of position because of developmental issues, trauma, repetitive
            stress, and other incidents, it can put pressure on the surrounding
            nerves. When the nerves are compressed or irritated, they send a
            message to the muscles of the back, neck, and jaw to tighten.
            <br />
            <br />
            This tightness can lead directly to an acute headache or migraine.
            Over time the tightness can also pull your bones out of alignment
            leading to more persistent headaches and migraines. A headache or
            migraine can be a sign that there are deeper problems arising in
            your spinal column, and because every other system in your body is
            impacted by your spinal health, it is very important to deal with
            these issues when the signs begin to arise.
          </Para>
          <Line></Line>
          <H3>CHIROPRACTIC TREATMENT FOR HEADACHES AND MIGRAINES</H3>
          <Para>
            Chiropractic care has a long history of successfully treating
            headaches and migraines. Chiropractors have an extensive
            understanding of subtle issues occurring in the spine which, due to
            its connection with the nervous system, is very often the source of
            pain. A chiropractic treatment starts with a thorough evaluation
            that will rule out other possible causes of your headache and
            examine your spine for issues of misalignment.
            <br />
            <br />
            The assessment will determine the exact type of treatment that is
            necessary for the specific issue at the root of the pain. Using
            gentle and non-invasive techniques a chiropractor is able to achieve
            adjustments to the spine that, although they may seem subtle, can
            provide almost instant relief and restore your long-term health.
            Unlike medications which treat the problem on the surface level and
            provide only short-term relief, a chiropractic adjustment will
            address the cause of your headache or migraine and provide lasting
            results that will improve your quality of life.
            <br />
            <br />
            If you are struggling with migraines or headaches call our team at
            New Leaf Chiropractic today for help.
          </Para>
        </Left>
        <OfficeHour />
      </Container>
      <HomeFoot />
    </HeadacheContainer>
  );
}

export default Headache;

const HeadacheContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 70px;
  @media (max-width: 991px) {
    padding-top: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: 1047px;
  margin: 0 auto;
  padding: 10px;

  @media (max-width: 890px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`;

const Left = styled.div`
  width: 70%;
  @media (max-width: 890px) {
    width: 100%;
  }
`;

const Line = styled.div`
  border-bottom: 1px solid var(--lightgray);
  width: 100%;
  margin: 20px auto;
`;
const H1 = styled.h1`
  margin: 20px 0;
`;

const H3 = styled.h3`
  margin: 20px 0;
  color: var(--headgray);
`;

const Para = styled.p`
  margin: 20px 0;
  color: var(--gray);
`;

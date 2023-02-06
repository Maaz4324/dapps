import React from "react";
import styled from "styled-components";
import wellness from "../../images/wellness1.jpg";
import HomeFoot from "../../components/Home/HomeFoot";
import OfficeHour from "../../components/OfficeHour";
import Fade from "react-reveal/Fade";

function Wellness() {
  return (
    <WellnessContainer>
      <Container>
        <Left>
          <Fade big cascade>
            <H1>WELLNESS CARE IS IMPORTANT</H1>
            <ImgContainer>
              <img src={wellness} alt="" />
            </ImgContainer>
            <Para>
              Just because you don't feel sick, does not mean you feel as great
              as you could. Far too many people wait until they are sick to find
              a chiropractic clinic in Miami. It is common in our culture to
              accept a slow decline in health as we age, but it is also
              unnecessary. We now have information and the advances in the field
              of health and wellness to live a life of optimal health which,
              contrary to popular belief, can actually get better as we grow
              older. This article will walk you through some of the common
              beliefs about health and discusses how chiropractic medicine can
              be an important part of your preventative, wellness care plan.
            </Para>
            <Line></Line>
            <H3>HOW LIFESTYLE AFFECTS OVERALL WELLNESS IN MIAMI</H3>
            <Para>
              The decisions we make and the actions we take in each moment of
              our day affect our bodies and can slowly produce problems that may
              not show symptoms. What we eat, how we sit, the work that we do
              with our bodies, and even the way we emotionally react to a
              situation, can have long-term impacts on our wellness. If you
              spend your days sitting at a desk, the way you hold your head or
              place your arms can have a major impact, not only on your neck and
              shoulders, but also on your whole body. <br /> <br /> This is
              because the bundle of nerves that sends messages to every other
              part of our body, originates in our spinal column. When vertebrae
              become misaligned there are dozens of possible impacts upon our
              health. This also goes for how we hold emotions in the body. If we
              are chronically tensing our shoulders due to stress or anxiety,
              this can once again impact the spine and the rest of the body. As
              you can see, even if we don't feel sick, we may be in need of a
              little extra care to prevent daily activities from becoming more
              severe problems.
            </Para>
            <Line></Line>
            <H3>WHY WE NEED WELLNESS CARE</H3>
            <Para>
              Health can be defined as the body functioning properly rather than
              just feeling good. You may not feel sick today, but if your
              nervous system is being impeded from sending messages to other
              organs and systems in the body, things may not be working as well
              as they could be. Through a regular wellness care program that
              works to restore spinal health and mobility, people often find
              that they have more energy and do not get sick as often. When the
              nervous system is functioning properly, the benefits are endless.
              Digestion, blood flow, lung capacity, heartbeat, skin tone, and
              overall mobility are just some of the body’s functions that are
              positively impacted by a spine that is properly aligned.
            </Para>
            <Line></Line>
            <H3>CHIROPRACTIC TREATMENT AS PART OF A WELLNESS CARE PLAN</H3>
            <Para>
              Chiropractic treatments work to keep the integrity of the nervous
              system intact and are an excellent choice as a part of a wellness
              care plan. Regular, gentle adjustments can ensure that the daily
              impacts of your life are not wearing your health down over time.
              By performing a thorough evaluation of your health history and
              current physical state, a chiropractor can help you detect
              problems before they develop into a more serious issue, keeping
              you at peak function and feeling great. Call to set up a
              consultation with our team at New Leaf Chiropractic and start on
              the path of chiropractic wellness care today.
            </Para>
          </Fade>
        </Left>
        <OfficeHour />
      </Container>
      <HomeFoot />
    </WellnessContainer>
  );
}

export default Wellness;

const WellnessContainer = styled.div`
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

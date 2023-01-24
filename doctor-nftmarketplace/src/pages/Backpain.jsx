import React from "react";
import styled from "styled-components";
import expertise from "../images/expertise.webp";
import backpain from "../images/backpain1.jpg";
import specialPatient from "../images/specialPatient.png";
import { Link } from "react-router-dom";
import HomeFoot from "../components/Home/HomeFoot";

function Backpain() {
  return (
    <BackpainContainer>
      <Container>
        <Left>
          <H1>DO YOU HAVE BACK PAIN?</H1>
          <ImgContainer>
            <img src={backpain} alt="" />
          </ImgContainer>
          <Para>
            If you are living with chronic back pain then chiropractic care in
            Miami might be a good treatment option. Almost everyone will
            experience some form of back pain, ranging from slightly irritating
            to completely crippling, in their lifetime. Whatever the degree of
            pain you are experiencing and whether it is acute or has become
            chronic, at the very least you would probably rather live without
            it. In the most extreme cases in can be difficult to go on living
            with it. This article aims to help you to understand what causes
            lower back pain, and how chiropractic treatment can help you achieve
            lasting back health so that you can go on enjoying those walks in
            the park.
          </Para>
          <Line></Line>
          <H3>BACK PAIN IN MIAMI</H3>
          <Para>
            The back is a broad term that covers a large area of the body. It is
            made up of many tendons, ligaments, discs, muscles, and bones.
            Without a solid understanding of these different parts, it can
            complicated to locate and address the source of the pain. The
            following explains some of the most common issues and their
            identifying features. It also explains how chiropractic medicine can
            help to resolve them. This is a general guideline to help you in
            your quest for effective treatment, but we highly recommend that you
            seek a professional opinion to properly diagnose these issues.
          </Para>
          <Line></Line>
          <H3>DISC BULGES AND HERNIATIONS</H3>
          <Para>
            Disc bulges and herniations are conditions in which the outer edges
            of the discs, located between the vertebrae, are damaged. This
            causes the jelly-like center to bulge or be pushed out. This is a
            surprisingly common issue and it is often, but not always, very
            painful. Many people who have this condition feel nothing at all.
            The quality and intensity of it, for those who experience pain,
            depends on the type and position of the herniation. If the damaged
            disc is irritating a surrounding nerve, shooting or stabbing pain
            along with weakness in the legs is often severe. <br /> It is
            important that this issue is properly identified and promptly
            treated to avoid further damage. A chiropractor in Miami will
            thoroughly assess your back to determine the extent of the issue and
            the appropriate treatment to prevent worsening of the herniation,
            and provide relief from the associated pain.
          </Para>
          <Line></Line>
          <H3>SUBLUXATIONS</H3>
          <Para>
            Subluxation is a medical term describing a misalignment in the
            vertebral column. There are a wide variety of causes, including
            physical stress, trauma, and toxins. Subluxations are often quite
            painful and can disrupt normal movement. Subluxations are one of the
            most commonly overlooked contributors to back pain. Chiropractors
            are trained to identify and correct this issue using non-invasive
            adjustment techniques.
          </Para>
          <Line></Line>
          <H3>MUSCULAR SPRAINS AND TENDON OR LIGAMENT STRAINS</H3>
          <Para>
            Strains and sprains most typically occur when we engage in tasks
            that our body is not accustomed to, or when we are involved in an
            accident. Lifting while twisting, or stretching past one's limits
            are common causes to strains and sprains of the back. These can be
            extremely painful, and are often accompanied by swelling and
            bruising of the surrounding area. Strains and sprains in the back
            tend to involve changes to the alignment of the spine and typically
            respond well to chiropractic care.
          </Para>
          <Line></Line>
          <H3>STRESS AND BACK PAIN</H3>
          <Para>
            Chronic stress wreaks havoc on the body, and can eventually lead to
            hyper-tension and chronic back pain. The back pain is a result of
            tension and muscle spasms that occur when stress hormones are
            released. The tension will often accumulate in what are referred to
            as trigger points. These trigger points can be extremely painful and
            need professional attention to resolve. Chiropractors have the
            knowledge and tools to relieve stress from trigger points and to
            deal with underlying nervous system imbalances that may be keeping
            your body locked in patterns of stress and pain.
          </Para>
          <Line></Line>
          <H3>OTHER ISSUES THAT CAUSE BACK PAIN</H3>
          <Para>
            Conditions such as obesity, arthritis, kidney stones, and urinary
            tract infections have been shown to cause symptoms of lower back
            pain. These are all serious issues that need to be identified and
            treated immediately to avoid long-term health issues. Miami
            chiropractic doctors are trained to identify these issues and
            support you in getting the appropriate treatment. Many of these
            issues can have their source in spinal misalignments and respond
            well to chiropractic adjustments. <br /> If you have questions about
            how our team at New Leaf Chiropractic can help you, please schedule
            a consultation today.
          </Para>
          <Line></Line>
        </Left>
        <Right>
          <Link to="/special">
            <ImgContainer>
              <img src={specialPatient} alt="" />
            </ImgContainer>
          </Link>
          <OfficeHourContainer>
            <H4>OFFICE HOURS</H4>
            <HourLine></HourLine>
            <H5>Monday</H5>
            <Time>
              10:00am - 1:00pm
              <br /> 10:00am - 1:00pm
            </Time>
            <HourLine></HourLine>
            <H5>Monday</H5>
            <Time>
              10:00am - 1:00pm
              <br /> 10:00am - 1:00pm
            </Time>
            <HourLine></HourLine>
            <H5>Monday</H5>
            <Time>By Appointment Only</Time>
            <HourLine></HourLine>
            <H5>Monday</H5>
            <Time>
              10:00am - 1:00pm
              <br /> 10:00am - 1:00pm
            </Time>
            <HourLine></HourLine>
            <H5>Monday</H5>
            <Time>By Appointment Only</Time>
            <HourLine></HourLine>
            <H5>Monday</H5>
            <Time>By Appointment Only</Time>
          </OfficeHourContainer>
          <RightAboutContainer>
            <RightImg className="expertise" src={expertise} />
          </RightAboutContainer>
        </Right>
      </Container>
      <HomeFoot />
    </BackpainContainer>
  );
}

export default Backpain;

const BackpainContainer = styled.div`
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

const Right = styled.div`
  width: 30%;
  text-align: center;
  @media (max-width: 890px) {
    width: 60%;
  }
`;

const RightAboutContainer = styled.div`
  width: 100%;
`;

const OfficeHourContainer = styled.div`
  text-align: center;
  padding: 30px 0;
`;

const ImgContainer = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`;

const Left = styled.div`
  width: 70%;
  padding-right: 30px;
  @media (max-width: 890px) {
    width: 100%;
  }
`;

const Line = styled.div`
  border-bottom: 1px solid var(--lightgray);
  width: 100%;
  margin: 20px auto;
`;
const HourLine = styled.div`
  border-bottom: 1px solid var(--lightgray);
  width: 60%;
  margin: 0px auto;
`;

const H1 = styled.h1`
  margin: 20px 0;
`;

const H3 = styled.h3`
  margin: 20px 0;
  color: var(--headgray);
`;
const H4 = styled.h4`
  margin: 20px 0;
  color: var(--blue);
`;

const Para = styled.p`
  margin: 20px 0;
  color: var(--gray);
`;
const Time = styled.p`
  /* line-height: 100%; */
  color: var(--gray);
`;

const H5 = styled.h5`
  font-size: 17px;
  color: var(--headgray);
`;

const RightImg = styled.img`
  width: 60%;
`;

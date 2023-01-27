import React from "react";
import styled from "styled-components";
import neckpain from "../../images/neckpain2.jpg";
import HomeFoot from "../../components/Home/HomeFoot";
import OfficeHour from "../../components/OfficeHour";

function Neckpain() {
  return (
    <NeckpainContainer>
      <Container>
        <Left>
          <H1>SUFFERING FROM NECK PAIN?</H1>
          <ImgContainer>
            <img src={neckpain} alt="" />
          </ImgContainer>
          <Para>
            You know the old saying, “It's a pain in the neck”? Well, when you
            live with neck pain long enough, you know its important to find the
            best chiropractor in Miami. Neck pain can make even the simplest of
            movements involving the neck, head, arms, shoulders, and back
            excruciatingly difficult. It can lead to headaches and difficulty
            using your body. Immobility resulting from neck pain can cause the
            muscles to become weak and to degenerate over time.
            <br />
            <br />
            Understanding the root of your neck pain is a necessary step towards
            acquiring the treatment that will be effective in both short and
            long-term recovery. The following article looks at the causes of
            neck pain and explains how Miami chiropractic care can be a useful
            alternative to conventional treatments.
          </Para>
          <Line></Line>
          <H3>NECK PAIN IN MIAMI</H3>
          <Para>
            Although the neck is a relatively small area of the body, it is
            comprised of some complicated structures which do the important job
            of holding your head up. The small size of the vertebrae of the neck
            allows for a lot of mobility, but can also make the neck more
            vulnerable to injury and pain. Some of the causes of neck pain
            include:
            <br />
            <br />
            Trauma, such as whiplash Sleeping position Poor posture Repetitive
            stress Abnormalities in the bone structure Joint issues Muscle
            strains and pulls Most of these issues are either caused by, or
            impact, the alignment of the spine. When muscles in the neck go into
            spasm, the spine gets pulled out of alignment. When the spine is
            misaligned, the nerves become irritated and cause further tension
            and other systemic problems. Because every nerve in the body has its
            root in the spinal column, issues that have their source at the neck
            can have a major impact throughout every other system.
            <br />
            <br />
            Many people let spinal problems go uncorrected in Miami. They hope
            that if they wait long enough the pain will simply go away. In some
            cases it will go away, but the misalignment that caused the problem
            is usually still there. Over time, that area can become aggravated,
            and the pain can return. If the problem is not corrected it can
            become much more serious. Some patients let things go to the point
            where surgery may be the only option.
          </Para>
          <Line></Line>
          <H3>CONVENTIONAL VS. HOLISTIC TREATMENTS</H3>
          <Para>
            Most commonly, people try to deal with their neck pain using
            prescription or over-the-counter medications. This may help to
            relieve the symptoms in the short-term, but not only are patients
            dealing with side effects, the underlying issue goes unaddressed.
            Massage Therapy has become more popular over the years and this can
            help to relieve some muscle tightness. If the issue is in the bones
            or joints, the problem will remain. <br /> <br /> Chiropractic
            treatment is a holistic practice that addresses the structural cause
            that leads to the majority neck pain. Following a thorough
            chiropractic assessment aimed at ruling out other issues and finding
            the exact source of the problem, a personalized recovery plan is
            developed. Gentle adjustments to the spine can bring instant relief
            and restore long term health to the neck and the entire body. Call
            our team at New Leaf Chiropractic today to set up a consultation and
            bring an end to the pain in your neck.
          </Para>
        </Left>
        <OfficeHour />
      </Container>
      <HomeFoot />
    </NeckpainContainer>
  );
}

export default Neckpain;

const NeckpainContainer = styled.div`
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

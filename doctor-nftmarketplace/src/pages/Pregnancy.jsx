import React from "react";
import styled from "styled-components";
import HomeFoot from "../components/Home/HomeFoot";
import OfficeHour from "../components/OfficeHour";

function Pregnancy() {
  return (
    <PregnancyContainer>
      <Container>
        <Left>
          <H1>CHIROPRACTIC FOR PREGNANCY?</H1>
          <ImgContainer>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/ZDOcmhxLtFU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </ImgContainer>
          <Para>
            The physical stress of pregnancy can lead to a great deal of
            discomfort. It's common for women in Miami to visit a chiropractic
            office regularly for low back pain, as well as other related issues,
            such as sciatica, leg cramps and constipation. This can lead to
            difficulty performing daily tasks as well as difficulties in labor.
            <br />
            <br />
            Chiropractic treatment for pregnancy can be an outstanding source of
            relief for back pain. Many women also comment that the birthing
            process was easier after having undergone chiropractic treatments.
            The following article takes a more in-depth look at the discomfort
            caused by pregnancy and explains exactly how chiropractic treatment
            can help.
          </Para>
          <Line></Line>
          <H3>PRENATAL CHIROPRACTIC IN MIAMI</H3>
          <Para>
            During pregnancy, a woman’s body is undergoing a number of different
            changes to accommodate the growing baby. As the baby grows, a
            mother’s center of gravity shifts to the front of her pelvis,
            resulting in added stress and discomfort in the lower back and the
            various joints of the pelvis. At the peak of pregnancy, resulting
            from the associated weight gain, the curve in the lower back
            (lordotic curve) can increase to the point of causing serious impact
            on the vertebral joints, the sacrum, and the hip joints.
            <br />
            <br />
            The nerves that travel to all other parts of the body have their
            origin in the spine. When the spine is compressed, these nerves can
            become irritated causing the pain to radiate to other areas of the
            body. Sciatica is a condition commonly stimulated by pregnancy,
            involving pain that radiates from the lower back all the way down
            the legs.
            <br />
            <br />
            If a previous issue exists with the alignment of the spine, and
            there has been a history of lower back problems, pregnancy will
            often aggravate the condition. Pregnancy can cause the spine to
            become misaligned to the point that it does not simply go back into
            place once the pregnancy is complete. This can make the tasks that
            become necessary once the child is born, such as carrying a baby on
            your front or back, breast-feeding, and bending over to lift and
            pick things up, painfully difficult.
          </Para>
          <Line></Line>
          <H3>PRENATAL CHIROPRACTIC CARE</H3>
          <Para>
            Chiropractic practitioners can provide safe and effective
            personalized care throughout your pregnancy and in the postpartum
            period. A thorough examination will determine the best treatment to
            address your discomfort and prepare the body for the height of
            pregnancy and childbirth. There are specialized adjustment methods
            to accommodate pregnancy. These treatments may reduce the need for
            pain medications throughout the delivery as well as help to reduce
            labor time. Follow up treatments can assist in realigning the body
            after the pregnancy and speed up the transition to a healthy
            post-pregnancy body.
            <br />
            <br />
            If you are curious about how chiropractic can help you with your
            pregnancy call our team at New Leaf Chiropractic today. We are here
            to help.
          </Para>
        </Left>
        <OfficeHour />
      </Container>
      <HomeFoot />
    </PregnancyContainer>
  );
}

export default Pregnancy;

const PregnancyContainer = styled.div`
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
  iframe {
    width: 100%;
  }
`;

const Left = styled.div`
  width: 70%;
  padding-right: 30px;
  @media (max-width: 890px) {
    width: 100%;
    padding-right: 0px;
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

import React from "react";
import styled from "styled-components";
import HomeFoot from "../../components/Home/HomeFoot";
import OfficeHour from "../../components/OfficeHour";
import Fade from "react-reveal/Fade";

function Pediatric() {
  return (
    <PediatricContainer>
      <Container>
        <Left>
          <Fade big cascade>
            <H1>CHIROPRACTIC CARE FOR KIDS</H1>
            <ImgContainer>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/04IV_BUXNV8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </ImgContainer>
            <Para>
              A child's nervous system is the controller and regulator of all
              the other systems in their growing body. From blood flow, to brain
              function and bone growth, the nervous system plays a central role
              in keeping things working and healthy. Stress and misalignment of
              the spine can have serious impacts on your child's overall health,
              behavior, and development. New Leaf Chiropractic is a chiropractic
              clinic that offers gentle and non-invasive therapy that works to
              correct underlying issues before they become hard-wired in during
              development, providing support for a pain-free and successful
              childhood.
            </Para>
            <Line></Line>
            <H3>PEDIATRIC CHIROPRACTIC IN MIAMI</H3>
            <Para>
              It may be difficult to imagine that a child would need
              chiropractic care. They seldom complain of chronic pain the way
              adults do and their bodies appear to be made of rubber in the way
              they bounce back from injury. The truth is, children's bodies are
              under a lot of stress while they are in a state of development and
              keeping them healthy requires maintenance.
              <br />
              <br />
              Stress and trauma to the body and spine commonly begin with the
              birthing process. Infant’s spines can easily become misaligned
              from the intense pressure involved in both natural and Cesarean
              births. Unfortunately, other than crying, they have no way of
              communicating their pain, and it's source, to us. Throughout
              infancy they may sleep in awkward positions, and occasionally take
              a tumble. As children, they grow into toddlers who strain, and
              twist, and fall, while learning to crawl and walk. Luckily, they
              are very resilient and can take a lot of impact, but it is not
              uncommon for these injuries to develop into patterns of movement
              that will pull a child's bones out of alignment over time.
              <br />
              <br />
              As kids, they may start to develop bad posture. Sitting in front
              of a computer or TV can have serious repercussions on the spine.
              Playing contact sports, wearing heavy backpacks (most likely the
              wrong way), and even sitting in desks can all cause issues. As
              teenagers, they begin to deal with the stress of more daily
              responsibilities, like becoming part of the work force, and use
              their bodies to perform physical labor such as painting houses,
              serving tables, and the like.
              <br />
              <br />
              As you can see, there are plenty of opportunities throughout
              development for a child's body, and particularly their spine, to
              become out of alignment which will affect other aspects of their
              healthy nervous system function and development.
            </Para>
            <Line></Line>
            <H3>HOW CAN I TELL IF MY CHILD NEEDS CHIROPRACTIC CARE?</H3>
            <Para>
              A child's spine can become quite misaligned without any awareness
              on their part of pain or discomfort. Children have not always
              developed enough awareness of their bodies to identify a subtle
              chronic issue developing. Even when a child is experiencing pain,
              they may not be able to communicate it to you and it can come
              across as grumpiness, acting out, or incessant crying. Issues with
              the spine can also be the source of many other childhood issues,
              such as colic, ear infections, and ADHD.
            </Para>
            <Line></Line>
            <H3>WHAT IS CHIROPRACTIC CARE FOR KIDS?</H3>
            <Para>
              A chiropractic treatment for a child begins with an extensive
              examination to determine the exact issue and the best route for
              treatment. Even if your child is too young to communicate, or too
              shy, a chiropractor has the skills to work with them to find out
              exactly what is going on before proceeding with treatment, if it
              is determined treatment is needed. Gentle and non-invasive
              adjustments are then made to the spine. Children will often become
              relaxed and even fall asleep following treatment, a good sign that
              it has been effective. If you are concerned about your child's
              spinal health, call our team at New Leaf Chiropractic to set up a
              consultation today.
            </Para>
          </Fade>
        </Left>
        <OfficeHour />
      </Container>
      <HomeFoot />
    </PediatricContainer>
  );
}

export default Pediatric;

const PediatricContainer = styled.div`
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

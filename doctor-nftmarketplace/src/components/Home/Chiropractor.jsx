import React from "react";
import styled from "styled-components";
import expertise from "../../images/expertise.webp";
import office from "../../images/office.jpg";

function Chiropractor() {
  return (
    <ChiropractorContainer>
      <Container>
        <ChiropractorLeft>
          <H1>CHIROPRACTOR MIAMI FL</H1>
          <iframe
            className="ytframe"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/WyTWe-Oao8s"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <Para>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
            quisquam voluptate, numquam, laboriosam aperiam laborum tempore
            optio laudantium voluptatum ea, voluptatem atque modi molestiae
            deserunt! Earum quisquam tenetur repellendus expedita eaque
            inventore deleniti. Earum. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Perspiciatis dolorem libero tempora molestias
            nulla cum, sit ea inventore minus consequuntur dolore ex incidunt
            perferendis nihil quis odio eos cumque fugit quibusdam aspernatur
            quos exercitationem labore ab quisquam. Earum temporibus quibusdam
            laudantium, ea eligendi dolore hic, adipisci perferendis corrupti
            aspernatur eveniet, quisquam vitae omnis delectus enim aut minus
            soluta! Praesentium, sunt autem? Excepturi quae minima dolorum
            voluptatum blanditiis earum iusto nostrum at impedit tempore!
            Suscipit, magni dolore ipsam voluptatibus magnam maiores reiciendis
            officia ut dolorum quod quas fugit voluptatum ullam eum tempora
            repellendus a recusandae, nisi itaque. Magnam tenetur in cupiditate?
          </Para>
          <H4>WELCOME TO NEW LIVING FORWARD</H4>
          <Para>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ipsam
            recusandae, saepe assumenda delectus suscipit, placeat maiores
            obcaecati dolorem eligendi magni optio labore ab? Soluta reiciendis
            repellat nesciunt officiis. Suscipit atque iste veniam illum
            accusantium hic repellendus consequatur officiis laboriosam
            laudantium, obcaecati, et explicabo quibusdam. Reprehenderit harum
            cum sint, ipsa molestiae quis, assumenda quo, quas provident
            repellat accusamus odit magni culpa eligendi laudantium error quasi.
            Dolor aspernatur aperiam est, expedita dolores molestiae
            consequuntur voluptate eligendi dignissimos obcaecati culpa odio
            sapiente accusantium voluptatem minima inventore cum iste? Suscipit
            explicabo, esse deserunt iusto enim possimus soluta? Iusto neque
            eligendi officiis ut ullam.
          </Para>
        </ChiropractorLeft>
        <ChiropractorRight>
          <RightAboutContainer>
            <RightImg src={office} />
          </RightAboutContainer>
          <OfficeHourContainer>
            <H3>OFFICE HOURS</H3>
            <Line></Line>
            <H5>Monday</H5>
            <Para>10:00am - 1:00pm</Para>
            <Para>10:00am - 1:00pm</Para>
            <Line></Line>
            <H5>Monday</H5>
            <Para>10:00am - 1:00pm</Para>
            <Para>10:00am - 1:00pm</Para>
            <Line></Line>
            <H5>Monday</H5>
            <Para>10:00am - 1:00pm</Para>
            <Para>10:00am - 1:00pm</Para>
            <Line></Line>
            <H5>Monday</H5>
            <Para>10:00am - 1:00pm</Para>
            <Para>10:00am - 1:00pm</Para>
            <Line></Line>
            <H5>Monday</H5>
            <Para>10:00am - 1:00pm</Para>
            <Para>10:00am - 1:00pm</Para>
            <Line></Line>
            <H5>Monday</H5>
            <Para>10:00am - 1:00pm</Para>
            <Para>10:00am - 1:00pm</Para>
          </OfficeHourContainer>
          <RightAboutContainer>
            <RightImg className="expertise" src={expertise} />
          </RightAboutContainer>
        </ChiropractorRight>
      </Container>
    </ChiropractorContainer>
  );
}

export default Chiropractor;

const ChiropractorContainer = styled.div`
  padding: 50px 0;
`;

const Container = styled.div`
  display: flex;
  align-items: flex;
  justify-content: center;
  width: 90%;
  max-width: 1047px;
  margin: 0 auto;
  @media (max-width: 1047px) {
    flex-direction: column;
  }
`;

const ChiropractorLeft = styled.div`
  margin-right: 20px;
  .ytframe {
    width: 100%;
    margin: 20px 0;
    @media (max-width: 400px) {
      height: auto;
    }
  }
  @media (max-width: 1047px) {
    margin: 0;
    margin-bottom: 50px;
  }
`;

const ChiropractorRight = styled.div``;

const RightAboutContainer = styled.div`
  display: flex;
  align-items: center;
  .expertise {
    width: 60%;
    margin: 0 auto;
    @media (max-width: 1047px) {
      width: 100%;
      max-width: 314px;
    }
  }
`;

const OfficeHourContainer = styled.div`
  text-align: center;
  padding: 30px 0;
`;

const Line = styled.div`
  border-bottom: 1px solid var(--lightgray);
  width: 50%;
  margin: 10px auto;
`;

const RightImg = styled.img`
  width: 100%;
`;

const H1 = styled.h1``;

const H4 = styled.h4``;

const H3 = styled.h3`
  color: var(--blue);
`;

const H5 = styled.h5`
  font-size: 17px;
`;

const Para = styled.p`
  color: var(--gray);
`;

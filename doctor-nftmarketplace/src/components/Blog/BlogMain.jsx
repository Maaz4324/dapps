import React from "react";
import styled from "styled-components";
import richard from "../../images/richard.jpg";
import MeetAccor from "../../components/MeetAccor";
import bg from "../../images/flowerBg.webp";

function BlogMain() {
  const accordionData = [
    {
      title: "OUR MISSION",
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`,
    },
    {
      title: "OUR MISSION",
      content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
          reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
          quaerat iure quos dolorum accusantium ducimus in illum vero commodi
          pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
          quidem maiores doloremque est numquam praesentium eos voluptatem amet!
          Repudiandae, mollitia id reprehenderit a ab odit!`,
    },
    {
      title: "OUR TECHNIQUE",
      content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
          quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
          dolor ut sequi minus iste? Quas?`,
    },
    {
      title: "OUR SPECIALITY",
      content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
          quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
          dolor ut sequi minus iste? Quas?`,
    },
  ];

  return (
    <BlogMainContainer>
      <Container>
        <Top>
          <H1>Welcome to the page!! I am really so happy to have you here!</H1>
          <h6>
            This page is dedicated to sharing as much research and knowledge on
            living healthier, toxin-free lives!
          </h6>
        </Top>
        <Middle>
          <Left>
            <img src={richard} alt="" />
            <h3>CHIROPRACTOR</h3>
            <h1>Sherry Rosado</h1>
          </Left>
          <Right>
            <p>
              I would love for you all to reach out as much as you want, ask
              questions, share ideas, and please feel free to invite others who
              might love the same information! If there is ever anything you
              have a question on, reach out to me and I will make a post for you
              or give you as best of an answer as I can get!
              <br />
              Here are my resources for you. You can find any of these by
              searching at the top, the search bar but if you cannot find it,
              please reach out to me to tag you on the lists!
            </p>
            <Accor>
              {accordionData.map(({ title, content }) => (
                <MeetAccor title={title} content={content} />
              ))}
            </Accor>
          </Right>
        </Middle>
        <Bottom>
          <h2>Adding Friends & Family</h2>
          <p>
            I get asked almost daily if you are allowed to invite friends and
            the answer is yes, of course! My mission is to educate and empower
            as many women as possible on toxin-free living!
          </p>
        </Bottom>
      </Container>
    </BlogMainContainer>
  );
}

export default BlogMain;

const BlogMainContainer = styled.div`
  background-image: linear-gradient(#ffffffe4, #ffffffdc), url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1047px;
  margin: 0 auto;
  padding: 40px 0;
`;

const Top = styled.div`
  margin-bottom: 20px;
  text-align: center;
  padding: 20px;
  background: var(--lightpink);
`;

const Middle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  @media (max-width: 1047px) {
    flex-direction: column;
  }
`;

const Bottom = styled.div`
  text-align: center;
  h2 {
    font-size: 25px;
  }
  p {
    width: 70%;
    margin: 0 auto;
  }
`;

const Left = styled.div`
  width: 30%;
  text-align: center;
  img {
    width: 100%;
    border: 5px solid var(--blue);
  }
  h3 {
    font-size: 22px;
  }
  h1 {
    font-family: "Cedarville Cursive", cursive;
    color: var(--blue);
  }
  @media (max-width: 1047px) {
    max-width: 314px;
    width: 100%;
  }
`;

const Right = styled.div`
  width: 70%;
  padding: 20px 50px;
  @media (max-width: 1047px) {
    max-width: 732px;
    width: 100%;
  }
`;

const Accor = styled.div``;

const H1 = styled.h1`
  font-size: 30px;
  color: var(--blue);
  font-family: "Cedarville Cursive", cursive;
`;

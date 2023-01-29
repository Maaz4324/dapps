import react from "react";
import styled from "styled-components";
import BlogBottom from "../components/Blog/BlogBottom";
import BlogHero from "../components/Blog/BlogHero";
import BlogMain from "../components/Blog/BlogMain";

function Blog() {
  return (
    <div>
      <BlogHero />
      <BlogMain />
      <BlogBottom />
    </div>
  );
}

export default Blog;

const HomeContainer = styled.div``;

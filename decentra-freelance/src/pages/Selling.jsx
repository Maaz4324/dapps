import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { countriesData } from "../assets/countries";
import { MediaRenderer } from "@thirdweb-dev/react";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import axios from "axios";

function Selling() {
  const storage = new ThirdwebStorage();
  const [name, setName] = useState();
  const [country, setCountry] = useState();
  const [description, setDescription] = useState();
  const [urlS, setUrl] = useState();
  const [skill, setSkill] = useState();
  const [skillArr, setSkillArr] = useState([]);
  const [lang, setLang] = useState();
  const [langArr, setLangArr] = useState();
  const [img, setImg] = useState();
  const [gigImg, setGigImg] = useState();
  const [gigHead, setGigHead] = useState();
  const [gigDescrip, setGigDescrip] = useState();
  const [gigCategory, setGigCategory] = useState();
  const [gigKeywords, setGigKeywords] = useState();
  const [gigKeywordsArr, setGigKeywordsArr] = useState();
  const [gigPrice, setGigPrice] = useState();
  const [gigOffer, setGigOffer] = useState();
  const [firstPage, setFirstPage] = useState(true);

  const handleKeyDown = (event, Arr) => {
    if (event.key === "Enter") {
      console.log(Arr);
      if (Arr == "setSkillArr") {
        setSkillArr(skill.split("\n"));
      }
      if (Arr == "setLangArr") {
        setLangArr(lang.split("\n"));
      }
      if (Arr == "setGigKeywordsArr") {
        setGigKeywordsArr(gigKeywords.split("\n"));
      }
    }
  };

  async function uploadToIPFS(event, setPic) {
    console.log(setPic);
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        console.log("working1");
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `83828a285ed6ac100f38`,
            pinata_secret_api_key: `0a87dafa6567074b4754a03e10341a813b8fe372f86e12d559a66a61b14398eb`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("working2");
        const ImgHash = `${resFile.data.IpfsHash}`;
        if (setPic == "setGigImg") {
          setGigImg(ImgHash);
        }
        if (setPic == "setImg") {
          setImg(ImgHash);
        }
        // functionFromString(ImgHash);
        console.log(ImgHash);
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
        alert("Error sending file to IPFS");
      }
    }
  }

  async function uploadFileToStorage(e) {
    e.preventDefault();
    console.log("working");
    try {
      // We define metadata for an NFT
      const profile = {
        name: name,
        description: description,
        country: country,
        urlS: urlS,
        skill: skillArr,
        image: img,
        language: langArr,
      };
      const gig = {
        gigImg: gigImg,
        gigHead: gigHead,
        gigDescription: gigDescrip,
        gigCategory: gigCategory,
        gigPrice: gigPrice,
        gigOffer: gigOffer,
        gigKeywords: gigKeywordsArr,
      };
      // Here we get the IPFS URI of where our metadata has been uploaded
      const uri = await storage.upload({ profile: profile, gig: gig });
      const url = await storage.resolveScheme(uri);
      console.log(url);
    } catch (e) {
      console.error(e);
      alert("Error sending file to IPFS");
    }
  }

  useEffect(() => {
    async function retriveData() {
      const response = await fetch(
        `https://gateway.ipfscdn.io/ipfs/QmccaMTWFLn1TPS3Povw6GPHBHUhSjRMcnPmocEMQjdcBr/0`
      );
      const metadata = await response.json();
      // console.log(metadata.gig);
    }
    retriveData();
  }, []);

  return (
    <Wrapper>
      <Container>
        <form onSubmit={uploadFileToStorage}>
          {firstPage ? (
            <ProfileContainer>
              <h2>About yourself</h2>
              <label>Full name</label>
              <input
                type="text"
                placeholder="Full name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <label>Upload your profile</label>
              <div>
                <img
                  src={`https://gateway.ipfscdn.io/ipfs/${img}`}
                  alt="skill swap user profile"
                />
              </div>
              <input
                type="file"
                required
                onChange={(event) => uploadToIPFS(event, "setImg")}
              />
              <label>Country</label>
              <select
                name="country"
                onChange={(e) => setCountry(e.target.value)}
                defaultValue={country}
                required
              >
                <option value="">Country...</option>
                {countriesData.map((data, idx) => (
                  <option key={idx} value={data.code}>
                    {data.name}
                  </option>
                ))}
              </select>
              <label>Describe yourself</label>
              <textarea
                name="description"
                cols="30"
                rows="10"
                placeholder="Something about yourself"
                required
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label>Your social media or website link</label>
              <input
                type="url"
                placeholder="Website link"
                required
                onChange={(e) => setUrl(e.target.value)}
              />
              <label>
                Type your skills, after each skill press 'enter' on your
                keyboard
              </label>
              <textarea
                name="skill"
                cols="30"
                rows="10"
                placeholder="skills"
                required
                onChange={(e) => setSkill(e.target.value)}
                value={skill}
                onKeyDown={(event) => handleKeyDown(event, "setSkillArr")}
              />
              <label>
                What languages do you speak, again after each word press 'enter'
                on your keyboard
              </label>
              <textarea
                name="language"
                cols="30"
                rows="10"
                placeholder="Languages you can speak"
                required
                onChange={(e) => setLang(e.target.value)}
                onKeyDown={(event) => handleKeyDown(event, "setLangArr")}
              />
              <button onClick={() => setFirstPage(false)}>Next page</button>
            </ProfileContainer>
          ) : (
            <GigContainer>
              <h2>Your service</h2>
              <label>Upload your gig picture</label>
              <img
                src={`https://gateway.ipfscdn.io/ipfs/${gigImg}`}
                // alt="skill swap gig profile"
              />
              <input
                type="file"
                required
                onChange={(event) => uploadToIPFS(event, "setGigImg")}
              />
              <label>Set your gig title in under 70 characters</label>
              <input
                type="text"
                maxLength="70"
                placeholder="Title"
                required
                onChange={(e) => setGigHead(e.target.value)}
              />
              <label>Describe your gig</label>
              <textarea
                name="gigDes"
                cols="30"
                rows="10"
                placeholder="Gig Description"
                required
                onChange={(e) => setGigDescrip(e.target.value)}
              ></textarea>
              <label>Set the category</label>
              <select
                name="gig category"
                onChange={(e) => setGigCategory(e.target.value)}
                defaultValue={gigCategory}
                required
              >
                <option value="">Category...</option>
                <option value="Programming & Tech">Programming & Tech</option>
                <option value="Video and Animation">Video and Animation</option>
                <option value="Design & Creative">Design & Creative</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Writing & Translation">
                  Writing & Translation
                </option>
                <option value="Music & Audio">Music & Audio</option>
                <option value="Video & Animation">Video & Animation</option>
                <option value="Development & IT">Development & IT</option>
                <option value="Finance & Accounting">
                  Finance & Accounting
                </option>
              </select>
              <label>What are you offering in this gig</label>
              <textarea
                name="offer"
                cols="30"
                rows="10"
                placeholder="Gig offer"
                required
                onChange={(e) => setGigOffer(e.target.value)}
              ></textarea>
              <label>Set the price</label>
              <input
                type="number"
                placeholder="Price"
                onChange={(e) => setGigPrice(e.target.value)}
                required
              />
              <label>Set the keywords to help buyer find your gig</label>
              <textarea
                name="keyword"
                cols="30"
                rows="10"
                placeholder="Keywords"
                required
                onChange={(e) => setGigKeywords(e.target.value)}
                onKeyDown={(event) => handleKeyDown(event, "setGigKeywordsArr")}
              />
              <button onClick={() => setFirstPage(true)}>Previous page</button>
              <input type="submit" />
            </GigContainer>
          )}
        </form>
      </Container>
    </Wrapper>
  );
}

export default Selling;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  color: white;
  padding-top: 72px;
 background: linear-gradient(to right, #111118, #161727, #1a1c35);
  @media (max-width: 930px) {
    padding-top: 60px;
  }
`;

const Container = styled.div`
  display: flex;
  width: 98%;
  max-width: 747px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 40px 0;
  margin-bottom: 30px;
  background: var(--darkBg);
  h2 {
    font-size: 40px;
  }
  input,
  textarea,
  select {
    width: 95%;
    font-size: 16px;
    padding: 10px;
    border-radius: 7px;
    outline: none;
    border: 0;
    margin: 4px 0;
    @media (max-width: 747px) {
      width: 90%;
    }
  }
  label {
    margin-top: 30px;
  }
  form {
    width: 100%;
    button {
      width: 30%;
      margin: 10px 0;
      padding: 7px 20px;
      float: right;
    }
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  text-align: start;
  flex-direction: column;
  width: 80%;
  @media (max-width: 747px) {
    width: 99%;
  }
  margin: 0 auto;
`;

const GigContainer = styled.div`
  display: flex;
  text-align: start;
  flex-direction: column;
  width: 80%;
  @media (max-width: 747px) {
    width: 99%;
  }
  margin: 0 auto;
`;

import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { countriesData } from "../assets/countries";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import axios from "axios";
import { ethers } from "ethers";
import SkillSwap from "../artifacts/contracts/SkillSwap.sol/SkillSwap.json";
import { TagsInput } from "react-tag-input-component";
import Loading from "../component/Loading";

function Selling() {
  const storage = new ThirdwebStorage();
  const [name, setName] = useState();
  const [country, setCountry] = useState();
  const [description, setDescription] = useState();
  const [urlS, setUrl] = useState();
  const [skill, setSkill] = useState();
  const [lang, setLang] = useState();
  const [img, setImg] = useState();
  const [gigImg, setGigImg] = useState();
  const [gigHead, setGigHead] = useState();
  const [gigDescrip, setGigDescrip] = useState();
  const [gigCategory, setGigCategory] = useState();
  const [gigKeywords, setGigKeywords] = useState();
  const [gigPrice, setGigPrice] = useState();
  const [gigOffer, setGigOffer] = useState();
  const [firstPage, setFirstPage] = useState(true);
  const [displayProfile, setDisplayProfile] = useState([]);
  const [displayGig, setDisplayGig] = useState([]);
  const [userLogin, setUserLogin] = useState(false);
  const [gigFormItem, setGigFormItem] = useState([]);
  const [profileFormItem, setProfileFormItem] = useState([]);
  const [editButton, setEditButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const abi = SkillSwap.abi;

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const skillswap = new ethers.Contract(contractAddress, abi, signer);

  useEffect(() => {
    localStorage.setItem("gigFormItem", JSON.stringify(gigFormItem));
  }, [gigFormItem]);

  useEffect(() => {
    localStorage.setItem("profileFormItem", JSON.stringify(profileFormItem));
  }, [profileFormItem]);

  document.addEventListener("wheel", function (event) {
    if (
      document.activeElement.type === "number" &&
      document.activeElement.classList.contains("noscroll")
    ) {
      document.activeElement.blur();
    }
  });

  function handleEditProfile() {
    setUserLogin(false);
    setEditButton(true);
    setName(profileFormItem[0].name);
    setImg(profileFormItem[0].image);
    setCountry(profileFormItem[0].country);
    setDescription(profileFormItem[0].description);
    setUrl(profileFormItem[0].urlS);
    setSkill(profileFormItem[0].skill);
    setLang(profileFormItem[0].language);
    setGigImg(gigFormItem[0].gigImg);
    setGigHead(gigFormItem[0].gigHead);
    setGigDescrip(gigFormItem[0].gigDescription);
    setGigKeywords(gigFormItem[0].gigKeywords);
    setGigPrice(gigFormItem[0].gigPrice);
    setGigOffer(gigFormItem[0].gigOffer);
    setGigCategory(gigFormItem[0].gigCategory);
  }

  async function loadUser() {
    setLoading(true);
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const noOfuser = await skillswap.noOfSellers();

    for (let index = 1; index <= noOfuser.toString(); index++) {
      const user = await skillswap.sellerProfile(index);
      if (user.seller.toLowerCase() == account[0]) {
        setUserLogin(true);
        const response = await fetch(user.uri);
        const metadata = await response.json();
        setDisplayProfile([metadata.profile]);
        setDisplayGig([metadata.gig]);
        setProfileFormItem([metadata.profile]);
        setGigFormItem([metadata.gig]);
      }
    }
    setLoading(false);
  }

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

        console.log(ImgHash);
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
        alert("Error sending file to IPFS");
      }
    }
  }

  async function uploadFileToStorage(e) {
    e.preventDefault();
    try {
      const profile = {
        name: name,
        description: description,
        country: country,
        urlS: urlS,
        skill: skill,
        image: img,
        language: lang,
      };
      const gig = {
        gigImg: gigImg,
        gigHead: gigHead,
        gigDescription: gigDescrip,
        gigCategory: gigCategory,
        gigPrice: gigPrice,
        gigOffer: gigOffer,
        gigKeywords: gigKeywords,
      };

      const uri = await storage.upload({ profile: profile, gig: gig });
      const url = await storage.resolveScheme(uri);
      console.log(url);
      const profileSet = await skillswap.setProfile(url);
      console.log(
        "🚀 ~ file: Selling.jsx:136 ~ uploadFileToStorage ~ profileSet:",
        profileSet
      );
    } catch (e) {
      console.error(e);
      alert("Error sending file to IPFS");
    }
  }

  async function saveChanges() {
    setLoading(true);
    try {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const noOfuser = await skillswap.noOfSellers();
      for (let i = 1; i <= noOfuser.toString(); i++) {
        const element = await skillswap.sellerProfile(i);
        if (element.seller.toLowerCase() == account[0].toLowerCase()) {
          const profile = {
            name: name,
            description: description,
            country: country,
            urlS: urlS,
            skill: skill,
            image: img,
            language: lang,
          };
          const gig = {
            gigImg: gigImg,
            gigHead: gigHead,
            gigDescription: gigDescrip,
            gigCategory: gigCategory,
            gigPrice: gigPrice,
            gigOffer: gigOffer,
            gigKeywords: gigKeywords,
          };

          const uri = await storage.upload({ profile: profile, gig: gig });
          const url = await storage.resolveScheme(uri);
          const edited = await skillswap.updateProfile(url, i);
          console.log(
            "🚀 ~ file: Selling.jsx:196 ~ saveChanges ~ edited:",
            edited
          );
        }
      }
    } catch (error) {
      alert("We're facing some problems saving your profile");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      {userLogin ? (
        <Container>
          {loading ? (
            <Loading />
          ) : (
            <div>
              {displayProfile.map((profileData, idx) => (
                <YourDetail key={idx}>
                  <PPContainer>
                    <img
                      src={`https://gateway.ipfscdn.io/ipfs/${profileData.image}`}
                      alt={profileData.name}
                    />
                  </PPContainer>
                  <YourName>
                    <h3>{profileData.name}</h3>
                    <svg
                      onClick={handleEditProfile}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ cursor: "pointer" }}
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </YourName>
                  <YourOthers>
                    <ul>
                      <li>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M12.8159 20.6077C16.8509 18.5502 20 15.1429 20 11C20 6.58172 16.4183 3 12 3C7.58172 3 4 6.58172 4 11C4 15.1429 7.14909 18.5502 11.1841 20.6077C11.6968 20.8691 12.3032 20.8691 12.8159 20.6077Z"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                            <path
                              d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </g>
                        </svg>
                        {profileData.country}
                      </li>
                      <li>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.975 14.51a1.05 1.05 0 0 0 0-1.485 2.95 2.95 0 0 1 0-4.172l3.536-3.535a2.95 2.95 0 1 1 4.172 4.172l-1.093 1.092a1.05 1.05 0 0 0 1.485 1.485l1.093-1.092a5.05 5.05 0 0 0-7.142-7.142L9.49 7.368a5.05 5.05 0 0 0 0 7.142c.41.41 1.075.41 1.485 0zm2.05-5.02a1.05 1.05 0 0 0 0 1.485 2.95 2.95 0 0 1 0 4.172l-3.5 3.5a2.95 2.95 0 1 1-4.171-4.172l1.025-1.025a1.05 1.05 0 0 0-1.485-1.485L3.87 12.99a5.05 5.05 0 0 0 7.142 7.142l3.5-3.5a5.05 5.05 0 0 0 0-7.142 1.05 1.05 0 0 0-1.485 0z"
                              fill="#ffffff"
                            ></path>
                          </g>
                        </svg>
                        <a href={profileData.urlS}>{profileData.urlS}</a>
                      </li>
                      <li>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <g clipPath="url(#clip0_429_11195)">
                              <path
                                d="M15 22L14.3066 23.0401C14.6902 23.2958 15.1834 23.3196 15.5898 23.1021C15.9963 22.8846 16.25 22.461 16.25 22H15ZM12 20L12.6934 18.96C12.2735 18.68 11.7265 18.68 11.3066 18.96L12 20ZM9.00002 22H7.75002C7.75002 22.461 8.00375 22.8846 8.41019 23.1021C8.81664 23.3196 9.30982 23.2958 9.69339 23.0401L9.00002 22ZM8.75086 3.53713L8.65048 4.7831L8.75086 3.53713ZM10.4347 2.83967L9.48267 2.02962L9.48267 2.02962L10.4347 2.83967ZM6.53191 5.68606L5.28595 5.78644L6.53191 5.68606ZM8.68606 3.53191L8.78644 2.28595L8.68606 3.53191ZM5.83967 7.43468L6.64972 8.38669L6.64972 8.38668L5.83967 7.43468ZM6.53713 5.75086L7.7831 5.65048L6.53713 5.75086ZM5.79016 10.5232L4.98011 11.4752L4.98012 11.4752L5.79016 10.5232ZM5.79016 7.4768L4.98012 6.52479L4.98011 6.5248L5.79016 7.4768ZM6.53713 12.2492L5.29117 12.1488L5.29117 12.1488L6.53713 12.2492ZM5.83967 10.5654L6.64972 9.61335L6.64972 9.61334L5.83967 10.5654ZM8.68606 14.4681L8.78644 15.7141H8.78644L8.68606 14.4681ZM6.53191 12.314L7.77788 12.4143L7.77788 12.4143L6.53191 12.314ZM10.4347 15.1604L11.3867 14.3503L11.3867 14.3503L10.4347 15.1604ZM8.75086 14.4629L8.65048 13.2169H8.65048L8.75086 14.4629ZM13.5232 15.2099L14.4752 16.0199L14.4752 16.0199L13.5232 15.2099ZM10.4768 15.2099L9.52479 16.0199L9.5248 16.0199L10.4768 15.2099ZM15.2492 14.4629L15.3496 13.2169H15.3496L15.2492 14.4629ZM13.5654 15.1604L12.6133 14.3503L12.6133 14.3503L13.5654 15.1604ZM17.4681 12.314L18.7141 12.2136V12.2136L17.4681 12.314ZM15.314 14.4681L15.2136 15.7141H15.2136L15.314 14.4681ZM18.1604 10.5654L18.9704 11.5174L18.9704 11.5174L18.1604 10.5654ZM17.4629 12.2492L16.2169 12.3496V12.3496L17.4629 12.2492ZM18.2099 7.4768L19.0199 6.5248L19.0199 6.5248L18.2099 7.4768ZM18.2099 10.5232L17.3998 9.57122L17.3998 9.57122L18.2099 10.5232ZM17.4629 5.75086L16.2169 5.65048V5.65048L17.4629 5.75086ZM18.1604 7.43468L17.3503 8.38668L17.3503 8.38668L18.1604 7.43468ZM15.314 3.53191L15.2136 2.28595L15.2136 2.28595L15.314 3.53191ZM17.4681 5.68606L18.7141 5.78644V5.78644L17.4681 5.68606ZM13.5654 2.83967L14.5174 2.02962L14.5174 2.02962L13.5654 2.83967ZM15.2492 3.53713L15.3496 4.7831L15.3496 4.7831L15.2492 3.53713ZM13.5232 2.79016L12.5712 3.60021L12.5712 3.60022L13.5232 2.79016ZM10.4768 2.79016L11.4288 3.60021L11.4288 3.60021L10.4768 2.79016ZM9.00002 14.4584L9.05526 13.2096L9.00002 14.4584ZM15.6934 20.96L12.6934 18.96L11.3066 21.0401L14.3066 23.0401L15.6934 20.96ZM11.3066 18.96L8.30664 20.96L9.69339 23.0401L12.6934 21.0401L11.3066 18.96ZM12.5712 3.60022L12.6134 3.64973L14.5174 2.02962L14.4752 1.98011L12.5712 3.60022ZM15.3496 4.7831L15.4144 4.77788L15.2136 2.28595L15.1488 2.29117L15.3496 4.7831ZM16.2222 5.58568L16.2169 5.65048L18.7089 5.85124L18.7141 5.78644L16.2222 5.58568ZM17.3503 8.38668L17.3998 8.42881L19.0199 6.5248L18.9704 6.48267L17.3503 8.38668ZM17.3998 9.57122L17.3503 9.61335L18.9704 11.5174L19.0199 11.4752L17.3998 9.57122ZM16.2169 12.3496L16.2222 12.4144L18.7141 12.2136L18.7089 12.1488L16.2169 12.3496ZM15.4144 13.2222L15.3496 13.2169L15.1488 15.7089L15.2136 15.7141L15.4144 13.2222ZM12.6133 14.3503L12.5712 14.3998L14.4752 16.0199L14.5174 15.9704L12.6133 14.3503ZM11.4288 14.3998L11.3867 14.3503L9.48266 15.9704L9.52479 16.0199L11.4288 14.3998ZM8.65048 13.2169L8.58568 13.2222L8.78644 15.7141L8.85124 15.7089L8.65048 13.2169ZM7.77788 12.4143L7.7831 12.3495L5.29117 12.1488L5.28595 12.2136L7.77788 12.4143ZM6.64972 9.61334L6.60021 9.57122L4.98012 11.4752L5.02963 11.5174L6.64972 9.61334ZM6.60021 8.42881L6.64972 8.38669L5.02963 6.48266L4.98012 6.52479L6.60021 8.42881ZM7.7831 5.65048L7.77788 5.58568L5.28595 5.78644L5.29117 5.85124L7.7831 5.65048ZM8.58568 4.77788L8.65048 4.7831L8.85124 2.29117L8.78644 2.28595L8.58568 4.77788ZM11.3867 3.64972L11.4288 3.60021L9.5248 1.98011L9.48267 2.02962L11.3867 3.64972ZM8.65048 4.7831C9.69169 4.86698 10.7098 4.44528 11.3867 3.64972L9.48267 2.02962C9.32645 2.21321 9.09152 2.31053 8.85124 2.29117L8.65048 4.7831ZM7.77788 5.58568C7.74077 5.12504 8.12504 4.74077 8.58568 4.77788L8.78644 2.28595C6.79035 2.12514 5.12514 3.79035 5.28595 5.78644L7.77788 5.58568ZM6.64972 8.38668C7.44528 7.70975 7.86698 6.69169 7.7831 5.65048L5.29117 5.85124C5.31053 6.09152 5.21321 6.32645 5.02962 6.48267L6.64972 8.38668ZM6.60021 9.57122C6.24825 9.27174 6.24825 8.72829 6.60021 8.42881L4.98011 6.5248C3.45495 7.82253 3.45495 10.1775 4.98011 11.4752L6.60021 9.57122ZM7.7831 12.3496C7.86698 11.3083 7.44528 10.2903 6.64972 9.61335L5.02962 11.5174C5.21321 11.6736 5.31053 11.9085 5.29117 12.1488L7.7831 12.3496ZM8.58568 13.2222C8.12504 13.2593 7.74077 12.875 7.77788 12.4143L5.28595 12.2136C5.12514 14.2097 6.79035 15.8749 8.78644 15.7141L8.58568 13.2222ZM12.5712 14.3998C12.2717 14.7518 11.7283 14.7518 11.4288 14.3998L9.5248 16.0199C10.8225 17.5451 13.1775 17.5451 14.4752 16.0199L12.5712 14.3998ZM16.2222 12.4143C16.2593 12.875 15.875 13.2593 15.4143 13.2222L15.2136 15.7141C17.2097 15.8749 18.8749 14.2097 18.7141 12.2136L16.2222 12.4143ZM17.3503 9.61335C16.5547 10.2903 16.1331 11.3083 16.2169 12.3496L18.7089 12.1488C18.6895 11.9085 18.7868 11.6736 18.9704 11.5174L17.3503 9.61335ZM17.3998 8.42881C17.7518 8.72829 17.7518 9.27174 17.3998 9.57122L19.0199 11.4752C20.5451 10.1775 20.5451 7.82253 19.0199 6.5248L17.3998 8.42881ZM16.2169 5.65048C16.1331 6.69169 16.5547 7.70975 17.3503 8.38668L18.9704 6.48267C18.7868 6.32645 18.6895 6.09152 18.7089 5.85124L16.2169 5.65048ZM15.4144 4.77788C15.875 4.74077 16.2593 5.12504 16.2222 5.58568L18.7141 5.78644C18.8749 3.79035 17.2097 2.12514 15.2136 2.28595L15.4144 4.77788ZM12.6133 3.64972C13.2903 4.44528 14.3083 4.86698 15.3496 4.7831L15.1488 2.29117C14.9085 2.31053 14.6736 2.21321 14.5174 2.02962L12.6133 3.64972ZM14.4752 1.98011C13.1775 0.454954 10.8225 0.454952 9.5248 1.98011L11.4288 3.60021C11.7283 3.24825 12.2717 3.24825 12.5712 3.60021L14.4752 1.98011ZM11.3867 14.3503C10.7978 13.6583 9.95101 13.2492 9.05526 13.2096L8.94477 15.7072C9.15141 15.7163 9.34686 15.8108 9.48267 15.9704L11.3867 14.3503ZM9.05526 13.2096C8.9211 13.2037 8.78593 13.206 8.65048 13.2169L8.85124 15.7089C8.88266 15.7063 8.91388 15.7058 8.94477 15.7072L9.05526 13.2096ZM10.25 22V14.4584H7.75002V22H10.25ZM15.3496 13.2169C15.2141 13.206 15.0789 13.2037 14.9448 13.2096L15.0553 15.7072C15.0861 15.7058 15.1174 15.7063 15.1488 15.7089L15.3496 13.2169ZM14.9448 13.2096C14.049 13.2492 13.2022 13.6583 12.6133 14.3503L14.5174 15.9704C14.6532 15.8108 14.8486 15.7163 15.0553 15.7072L14.9448 13.2096ZM13.75 14.4584V22H16.25V14.4584H13.75Z"
                                fill="#ffffff"
                              ></path>
                              <path
                                d="M14 8L11 11L10 10"
                                stroke="#ffffff"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_429_11195">
                                <rect
                                  width="24"
                                  height="24"
                                  fill="white"
                                ></rect>{" "}
                              </clipPath>{" "}
                            </defs>{" "}
                          </g>
                        </svg>
                        {profileData.skill}
                      </li>
                      <li>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M20.58 19.37L17.59 11.01C17.38 10.46 16.91 10.12 16.37 10.12C15.83 10.12 15.37 10.46 15.14 11.03L12.16 19.37C12.02 19.76 12.22 20.19 12.61 20.33C13 20.47 13.43 20.27 13.57 19.88L14.19 18.15H18.54L19.16 19.88C19.27 20.19 19.56 20.38 19.87 20.38C19.95 20.38 20.04 20.37 20.12 20.34C20.51 20.2 20.71 19.77 20.57 19.38L20.58 19.37ZM14.74 16.64L16.38 12.05L18.02 16.64H14.74ZM12.19 7.85C9.92999 11.42 7.89 13.58 5.41 15.02C5.29 15.09 5.16 15.12 5.04 15.12C4.78 15.12 4.53 14.99 4.39 14.75C4.18 14.39 4.3 13.93 4.66 13.73C6.75999 12.51 8.48 10.76 10.41 7.86H4.12C3.71 7.86 3.37 7.52 3.37 7.11C3.37 6.7 3.71 6.36 4.12 6.36H7.87V4.38C7.87 3.97 8.21 3.63 8.62 3.63C9.02999 3.63 9.37 3.97 9.37 4.38V6.36H13.12C13.53 6.36 13.87 6.7 13.87 7.11C13.87 7.52 13.53 7.86 13.12 7.86H12.18L12.19 7.85ZM12.23 15.12C12.1 15.12 11.97 15.09 11.85 15.02C11.2 14.64 10.57 14.22 9.97999 13.78C9.64999 13.53 9.58 13.06 9.83 12.73C10.08 12.4 10.55 12.33 10.88 12.58C11.42 12.99 12.01 13.37 12.61 13.72C12.97 13.93 13.09 14.39 12.88 14.75C12.74 14.99 12.49 15.12 12.23 15.12Z"
                              fill="#ffffff"
                            ></path>
                          </g>
                        </svg>
                        {profileData.language}
                      </li>
                    </ul>
                  </YourOthers>
                  <YourDes>
                    <span>About</span>
                    <p>{profileData.description}</p>
                  </YourDes>
                </YourDetail>
              ))}
              {displayGig.map((gigData, idx) => (
                <YourService key={idx}>
                  <ServiceHead>
                    <h2>{gigData.gigHead}</h2>
                    <ServiceImg
                      style={{
                        background: `url(https://gateway.ipfscdn.io/ipfs/${gigData.gigImg})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></ServiceImg>
                  </ServiceHead>
                  <Offer>
                    <h4>
                      <span>Starting from:</span> {gigData.gigPrice} ETH
                    </h4>
                    <p>
                      <span>Offer:</span> {gigData.gigOffer}
                    </p>
                  </Offer>
                  <ServiceDes>
                    <span>Service Description: </span>
                    <p>{gigData.gigDescription}</p>
                  </ServiceDes>
                </YourService>
              ))}
            </div>
          )}
        </Container>
      ) : (
        <Container>
          {loading ? (
            <Loading />
          ) : (
            <form onSubmit={editButton ? saveChanges : uploadFileToStorage}>
              {firstPage ? (
                <ProfileContainer>
                  <h2>About yourself</h2>
                  <label>Full name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    value={name}
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
                    // required
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <label>Your social media or website link</label>
                  <input
                    type="url"
                    placeholder="Website link"
                    required
                    value={urlS}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <label>
                    Type your skills, after each skill press 'enter' on your
                    keyboard
                  </label>
                  <TagsInput
                    style={{ color: "black !important" }}
                    value={skill}
                    onChange={setSkill}
                    name="skills"
                    placeHolder="Skills"
                  />
                  <label>
                    What languages do you speak, again after each word press
                    'enter' on your keyboard
                  </label>

                  <TagsInput
                    value={lang}
                    onChange={setLang}
                    name="languages"
                    placeHolder="Languages you can speak"
                  />
                  <BtnContainer>
                    <button onClick={() => setUserLogin(true)}>Back</button>
                    <button onClick={() => setFirstPage(false)}>
                      Next page
                    </button>
                  </BtnContainer>
                </ProfileContainer>
              ) : (
                <GigContainer>
                  <h2>Your service</h2>
                  <label>Upload your gig picture</label>
                  <img
                    src={`https://gateway.ipfscdn.io/ipfs/${gigImg}`}
                    alt="skill swap gig profile"
                  />
                  <input
                    type="file"
                    // required
                    onChange={(event) => uploadToIPFS(event, "setGigImg")}
                  />
                  <label>Set your gig title in under 70 characters</label>
                  <input
                    type="text"
                    maxLength="70"
                    placeholder="Title"
                    required
                    defaultValue={gigHead}
                    onChange={(e) => setGigHead(e.target.value)}
                  />
                  <label>Describe your gig</label>
                  <textarea
                    name="gigDes"
                    cols="30"
                    rows="10"
                    placeholder="Gig Description"
                    required
                    defaultValue={gigDescrip}
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
                    <option value="Programming & Tech">
                      Programming & Tech
                    </option>
                    <option value="Video and Animation">
                      Video and Animation
                    </option>
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
                    defaultValue={gigOffer}
                    onChange={(e) => setGigOffer(e.target.value)}
                  ></textarea>
                  <label>Set the price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    className="noscroll"
                    defaultValue={gigPrice}
                    onChange={(e) => setGigPrice(e.target.value)}
                    required
                  />
                  <label>Set the keywords to help buyer find your gig</label>

                  <TagsInput
                    value={gigKeywords}
                    onChange={setGigKeywords}
                    style={{ background: "transparent !important" }}
                    name="keywords"
                    placeHolder="Keywords"
                  />
                  <BtnContainer>
                    <TogglePage onClick={() => setFirstPage(true)}>
                      Previous page
                    </TogglePage>
                    <SubmitBtn type="submit">
                      {editButton ? "Save changes" : "Submit"}
                    </SubmitBtn>
                  </BtnContainer>
                </GigContainer>
              )}
            </form>
          )}
        </Container>
      )}
    </Wrapper>
  );
}

export default Selling;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  color: white;
  padding-top: 72px;
  background: #151517;
  @media (max-width: 930px) {
    padding-top: 60px;
  }
`;

const Container = styled.div`
  display: flex;
  width: 98%;
  max-width: 1147px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 40px 0;
  margin-bottom: 30px;
  h2 {
    font-size: 40px;
  }
  input,
  textarea,
  select {
    width: 95%;
    max-width: 866px;
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
      cursor: pointer;
    }
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  text-align: start;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  padding: 40px;
  border-radius: 10px;
  background: var(--darkBg);
  @media (max-width: 747px) {
    width: 97%;
    padding: 40px 0;
    background: transparent;
  }
`;

const GigContainer = styled.div`
  display: flex;
  text-align: start;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  padding: 40px;
  border-radius: 10px;
  background: var(--darkBg);
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
  @media (max-width: 747px) {
    width: 97%;
    padding: 40px 0;
    background: transparent;
  }
`;

const YourDetail = styled.div`
  margin: 20px 0;
  background: var(--darkBg);
  padding: 40px 30px;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: auto auto auto;
  border-radius: 10px;
  @media (max-width: 970px) {
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto;
  }
  @media (max-width: 812px) {
    grid-template-columns: 60% 40%;
  }
  @media (max-width: 575px) {
    grid-template-columns: auto;
    grid-template-rows: auto auto auto auto;
  }
`;

const PPContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  grid-row: 1/3;
  margin: 20px 0;
  border-radius: 10px;
  img {
    width: 80%;
    border-radius: 10px;
    box-shadow: 0.6px 2px 3px black;
    @media (max-width: 970px) {
      border-radius: 10px;
    }
    @media (max-width: 575px) {
      border-radius: 10px;
    }
  }
  @media (max-width: 970px) {
    grid-row: 1/3;
    grid-column: 1/2;
    width: 100%;
    margin: 0;
    justify-content: start;
    img {
      width: 100%;
      padding: 10px;
    }
  }
  @media (max-width: 575px) {
    grid-row: auto;
    grid-column: auto;
    border-radius: 10px;
    img {
      border-radius: 10px;
    }
  }
  @media (max-width: 375px) {
    width: 90%;
  }
`;

const YourName = styled.div`
  grid-row: 1/2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  h3 {
    font-size: 22px;
  }
  svg {
    width: 30px;
    height: 30px;
  }
  button {
    padding: 7px 20px;
    border-radius: 10px;
    font-size: 16px;
    background: var(--primary);
    border: 2px solid var(--primary);
    cursor: pointer;
    &:hover {
      background: transparent;
      transition: all 0.3s;
      color: white;
    }
  }
  @media (max-width: 970px) {
    grid-row: 1/2;
    grid-column: 2/3;
    width: 100%;
  }
  @media (max-width: 575px) {
    grid-row: auto;
    grid-column: auto;
    flex-direction: row;
    align-items: center;
  }
  @media (max-width: 375px) {
    flex-direction: column;
    align-items: flex-start;
    width: 60%;
  }
`;

const YourOthers = styled.div`
  grid-row: 3/4;
  display: flex;
  justify-content: center;
  ul {
    width: 100%;
    display: grid;
    grid-template-columns: auto;
    padding: 0 10px;
    li {
      word-wrap: break-word;
      margin: 10px;
      list-style: none;
      display: flex;
      align-items: center;
      a {
        color: white;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 160px;
        height: 1.2em;
        white-space: nowrap;
      }
    }
  }
  svg {
    width: 24px;
    height: 24px;
    @media (max-width: 770px) {
      width: 30px;
      height: 30px;
    }
  }
  @media (max-width: 970px) {
    grid-row: 2/3;
    grid-column: 2/3;
    width: 100%;
  }
  @media (max-width: 575px) {
    grid-row: auto;
    grid-column: auto;
  }
  @media (max-width: 375px) {
    width: 90%;
  }
`;

const YourDes = styled.div`
  grid-row: 2/4;
  padding: 20px 10px;
  p {
    font-size: 16px;
    margin: 10px 0;
    word-wrap: break-word;
  }
  span {
    font-size: 17px;
    color: var(--darkText);
  }
  @media (max-width: 970px) {
    grid-row: 3/4;
    grid-column: 1/3;
    width: 100%;
  }
  @media (max-width: 575px) {
    grid-row: auto;
    grid-column: auto;
  }
  @media (max-width: 375px) {
    width: 90%;
  }
`;

const YourService = styled.div`
  display: grid;
  grid-template-columns: auto auto 30%;
  @media (max-width: 914px) {
    grid-template-columns: auto;
  }
`;

const ServiceHead = styled.div`
  background: var(--darkBg);
  margin-bottom: 10px;
  margin-right: 10px;
  grid-column: 1/3;
  padding: 20px;
  border-radius: 10px;
  h2 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  @media (max-width: 914px) {
    grid-column: auto;
    margin-right: 0;
  }
`;

const Offer = styled.div`
  background: var(--darkBg);
  margin-bottom: 10px;
  margin-left: 10px;
  padding: 20px;
  border-radius: 10px;
  h4 {
    font-size: 30px;
  }
  span {
    font-size: 18px;
    color: var(--darkText);
    font-weight: 500;
  }
  p {
    margin: 20px 0;
    font-size: 20px;
  }
  @media (max-width: 914px) {
    grid-column: auto;
    margin-left: 0;
  }
`;

const ServiceDes = styled.div`
  background: var(--darkBg);
  margin-top: 10px;
  grid-column: 1/4;
  padding: 20px;
  border-radius: 10px;
  span {
    color: var(--darkText);
  }
  p {
    margin-top: 10px;
    font-size: 18px;
  }
  @media (max-width: 914px) {
    grid-column: auto;
  }
`;

const ServiceImg = styled.div`
  height: 50vh;
  img {
    width: 100%;
  }
`;

const SubmitBtn = styled.button`
  background: var(--primary);
  border: 0;
  outline: 0;
`;

const TogglePage = styled.button``;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

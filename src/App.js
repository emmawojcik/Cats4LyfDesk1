
import styled from "styled-components";
import { faker, FakerError } from "@faker-js/faker";
import React, { useState, useEffect } from "react";

function CatModal() {
  const [errorMsg, setErrorMsg] = useState("");
  const [cats, setCats] = useState([]);

  useEffect(() => {
    // asynchronous function so we can wait for data to be fetched
    const fetchData = async () => {
      try {
        setErrorMsg("");
        // wait for fetch request from API endpoint and store rsponse in variable
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=10"
        );

        // check to see if the response was successful otherwise throw error

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        // parse JSON response into normal javascript
        const data = await response.json();
        setCats(data);

        const catData = data.map((cat, index) => {
          return {
            name: faker.name.findName(),
            catImage: cat.url,
            catBreed: faker.animal.cat(),
            catPrice: faker.finance.amount(),
            catAddress: faker.address.cityName(),
          };
        });
        setCats(catData);
      } catch (error) {
        // catch an error that occurs in the try block
        setErrorMsg("Something went wrong!!");
        console.log(error.message);
      }
    };
    fetchData();
    //  empty array makes sure useEffect only runs when component mounts and not when component re-renders
  }, []);

  // display error message to user if something went wrong
  if (errorMsg !== "") {
    return <h1>{errorMsg}</h1>;
  }

  // const CatName = faker.animal.cat();

  return (
    <div>
      <Title>Cats4lyf</Title>
      <hr />
      <Content>
        {cats.map((catsInfo, index) => {
          return (
            <div>
              <ModalCard key={index} catsInfoObject={catsInfo} />
            </div>
          );
        })}
      </Content>
    </div>
  );
}

const ModalCard = ({ catsInfoObject }) => {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <ImageContainer>
        <Images src={catsInfoObject.catImage} alt="poster of movie" />
        <Heading>{catsInfoObject.name}</Heading>
        <Heading>£{catsInfoObject.catPrice}</Heading>
        <ImageOverlay onClick={() => setModal(!modal)} className="modal-btn">
          <div className="image-title">
            <LearnMoreBtn>LEARN MORE</LearnMoreBtn>
          </div>
        </ImageOverlay>
      </ImageContainer>

      <div>
        {modal && (
          <ModalOverlay>
            <ModalOverlay
              onClick={() => setModal(!modal)}
              className="overlay"
            ></ModalOverlay>
            <ModalContent>
              <h2>{catsInfoObject.name}</h2>
              <br />
              <ModalImage src={catsInfoObject.catImage} alt="poster of movie" />
              <Ulist>
                <li>Price: £{catsInfoObject.catPrice}</li>
                <li>Breed: {catsInfoObject.catBreed}</li>
                <li>Address: {catsInfoObject.catAddress}</li>
              </Ulist>
              <CartBtn>ADD TO CART</CartBtn>
              <CloseBtn
                className="close-modal"
                onClick={() => setModal(!modal)}
              >
                X
              </CloseBtn>
            </ModalContent>
          </ModalOverlay>
        )}
      </div>
    </div>
  );
};

export default CatModal;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
`;

const CloseBtn = styled.button`
 position: absolute;
  background: red;
  border: none;
  color: white;
  top: 10px;
  right: 10px;
  padding: 5px 7px;
`;

const ImageContainer = styled.div`
  position: relative;
  margin: 10px;
  z-index: 2;
  width: 300px;
  height: 350px;
  border-radius: 15px;
  border: 1px solid rgb(0, 0, 0, 0.2);
`;

const Images = styled.img`
  width: 100%;
  height: 80%;
  z-index: 1;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  
`;
const ImageOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  color: white;
  border-radius: 15px;
  transition: opacity 0.5s ease;
  background-color: rgb(0, 0, 0, 0.9);
  font-family: Arial, Helvetica, sans-serif;

  &:hover {
    opacity: 1;
  }
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
  padding: 0 0 20px 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  margin-bottom: 0;
  right: 0;
  left: 0;  
  width: 550px;
  height: 350px;
  line-height: 2;
  max-width: 600px;
  min-width: 300px;
  background: #f1f1f1;
  border-radius: 15px;
  z-index: 4;
`;

const ModalImage = styled.img`
  float: left;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  position: absolute;
`;
const CartBtn = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  background: rgb(0, 128, 0);
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  transition: 0.5s ease;

  &:hover {
    background: rgb(1, 200, 1);
  }
`;

const ModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: rgb(35, 38, 45, 0.9);
  z-index: 3;
`;

const Heading = styled.h3`
  text-align: center;
  margin: 0;
`;

const Ulist = styled.ul`
  text-align: left;
  list-style: none;
`;

const LearnMoreBtn = styled.h3`
  text-align: center;
  font-size: 25px;
`;
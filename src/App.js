import styled from "styled-components";
import { faker, FakerError } from '@faker-js/faker';
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
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");

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
          }
        })
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
    <div >
      <Title>Cats4lyf</Title>
        <hr />
      <div className="homepage">
        

        {cats.map((catsInfo, index) => {
          return (
          <div>
              <ModalCard key={index} catsInfoObject={catsInfo} />
              <Heading>{catsInfo.name}</Heading>
              
              

          </div>

        )})}
      </div>
    </div>
  );
}

const ModalCard = ({ catsInfoObject }) => {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <div>
      <Images
        onClick={() => setModal(!modal)}
        className="modal-btn"
        src={catsInfoObject.catImage}
        alt="poster of movie"
      />
      

      </div>
      

      <div>
        {modal && (
          <div className="modal">
            <div onClick={() => setModal(!modal)} className="overlay"></div>
            <ModalContent>
              <h2>{catsInfoObject.CatName}</h2>
              <ul>
                <li>Price: Â£{catsInfoObject.catPrice}</li>
                <li>Breed: {catsInfoObject.catBreed}</li>
                
                
              </ul>
              <CloseBtn
                className="close-modal"
                onClick={() => setModal(!modal)}
              >
                X
              </CloseBtn>
            </ModalContent>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatModal;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
`;
const CloseBtn = styled.button`
  background: red;
  border: none;
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 7px;
`;



const Images = styled.img`
  width: 300px;
  height: 350px;
  border: 3px solid rgb(0, 0, 0, 0.2);
  border-radius: 15px;

`;


const ModalContent = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  margin-top: 10%;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  width: 450px;
  height: 500px;
  line-height: 2;
  background: #f1f1f1;
  padding: 14px 28px;
  border-radius: 3px;
  max-width: 600px;
  min-width: 300px;
  overflow-y: scroll;
  border-radius: 10px;
`
const Heading = styled.h3`
margin:0`;
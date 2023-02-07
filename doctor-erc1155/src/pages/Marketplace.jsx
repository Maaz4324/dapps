import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HomeFoot from "../components/Home/HomeFoot";
import Pass from "../components/Pass";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import metamaskLogo from "../images/metamask.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

function Marketplace() {
  const [walletAvailable, setWalletAvailable] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (window.ethereum) {
      setWalletAvailable(true);
    } else {
      setWalletAvailable(false);
      handleOpen();
    }
  }, []);

  return (
    <div>
      {walletAvailable ? (
        <div>
          {" "}
          <Pass />
          <HomeFoot />
        </div>
      ) : (
        <div>
          <Pass />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <MetaMaskContainer>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={metamaskLogo} alt="" />
                </a>
              </MetaMaskContainer>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Download Metamask Wallet
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                To buy passes you must have a wallet. Download{" "}
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>
              </Typography>
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Marketplace;

const MetaMaskContainer = styled.div`
  width: 40%;
  img {
    width: 100%;
  }
`;

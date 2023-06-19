import * as S from "./styles";
import React, { useState } from "react";
import { ethers } from "ethers";


interface TypeText {
 message: string | undefined;
}
export const Metamask = () => {
 const [message, setMessage] = useState("conecte na sua carteira");
 const [address, setAddress] = useState("");
 const [ethAmount, setEthAmount] = useState("");
 const [ethAmount2, setEthAmount2] = useState("");


 const loadData = async () => {
   try {
     if (!window.ethereum) {
       return setMessage(
         "Instale a Metamask no seu browser: https://metamask.io/download.html"
       );
     } else {
       setMessage("Conectando na metamask.......");


       const provider = new ethers.providers.Web3Provider(
         window.ethereum,
         "any"
       );


       await provider.send("eth_requestAccounts", []);


       const signer = provider.getSigner();
       const address = await signer.getAddress();
       const myBalance = await signer.getBalance();


       setAddress(address);
       setEthAmount(ethers.utils.formatEther(myBalance));
       setMessage("Conectado!");


       const BalanceCarteiraEnvio = await provider.getBalance(
         "0x088E2BFCE7440bCb4422fd360B66F7546758D083"
       );
       setEthAmount2(
         ethers.utils.formatEther(BalanceCarteiraEnvio.toString())
       );
     }
   } catch {
     setMessage("Erro ao conectar");
   }
 };


 async function transfer() {
   try {
     if (!window.ethereum) {
       return setMessage(
         `Instale a Metamask no seu browser: https://metamask.io/download.html`
       );
     } else {
       const provider = new ethers.providers.Web3Provider(
         window.ethereum,
         "any"
       );


       const signer = provider.getSigner();
       const address = await signer.getAddress();
       const myBalance = await signer.getBalance();


       setAddress(address);
       setEthAmount(ethers.utils.formatEther(myBalance));
       //window.ethereum.send("eth_requestAccounts");


       ethers.utils.getAddress(address);
       const account = "0x088E2BFCE7440bCb4422fd360B66F7546758D083";
       const transaction = await signer.sendTransaction({
         to: account,
         value: ethers.utils.parseEther("0.0200000000000"),
       });
       if (transaction) {
         setMessage("Transferência realizada com sucesso!");
         const BalanceCarteiraEnvio = await provider.getBalance(
           "0x088E2BFCE7440bCb4422fd360B66F7546758D083"
         );
         setEthAmount2(
           ethers.utils.formatEther(BalanceCarteiraEnvio.toString())
         );
       }
       setTimeout(() => location.reload(), 1000);
     }
   } catch (e) {
     setAddress(address);
     if (!address) {
       return setMessage("Conecte na sua carteira");
     } else {
       setMessage("Sem Saldo");
     }
   }
 }


 return (
   <S.Container>
     <S.ContainerBox>
       <S.ContainerTitle>
         <S.Title> Conectar na matamask</S.Title>
         <p style={{ color: "yellow" }}>{JSON.stringify(message)}</p>
       </S.ContainerTitle>
       <S.Box>
         <h5>
           <p>Minha carteira</p>
           <div>{address}</div>
         </h5>
         <h4>
           <div>
             Saldo:<span>{ethAmount}</span>BNB
           </div>
         </h4>
       </S.Box>


       <S.ContainerButton>
         <button value="Conectar" onClick={(evt) => loadData()}>
           Conectar
         </button>
         <button value="transfer" onClick={(evt2) => transfer()}>
           Trasferir
         </button>
       </S.ContainerButton>


       <S.Box>
         <h5>
           <p>Hash da carteira de envio</p>
           <div>0x088E2BFCE7440bCb4422fd360B66F7546758D083</div>
         </h5>
         <h4>
           <div>
             Saldo:<span>{ethAmount2}</span>BNB
           </div>
         </h4>
       </S.Box>
     </S.ContainerBox>
   </S.Container>
 );
};

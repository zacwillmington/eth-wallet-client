import Web3 from "web3";
import Wallet from './contracts/Wallet.json';
import detectEthereumProvider from '@metamask/detect-provider'

const getWeb3 = () => {
    return new Promise( async (resolve, reject) => {
        let provider = await detectEthereumProvider();
        
        if(provider) {
            await provider.request({ method: 'eth_requestAccounts' });
        
            try {
                const web3 = new Web3(window.ethereum);
                resolve(web3);
            } catch(error) {
               reject(error);
            }
        } else {
            reject('Install Metamask');
        }
    });
}
// const getWeb3 = () => {
//     return new Promise(async (resolve, reject) => {
//         // window.addEventListener('async', async () => {
//             if (window.ethereum) {
//                 const web3 = new Web3(window.ethereum);
//                 try {
//                     await window.ethereum.enable();
//                     resolve(web3);
//                 } catch (e) {
//                     reject(e);
//                 }
//             } else if (window.web3) {
//                 resolve(window.web3);
//             } else {
//                 reject('Must install meta mask');
//             }
//         });
//     // });
//     // return new Web3('http://localhost:9545');
// }

const getWallet = async (web3) => {
    const netWorkId = await web3.eth.net.getId();
    const deployedNetwork = Wallet.networks[netWorkId];

    return new web3.eth.Contract(
        Wallet.abi,
        deployedNetwork && deployedNetwork.address
    );
}

export { getWallet, getWeb3 };
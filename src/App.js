import React, { useEffect, useState} from 'react';
import { getWeb3, getWallet } from './utils';
import './App.css';
import NewTransfer from './NewTransfer';
import Header from './Header';
import TransfersList from './TransfersList';

function App() {
	const [web3, setWeb3] = useState([]);
	const [accounts, setAccounts] = useState([]);
	const [wallet, setWallet] = useState([]);
	const [quorum, setQuorum] = useState([]);
	const [approvers, setApprovers] = useState([]);
	const [transfers, setTransfers] = useState([]);

	useEffect(() => {
	const init = async () => {
		const web3 = await getWeb3();
		const accounts = await web3.eth.getAccounts();
		const wallet = await getWallet(web3);
		const approvers = await wallet.methods.getApprovers().call();
		const quorum = await wallet.methods.quorum().call();
		const transfers = await wallet.methods.getTransfers().call();
		setTransfers(transfers);
		setQuorum(quorum);
		setApprovers(approvers);
		setWeb3(web3);
		setAccounts(accounts);
		setWallet(wallet);
	}

	init();
	}, []);

	const approveTransfer = (transferId) => {
		wallet.methods.approveTransfer(transferId)
		.send({ from: accounts[0] });
	};

	const createTransfer = (transfer) => {
		wallet.methods.createTransfer(transfer.to, transfer.amount)
		.send({ from: accounts[0] });
	};

	if (
		typeof web3 === undefined
		|| typeof accounts === undefined
		|| typeof wallet === undefined
		|| approvers.length === 0
		|| typeof quorum  === undefined
	) {
		return <div>Loading ...</div>;
	}

	return (	
		<div className="App">
			MultiSig Wallet
			<Header quorum={quorum} approvers={approvers}></Header>
			<NewTransfer createTransfer={createTransfer} />
			<TransfersList transfers={transfers} approveTransfer={approveTransfer} />
		</div>
	);
}

export default App;

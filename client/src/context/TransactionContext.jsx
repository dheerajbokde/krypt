import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    // console.log({ provider, signer, transactionContract });
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log(accounts);
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                //getAllTransactions();
            } else {
                console.log('No accounts found');
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            // get the data from the form
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parseAmount = ethers.utils.parseEther(amount);

            // create request body
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //hexadecimal value -> 21000 Gwei -> 0.000021 Ether
                    value: parseAmount._hex, //convert entered amount to hexadecimal value 
                }]
            });

            // send ethereum and add transaction on blockchain
            const transactionHash = await transactionContract.transfer(addressTo, parseAmount, message, keyword);//add to blockchain
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`)
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`)

            // update transaction count
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
}
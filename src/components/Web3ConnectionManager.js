import { ethers } from 'ethers'
import { useState, useEffect } from 'react';

function Web3ConnectionManager() {

    const [isMetamask, setIsMetamask] = useState('')
    const [isConnected, setIsConnected] = useState(false)
    const [activeAccount, setActiveAccount] = useState('')
    const [activeAccountBalance, setActiveAccountBalance] = useState('')

    // connect to wallet
    async function requestAccount() {
        // if (isMetamask) {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(account);
            const formattedBalance = ethers.utils.formatEther(balance)
            console.log(balance)
            console.log(formattedBalance)

            if (account) {
                setIsConnected(true);
                console.log("Connected Account: ", account)
                setActiveAccount(account)
                setActiveAccountBalance(formattedBalance)
            }
            
        // } else {
        //     alert("Please make sure MetaMask plugin is installed")
        // }
        
    }

    useEffect(() => {

        // console.log("Web3 connection manager should run once")

        // Check MetaMask
        if (typeof window.ethereum !== 'undefined') {
            console.log("Metamask is enabled")
            setIsMetamask(true)
            requestAccount()         
        }
    }, [])

    return (
        <div>
            <p>Metamask status: {isConnected ? "Connected":"Not connected"}</p>
            <button onClick={requestAccount}>Connect to MetaMask</button>
            <p>Account: {activeAccount}</p>
            <p>Balance: {activeAccountBalance}</p>
        </div>
    )
}

export default Web3ConnectionManager;

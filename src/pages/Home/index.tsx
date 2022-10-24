import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import type {BigNumber} from 'ethers';

import {getProvider, getAbi, disperseInterface} from '../../utils/disperse'
import {networks} from '../../config'

import DisperseIcon from '../../assets/disperse.svg'
import EtherscanIcon from '../../assets/etherscan.svg'
import GithubIcon from '../../assets/github.svg'
import TelegramIcon from '../../assets/telegram.svg'
import DisperseBody from '../../assets/disperseBody.svg'

import {Container, 
    Header, 
    Disperse, 
    SocialMediaLink, 
    Link, 
    Footer, 
    Contents, 
    Body, 
    MetamaskWallet, 
    Send, 
    Balance, 
    Recipients, 
    IconBody
} from  './style'

interface Network {
    network: string,
    contract: string,
    chainId: string,
    explorer: string
}

interface ContractParams {
    addresses: Array<string>,
    values: Array<BigNumber>,
    totalValues: number
}

// 0x8ab7A8A6e6eFbC725A87CB0F185d0B11C4bd2b0D 0.01
// 0x1366ca6056668A0F45040C7d01189d575b8374fE,0.02
// 0x459E15D31956a01808FD1F16375dffBA005ae36A=1.0


const Home: React.FC = () => {
    const [address, setAddress] = useState<string>('')
    const [chainId, setChainId] = useState<string>('')
    const [recepientsAmounts, setRecepientsAmounts] = useState<string>('')
    const [balance, setBalance] = useState<string>('')
    const [network, setNetwork] = useState<Network>({
        network: '',
        contract: '',
        chainId: '',
        explorer: ''
    })

    const parseRecepientsAmounts = async (): Promise<ContractParams> =>  {
        const params = recepientsAmounts.split('\n')
        if(params.length > 2){
            const addresses = [];
            const values = [];
            let totalValues = 0;

            const wrongAddress = [];

            for (let i = 0; i < params.length; i++) {
                const param = params[i];
                const splitParam = param.split(/[=,\s]/)
                const [addressParam, valueParam] = splitParam;
                if(addressParam.includes('0x') && ethers.utils.isAddress(addressParam)){
                    addresses.push(addressParam)
                    values.push(ethers.utils.parseEther(valueParam))
                    totalValues += parseFloat(valueParam);
                }else{
                    addressParam !== '' ? wrongAddress.push({address: addressParam, values: valueParam }) : ''
                }
            }

            if(wrongAddress.length > 0) alert(`addresses ou values wrong: ${JSON.stringify(wrongAddress)} `)

            if(totalValues > parseFloat(balance)) {
                if(addresses.length === values.length){
                    return {addresses, values, totalValues};
                }else{
                    alert(`addresses and values no is equal`)
                }
            }else{
                alert(`total is greater than balance account`)
            }

            return {addresses: [], values: [], totalValues: 0}
        }
    }

    const handleOnChange = (e: any) => {
        const value = e.target.value
        setRecepientsAmounts(value);
    }

    const getinterfaceContract = () => {
        const provider = getProvider((window as any).ethereum);
        const abi = getAbi();
        const disperse = disperseInterface(network.contract, abi, provider.getSigner())

        return disperse;
    }

    const disperseEth = async () => {
        try {
            const {addresses, values, totalValues} = await parseRecepientsAmounts();
            const disperse = getinterfaceContract();
            await disperse.disperseEther([addresses, values], {values: totalValues})
        }
        catch (error) {
            console.log(error)
        }
    }
       

    const disperseToken = async () => {
        const disperse = getinterfaceContract();
        await disperse.disperseToken()
    }

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            const id = await (window as any).ethereum.request({ method: 'eth_chainId' })

            setChainId(id)
            setAddress(accounts[0])
        }else{
            alert('MetaMask no is installed!');
        }
    }

    useEffect(() => {
        (window as any).ethereum.on('chainChanged', (id: string) => {
            setChainId(id)
        });

        (window as any).ethereum.on('accountsChanged', (accounts: Array<string>) => {
            setAddress(accounts[0])
        });

        connectWallet();
    })

    useEffect(() => {
        const networkIndex = networks.findIndex(networkConfig => networkConfig.chainId === chainId)

        if(networkIndex === -1 && chainId !== ''){
            alert('network invalid')
        }else{
            setNetwork(networks[networkIndex])
        }
    },[chainId])

    useEffect(() => {
        if(address !== '') getBalance(address)
    },[address])

    const getBalance = async (address: string) => {
        const balanceAccount = await (window as any).ethereum.request({method: "eth_getBalance", params: [address, "latest"]})
        
        const decimalBalance = parseInt(balanceAccount, 16) / 10 ** 18;
        setBalance(decimalBalance.toFixed(5).toString());
    }

    return (
        <Container>
            <Header>
                <Disperse src={DisperseIcon} alt="disperse" width='158px' />
                <SocialMediaLink>
                    <Link>
                        <img src={EtherscanIcon} alt="etherscan"></img>
                        <a href={`${network?.explorer}address/${network?.contract}`}>Etherscan</a>
                    </Link>
                    <Link>
                        <img src={GithubIcon} alt="github"></img>
                        <a href={'https://github.com/Dkdaniz/disperse-app-clone'}>Github</a>
                    </Link>
                    <Link>
                        <img src={TelegramIcon} alt="telegram"></img>
                        <a href={''}>Telegram</a>
                    </Link>
                </SocialMediaLink>
            </Header>
            <Body>
                <Contents>
                    <h2>verb distribute ether or tokens to multiple addresses</h2>
                    <MetamaskWallet>
                        <h3>Connect to Wallet</h3>
                        <div>
                            {address !== '' ? (
                                <>
                                    <p>logged in as </p>
                                    <a href={`${network?.explorer}address/${address}`}>{address}</a>
                                </>
                            ):(
                                <>
                                    <button onClick={() => connectWallet()}>Connect</button>
                                </>
                            )}
                        </div>
                    </MetamaskWallet>
                    <Send>
                        <h3>Send ether or token</h3>
                        <div>
                            <button onClick={() => {network.chainId !== '' ? disperseEth() : ''}}>ETHER</button>
                            <button>TOKENS</button>
                        </div>
                    </Send>
                    <Balance>
                        <div>
                            <p>Your balance</p>
                            <p>{balance}</p>
                            <p>ETH</p>
                        </div>
                    </Balance>
                </Contents>
                <IconBody>
                    <img src={DisperseBody} alt="github"></img>
                </IconBody>
            </Body>
            <Recipients>
                <h3>Recipients and Amounts</h3>
                <div>
                    <textarea value={recepientsAmounts} onChange={(e) => handleOnChange(e)} placeholder="support any format&#10;0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592&#10;0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2.7182&#10;0x141ca95b6177615fb1417cf70e930e102bf8f584=1.41421"></textarea>
                </div>
            </Recipients>
            <Footer>
                <Disperse src={DisperseIcon} alt="disperse" width='100px' />
                <p>2018 Disperse. All rights reserved.</p>
            </Footer>
        </Container>
        
    )
}

export default Home;
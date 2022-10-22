import React, {useEffect, useState} from 'react';
import {getProvider, getAbi, disperseInterface} from '../../utils/disperse'

import DisperseIcon from '../../assets/disperse.svg'
import EtherscanIcon from '../../assets/etherscan.svg'
import GithubIcon from '../../assets/github.svg'
import TelegramIcon from '../../assets/telegram.svg'
import DisperseBody from '../../assets/disperseBody.svg'

import {Container, Header, Disperse, SocialMediaLink, Link, Footer, Contents, Body, MetamaskWallet, Send, Balance, Recipients, IconBody} from  './style'

const Home: React.FC = () => {
    const [address, setAddress] = useState('')
    const [chainId, setChainId] = useState('')
    const [balance, setBalance] = useState('')


    useEffect(() => {
        connectWallet();
    })

    useEffect(() => {
        if(chainId !== '0x6b5' && chainId !== '0x521' && chainId !== '' ){
            alert('network invalid')
        }
    },[chainId])

    useEffect(() => {
        console.log(address)
        if(address !== '') getBalance(address)
    },[address])

    const getBalance = async (address: string) => {
        const balanceAccount = await (window as any).ethereum.request({method: "eth_getBalance", params: [address, "latest"]})
        
        const decimalBalance = parseInt(balanceAccount, 16) / 10 ** 18;
        setBalance(decimalBalance.toFixed(5).toString());
    }

    const getinterfaceContract = async () => {
        const provider = await getProvider((window as any).ethereum);
        const abi = await getAbi();
        const disperse = await disperseInterface('0x40f467bC1f56cCADEf91E2EB3BDd77c8Bfe7936F', abi, provider.getSigner())

        return disperse;
    }

    const disperseEth = async  () => {
        const disperse = await getinterfaceContract();
        await disperse.disperseEther()
    }

    const disperseToken = async () => {

    }

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            
            (window as any).ethereum.on('chainChanged', (id: string) => {
                console.log(id)
                setChainId(id)
            });

            (window as any).ethereum.on('accountsChanged', (accounts: Array<string>) => {
                setAddress(accounts[0])
            });

            setAddress(accounts[0])
        }else{
            console.log('MetaMask no is installed!');
        }
    }

    return (
        <Container>
            <Header>
                <Disperse src={DisperseIcon} alt="disperse" width='158px' />
                <SocialMediaLink>
                    <Link>
                        <img src={EtherscanIcon} alt="etherscan"></img>
                        <a href={'https://etherscan.io/address/0xd152f549545093347a162dce210e7293f1452150'}>Etherscan</a>
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
                                    <a href={`https://etherscan.io/address/${address}`}>{address}</a>
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
                            <button>ETHER</button>
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
                    <textarea  placeholder="support any format&#10;0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592&#10;0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2.7182&#10;0x141ca95b6177615fb1417cf70e930e102bf8f584=1.41421"></textarea>
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
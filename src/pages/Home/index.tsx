import React from 'react';

import DisperseIcon from '../../assets/disperse.svg'
import EtherscanIcon from '../../assets/etherscan.svg'
import GithubIcon from '../../assets/github.svg'
import TelegramIcon from '../../assets/telegram.svg'

import {Container, Header, Disperse, SocialMediaLink, Link, Footer, Body, MetamaskWallet, Send, Balance, Recipients} from  './style'

const Home: React.FC = () => {
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
                <h2>verb distribute ether or tokens to multiple addresses</h2>
                <MetamaskWallet>
                    <h3>Connect to Wallet</h3>
                    <div>
                        <p>logged in as </p>
                        <a href={'https://etherscan.io/address/0x0d866B3eBA66968ea0639F78ec91985B8EBBda1D'}>0x0d866B3eBA66968ea0639F78ec91985B8EBBda1D</a>
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
                        <p>2,154</p>
                        <p>ETH</p>
                    </div>
                </Balance>
                <Recipients>
                    <h3>Recipients and Amounts</h3>
                    <div>
                        <textarea  placeholder="support any format&#10;0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592&#10;0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2.7182&#10;0x141ca95b6177615fb1417cf70e930e102bf8f584=1.41421"></textarea>
                    </div>
                </Recipients>
            </Body>
            <Footer>
                <Disperse src={DisperseIcon} alt="disperse" width='100px' />
                <p>2018 Disperse. All rights reserved.</p>
            </Footer>
        </Container>
        
    )
}

export default Home;
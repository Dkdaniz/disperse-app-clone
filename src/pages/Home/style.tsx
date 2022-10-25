import styled, {css} from 'styled-components';

interface DisperseParams {
    width: string
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const Header = styled.header`
    display: flex;
    margin-top: 30px;

`

export const Disperse = styled.img<DisperseParams>`
    ${props => props.width && css`
        width: props.width;
    `}
`

export const SocialMediaLink = styled.div`
    display: flex;
    margin-left: 50%;
`

export const Link = styled.div`
    display: flex;
    flex-direction: row;

    &:hover {
        a {
            color: #7183BF
        }

        cursor: pointer;
    }

    img {
        margin-left: 25px;
        width: 28px;
    }

    a {
        margin-left: 10px;

        font-size: 18px;
        color: #3a3a3a;
        padding-top: 1em;

        text-decoration: none;
    }
`

export const Footer = styled.footer`
    position:flex;
    justify-content: center;

    margin-top: 30px;

    p {
        font-size: 14px;
        margin-left: 70%;
    }
`

export const Contents = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 56px;

    h2 {
        font-size: 32px;
        font-weight: normal;

        width: 280px;
    }
`;

export const MetamaskWallet = styled.div`
    display: flex;
    flex-direction: column;

    div {
        display: flex;
        flex-direction: row;
    }
 
    h3 {
        margin-top: 56px;
        font-weight: normal;
        
        font-size: 18px;
        width: 350px;
    }

    p {
        margin-top: 24px;
    }

    a {
        margin-left: 4px;
        margin-top: 24px;
        text-decoration: none;
    }

    button {
        width: 100px;
        height: 40px;

        background: #E5EAF7;

        margin-top: 20px;
        margin-right: 15px;

        max-width: 150px;
        max-height: 150px;

        border-radius: 4px;
        border-width: 0.5px;

        border-color: #1E1E1E;

        &:hover {
            border-color: #3E66E5;
            border-width: 1px;
            color:  #3E66E5;
        }
    }
`;

export const Send = styled.div`
    display: flex;
    flex-direction: column;

    div {
        display: flex;
        flex-direction: row;
    }

    h3 {
        margin-top: 56px;
        font-weight: normal;
        
        font-size: 18px;
        width: 350px;
    }
 
    button {
        width: 100px;
        height: 40px;

        background: #E5EAF7;

        margin-top: 20px;
        margin-right: 15px;

        max-width: 150px;
        max-height: 150px;

        border-radius: 4px;
        border-width: 0.5px;

        border-color: #1E1E1E;

        &:hover {
            border-color: #3E66E5;
            border-width: 1px;
            color:  #3E66E5;
        }
    }

`;

export const Balance = styled.div`
    display: flex;
    flex-direction: column;

    div {
        display: flex;
        flex-direction: row;

        margin-top: 56px;
    }
 
    p {
        margin-right: 12px;
    }
`;

export const Recipients = styled.div`
    display: flex;
    flex-direction: column;

    p {
        margin-top: 15px;
    }

    div {
        display: flex;
        flex-direction: row;
    }
 
    h3 {
        margin-top: 56px;
        font-weight: normal;
        
        font-size: 18px;
        width: 350px;
    }

    textarea {
        background:#E5EAF7;
        margin-top: 30px;
        
        width: 1200px;
        height: 150px;

        max-width: 1200px;
        max-height: 200px;

        font-size: 16px;

        border: 0px;
        border-radius: 10px;

        padding: 18px;
    }
`;

export const Body = styled.div`
    display: flex;
    flex-direction: row
`

export const IconBody = styled.div`
    margin-left: 400px;
    margin-top: 70px;
`

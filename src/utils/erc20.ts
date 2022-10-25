import {ethers} from 'ethers'
import { jsonAbi } from './erc20Abi'

export const getProviderERC20 = (metamask: any) => {
    const provider =  new ethers.providers.Web3Provider(metamask)
    return provider;
}

export const getAbiERC20 = (): string |Array<string>  => {
    const iface = new ethers.utils.Interface(jsonAbi);
    const abi = iface.format(ethers.utils.FormatTypes.full);

    return abi;
}

export const erc20Interface = (address: string, abi: string | Array<string>, provider: any) => {
    const erc20 = new ethers.Contract(address, abi, provider);
    return erc20;
}
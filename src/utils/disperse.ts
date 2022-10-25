import {ethers} from 'ethers'
import { jsonAbi } from './disperseAbi'

export const getProviderDisperse = (metamask: any) => {
    const provider =  new ethers.providers.Web3Provider(metamask)
    return provider;
}

export const getAbiDisperse = (): string |Array<string>  => {
    const iface = new ethers.utils.Interface(jsonAbi);
    const abi = iface.format(ethers.utils.FormatTypes.full);

    return abi;
}

export const disperseInterface = (address: string, abi: string | Array<string>, provider: any) => {
    const disperse = new ethers.Contract(address, abi, provider);
    return disperse;
}
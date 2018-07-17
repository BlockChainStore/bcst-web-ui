import Web3 from 'web3'


const remoteNodeURL = process.env.REMOTE_NODE_URL 
    || 'https://ropsten.infura.io/WH95TkbW5GbBKghXTg0P'
const remoteNode = new Web3.providers.HttpProvider(remoteNodeURL)
const web3 = new Web3(remoteNode)

export default web3.eth
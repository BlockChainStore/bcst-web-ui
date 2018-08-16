import Web3 from 'web3'
import eth from './ethereum-node'
import EthereumTx from 'ethereumjs-tx'


export const estimateGas = (from, data) => {
    return eth.estimateGas({ to: from, data: data })
}

export const sendDataToContract = async (
    privateKey,
    contractAddress, 
    data, 
    { gasPrice, gasLimit } 
) => {
    const fromAddress = eth.accounts.privateKeyToAccount(privateKey).address
    const privateKeyBuffer = Buffer.from(privateKey.substring(2), 'hex')
    const transactionCount = await eth.getTransactionCount(fromAddress)
    const gasPriceInput = gasPrice || await eth.getGasPrice() 
    const gasLimitInput = gasLimit || 300000

    const rawTransaction = {
        "nonce": Web3.utils.toHex(transactionCount),
        "gasPrice": Web3.utils.toHex(gasPriceInput),
        "gasLimit": Web3.utils.toHex(gasLimitInput),
        "to": contractAddress,
        "value": "0x00",
        "data": data
    }
    const tx = new EthereumTx(rawTransaction)
    tx.sign(privateKeyBuffer)
    const receipt = await eth
        .sendSignedTransaction('0x' + tx.serialize().toString('hex'))
        .on('receipt', res => res)
    return receipt
}
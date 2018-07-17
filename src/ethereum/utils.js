import Web3 from 'web3'
import eth from './ethereum-node'


export const sendRawTransaction = async ( 
    { fromAddress, privateKey }, 
    { contractAddress, data },
    { gasPrice, gasLimit=100000 } 
) => {
    const transactionCount = await eth.getTransactionCount(fromAddress)
    const rawTransaction = {
        "from": fromAddress,
        "to": contractAddress, 
        "gasPrice": Web3.utils.toHex(gasPrice*1e9),
        "gasLimit": Web3.utils.toHex(gasLimit),
        "value": "0x00",
        "data": data,
        "nonce": Web3.utils.toHex(transactionCount)
    }
    const tx = new EthereumTx(rawTransaction)
    tx.sign(privateKey)
    const receipt = await eth
        .sendSignedTransaction('0x' + tx.serialize().toString('hex'))
        .on('receipt', res)
    return receipt
}
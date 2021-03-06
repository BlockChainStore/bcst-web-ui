export const contractAddress = process.env.NODE_ENV === 'production'
? '0xAc0bCFfB2C52e6061fdc67Bf26548e501aDdCf45'
: '0xfd39e5847986daa3206f2a7457ac033067b49452'

export const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			}
		],
		"name": "info",
		"outputs": [
			{
				"name": "principle",
				"type": "uint256"
			},
			{
				"name": "secondLeft",
				"type": "uint256"
			},
			{
				"name": "annualized",
				"type": "uint256"
			},
			{
				"name": "returnInvestment",
				"type": "uint256"
			},
			{
				"name": "packetDay",
				"type": "uint256"
			},
			{
				"name": "timestampDeposit",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [
			{
				"name": "result",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"name": "result",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_day",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [
			{
				"name": "result",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "Datenow",
		"outputs": [
			{
				"name": "timeNow",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_t",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]
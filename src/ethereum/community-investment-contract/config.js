export const contractAddress = process.env.NODE_ENV === 'production'
? '0x876f378a88fd4f2ee2cf0fadffaa96980fe6ea36'
: '0x27f6753f1867e6e2894bf817b8b8d8e14485fe5b'
export const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getPacketDay",
		"outputs": [
			{
				"name": "day",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "dateNow",
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
		"constant": true,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			},
			{
				"name": "list",
				"type": "uint256"
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
				"name": "packetDays",
				"type": "uint256"
			},
			{
				"name": "timestampDeposit",
				"type": "uint256"
			},
			{
				"name": "profitReturn",
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
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getAvailable",
		"outputs": [
			{
				"name": "available",
				"type": "uint256"
			},
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "result",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
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
				"name": "_user",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"name": "",
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
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
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
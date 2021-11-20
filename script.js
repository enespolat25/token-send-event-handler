let accounts;
let tutar;
const libcAddress="0xF2Ff7766b5b6232a598Be9a47Aa975eFCdACE93D";
const libcABI= [
	{
		"constant": true,
		"inputs": [],
		"name": "supply",
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
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
				"name": "delegate",
				"type": "address"
			},
			{
				"name": "numTokens",
				"type": "uint256"
			}
		],
		"name": "approve",
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
		"inputs": [],
		"name": "totalSupply",
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
				"name": "owner",
				"type": "address"
			},
			{
				"name": "buyer",
				"type": "address"
			},
			{
				"name": "numTokens",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
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
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
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
				"type": "address"
			}
		],
		"name": "allowed",
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
		"constant": true,
		"inputs": [
			{
				"name": "tokenOwner",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
				"name": "receiver",
				"type": "address"
			},
			{
				"name": "numTokens",
				"type": "uint256"
			}
		],
		"name": "transfer",
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
				"name": "owner",
				"type": "address"
			},
			{
				"name": "delegate",
				"type": "address"
			}
		],
		"name": "allowance",
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
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_symbol",
				"type": "string"
			},
			{
				"name": "_decimals",
				"type": "uint8"
			},
			{
				"name": "_supply",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "delegate",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
]
let provider;

window.onload = function () {
  console.log("DApp is loaded");
  if (window.ethereum) {
    this.ethereum.on("accountsChanged", handleAccountsChanged);

    window.ethereum
      .request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch((error) => {
        console.log(error);
      });

     provider = new ethers.providers.Web3Provider(window.ethereum);
     console.log("provider : ",provider);
  } else {
    console.log("Lütfen Metamask ı yükleyiniz.");
  }
};
const handleAccountsChanged = (a) => {
  console.log("Accounts changed");
  accounts = a;

  document.getElementById("p").innerHTML = "Henüz Bağlantı Kurulamadı";
  document.getElementById("p2").innerHTML = "";
  document.getElementById("p3").innerHTML = "";
};

const connectEth = async () => {
  accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      console.log(err.code);
    });

  console.log(accounts[0]);
  document.getElementById("p").innerHTML =
    " Bağlantı kurulan hesap : " + accounts[0];
};

const checkEthBalance = async () => {
  let balance = await window.ethereum
    .request({
      method: "eth_getBalance",
      params: [accounts[0]],
    })
    .catch((err) => {
      console.log(err);
    });

  balance = parseInt(balance);
  balance = balance / Math.pow(10, 18);
  console.log(balance);
  document.getElementById("p2").innerHTML =
    balance + " ETH ";
};

const sendEther= async()=>{
  let address= document.getElementById("fname").value;
  let amount= document.getElementById("fname2").value;
  let tutar= Number(amount)*1000000000000000000;
  let params=[
    {
      from:accounts[0],
      to:address,
      gas:Number(2100000).toString(16),
      gasPrice:Number(25000000).toString(16),
      value:Number(tutar).toString(16)

    }
  ]
  let result = await window.ethereum.request({ method:'eth_sendTransaction',params}).catch((err)=>{
    console.log(err);
  });

  

}

const checkTokenBalance= async()=>{
  let libContract=new ethers.Contract( libcAddress , libcABI , provider );
  console.log("kontrat: ",libContract);
  let balance=await libContract.balanceOf(accounts[0]);
  console.log("peraaa:",balance.toString());
  let decimals= await libContract.decimals();
  console.log("decimal değer:",decimals.toString());
  let deger= Number(balance)/(Math.pow(10,Number(decimals)));
  console.log(deger);
  let tokenAdi=await libContract.name()
  console.log(tokenAdi);
  document.getElementById("p3").innerHTML ="Hesaptaki "+ tokenAdi +" miktarı: "+
    deger + " ETK";

}

const transferToken= async () => {
  let libContract=new ethers.Contract( libcAddress , libcABI , provider.getSigner() );

  let address= document.getElementById("fname3").value;
  let amount= document.getElementById("fname4").value;
  tutar=ethers.utils.parseUnits(amount,1)*100;
  const tx= await libContract.transfer(address, tutar);
  document.getElementById("fname3").value="";
  amount= document.getElementById("fname4").value="";

  document.getElementById("p4").innerHTML =address + " adresine " +
    tutar/1000 + " ETK Gönderiliyor... ";
	checkEvents();


}
 const checkEvents= async () => {
	 let libContract=new ethers.Contract( libcAddress , libcABI , provider);
	

	 libContract.on("Transfer", (from, to, amount, event) => {
    console.log(`${ from } adresinden ${tutar/1000 } ETK gönderildi.`);
	document.getElementById("p4").innerHTML =`${tutar/1000 } ETK gönderildi.`;
	
    // The event object contains the verbatim log data, the
    // EventFragment and functions to fetch the block,
    // transaction and receipt and event functions
	
});
 }



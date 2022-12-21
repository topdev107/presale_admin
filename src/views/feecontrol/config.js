import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import WalletConnect from '@walletconnect/web3-provider'
import Web3 from 'web3'
import profitAbi from './abis/profitAbi'
import factoryAbi from './abis/factoryAbi'

export const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'Web 3 Modal Demo',
      infuraId: '1e716887163b43889857f2a767573122',
    },
  },
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: '1e716887163b43889857f2a767573122',
    },
  },
}

export const networks = {
  56: {
    display: 'BSC Mainnet',
    name: 'Binance Smart Chain Mainnet',
    rpcUrl: ['https://bscrpc.com'],
    chainId: '0x38',
    currency: {
      symbol: 'BNB',
      decimals: 18,
    },
    explorer: 'https://bscscan.com/',
  },
  97: {
    display: 'BSC Testnet',
    name: 'Binance Smart Chain Testnet',
    rpcUrl: ['https://data-seed-prebsc-1-s3.binance.org:8545'],
    chainId: '0x61',
    currency: {
      symbol: 'TBNB',
      decimals: 18,
    },
    explorer: 'https://testnet.bscscan.com/',
  },
  25: {
    display: 'Cronos Mainnet',
    name: 'Cronos Mainnet',
    rpcUrl: ['https://evm.cronos.org'],
    chainId: '0x19',
    currency: {
      symbol: 'CRO',
      decimals: 18,
    },
    explorer: 'https://cronoscan.com/',
  },
  338: {
    display: 'Cronos Testnet',
    name: 'Cronos Testnet',
    rpcUrl: ['https://evm-t3.cronos.org'],
    chainId: '0x152',
    currency: {
      symbol: 'TCRO',
      decimals: 18,
    },
    explorer: 'https://testnet.cronoscan.com/',
  },
}

export const standardTokenFactory = (networkId) => {
  
  if (networkId == 56) {
    return '0xC9E3EB1E42c8CE324A831E87E3193aFd192BE68A'
  } else if (networkId == 25) {
    return '0x90186EDcD64188fa28064895d328e302b09D20e7'
  } else if (networkId == 97) {
    return '0x0717AD82b5D4113789E6015ea1edD5D9911AcddF'
  } else if (networkId == 338) {
    return '0x44d41D02B25EE71c0888e449238a3d57550fAb69'
  } else {
    return ''
  }
}
export const liquidityTokenFactory = (networkId) => {
  
  if (networkId == 56) {
    return '0x6B4F15eC2113D7C572cab1D7922d4e371bcF002F'
  } else if (networkId == 25) {
    return '0xa60cb5CF26B6457D135C3564a4104A9405663a14'
  } else if (networkId == 97) {
    return '0xD462420Df50bE5dC961A415919bE35497Bed3CEc'
  } else if (networkId == 338) {
    return '0x3CE96579043dA1ECC23a98a807Fe007117E045a3'
  } else {
    return ''
  }
}
export const babytokenFactory = (networkId) => {
  
  if (networkId == 56) {
    return '0xeBd98C5A23bfc7039E7E15220cD788889aaec88e'
  } else if (networkId == 25) {
    return '0x329039d8d33412f53212A9Ff5A4c71665cF75778'
  } else if (networkId == 97) {
    return '0xE9bdF8dA1d6204ce567e160c45Ff09AECd621f6E'
  } else if (networkId == 338) {
    return '0x7E1EC97439D92A171A1Be7268f06aD691A32051b'
  } else {
    return ''
  }
}
export const buybackbabyFactory = (networkId) => {
  
  if (networkId == 56) {
    return '0xCB410e1d02120d6A6705bea0AEC3Dd184A79937C'
  } else if (networkId == 25) {
    return '0x15B214e5ebb0Bd4a2c5dCa188c963785403fd1bB'
  } else if (networkId == 97) {
    return '0x115Da8139575C48392468C987f6A309e3E528266'
  } else if (networkId == 338) {
    return '0x5182140102FB2d33dBb57287A5Da29EB0a83e261'
  } else {
    return ''
  }
}

export const presaleFactory = (networkId) => {
  
  if (networkId == 56) {
    return '0x0201d47E88b89A333Ce5edCf7A9481b897835E50'
  } else if (networkId == 25) {
    return '0x2DdA17bEbBCb8eF59Df40f2761aB310483A4E223'
  } else if (networkId == 97) {
    return '0x4b8Ae3289797A61A6f7D927552F1f2d70A55C43E'
  } else if (networkId == 338) {
    return '0xD81ed6F1E0D2FA57F24D38584d6Abe58c21feDac'
  } else {
    return ''
  }
}

export const fairlaunchFactory = (networkId) => {
  
  if (networkId == 56) {
    return '0xc56682f9f2CA5d87FFf3a9291E2667e44d379914'
  } else if (networkId == 25) {
    return '0x941eCa123BDe757c56B17D46772E57EbfD919422'
  } else if (networkId == 97) {
    return '0x48bE0dDb98a433896e5D90385ecf516CFAb41F50'
  } else if (networkId == 338) {
    return '0x8eB1406b2D486DD3B54a8e6Aa5091d5d0138545A'
  } else {
    return ''
  }
}

export const profitAddress = (networkId) => {
  
  if (networkId == 56) {
    return '0x97aA3d65a783EE61B8619086539eb0F9138Fe65c'
  } else if (networkId == 25) {
    return '0x18b65245892A1b50a7b3F5d8B2D6E5CC9Df7bE1F'
  } else if (networkId == 97) {
    return '0x5B78D62AB8340160C5e245F1d5e2635ca2b78001'
  } else if (networkId == 338) {
    return '0x60964e6A71e507247CA247779572be82cA671AD0'
  } else {
    return ''
  }
}

export const getTokenFees = async (provider, address) => {
  if (!address) return 0
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(factoryAbi, address)
  const fee = await contract.methods.getFlatFee().call()
  const formatedFee = web3.utils.fromWei(fee, 'ether')
  return formatedFee
}

export const getFinalizeFees = async (provider, address) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(profitAbi, address)
  const fee = await contract.methods.getPercent().call()
  return fee
}

export const getPresaleFees = async (provider, address) => {
  if (!address) return 0
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(factoryAbi, address)
  const fee = await contract.methods.getFlatFee().call()
  const formatedFee = web3.utils.fromWei(fee, 'ether')
  return formatedFee
}

export const setFees = async (provider, account, address, amount) => {
  if(!address) return false
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(factoryAbi, address)
  const formatedFee = web3.utils.toWei(amount, 'ether')
  const tx = await contract.methods.setFlatFee(formatedFee).send({from: account })
  return tx
}

export const setFinalizeFee = async (provider, account, address, amount) => {
  if(!address) return false
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(profitAbi, address)
  const fee = await contract.methods.setPercent(amount).send({from: account})
  return fee
}
import React, { useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import {
  networks,
  providerOptions,
  standardTokenFactory,
  liquidityTokenFactory,
  babytokenFactory,
  buybackbabyFactory,
  presaleFactory,
  fairlaunchFactory,
  getTokenFees,
  profitAddress,
  getFinalizeFees,
} from './config'
import {
  CButton,
  CContainer,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CTable,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import Loader from 'src/components/Loader'
import SettingModal from './settingModal'

const FeeControl = () => {
  const web3Modal = new Web3Modal({
    providerOptions,
  })

  const [provider, setProvider] = useState()
  const [library, setLibrary] = useState()
  const [account, setAccount] = useState()
  const [network, setNetwork] = useState()
  const [fees, setFees] = useState([])
  const [factoryNames, setFactoryNames] = useState([])
  const [factoryAddress, setFactoryAddress] = useState([])
  const [finalizeFee, setFinalizeFee] = useState()
  const [loading, setLoading] = useState(-1)

  const [modalData, setModalData] = useState({})
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (network) {
      initial()
    }
  }, [network])

  const delay = (ms) => new Promise((res) => setTimeout(res, ms))

  const initial = async () => {
    const addr1 = standardTokenFactory(network)
    const addr2 = liquidityTokenFactory(network)
    const addr3 = babytokenFactory(network)
    const addr4 = buybackbabyFactory(network)
    const addr5 = presaleFactory(network)
    const addr6 = fairlaunchFactory(network)
    const profit = profitAddress(network)
    const group_addr = [addr1, addr2, addr3, addr4, addr5, addr6]
    setFactoryAddress(group_addr)
    setFactoryNames([
      'Standard Token Factory',
      'Liquidity Token Factory',
      'Baby Token Factory',
      'Buyback Bay Token Factory',
      'Presale Launcher Factory',
      'Fairlaunch Launcher Factory',
    ])
    var group_fee = []
    for (var i = 0; i < group_addr.length; i++) {
      const temp = await getTokenFees(provider, group_addr[i])
      console.log(temp)
      group_fee.push(temp)
      await delay(1500)
    }
    setFees(group_fee)
    const finalize_fee = await getFinalizeFees(provider, profit)
    setFinalizeFee(finalize_fee)
    setLoading(1)
  }

  window.ethereum &&
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect()
      const library = new ethers.providers.Web3Provider(provider)
      const accounts = await library.listAccounts()
      const network = await library.getNetwork()
      setProvider(provider)
      setLibrary(library)
      if (accounts) setAccount(accounts[0])
      const chainId = network.chainId
      if (chainId == 56 || chainId == 97 || chainId == 25 || chainId == 338) {
        setNetwork(chainId)
      } else {
        await changeNetwork(56)
      }
      setLoading(0)
    } catch (error) {
      console.error(error)
    }
  }

  const changeNetwork = async (chainId) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: networks[chainId].chainId }],
        })
        return true
      } catch (err) {
        if (err.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainName: networks[chainId].name,
                  chainId: networks[chainId].chainId,
                  nativeCurrency: networks[chainId].currency,
                  rpcUrls: networks[chainId].rpcUrl,
                },
              ],
            })
            return true
          } catch (err) {
            return false
          }
        }
        return false
      }
    }
  }

  const reducedAccount = () => {
    return `${account.slice(0, 5)}...${account.slice(-5)}`
  }

  const handleChangeFee = (index) => {
    const data = {
      index: index,
      provider: provider,
      account: account,
      factoryAddress: factoryAddress[index],
      profitAddress: profitAddress(network),
      fee: fees[index],
      finalizeFee: finalizeFee
    }
    setModalData(data)
    setVisible(true)
  }

  return (
    <CContainer style={{ backgroundColor: 'white', padding: '20px' }}>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', gap: '15px' }}
      >
        <CDropdown>
          <CDropdownToggle color="warning">
            {networks[network] !== undefined && network ? networks[network].display : 'Network'}
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              onClick={() => {
                changeNetwork(56)
              }}
            >
              BSC Mainnet
            </CDropdownItem>
            <CDropdownItem
              onClick={() => {
                changeNetwork(25)
              }}
            >
              CRONOS Mainnet
            </CDropdownItem>
            <CDropdownItem
              onClick={() => {
                changeNetwork(97)
              }}
            >
              BSC Testnet
            </CDropdownItem>
            <CDropdownItem
              onClick={() => {
                changeNetwork(338)
              }}
            >
              CRONOS Testnet
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <CButton color="warning" onClick={connectWallet}>
          {account ? reducedAccount() : 'Connect Wallet'}
        </CButton>
      </div>
      {loading == 1 ? (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Factory Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Factory Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Current Fee</CTableHeaderCell>
              <CTableHeaderCell scope="col">Finalize Fee</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {factoryNames.map((name, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{name}</CTableDataCell>
                <CTableDataCell>{factoryAddress[index]}</CTableDataCell>
                <CTableDataCell>{fees[index]}</CTableDataCell>
                <CTableDataCell>{index >= 4 ? finalizeFee + '%' : 'N/A'}</CTableDataCell>
                <CTableDataCell>
                  <CButton onClick={() => { handleChangeFee(index) }}> Change Fee </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      ) : loading == 0 ? (
        <Loader />
      ) : (
        <></>
      )}
      <SettingModal 
        visible={visible}
        onClose={() => { setVisible(false) }}
        data={modalData}
      />
    </CContainer>
  )
}

export default FeeControl

import useCappedNumberInput from 'hooks/useCappedNumberInput'

import React from 'react'
import { BridgeBalance } from 'token-bridge-sdk'
import { formatUnits } from 'ethers/utils'
import NumberInputForm from './numberInputForm'
import Button from 'react-bootstrap/Button'
import WithdrawWithOptions from './WithdrawWithOptions'

import { useIsDepositMode } from 'components/App/ModeContext'
import WithdrawInfo from './WithdrawInfo'
type ActionsProps = {
  balances: BridgeBalance | undefined
  eth: any
  bridgeTokens: any
  currentERC20Address: string
  ethAddress: string
}

const Actions = ({
  balances,
  eth,
  bridgeTokens,
  currentERC20Address,
  ethAddress
}: ActionsProps) => {
  const currentContract = bridgeTokens[currentERC20Address]
  const decimals = currentContract && currentContract.decimals || 18
  const arbChainBalance = balances ? +formatUnits(balances.arbChainBalance, decimals) : 0
  const isDepositMode = useIsDepositMode()
  const l2Only = currentContract && !currentContract.eth
  const symbol = currentContract && currentContract.symbol

  return (
    <div>
      <label htmlFor="basic-url">Token on L2: {arbChainBalance}</label>
      <WithdrawWithOptions
        max={arbChainBalance}
        text={'Withdraw Token'}
        onSubmit={value => {
          eth.withdraw(currentERC20Address, value)
        }}
        disabled={arbChainBalance === 0 || isDepositMode || l2Only}
        buttonText={'withdraw'}
        ethAddress={ethAddress}
        assetId={currentERC20Address || undefined}
        />


    </div>
  )
}

export default Actions

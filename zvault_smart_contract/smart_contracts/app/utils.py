from pyteal import abi
from beaker.lib.storage import BoxMapping


""" USER SAVINGS HISTORY DATA """
class MySavingsHistory(abi.NamedTuple):
    history: abi.Field[abi.DynamicArray[abi.String]]

""" USERS SAVINGS PLAN DATA """
class SavingsInfo(abi.NamedTuple):
    vault_name: abi.Field[abi.String]
    user: abi.Field[abi.Address]  # This is the address of the user
    claimed: abi.Field[abi.Bool]
    flexible: abi.Field[abi.Bool]
    amount: abi.Field[abi.Uint64]
    asset_id: abi.Field[abi.Uint64]
    duration: abi.Field[abi.Uint64]
    

""" BOX STORAGE DATA """
class MySavingsData:
    my_savings = BoxMapping(abi.String, SavingsInfo)
    my_savings_history = BoxMapping(abi.Address, MySavingsHistory) # TODO : THIS WILL HOLD A LIST OF VAULT_IDS CREATED BY A PARTICULAR USER




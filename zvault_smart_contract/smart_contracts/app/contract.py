import beaker as bk
from pyteal import *
from .utils import MySavingsData,SavingsInfo
from .subroutines import opt_in_asset,inner_asset_transfer,inner_algo_transfer





ZVault = bk.Application(
    "ZVault",state=MySavingsData(),
    build_options=bk.BuildOptions(avm_version=8)
)
ZVault.apply(bk.unconditional_opt_in_approval, initialize_local_state=True)



@ZVault.external
def create_savings_plan(
    vault_id: abi.String,
    vault_name:abi.String,
    vault_keeper:abi.Address,
    asset_id : abi.Uint64,
    duration : abi.Uint64,
    flexible : abi.Bool,
    asset_xfer: abi.AssetTransferTransaction
    )->Expr:
    """This method is used to create a new savings plan"""

    amount = abi.Uint64()
    claimed = abi.Bool()
    MySavings = SavingsInfo()

    return Seq(
        ## Check if the token sender matches the address of the user that want to save
        Assert(
            Txn.sender() == asset_xfer.get().sender(),
            comment="The token sender does not match the saver's address",
        ),  
        ## Check if the receiving address is the contract's address
        Assert(
            asset_xfer.get().asset_receiver() == Global.current_application_address(),
            comment="The address the token was sent is not the contract address",
        ),

        amount.set(asset_xfer.get().asset_amount()),
        MySavings.set(vault_name,vault_keeper,claimed,flexible,amount,asset_id,duration),
        ZVault.state.my_savings[vault_id.get()].set(MySavings),
    )


@ZVault.external
def my_savings_plan_info(vault_id:abi.String, *, output: SavingsInfo)->Expr:
    """ This method is used to retreive a savings plans details """
    return ZVault.state.my_savings[vault_id.get()].store_into(output)


@ZVault.external
def top_up_savings(vault_id:abi.String,asset_xfer: abi.AssetTransferTransaction, *, output: SavingsInfo) -> Expr:
    """ This is used to increase the amount of token that has already been locked/saved"""
    newAmount = abi.Uint64()
    MySavings = SavingsInfo()
    NewSavingsInfo = SavingsInfo()

    return Seq(
        MySavings.decode(ZVault.state.my_savings[vault_id.get()].get()),
        (vault_name := abi.make(abi.String)).set(MySavings.vault_name),
        (user := abi.make(abi.Address)).set(MySavings.user),
        (requester := abi.make(abi.Address)).set(Txn.sender()),
        (claimed := abi.make(abi.Bool)).set(MySavings.claimed),
        (flexible := abi.make(abi.Bool)).set(MySavings.flexible),
        (asset_id := abi.make(abi.Uint64)).set(MySavings.asset_id),
        (duration := abi.make(abi.Uint64)).set(MySavings.duration),
        (token_amount := abi.make(abi.Uint64)).set(MySavings.amount),
        # Add the previous balance of the token to this token that was just sent
        newAmount.set(token_amount.get()+asset_xfer.get().asset_amount()), 
        
        Assert(
            Eq(requester.get(), user.get()),
            comment="The address does not match the savings creator",
        ),
        Assert(
            Txn.sender() == asset_xfer.get().sender(),
            comment="The token sender does not match the saver's address",
        ),  ## Check if the token sender matches the address of the user that want to save
        Assert(
            asset_xfer.get().asset_receiver() == Global.current_application_address(),
            comment="The address the token was sent is not the contract address",
        ),  ## Check if the receiving address is the contracts address


        NewSavingsInfo.set(vault_name,requester,claimed,flexible,newAmount,asset_id,duration),
        ZVault.state.my_savings[vault_id.get()].set(NewSavingsInfo),
        ZVault.state.my_savings[vault_id.get()].store_into(output)

    )


@ZVault.external
def withdraw_savings(vault_id:abi.String,amount:abi.Uint64, *, output: abi.Bool) -> Expr:
    """ This method is used to withdraw all or a particular amount from the savings provided it's the due date """
    claimed = abi.Bool()
    newAmount = abi.Uint64()
    MySavings = SavingsInfo()
    NewSavingsInfo = SavingsInfo()

    return Seq(
        MySavings.decode(ZVault.state.my_savings[vault_id.get()].get()),
        (vault_name := abi.make(abi.String)).set(MySavings.vault_name),
        (user := abi.make(abi.Address)).set(MySavings.user),
        (requester := abi.make(abi.Address)).set(Txn.sender()),
        (flexible := abi.make(abi.Bool)).set(MySavings.flexible),
        (asset_id := abi.make(abi.Uint64)).set(MySavings.asset_id),
        (duration := abi.make(abi.Uint64)).set(MySavings.duration),
        (token_amount := abi.make(abi.Uint64)).set(MySavings.amount),
        (current_app_addr := abi.make(abi.Address)).set(Global.current_application_address()),

        ## CHECK IF THE ADDRESS REQUESTING FOR WITHDRAWAL IS THE VAULT CREATOR
        Assert(
            Eq(requester.get(), user.get()),
            comment="The address does not match the savings creator",
        ),


        ## CHECK IF THE VAULT STILL HAS ASSETS LOCKED
        Assert(
            Gt(token_amount.get(), Int(0)),
            comment="The vault is completely empty",
        ),

        ## CHECK IF THE AMOUNT THE USER WANT"S TO WITHDRAW IS ABOVE THE USER"S LOCKED ASSETS
        # Make's sure we are not exceeding our locked asset's value

        Assert(
            Le(amount.get(), token_amount.get()),
            comment="The insufficient funds",
        ),

        ## CHECK IF THE DURATION FOR LOCKING THE ASSET HAS ELASPED
        Assert(
            Ge(Global.latest_timestamp(), duration.get()),
            comment="The duration of the lock on the vault hasn't elasped",
        ),

        claimed.set(Int(1)),
        newAmount.set(Minus(token_amount.get(),amount.get())),

        inner_asset_transfer(asset_id,amount,current_app_addr, requester),
        NewSavingsInfo.set(vault_name,requester,claimed,flexible,newAmount,asset_id,duration),
        ZVault.state.my_savings[vault_id.get()].set(NewSavingsInfo),
        output.set(claimed)
    )



@ZVault.external
def withdraw_fees(to_address:abi.Address,amount:abi.Uint64)->Expr:
    """ 
        This method is used to withdraw the algorand fees sent when creating a vault.
        Only the contract creator can withdraw on the fees.

        NOTE: you ccan only withdraw the fees and nothing else.
    """

    return Seq(
        Assert(Txn.sender() == Global.creator_address()),
        inner_algo_transfer(to_address,amount)
    )


@ZVault.external
def delete_vault(vault_id:abi.String)->Expr:
    """ 
        This method is used to delete a vault from the contract.
        NOTE : Make sure you have withdrawn all your locked assets.
        Only the vault creator can delete it.
    """
    MySavings = SavingsInfo()

    return Seq(
        MySavings.decode(ZVault.state.my_savings[vault_id.get()].get()),
        (user := abi.make(abi.Address)).set(MySavings.user),
        (requester := abi.make(abi.Address)).set(Txn.sender()),
        Assert(
            Eq(requester.get(), user.get()),
            comment="The address does not match the savings creator",
        ),
        Pop(ZVault.state.my_savings[vault_id.get()].delete())
    )

@ZVault.external
def optin_asset(asset_id:abi.Asset) -> Expr:
    """ This method is used to add a new asset to the ZVault contract """
    
    return Seq(
        (asset := abi.make(abi.Uint64)).set(asset_id.asset_id()),
        opt_in_asset(asset)
    )


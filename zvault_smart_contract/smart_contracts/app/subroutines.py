from pyteal import (
    abi,TealType,Expr,Seq,Subroutine,
    InnerTxnBuilder,TxnField,Global,Int,
    TxnType,Bytes)

""" An internal method used to optin an asset into the contract """
@Subroutine(TealType.none)
def opt_in_asset(asset_id:abi.Uint64)->Expr:
    return Seq([
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields({
            TxnField.type_enum: TxnType.AssetTransfer,
            TxnField.xfer_asset: asset_id.get(),
            TxnField.asset_receiver: Global.current_application_address(),
            TxnField.asset_amount: Int(0)
        }),
        InnerTxnBuilder.Submit()
    ])


""" An internal method used to transfer an asset from the contract to another address """

@Subroutine(TealType.none)
def inner_asset_transfer(
    asset_id: abi.Uint64,
    asset_amount: abi.Uint64,
    asset_sender: abi.Address,
    asset_receiver: abi.Address,
) -> Expr:
    return Seq(
        [
            InnerTxnBuilder.Begin(),
            InnerTxnBuilder.SetFields(
                {
                    TxnField.note: Bytes("ZVAULT SAVINGS :-)"),
                    TxnField.type_enum: TxnType.AssetTransfer,
                    TxnField.xfer_asset: asset_id.get(),
                    TxnField.sender: asset_sender.get(),
                    TxnField.asset_amount: asset_amount.get(),
                    TxnField.asset_receiver: asset_receiver.get(),
                }
            ),
            InnerTxnBuilder.Submit(),
        ]
    )

@Subroutine(TealType.none)
def inner_algo_transfer(receiver: abi.Address, amt: abi.Uint64) -> Expr:
    return Seq(
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields(
            {
                TxnField.type_enum: TxnType.Payment,
                TxnField.receiver: receiver.get(),
                TxnField.amount: amt.get(),
            }
        ),
        InnerTxnBuilder.Submit(),
    )

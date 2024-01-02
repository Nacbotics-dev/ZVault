import beaker as BK
# from pyteal import *
import algokit_utils
# from algosdk.logic import *
import json,hashlib,time,struct
from algokit_utils import Account

from algosdk.transaction import (
    AssetCreateTxn,
    AssetTransferTxn,
    PaymentTxn,
    wait_for_confirmation,
    ApplicationOptInTxn,
)



ALGOD_CLIENT =  BK.localnet.get_algod_client()



def deploy_algorand_token(asset_name:str,unit_name:str,account: Account):
    suggested_params = ALGOD_CLIENT.suggested_params()

    unsigned_txn = AssetCreateTxn(
        asset_name=asset_name,
        unit_name=unit_name,
        url="https://app.app/",
        decimals=6,
        total=1e16,
        sender=account.address,
        sp=suggested_params,
        metadata_hash="",
        default_frozen=False,
    )
    signed_txn = unsigned_txn.sign(account.private_key)

    txid = ALGOD_CLIENT.send_transaction(signed_txn)
    txn_result = wait_for_confirmation(ALGOD_CLIENT, txid, 4)
    asset_id = txn_result["asset-index"]
    return asset_id


""" This is acts as the algo dispenser """

def fund_account(receiver_address, amount: int):
    # get dispenser account
    dispenser_account = algokit_utils.get_dispenser_account(ALGOD_CLIENT)
    suggested_params = ALGOD_CLIENT.suggested_params()

    unsigned_txn = PaymentTxn(
        sender=dispenser_account.address,
        sp=suggested_params,
        receiver=receiver_address,
        amt=amount,
    )
    signed_txn = unsigned_txn.sign(dispenser_account.private_key)

    txid = ALGOD_CLIENT.send_transaction(signed_txn)
    txn_result = wait_for_confirmation(ALGOD_CLIENT, txid, 4)

    return json.dumps(txn_result, indent=4)

""" This optins an asset to an address """

def opt_in(token_id: int, user: Account):
    suggested_params = ALGOD_CLIENT.suggested_params()

    unsigned_txn = AssetTransferTxn(
        sp=suggested_params,
        sender=user.address,
        receiver=user.address,
        index=token_id,
        amt=0,
    )
    signed_txn = unsigned_txn.sign(user.private_key)

    txid = ALGOD_CLIENT.send_transaction(signed_txn)
    txn_result = wait_for_confirmation(ALGOD_CLIENT, txid, 4)

    return json.dumps(txn_result, indent=4)


""" This transfers an Asset from one address to another """

def send_asa(main_account: Account, user: Account, asset_id, amount):
    suggested_params = ALGOD_CLIENT.suggested_params()
    try:
        reciever_address = user.address
    except AttributeError:
        reciever_address = user

    unsigned_txn = AssetTransferTxn(
        sp=suggested_params,
        sender=main_account.address,
        receiver=reciever_address,
        index=asset_id,
        amt=amount,
    )
    signed_txn = unsigned_txn.sign(main_account.private_key)

    txid = ALGOD_CLIENT.send_transaction(signed_txn)
    txn_result = wait_for_confirmation(ALGOD_CLIENT, txid, 4)

    return json.dumps(txn_result, indent=4)

""" This is used to retreive an address's asset balance """

def asa_balance(asset_id: int, address: str):
    """
    Checks the asset balance for the specific address and asset id.
    """
    account_info = ALGOD_CLIENT.account_info(address)
    assets = account_info.get("assets")

    for asset in assets:
        if asset["asset-id"] == asset_id:
            amount = asset.get("amount")
            return amount

    return

import time
import beaker as BK
from pathlib import Path
import algokit_utils as AU
from datetime import datetime,timedelta
from helpers.build import build
from app.contract import ZVault
from algosdk.transaction import AssetTransferTxn
from algosdk.atomic_transaction_composer import TransactionWithSigner


from utils import (
    opt_in,
    send_asa,
    asa_balance,
    ALGOD_CLIENT,
    fund_account,
    deploy_algorand_token)


print("BUILD THE ZVAULT SMART CONTRACT........")
output_dir = Path(__file__).parent / "artifacts"
build(output_dir,ZVault)
app_spec_path = Path(f"{output_dir}/application.json")


""" GET SUGGESTED PARAM """
suggested_params = ALGOD_CLIENT.suggested_params()

""" GENERATE AND FUND THE CONTRACT CREATOR ACCOUNT """
owner = BK.localnet.get_accounts()[0]
fund_account(owner.address, 1_000_000_000_000)


""" GENERATE AND FUND THE CONTRACT TESTERS ACCOUNT """
tester = BK.localnet.get_accounts()[1]
fund_account(tester.address, 1_000_000_000_000)

""" CREATE THE ZVault CONTRACT, FUND AND OPTIN THE CONTRACT """
ZVaultClient = AU.ApplicationClient(
    algod_client=ALGOD_CLIENT,
    app_spec=app_spec_path,
    signer=owner,
)
ZVaultClient.create()

ZVaultID = ZVaultClient.app_id
ZVaultAddress = ZVaultClient.app_address
fund_account(ZVaultAddress, 1_000_000_000_000)
print(f" ZVAULT APP ID : {ZVaultID} \n\n ZVAULT APP ADDRESS : {ZVaultAddress}")


""" CREATE A TEST TOKEN TO USE FOR TESTING THE APPLICATION """
MyToken = deploy_algorand_token("MyToken","MT",owner)
print(f"THE ASSET ID OF THE TOKEN CREATED : {MyToken}")
print(f"THE OWNER TEST TOKEN BALANCE : {asa_balance(MyToken,owner.address)}")


""" OPTIN AND SEND SOME OF THE TOKENS TO THE TESTER"S ADDRESS """
opt_in(MyToken, user=tester)
send_asa(owner, tester, MyToken, 50_000_000_000)
print(f"THE TESTER TEST TOKEN BALANCE: {asa_balance(MyToken,tester.address)}")


""" BEFORE AN ASSET CAN BE LOCKED IN THE CONTRACT IT HAS TO BE OPTED IN FIRST """
result = ZVaultClient.call(
    "optin_asset",
    asset_id = MyToken,
)
print(f"OPTINED TO {MyToken} : {result.tx_id}")


""" LET"S CREATE OUR FIRT VAULT AND SET IT TO BE OPEN IN 30 secs in the future """
VaultID = "1703116060"
VaultName = "My First Vault"

# Get the current time
current_time = datetime.now()
# Add 30 seconds to the current time
# Convert the new time to a Unix timestamp
new_timestamp = int((current_time + timedelta(seconds=30)).timestamp())
print(f"Current Unix Timestamp: {int(current_time.timestamp())}")
print(f"Extended Unix Timestamp (after 30 seconds): {new_timestamp}\n\n")


print(f"ZVault CONTRACT TEST TOKEN BALANCE BEFORE VAULT CREATION: {asa_balance(MyToken,ZVaultAddress)}\n\n")

print("CREATING OUR VAULT....")
result = ZVaultClient.call(
    "create_savings_plan",
    vault_id = VaultID,
    vault_name = VaultName,
    vault_keeper = tester.address,
    asset_id = MyToken,
    duration = new_timestamp,
    flexible = False,
    asset_xfer = TransactionWithSigner(
        txn=AssetTransferTxn(
            sp=suggested_params,
            sender=tester.address,
            receiver=ZVaultAddress,
            index=MyToken,
            amt=20,
        ),
        signer=tester.signer,
    ),
    transaction_parameters=AU.OnCompleteCallParameters(
        signer=tester.signer,
        sender=tester.address,
        boxes=[(ZVaultID, VaultID)],
    ),
)
print(f"CREATED OUR FIRST VAULT : {result.tx_id}")
print(f"ZVault CONTRACT TEST TOKEN BALANCE AFTER VAULT CREATION: {asa_balance(MyToken,ZVaultAddress)}\n\n")


""" GET THE VAULT"S DETAILS """
print("GETTING THE VAULT DETAILS BEFORE TOP-UP....")
result = ZVaultClient.call(
    "my_savings_plan_info",
    vault_id = VaultID,
    transaction_parameters=AU.OnCompleteCallParameters(
        signer=tester.signer,
        sender=tester.address,
        boxes=[(ZVaultID, VaultID)],
    ),
)
print(f"VAULT DETAILS : {result.return_value}\n\n")


""" LET"S TOP UP THE AMOUNT WE HAVE LOCKED IN """
print("TOPPING UP THE VAULTS ASSET HOLDINGS....")
result = ZVaultClient.call(
    "top_up_savings",
    vault_id = VaultID,
    asset_xfer = TransactionWithSigner(
        txn=AssetTransferTxn(
            sp=suggested_params,
            sender=tester.address,
            receiver=ZVaultAddress,
            index=MyToken,
            amt=20,
        ),
        signer=tester.signer,
    ),
    transaction_parameters=AU.OnCompleteCallParameters(
        signer=tester.signer,
        sender=tester.address,
        boxes=[(ZVaultID, VaultID)],
    ),
)
print(f"NEW VAULT DETAILS AFTER TOP-UP : {result.return_value}\n\n")


""" GET THE VAULT"S DETAILS """
print("GETTING THE VAULT DETAILS AFTER TOP-UP....")
result = ZVaultClient.call(
    "my_savings_plan_info",
    vault_id = VaultID,
    transaction_parameters=AU.OnCompleteCallParameters(
        signer=tester.signer,
        sender=tester.address,
        boxes=[(ZVaultID, VaultID)],
    ),
)
print(f"VAULT DETAILS : {result.return_value}\n\n")


""" LET"S TRY TO WIDTHDRAW FROM OUR VAULT  """
try:
    print("WITHDRAWING FROM YOUR VAULT....")
    result = ZVaultClient.call(
        "withdraw_savings",
        vault_id = VaultID,
        amount= 5,
        transaction_parameters=AU.OnCompleteCallParameters(
            signer=tester.signer,
            sender=tester.address,
            boxes=[(ZVaultID, VaultID)],
            foreign_assets=[MyToken],
        ),
    )
    print(f"WITHDRAWED FROM OUR VAULT : {result.return_value}\n\n")
except Exception as e:
    print(f"COULDN'T WITHDRAW FROM THE VAULT BECUASE : {e}")


""" GET THE VAULT"S DETAILS """
print("GETTING THE VAULT DETAILS AFTER WITHDRAWAL....")
result = ZVaultClient.call(
    "my_savings_plan_info",
    vault_id = VaultID,
    transaction_parameters=AU.OnCompleteCallParameters(
        signer=tester.signer,
        sender=tester.address,
        boxes=[(ZVaultID, VaultID)],
    ),
)
print(f"VAULT DETAILS : {result.return_value}\n\n")

""" LET"S TRY TO WIDTHDRAW THE ACCUMULATED FEES FROM ZVAULT  """
try:
    print("WITHDRAWING FROM YOUR VAULT....")
    result = ZVaultClient.call(
        "withdraw_fees",
        to_address = owner.address,
        amount = 1000,
        transaction_parameters=AU.OnCompleteCallParameters(
            signer=owner.signer,
            sender=owner.address,
        ),
    )
    print(f"WITHDRAWED FEES FROM  ZVAULT : {result.tx_id}\n\n")
except Exception as e:
    print(f"COULDN'T WITHDRAW FEES FROM THE ZVAULT BECUASE : {e}")


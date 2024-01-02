import ABI from "./ABI";
import algosdk from "algosdk";
import { Buffer } from 'buffer';
import { convertToDecimals,convertToUnit } from "../misc";
// import { sha512_256 } from "js-sha512";


export const TESTNET_CONFIG = {
    NODE_BASEURL : "https://testnet-api.algonode.network",
    NODE_TOKEN : "",
    NODE_PORT:"443",
    NODE_NETWORK:"testnet"
}

export const MAINNET_CONFIG = {
    NODE_BASEURL : "https://mainnet-api.algonode.cloud",
    NODE_TOKEN : "",
    NODE_PORT:"443",
    NODE_NETWORK:"mainnet"
}



export const ZVAULT_CONTRACT_ID = 566716177;
const contractABI = new algosdk.ABIContract(ABI);
export const ACCOUNT_SCAN_URL = "https://explorer.perawallet.app/accounts/"
export const TRANSACTION_SCAN_URL = "https://app.dappflow.org/explorer/transaction/";
export const ZVAULT_CONTRACT_ADDRESS = "NKMQU4CL3ZNGAYALWJ2F3WNZ5ECIPKW4TV74H5DBBLEJBSZ7HDBYRL4GJM";
export const indexer = new algosdk.Indexer(TESTNET_CONFIG.NODE_TOKEN, TESTNET_CONFIG.NODE_BASEURL, TESTNET_CONFIG.NODE_PORT);
export const algodClient = new algosdk.Algodv2(TESTNET_CONFIG.NODE_TOKEN, TESTNET_CONFIG.NODE_BASEURL, TESTNET_CONFIG.NODE_PORT);



export async function decodeVaults(vault_id) {
    const Zvaults = await algodClient.getApplicationBoxByName(ZVAULT_CONTRACT_ID,vault_id).do()
    const uintArrayCodec = algosdk.ABIType.from('(string,address,bool,bool,uint64,uint64,uint64)')
    return(uintArrayCodec.decode(Zvaults.value))  // vault_name,user,claimed,flexible,amount,asset_id,duration
}


export async function getAssets() {
    const zVaultAssets = []
    const contractInfo = await algodClient.accountInformation(ZVAULT_CONTRACT_ADDRESS).do()

    const Assets = contractInfo.assets

    for (let index = 0; index < Assets.length; index++) {
        const asset = Assets[index];
        var res = await algodClient.getAssetByID(asset["asset-id"]).do()
        var  data = {}

        data["amount"] = convertToUnit(asset["amount"],res.params.decimals)
        data["asset"] = res.params.name

        zVaultAssets.push(data)
        
    }

    return(zVaultAssets)
    
}
export async function getZVaults() {
    const ZVaults = []
    var vaults = await algodClient.getApplicationBoxes(ZVAULT_CONTRACT_ID).do()
    vaults = vaults.boxes.map(box=>{return(box?.name)})


    for (let index = 0; index < vaults.length; index++) {
        const vault_id = vaults[index]

        var vaultsInfo = await decodeVaults(vault_id)

        vaultsInfo.push(Buffer.from(vault_id,'base64').toString())
        ZVaults.push(vaultsInfo)
        
    }

    return(ZVaults)
    
}

async function makeContractCall() {
    // example: ATC_CREATE
    const atc = new algosdk.AtomicTransactionComposer();
    return atc
}


export async function create_savings_plan(sender,signer,vault_id,vault_name,vault_keeper,asset_id,duration,flexible,amount,fee) {
    // METHOD CALL TO THE CONTRACT TO CREATE A VAULT
    const atc = await makeContractCall();
    const suggestedParams = await algodClient.getTransactionParams().do();

    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        suggestedParams,
        to: ZVAULT_CONTRACT_ADDRESS,
        amount: algosdk.algosToMicroalgos(fee),
      });
    
    // add the transaction to the ATC with a signer
    atc.addTransaction({ txn: paymentTxn, signer: signer });


    const assetDecimals = await algodClient.getAssetByID(asset_id).do()

    const xferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender,
        to: ZVAULT_CONTRACT_ADDRESS,
        suggestedParams,
        assetIndex:parseInt(asset_id),
        amount: convertToDecimals(amount,assetDecimals.params.decimals),
    });


    atc.addMethodCall({
        appID: ZVAULT_CONTRACT_ID,
        method: contractABI.getMethodByName('create_savings_plan'),
        methodArgs: [
            vault_id,
            vault_name,
            vault_keeper,
            parseInt(asset_id),
            parseInt(duration),
            flexible,
            {
                txn: xferTxn,
                signer: signer,
            },
        ],
        sender: sender,
        signer: signer,
        suggestedParams,
        boxes: [
            {
            appIndex: ZVAULT_CONTRACT_ID,
            name: new Uint8Array(Buffer.from(vault_id)),
            },
        ]
    });

    // example: ATC_RESULTS
    const result = await atc.execute(algodClient, 4);
    return(result?.methodResults)    
}

export async function my_savings_plan_info(sender,signer,vault_id) {
    // METHOD CALL TO THE CONTRACT TO GET THE METHOD CALL INFO
    const atc = await makeContractCall();
    const suggestedParams = await algodClient.getTransactionParams().do();

    atc.addMethodCall({
        appID: ZVAULT_CONTRACT_ID,
        method: contractABI.getMethodByName('my_savings_plan_info'),
        methodArgs: [
            vault_id,
        ],
        sender: sender,
        signer: signer,
        suggestedParams,
        boxes: [
            {
            appIndex: ZVAULT_CONTRACT_ID,
            name: new Uint8Array(Buffer.from(vault_id)),
            },
        ]
    });

    // example: ATC_RESULTS
    const result = await atc.execute(algodClient, 4);
    return(result?.methodResults)
}


export async function top_up_savings(sender,signer,vault_id,asset_id,amount) {
    // METHOD CALL TO THE CONTRACT TO INCREASE THE AMOUNT LOCKED IN A VAULT
    const atc = await makeContractCall();
    const assetDecimals = await algodClient.getAssetByID(asset_id).do()
    const suggestedParams = await algodClient.getTransactionParams().do();

    const xferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender,
        to: ZVAULT_CONTRACT_ADDRESS,
        suggestedParams,
        assetIndex:parseInt(asset_id),
        amount: convertToDecimals(amount,assetDecimals.params.decimals),
    });

    atc.addMethodCall({
        appID: ZVAULT_CONTRACT_ID,
        method: contractABI.getMethodByName('top_up_savings'),
        methodArgs: [
            vault_id,
            {
                txn: xferTxn,
                signer: signer,
            },
        ],
        sender: sender,
        signer: signer,
        suggestedParams,
        boxes: [
            {
            appIndex: ZVAULT_CONTRACT_ID,
            name: new Uint8Array(Buffer.from(vault_id)),
            },
        ]
    });

    // example: ATC_RESULTS
    const result = await atc.execute(algodClient, 4);
    return(result?.methodResults)
}


export async function withdraw_savings(sender,signer,vault_id,asset_id,amount) {
    // METHOD CALL TO THE CONTRACT TO WITHDRAW THE LOCKED ASSET IN A VAULT
    const atc = await makeContractCall();
    const assetDecimals = await algodClient.getAssetByID(asset_id).do()
    const suggestedParams = await algodClient.getTransactionParams().do();

    atc.addMethodCall({
        appID: ZVAULT_CONTRACT_ID,
        method: contractABI.getMethodByName('withdraw_savings'),
        methodArgs: [
            vault_id,
            convertToDecimals(amount,assetDecimals.params.decimals)
            ,
        ],
        sender: sender,
        signer: signer,
        suggestedParams,
        appForeignAssets:[parseInt(asset_id),],
        boxes: [
            {
            appIndex: ZVAULT_CONTRACT_ID,
            name: new Uint8Array(Buffer.from(vault_id)),
            },
        ]
    });

    // example: ATC_RESULTS
    const result = await atc.execute(algodClient, 4);
    return(result?.methodResults)
}


export async function withdraw_fees(sender,signer,to_address,amount) {
    // METHOD CALL TO THE CONTRACT TO WITHDRAW THE FEES SENT BY VAULT CREATORS
    // THIS METHOD ONLY THE CONTRACT CREATOR CAN USE THIS METHOD

    const atc = await makeContractCall();
    const suggestedParams = await algodClient.getTransactionParams().do();

    atc.addMethodCall({
        appID: ZVAULT_CONTRACT_ID,
        method: contractABI.getMethodByName('withdraw_fees'),
        methodArgs: [
            to_address,
            amount
        ],
        sender: sender,
        signer: signer,
        suggestedParams,
    });

    // example: ATC_RESULTS
    const result = await atc.execute(algodClient, 4);
    return(result?.methodResults)
}


export async function delete_vault(sender,signer,vault_id) {
    // METHOD CALL TO THE CONTRACT TO DELETE A VAULT

    const atc = await makeContractCall();
    const suggestedParams = await algodClient.getTransactionParams().do();

    atc.addMethodCall({
        appID: ZVAULT_CONTRACT_ID,
        method: contractABI.getMethodByName('delete_vault'),
        methodArgs: [
            vault_id,
        ],
        sender: sender,
        signer: signer,
        suggestedParams,
        boxes: [
            {
            appIndex: ZVAULT_CONTRACT_ID,
            name: new Uint8Array(Buffer.from(vault_id)),
            },
        ]
    });

    // example: ATC_RESULTS
    const result = await atc.execute(algodClient, 4);
    return(result?.methodResults)
}


export async function optin_asset(sender,signer,asset_id) {
    // METHOD CALL TO THE CONTRACT TO ADD A NEW ASSET TO THE CONTRACT

    const atc = await makeContractCall();
    const suggestedParams = await algodClient.getTransactionParams().do();

    atc.addMethodCall({
        appID: ZVAULT_CONTRACT_ID,
        method: contractABI.getMethodByName('optin_asset'),
        methodArgs: [
            parseInt(asset_id),
        ],
        sender: sender,
        signer: signer,
        suggestedParams,
    });

    // example: ATC_RESULTS
    const result = await atc.execute(algodClient, 4);
    return(result?.methodResults)
}

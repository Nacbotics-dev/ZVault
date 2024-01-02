const ABI = {
    "name": "ZVault",
    "methods": [
        {
            "name": "create_savings_plan",
            "args": [
                {
                    "type": "string",
                    "name": "vault_id"
                },
                {
                    "type": "string",
                    "name": "vault_name"
                },
                {
                    "type": "address",
                    "name": "vault_keeper"
                },
                {
                    "type": "uint64",
                    "name": "asset_id"
                },
                {
                    "type": "uint64",
                    "name": "duration"
                },
                {
                    "type": "bool",
                    "name": "flexible"
                },
                {
                    "type": "axfer",
                    "name": "asset_xfer"
                }
            ],
            "returns": {
                "type": "void"
            },
            "desc": "This method is used to create a new savings plan"
        },
        {
            "name": "my_savings_plan_info",
            "args": [
                {
                    "type": "string",
                    "name": "vault_id"
                }
            ],
            "returns": {
                "type": "(string,address,bool,bool,uint64,uint64,uint64)"
            },
            "desc": "This method is used to retreive a savings plans details"
        },
        {
            "name": "top_up_savings",
            "args": [
                {
                    "type": "string",
                    "name": "vault_id"
                },
                {
                    "type": "axfer",
                    "name": "asset_xfer"
                }
            ],
            "returns": {
                "type": "(string,address,bool,bool,uint64,uint64,uint64)"
            },
            "desc": "This is used to increase the amount of token that has already been locked/saved"
        },
        {
            "name": "withdraw_savings",
            "args": [
                {
                    "type": "string",
                    "name": "vault_id"
                },
                {
                    "type": "uint64",
                    "name": "amount"
                }
            ],
            "returns": {
                "type": "bool"
            },
            "desc": "This method is used to withdraw all or a particular amount from the savings provided it's the due date"
        },
        {
            "name": "withdraw_fees",
            "args": [
                {
                    "type": "address",
                    "name": "to_address"
                },
                {
                    "type": "uint64",
                    "name": "amount"
                }
            ],
            "returns": {
                "type": "void"
            },
            "desc": "This method is used to withdraw the algorand fees sent when creating a vault.\nOnly the contract creator can withdraw on the fees.\nNOTE: you ccan only withdraw the fees and nothing else."
        },
        {
            "name": "delete_vault",
            "args": [
                {
                    "type": "string",
                    "name": "vault_id"
                }
            ],
            "returns": {
                "type": "void"
            },
            "desc": "This method is used to delete a vault from the contract.\nNOTE : Make sure you have withdrawn all your locked assets. Only the vault creator can delete it."
        },
        {
            "name": "optin_asset",
            "args": [
                {
                    "type": "asset",
                    "name": "asset_id"
                }
            ],
            "returns": {
                "type": "void"
            },
            "desc": "This method is used to add a new asset to the ZVault contract"
        }
    ],
    "networks": {}
}




export default  ABI
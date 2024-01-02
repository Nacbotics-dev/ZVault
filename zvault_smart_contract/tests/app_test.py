import pytest
from algokit_utils import (
    ApplicationClient,
    ApplicationSpecification,
    get_localnet_default_account,
)
from algosdk.v2client.algod import AlgodClient

from smart_contracts.app import contract as app_contract


@pytest.fixture(scope="session")
def app_app_spec(algod_client: AlgodClient) -> ApplicationSpecification:
    return app_contract.app.build(algod_client)


@pytest.fixture(scope="session")
def app_client(
    algod_client: AlgodClient, app_app_spec: ApplicationSpecification
) -> ApplicationClient:
    client = ApplicationClient(
        algod_client,
        app_spec=app_app_spec,
        signer=get_localnet_default_account(algod_client),
    )
    client.create()
    return client


def test_says_hello(app_client: ApplicationClient) -> None:
    result = app_client.call(app_contract.hello, name="World")

    assert result.return_value == "Hello, World"

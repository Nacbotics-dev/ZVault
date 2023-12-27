import Card from "./card/Card";

const CardGroup = () => {
  return (
    <div className="mt-20">
        <h2 className="text-midHead-clamp text-white font-extrabold text-center mb-4">HOW IT WORKS</h2>
        <section className="mt-8 grid grid-cols-1 gap-8 md:gap-16 md:grid-cols-2">
            <Card
              title="Connect Wallet"
              imageSrc="src\images\wifi-front-premium.png"
              imageAlt="An illustration of a wifi-front"
              description="Using ZVault is so easy, it only requires an Algorand Wallet, connect your wallet to the dApp to get started."
            />
            <Card
              title="Create Vault"
              imageSrc="src\images\locker-front-premium.png"
              imageAlt="An illustration of a locker-front"
              description="Once you have connected your wallet to our dApp you can now create a vault and lock your asset in for specified time."
            />
            <Card
              title="Now you wait"
              imageSrc="src\images\explorer-front-premium.png"
              imageAlt="An illustration of an explorer-front"
              description="During this period you can lock more tokens or increase the amount locked in a particular vault."
            />
            <Card
              title="Unlock and Claim"
              imageSrc="src\images\key-front-premium.png"
              imageAlt="An illustration of a key-front"
              description="Once the time duration for locking has elapsed you can now unlock your vault and withdraw your locked asset."
            />
        </section>
    </div>
  )
}

export default CardGroup;
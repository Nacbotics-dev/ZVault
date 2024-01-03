import Button from "../button/Button"


const Docs = () => {
  return (
    <section className="flex flex-col justify-center items-center mt-28">
        <h2 className="md:text-[3.125rem] text-3xl text-white font-extrabold mb-4">SAVE & EARN</h2>
        <Button title="Read the Docs" maxWidth="12.375rem" toLink="#"/>
    </section>
  )
}

export default Docs;
import SpecialButton from "./SpecialButton"

const Home = () => {

  return (
    <>
      <section className="mt-[9rem] min-h-[70vh] grid place-items-center">
        <div className="max-w-screen-xl md:px-4 relative w-full gap-20 mx-auto grid grid-cols-1 grid-rows-2 px-5 md:grid-cols-2 md:grid-rows-1">
          <div>
            <h2 className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 text-transparent bg-clip-text text-[2.8rem]">Online Voting Application</h2>
            <div className="my-5 flex flex-col gap-5 items-start">
                <p className="text-xl font-bold">Introducing our online voting platform. Create polls in seconds, share instantly, and engage in transparent, modern decision-making.</p>
                <p className="text-xl font-bold">Say goodbye to tedious choices. Cast votes easily, from friends to a vast electorate. Embrace the future of online voting with us.</p>
                <SpecialButton />
            </div>
          </div>
          <div>
            <img src="/voting.svg" className=" w-full " alt="" />
          </div>
        </div>
  
      </section>

    </>
  )
}

export default Home
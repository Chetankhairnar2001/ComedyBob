
import Title from "../assets/Title.png";

function Home() {


    return (
        <div className="min-h-screen bg-gradient-to-r from-amber-500 to-yellow-300 flex justify-center items-center flex-col">
            <div className="flex justify-center items-center">
                <div className="flex flex-col">
                    <img className="" src={Title} width="500"/>
                    <p className="text-center text-7xl font-comic-sans">Hello</p>
                </div>
            </div>
        </div>
    )
}

export default Home;
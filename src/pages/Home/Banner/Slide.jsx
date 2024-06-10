

const Slide = ({ image, text2, textp }) => {
    return (
        <div
            className='w-full bg-center bg-cover h-[40rem]'
            style={{
                backgroundImage: `url(${image})`,
            }}
        >
            <div className='flex items-center justify-start w-full h-full bg-gray-900/70'>

                <div className="text-white w-5/12 space-y-7 pl-16 ">
                    <h2 className="text-3xl text-white font-semibold">{text2}</h2>
                    <p>{textp}</p>
                    <div className="space-x-8 text-white">
                        <button className="btn btn-outline bg-[#6369e8]  text-white">Discover More</button>
                        <button className="btn btn-outline hover:text-white hover:bg-opacity-100  text-white">Latest Project</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Slide
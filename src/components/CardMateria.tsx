type Props = {
    disc: string,
    sigla: string,
    categ: any,
    tpei: string,
    setSiglaMateriaAtiva: (value:string)=>void,
    isMateriaAtiva: boolean
}

function CardMateria({disc, sigla, categ, tpei, setSiglaMateriaAtiva, isMateriaAtiva}:Props){
    return(
        <div
            className={
                `w-[92.5%] my-2 border-1  rounded-md flex flex-col items-center cursor-pointer
                    ${isMateriaAtiva ? "bg-blue-100 border-blue-400" : "bg-white border-gray-300"}
                `
            }
            onClick={()=>setSiglaMateriaAtiva(sigla)}
        >
            <div
                className="h-full w-[95%]"
            >
                <h3
                    className="text-sm font-semibold font-[Helvetica] mt-1.5"
                >
                    {disc} 
                </h3>
                <div
                    className="w-full flex my-2"
                >
                    <div
                        className="h-5 w-22 mr-1 border border-gray-300 bg-white rounded-full flex justify-center items-center"
                    >
                        <p
                            className="font-[Helvetica] text-xs font-semibold mx-2 whitespace-nowrap"
                        >
                            {sigla}
                        </p>
                    </div>
                    <div
                        className="h-5 w-12 ml-1 bg-green-100 rounded-full flex justify-center items-center"
                    >
                        <p
                            className="font-[Helvetica] text-xs font-semibold mx-2 whitespace-nowrap text-green-700"
                        >
                            {
                                typeof categ === 'string' ? categ.split(" - ")[0] : categ[0].split(" - ")[0]
                            }
                        </p>
                    </div>
                    {Array.isArray(categ) &&
                        <div
                            className="h-5 w-8 ml-1 bg-green-100 rounded-full flex justify-center items-center"
                        >
                            <p
                                className="font-[Helvetica] text-xs font-semibold mx-2 whitespace-nowrap text-green-700"
                            >
                                +{categ.length-1}
                            </p>
                        </div>
                    }
                </div>
                <p
                    className="text-xs font-[Helvetica] text-gray-500 mb-2"
                >
                    TPEI: {tpei}
                </p>
            </div>
        </div>
    )
}

export default CardMateria
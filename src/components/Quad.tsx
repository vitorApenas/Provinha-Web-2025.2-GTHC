import { Clock } from "lucide-react"
import DiscQuad from "./DiscQuad";

type Props = {
    nQuad: string;
    disciplinas: any;
}

type Disc = {
    "SIGLA": string,
    "DISCIPLINA": string,
    "TPEI": string,
    "RECOMENDACAO"?: string,
}

function Quad({nQuad, disciplinas}: Props){
    
    return(
        <div
            className="w-[95%] border border-gray-300 border-l-4 border-l-indigo-500 rounded-xl flex flex-col items-center mb-4 pb-3"
        >
            <div
                className="w-[95%] flex items-center my-2"
            >
                <Clock
                    size={16}
                    color="#6a7282"
                    className="bg-white"
                />
                <h3
                    className="font-[Helvetica] font-semibold ml-1.5"
                >
                    {nQuad}º Quadrimestre
                </h3>
            </div>
            <div
                className="w-[95%]"
            >
                {
                    /*
                        Como as disciplinas do quad estão em uma array,
                        apenas iterei elas passando seu valor individual
                    */
                    disciplinas.map((disc:Disc, index:number)=>{
                        return(
                            <DiscQuad
                                key={index}
                                disc={disc}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Quad;
import quadsData from '../../data/quad_ideal_bcc_2025_ufabc.json';
import { Calendar } from "lucide-react"
import Quad from "./Quad";

type QuadObjType = {
    [key: string]: {
        "SIGLA": string,
        "DISCIPLINA": string,
        "TPEI": string,
        "RECOMENDACAO"?: string
    }[]
}

type typeMateria = {
    "SIGLA": string,
    "DISCIPLINA": string,
    "TPEI": string,
    "RECOMENDACAO": string,
}

type typeCatalogo = typeMateria[]

type Props = {
    catalogo: typeCatalogo
}

function QuadIdeal({catalogo}:Props){
    
    let quads: QuadObjType = quadsData;

    return(
        <div
            className="flex-1 h-full flex flex-col items-center overflow-y-auto"
        >
            <div
            className="w-[95%] flex items-center my-4"
            >
                <Calendar
                    size={22}
                    color="#615fff"
                />
                <h2
                    className="text-lg font-[Helvetica] font-semibold ml-3"
                >
                    Recomendações por quadrimestre
                </h2>
            </div>
            {
                /* 
                    Como o JSON para os quadrimestres estava em um formato 
                    mais diferente, deixei para manipular ele aqui, já que
                    também só uso ele dentro desse componente
                */
                (Object.keys(quads) as Array<keyof typeof quads>).map((n, index) => {

                    /* 
                        No JSON do catálogo de disciplinas algumas recomendações 
                        tinham apenas um número como dado, então resetei todas com
                        o valor de ''
                    */
                    quads[n].map((disc)=>{
                        if(disc["RECOMENDACAO"]) disc["RECOMENDACAO"] = ''
                    })

                    //Aqui peguei as reais recomendações, que estavam no JSON de quad ideal
                    quads[n].map((disc)=>{
                        if(disc["SIGLA"]){
                            catalogo.find((obj)=>{
                                if(obj["DISCIPLINA"].toLowerCase() == disc["DISCIPLINA"].toLowerCase()){
                                    disc["RECOMENDACAO"] = obj["RECOMENDACAO"]
                                }
                            })
                        }
                        if(disc["RECOMENDACAO"]?.toLowerCase() === "não há" || disc["RECOMENDACAO"]?.toLowerCase() === ''){
                            delete(disc["RECOMENDACAO"])
                        }
                    })

                    /* 
                        Aqui listei cada um dos quadrimestres, de 1 a 15, passando apenas
                        as disciplinas que estão nele
                    */
                    return (
                        <Quad
                            key={index}
                            nQuad={String(n)}
                            disciplinas={quads[n]}
                        />
                    )
                })
            }   
        </div>
        
    )
}

export default QuadIdeal;
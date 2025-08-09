import { useEffect, useState } from 'react';
import CardMateria from './CardMateria';
import DivMateria from './DivMateria';
import { Target, BookOpen, Users, Lightbulb } from 'lucide-react';

type typeMateria = {
    "SIGLA": string,
    "DISCIPLINA": string,
    "TPEI": string,
    "RECOMENDACAO": string,
    "OBJETIVOS": string,
    "METODOLOGIA_EXTENSIONISTA": string,
    "EMENTA": string,
    "BIBLIOGRAFIA_BASICA": string,
    "BIBLIOGRAFIA_COMPLEMENTAR": string,
    "CATEGORIA"?: string|string[]
}

type typeCatalogo = typeMateria[]

type Props = {
    catalogo: typeCatalogo,
    materiasMostradas: typeCatalogo
}

function Materias({catalogo, materiasMostradas}:Props){
    /* 
        A 'catalogFormatadas' foi criada para que eu pudesse manipular o
        retorno da importação do JSON com o catálogo das disciplinas

        A matéria que aparece assim que o componente é carregado foi
        escolhidaaleatoriamente entre as siglas (linha 32)

        Já as siglas de categoria também já foram atribuídas para carregarem
        antes de renderizar o documento, como o campo "CATEGORIA" pode ser
        uma string ou uma array de strings, fiz essa condição para não ter
        exceções
    */
    let catalogFormatadas:typeCatalogo = catalogo
    const [siglaMateriaAtiva, setSiglaMateriaAtiva] = useState<string>(catalogFormatadas[Math.floor(Math.random()*catalogFormatadas.length)]["SIGLA"])
    const [materiaAtiva, setMateriaAtiva] = useState<typeMateria>(catalogFormatadas.find(mat => mat["SIGLA"] === siglaMateriaAtiva) ?? catalogFormatadas[Math.floor(Math.random()*catalogFormatadas.length)])
    const [siglasCategMateriaAtiva, setSiglasCategMateriaAtiva] = useState<string[]>(() => {
        if (typeof materiaAtiva["CATEGORIA"] === 'string') {
            const categ = materiaAtiva["CATEGORIA"]
            return [categ.split("-")[0].trim()]
        }
        else {
            const categs = Array.isArray(materiaAtiva["CATEGORIA"])
                ? materiaAtiva["CATEGORIA"].map((cat) => cat.split("-")[0].trim())
                : []
            return categs
        }
    })

    //useEffects usados para monitorar mudanças em qual matéria está detalhada na tela
    useEffect(()=>{
        setMateriaAtiva(catalogFormatadas.find(mat => mat["SIGLA"] === siglaMateriaAtiva) ?? catalogFormatadas[Math.floor(Math.random()*catalogFormatadas.length)])
    }, [siglaMateriaAtiva])

    useEffect(()=>{
        if (typeof materiaAtiva["CATEGORIA"] === 'string') {
            const categ = materiaAtiva["CATEGORIA"]
            setSiglasCategMateriaAtiva([categ.split("-")[0].trim()])
        } else {
            const categs = Array.isArray(materiaAtiva["CATEGORIA"])
                ? materiaAtiva["CATEGORIA"].map((cat) => cat.split("-")[0].trim())
                : []
            setSiglasCategMateriaAtiva(categs)
        }
    }, [materiaAtiva])

    return(
        <div
            className="flex-1 h-full flex"
        >
            <div
                /*
                    Sidebar com cards, passei apenas os dados necessários, sem
                    passar a array de objetos inteira
                */
                className="h-screen w-64 border-r border-gray-400 flex flex-col"
            >
                <div 
                    className="border-b border-gray-400 w-full bg-white"
                >
                    <h2
                        className="font-[Helvetica] text-lg font-semibold my-3 ml-2"
                    >
                        Matérias ({materiasMostradas.length})
                    </h2>
                </div>
                <div
                    className="flex-1 flex flex-col items-center overflow-y-auto bg-gray-50"
                >
                    {
                        materiasMostradas.map((item, index)=>{
                            if(item["SIGLA"]){
                                return(
                                    <CardMateria
                                        key={index}
                                        disc={item["DISCIPLINA"]}
                                        sigla={item["SIGLA"]}
                                        categ={item["CATEGORIA"]}
                                        tpei={item["TPEI"]}
                                        setSiglaMateriaAtiva={setSiglaMateriaAtiva}
                                        isMateriaAtiva={siglaMateriaAtiva === item["SIGLA"]}
                                    />
                                )
                            }
                        })
                    }
                    
                </div>
            </div>
            <div
                //Seção em que a matéria é detalhadas
                className="flex-1 h-full px-4 py-1 overflow-y-auto flex flex-col items-center"
            >
                <div className="w-full">
                    <h2
                        className="font-[Helvetica] text-lg font-semibold my-1"
                    >
                        {materiaAtiva["DISCIPLINA"]}
                    </h2>
                    <div className="w-full flex my-2 flex-wrap">
                        <div
                            className="h-5 w-22 mr-1 border border-gray-300 rounded-full flex justify-center items-center"
                        >
                            <p
                                className="font-[Helvetica] text-xs font-semibold mx-2 whitespace-nowrap"
                            >
                                {materiaAtiva["SIGLA"]}
                            </p>
                        </div>
                        {
                            siglasCategMateriaAtiva.map((sigla, index)=>{
                                return(
                                    <div
                                        key={index}
                                        className="h-5 w-12 ml-1 mb-1 bg-green-100 rounded-full flex justify-center items-center"
                                    >
                                        <p
                                            className="font-[Helvetica] text-xs font-semibold mx-2 whitespace-nowrap text-green-700"
                                        >
                                            {sigla}
                                        </p>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    <p
                        className="text-sm font-[Helvetica] text-gray-500 mb-2"
                    >
                        TPEI: {materiaAtiva["TPEI"]}
                    </p>
                </div>
                <DivMateria
                    /*
                        Nos campos de objetivo, ementa e bibliografias, fiz como a
                        lista de categorias, distribuí os parágrafos em uma array de
                        string, assim consegui separá-los em tópicos
                    */
                    icone={<Target/>}
                    titulo="Objetivos"
                    className=""
                >
                    <ul
                        className="list-disc w-[95%] self-center text-sm"
                    >
                        {
                            materiaAtiva["OBJETIVOS"].split(". ")
                            .map(obj => obj.trim())
                            .filter(obj => obj !== "")
                            .map((obj, index)=>{
                                return(
                                    <li
                                        key={index}
                                        className="ml-2 text-gray-700 wrap-anywhere"
                                    >
                                        {obj}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </DivMateria>
                <DivMateria
                    icone={<BookOpen/>}
                    titulo={"Ementa"}
                >
                    <ul
                        className="list-disc w-[95%] self-center text-sm"
                    >
                        {
                            materiaAtiva["EMENTA"].split(/\. (?=[A-ZÀ-Ú])/)
                            .map(obj => obj.trim())
                            .filter(obj => obj !== "")
                            .map((obj, index)=>{
                                return(
                                    <li
                                        key={index}
                                        className="ml-2 text-gray-700 wrap-anywhere"
                                    >
                                        {obj}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </DivMateria>
                <DivMateria
                    icone={<Users/>}
                    titulo={"Cursos"}
                >
                    <div className="w-full flex flex-wrap mt-1">
                        {
                            siglasCategMateriaAtiva.map((sigla, index)=>{
                                return(
                                    <div
                                        key={index}
                                        className="h-5 w-12 ml-1 mb-1 bg-gray-200 rounded-full flex justify-center items-center"
                                    >
                                        <p
                                            className="font-[Helvetica] text-xs font-semibold mx-2 whitespace-nowrap"
                                        >
                                            {sigla}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </DivMateria>
                <div
                    className="flex justify-between w-full *:w-[49%]"
                >
                    <DivMateria
                        titulo={"Bibliografia básica"}
                    >
                    <ul
                        className="list-disc w-[95%] self-center text-sm"
                    >
                        {
                            materiaAtiva["BIBLIOGRAFIA_BASICA"].split("\n")
                            .map(obj => obj.trim())
                            .filter(obj => obj !== "")
                            .map((obj, index)=>{
                                return(
                                    <li
                                        key={index}
                                        className="ml-2 text-gray-700 wrap-anywhere"
                                    >
                                        {obj}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    </DivMateria>
                    <DivMateria
                        titulo={"Bibliografia complementar"}
                    >
                        <ul
                            className="list-disc w-[95%] self-center text-sm"
                        >
                            {
                                materiaAtiva["BIBLIOGRAFIA_BASICA"].split("\n")
                                .map(obj => obj.trim())
                                .filter(obj => obj !== "")
                                .map((obj, index)=>{
                                    return(
                                        <li
                                            key={index}
                                            className="ml-2 text-gray-700 wrap-anywhere"
                                        >
                                            {obj}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </DivMateria>
                </div>
                <DivMateria
                    icone={<Lightbulb/>}
                    titulo={"Informações adicionais"}
                >
                    
                    <div>
                        {materiaAtiva["RECOMENDACAO"] &&
                            <p
                                className="text-gray-700 font-[Helvetica] text-sm m-2"
                            >
                                <span
                                    className="font-semibold text-black"
                                >Recomendação: </span>
                                {materiaAtiva["RECOMENDACAO"]}
                            </p>
                        }
                    </div>
                    <hr
                        className=" border-gray-300"
                    />
                    <div>
                        <p
                            className="text-gray-700 font-[Helvetica] text-sm m-2"
                        >
                            <span
                                className="font-semibold text-black"
                            >Metodologia: </span>
                            {materiaAtiva["METODOLOGIA_EXTENSIONISTA"]}
                        </p>
                    </div>
                </DivMateria>
            </div>
        </div>
    )
}

export default Materias;
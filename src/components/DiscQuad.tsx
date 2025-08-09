type Props = {
    disc: Disc;
}

type Disc = {
    "SIGLA": string,
    "DISCIPLINA": string,
    "TPEI": string,
    "RECOMENDACAO"?: string,
}

function DiscQuad({disc}: Props) {
    // Com os valores passados no objeto 'disc', apenas renderizei eles formatados

    return(
        <div
            className="w-full bg-gray-100 rounded-md mb-1.5 flex justify-between"
        >
            <div
                className="h-full font-[Helvetica]"
            >
                <h4
                    className="font-semibold m-2"
                >
                    {disc["DISCIPLINA"]}
                </h4>
                <p
                    className="text-sm text-gray-600 m-2"
                >
                    TPEI: {disc["TPEI"]}
                </p>
                {disc["RECOMENDACAO"] &&
                    <p
                        className="text-orange-700 font-[Helvetica] text-xs m-2"
                    >
                        <span
                            className="font-semibold"
                        >Recomendação: </span>
                        {disc["RECOMENDACAO"]}
                    </p>
                }
            </div>
            {disc["SIGLA"] !== '' &&
                <div
                    className="h-5 my-2 mx-1.5 border border-gray-300 rounded-full flex items-center"
                >
                    <p
                        className="font-[Helvetica] text-xs font-semibold mx-2 whitespace-nowrap"
                    >
                        {disc["SIGLA"]}
                    </p>
                </div>
            }
        </div>
    )
}

export default DiscQuad;
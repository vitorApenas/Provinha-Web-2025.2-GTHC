import React from "react";
import type { ReactElement, ReactNode } from "react";

type Props = {
    icone?: ReactElement<any>,
    titulo: string,
    children: ReactNode,
    className?: string
}

function DivMateria({icone, titulo, children, className}:Props){

    /* 
        Como a seção de detalhes da matéria tem várias subdivisões com
        formatação parecida, criei esse componente. É uma div pré formatada
        com capacidade de ter children e possibilidade de ter ou não um
        ícone antes do título
    */
    let iconeConfig;
    
    if(icone){
        iconeConfig = React.cloneElement(icone, {
            size: 16,
            className: "mr-1.5"
        })
    }

    return(
        <div
            className={
                `
                    w-full my-2 border-1 border-gray-300 rounded-md bg-white flex flex-col p-3
                    ${className ? className : ""}
                `
            }
        >
            <div
                className="flex items-center mb-2"
            >
                {iconeConfig && iconeConfig}
                <h3
                    className="font-[Helvetica] font-semibold"
                >
                    {titulo}
                </h3>
            </div>
            {children}
        </div>
    )
}

export default DivMateria;
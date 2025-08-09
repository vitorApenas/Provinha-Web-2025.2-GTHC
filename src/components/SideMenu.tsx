import React from 'react';
import type { ReactElement } from 'react';

type Props = {
    categoria?: boolean,
    icone:ReactElement<any>,
    txt: string,
    ativo: boolean,
    onClick: () => void
}

function SideMenu({categoria, icone, txt, ativo, onClick}: Props){

    /*
        O ícone foi passado como parâmetro porque uso esse componente
        tanto para as áreas de navegação quanto para a lista de categorias
    */
    const iconeConfig = React.cloneElement(icone, {
        size: 16,
        color: ativo && !categoria ? "white" : "#364153",
        className: "ml-3 mr-2"
    })
    
    return(
        <div
            className={
                `w-full min-h-10 mb-1 flex items-center rounded-lg text-gray-700 cursor-pointer
                ${ativo ? categoria ? "bg-gray-200" : "bg-black" : ""}
                `
            }
            onClick={() => onClick()}
        >
            {iconeConfig}
            <div
                className="w-9/10 flex items-center my-1"
            >
                <h3
                    className={
                        `font-[Helvetica] text-sm 
                        ${ativo && !categoria ? "text-white": ""}
                        `
                    }
                >
                    {txt}
                </h3>
            </div>
        </div>
    )
}

export default SideMenu;
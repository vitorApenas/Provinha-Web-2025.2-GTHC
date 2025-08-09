import { Search, Calendar, BookOpen, Grid3x3, LibraryBig, X } from 'lucide-react'
import logoUfa from '../assets/logo_ufabc.png'
import SideMenu from './SideMenu';

type Props = {
    materiasAtivo: boolean,
    setMateriasAtivo: (value: boolean) => void,
    categorias: string[],
    categoriaAtiva: number,
    setCategoriaAtiva: (value: number) => void,
    query: string,
    setQuery: (value: string) => void
}

/* 
    Passei algumas funções como parâmetro porque alguns estados
    estão sendo alterados aqui dentro, mas é melhor declarar eles
    no ../App.tsx, porque são usados em outros escopos também
*/
function Sidebar({
    materiasAtivo,
    setMateriasAtivo,
    categorias,
    categoriaAtiva,
    setCategoriaAtiva,
    query,
    setQuery
}: Props) {

    return(
        <div
            className="h-screen w-64 bg-white border-r border-gray-400 flex flex-col items-center"
        >
            <div 
                className="border-b border-gray-400 flex flex-col items-center w-full"
            >
                <div
                    //Logo e titulo
                    className="flex items-center justify-start w-[92.5%] mt-1 hover:cursor-pointer"
                    onClick={()=>setMateriasAtivo(true)}
                >
                    <img
                        src={logoUfa}
                        className="h-9 m-1.5"
                    />
                    <h1
                        className="text-lg font-[Helvetica] font-semibold ml-1"
                    >
                        UFABC
                    </h1>
                </div>
                <div
                    //Barra de pesquisa
                    className="flex justify-between items-center border border-gray-300 w-[90%] h-9 rounded-md mt-1 mb-2"
                    onClick={()=>setMateriasAtivo(true)}
                >
                    <div
                        className="w-1/8 flex justify-center items-center"
                    >
                        <Search
                            size={16}
                            color="#6a7282"
                        />
                    </div>
                    
                    <input
                        type="text"
                        placeholder="Buscar matéria ou sigla..."
                        className="font-[Helvetica] w-7/8 focus:outline-none placeholder:text-gray-400 text-gray-500"
                        value={query}
                        onChange={(e)=>{setQuery(e.target.value)}}
                    />
                    <X
                        size={18}
                        color="#6a7282"
                        className="mr-1 cursor-pointer"
                        onClick={()=>setQuery('')}
                    />
                </div>
            </div>

            <div
                className="h-[77.5%] w-9/10 self-center"
                //Menus de navegação
            >
                <h2
                    className="uppercase font-[Helvetica] text-sm mt-6 mb-1"
                >
                    Navegação
                </h2>
                <SideMenu
                    icone={<BookOpen/>}
                    txt="Matérias"
                    ativo={materiasAtivo}
                    onClick={()=>setMateriasAtivo(true)}
                    />
                <SideMenu
                    icone={<Calendar/>}
                    txt="Quad Ideal"
                    ativo={!materiasAtivo}
                    onClick={()=>setMateriasAtivo(false)}
                />

                {materiasAtivo && 
                    <div
                        //Categorias das matérias
                        className="h-3/4 flex flex-col"
                    >
                        <h2
                            className="uppercase font-[Helvetica] text-sm mt-6 mb-1"
                        >
                            Categorias
                        </h2>
                        <div
                            //array de categorias sem sigla foi criada para ser usada aqui
                            className="overflow-y-auto"
                        >
                            {categorias.map((item, index)=>{
                                return( 
                                    <SideMenu
                                        key={index}
                                        categoria={true}
                                        icone={index === 0 ? <Grid3x3/> : <LibraryBig/>}
                                        txt={item}
                                        ativo={categoriaAtiva == index}
                                        onClick={()=>setCategoriaAtiva(index)}
                                    />
                                )
                            })}
                        </div>
                    </div>
                }                
            </div>
        </div>
    )
}

export default Sidebar
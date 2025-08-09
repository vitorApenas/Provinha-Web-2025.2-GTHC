import categorias from '../data/categorias_disciplinas_graduacao_2025_ufabc.json';
import catalogo from '../data/catalogo_disciplinas_graduacao_2025_ufabc.json';
import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar.tsx'
import QuadIdeal from './components/QuadIdeal.tsx'
import Materias from './components/Materias.tsx'

/*
  Defini tipos para a criação de variáveis formatadas com os dados importados,
  assim consigo manipular e atribuir eles a parâmetros de forma mais dinâmica
*/

type typeCategorias = {
  "SIGLA": string,
  "DISCIPLINA": string,
  "CATEGORIA": string|string[]
}[]

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

type typeMateriaPQuad = {
    "SIGLA": string,
    "DISCIPLINA": string,
    "TPEI": string,
    "RECOMENDACAO": string,
}

type typeCatalogoPQuad = typeMateriaPQuad[]

function App() {
  let catalogFormatadas:typeCatalogo = catalogo
  let categFormatadas:typeCategorias = categorias
  const [query, setQuery] = useState<string>('')
  const [materiasAtivo, setMateriasAtivo] = useState(true)
  const [categoriaAtiva, setCategoriaAtiva] = useState(0)
  const [materiasMostradas, setMateriasMostradas] = useState<typeCatalogo>([])

  /* 
    Formatei as categorias de uma forma mais conveniente para operar,
    além de remover espaços vazios no começo e fim das strings

    Ao invés de: "categoria;categoria;categoria",
    armazenei como: ["categoria","categoria","categoria"]
    Dessa maneira, consigo iterar de uma forma menos complexa
  */
  categFormatadas.map((item)=>{
    if(typeof item["CATEGORIA"] === 'string') item["CATEGORIA"] = item["CATEGORIA"].trim()
    if(typeof item["CATEGORIA"] === 'string' && item["CATEGORIA"].includes(";")){
      item["CATEGORIA"] = item["CATEGORIA"].split(";")
    }
    if(typeof item["CATEGORIA"] !== 'string'){
      item["CATEGORIA"].map((cats)=>{
        cats = cats.trim()
      })
    }
  })

  /*
    Mesclei as duas fontes de dados quando adicionei o campo de "categoria" no
    catálogo de disciplinas, assim tenho uma fonte mais sólida e organizada para listar
  */
  catalogFormatadas.map((item)=>{
    categFormatadas.find((cat)=>{
      if(cat["SIGLA"].toLowerCase() === item["SIGLA"].toLowerCase()){
        item["CATEGORIA"] = cat["CATEGORIA"]
      }
    })
  })

  // Removi entidades vazias (sem sigla == sem disciplina)
  catalogFormatadas = catalogFormatadas.filter(item => item["SIGLA"] !== "")

  /*
    Criei a lista de categorias para serem listadas na sidebar (apenas c/ o primeiro item)

    Depois disso, iterei a array de categorias para adicionar em uma array
    que vai armazenar apenas o nome delas, vai ser últi para listar no html
    e parametrizar em alguns loops
  */
  let arrayCategoriasCSigla:string[] = ["Todas as matérias"]

  categFormatadas.map((categ)=>{
    if(typeof categ["CATEGORIA"] === 'string'){
      if(!arrayCategoriasCSigla.includes(categ["CATEGORIA"])){
        arrayCategoriasCSigla.push(categ["CATEGORIA"])
      }
    }
    else{
      categ["CATEGORIA"].map((item)=>{
        if(!arrayCategoriasCSigla.includes(item)){
          arrayCategoriasCSigla.push(item)
        }
      })
    }
  })

  let arrayCategorias:string[] = arrayCategoriasCSigla.map((categ)=>{
    if(!categ.includes("-") || !categ.includes("(")) return categ
    const splitCateg = categ.split("- ");
    if(splitCateg.length > 1){
      return splitCateg[1].split(" (")[0]
    }
    else{
      return splitCateg[1]
    }
  })

  // Aqui apenas removi entidades vazias ou duplicadas
  arrayCategorias = arrayCategorias.filter(item => item != '')
  arrayCategorias = [...new Set(arrayCategorias)]

  /* 
    Essa const vai pegar apenas os dados necessários para a
    tela de quad ideal, tinham muitos que podiam ser passados
    mas não seriam utilizados
  */
  const catalogoPQuad:typeCatalogoPQuad = []

  catalogo.map((item)=>{
    catalogoPQuad.push({
      "SIGLA": item["SIGLA"],
      "DISCIPLINA": item["DISCIPLINA"],
      "TPEI": item["TPEI"],
      "RECOMENDACAO": item["RECOMENDACAO"]
    })
  })

  /* 
    Esses dois useEffect a seguir vão ser só pra monitorar qual
    categoria está selecionada na sidebar e qual o conteúdo no
    campo de pesquisa
  */
  useEffect(()=>{
    if(categoriaAtiva === 0){
      setMateriasMostradas(catalogFormatadas)
    }
    else{
      const cat = arrayCategoriasCSigla[categoriaAtiva].split("-")[0].trim()
      setMateriasMostradas(
        catalogFormatadas.filter(
          item => {
            const categoria = item["CATEGORIA"]
            if (typeof categoria === "string") {
              return categoria.includes(cat)
            }
            else if (Array.isArray(categoria)) {
              return categoria.some(categ => categ.includes(cat))
            }
            return false
          }
        )
      )
    }
  }, [categoriaAtiva])

  useEffect(()=>{
    const queryFormatada = query.toLowerCase().trim()
    if(queryFormatada !== ''){
      setMateriasMostradas(catalogFormatadas.filter(item => item["DISCIPLINA"].toLowerCase().includes(queryFormatada) || item["SIGLA"].toLowerCase().includes(queryFormatada)))
    }
    else{
      setMateriasMostradas(catalogFormatadas)
    }
  }, [query])

  return (
    <div
      className="flex h-screen w-screen"
    >
      <Sidebar
        query={query}
        setQuery={setQuery}
        materiasAtivo={materiasAtivo}
        setMateriasAtivo={setMateriasAtivo}
        categorias={arrayCategorias}
        categoriaAtiva={categoriaAtiva}
        setCategoriaAtiva={setCategoriaAtiva}
      />
      {
        materiasAtivo ? 
          <Materias
            catalogo={catalogo}
            materiasMostradas={materiasMostradas}
          />
        : 
          
          <QuadIdeal
            catalogo={catalogoPQuad}
          />
      }
    </div>
  )
}

export default App

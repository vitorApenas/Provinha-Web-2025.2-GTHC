# Desafio de Front-end - GTHC

Um projeto proposto pelo time do Green Team Hacker Club, da UFABC, com a finalidade de avaliar as habilidades dos candidatos.

Escolhi ser avaliado para o time de desenvolvimento web, aplicando para a prova de front-end, esse readme tem algumas observações sobre o projeto, também fiz alguns omentários durante o código, especificamente dentro da pasta ./src.

## Stack de desenvolvimento
Para basear o projeto do desafio, eu escolhi o framework Vite com typescript, servindo como bundler de react para html.

Já para o estilo, usei outro framework, o TailwindCSS, por já ter experiência com ele e pela praticidade de já estilizar nas classes, isso tudo além da lib de ícones, importei a que foi utilizada no exemplo do projeto para pegar os ícones exatamente iguais.

O repositório está no Github, e está hospedado em um servidor da Vercel, no domínio: [provinha-web-2025-2-gthc.vercel.app](provinha-web-2025-2-gthc.vercel.app).

## Comentários sobre o projeto
(Vale ressaltar que eu estou escrevendo esse readme inteiro de uma vez, após terminar o projeto)

Abri o projeto faz aprox. uma semana, mas acabei trabalhando mais nele nos 3 dias iniciais, deixando os outros pra debuggar e revisar os estilos.

Posso já perceber alguns aspectos que estão deixando a desejar, principalmente pelo tempo curto que fiquei revisando até entregar, alguns tópicos são:

### 1. Responsividade

Como fiz o design para desktop primeiro, acabei deixando o design para mobile/tablet pro final, até comecei mas quando vi o que faltava e o tempo que tinha, descartei as mudanças e continuei apenas com a interface p/ computadores.

### 2. Performance

Como eu fiz questão de importar todas as categorias para filtrar, e de mostrar todas as matérias, a quantidade de importação de dados, manipulação das arrays de objetos e as iterações para renderizar elas na tela foram muito altas e com arquivos consideravelmente grandes para se rodar offline, assim levando a uma queda na performance.

Dá para perceber isso na hora de pesquisar e na hora de carregar a tela inicialmente. Alguns ajustes de performance e de lazy loading poderiam ter sido implementados, mas por causa do prazo, também descartei essas features.

### 3. Armazenamento interno

Com tantas importações e com a navegação entre telas, algumas informações poderiam ser armazenadas em cache ou valores de sessão, nem comecei a implementar isso, mas fiz o mínimo, que foi importar a maioria dos dados logo no ./src/App.tsx, assim os dados fluem de cima para baixo, respeitando a boa prática com componentes do React.

Além desses tópicos, sei que também poderia fazer um arquivo que reunisse todos os tipos que criei no typescript (só pensei nisso quando já estava fazendo o deploy).

Imagino que isso é tudo que tenho a declarar, espero que se divirtam explorando meu código :)
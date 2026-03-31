# Sudoku JS

Projeto de implementação do jogo clássico Sudoku desenvolvido inteiramente em JavaScript Vanilla (ES6+), HTML5 e CSS3.

Este projeto foi construído com propósitos acadêmicos e focado no estudo aprofundado de:
- Programação Orientada a Objetos (POO) em JavaScript.
- Padrão de Arquitetura MVC (Model-View-Controller) para separação de responsabilidades.
- Algoritmos de validação de estado e manipulação de matrizes bidimensionais.
- Lógica heurística e algoritmos de Backtracking (em desenvolvimento para geração dinâmica de tabuleiros).

## Arquitetura (v1.0 - MVP)

O código está estruturado para manter o domínio da aplicação estritamente separado da interface gráfica:
- `Model` (SudokuBoard): Única fonte de verdade. Responsável pela matriz 9x9, regras de validação do Sudoku e condição de vitória.
- `View` (SudokuUI): Camada burra de renderização. Apenas reflete o estado atual do Model na DOM.
- `Controller` (GameController): Orquestra a inicialização, injeta o puzzle inicial e gerencia os eventos de input, garantindo a sincronia de estado entre View e Model.

## Como Rodar o Projeto

Como o projeto utiliza ES6 Modules (`import`/`export`) nativos do JavaScript no frontend, por questões de segurança dos navegadores modernos (CORS), não é possível executar o jogo apenas abrindo o arquivo `index.html` com um duplo clique (protocolo `file://`).

Você precisará servir os arquivos através de um servidor local.

### Opção 1: VS Code (Recomendada)
1. Abra a pasta do projeto no Visual Studio Code.
2. Instale a extensão "Live Server".
3. Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".
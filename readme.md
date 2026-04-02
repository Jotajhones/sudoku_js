# Sudoku JS

Implementação do jogo clássico Sudoku em JavaScript Vanilla (ES6+), HTML5 e CSS3.

Projeto focado na aplicação de Programação Orientada a Objetos (POO), arquitetura MVC para aplicações client-side e implementação de algoritmos heurísticos.

## Funcionalidades (v1.1)
- Geração dinâmica de tabuleiros com solução única via algoritmo de Backtracking.
- Validação de estado (linhas, colunas e quadrantes) em tempo real.
- Auxílio visual via manipulação de DOM (crosshatching e números equivalentes).
- Modo Purista: toggle para supressão de validação visual de erros.
- Controles de fluxo de partida (Novo Jogo, Reiniciar) e Timer isolado.
- Interface customizada baseada em variáveis CSS (100% vibecoded).

## Arquitetura
O sistema opera sob o padrão Model-View-Controller (MVC), garantindo a separação entre regras de negócio e renderização:

- Model (SudokuBoard): Única fonte de verdade dos dados. Mantém o estado da matriz 9x9, executa a validação lógica, implementa o Backtracking para preenchimento/remoção de nós e gerencia o snapshot do tabuleiro inicial.
- View (SudokuUI): Camada exclusiva de apresentação. Expõe métodos para renderizar inputs, injetar classes CSS de estado (highlights e erros) e aplicar restrições de leitura em células pré-preenchidas.
- Controller (GameController): Ponto de integração. Implementa Event Delegation no container principal para capturar inputs e cliques, orquestrando as atualizações no Model e despachando comandos de repintura para a View.
- Utils (Timer): Classe auxiliar para controle e formatação do loop temporal.

## Como Executar

O projeto utiliza ES6 Modules (`import`/`export`). Devido a políticas de segurança dos navegadores modernos (CORS) referentes ao protocolo `file://`, a aplicação não pode ser executada com um duplo clique no arquivo HTML. É necessário um servidor estático local.

Procedimento via VS Code:
1. Abra a pasta do projeto no Visual Studio Code.
2. Instale a extensão "Live Server".
3. Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".
# identificação única (id), a taxa de quadros por segundo (fps), a duração total expressa em

Source: base_de_conhecimento.pdf, page 2.

identificação única (id), a taxa de quadros por segundo (fps), a duração total expressa em
quadros absolutos (durationInFrames) e as dimensões espaciais de largura e altura em pixels
(width, height).3 Diferentemente do After Effects, onde os recursos e variáveis são alocados via
painéis de interface de usuário, o Remotion aceita a passagem de propriedades dinâmicas
através da propriedade defaultProps.3 O agente de IA deve internalizar que esta funcionalidade
permite que a mesma base de código de uma composição produza infinitas permutações de
vídeo baseadas em entradas de dados formatadas em JSON estrito, inaugurando a
capacidade de parametrização de vídeo em massa.3

A fragmentação do tempo e do espaço dentro da composição principal é gerenciada
primordialmente por componentes do tipo <Sequence>.3 Estes componentes funcionam de
maneira idêntica às camadas pré-compostas (Pre-comps) ou ao corte temporal do ponto de
entrada e saída (In/Out points) de uma camada no After Effects.3 Um agente de IA focado em
motion design deve ser rigorosamente instruído a utilizar sequências não apenas para
organizar os elementos no tempo de forma semântica, mas para gerenciar a sobrecarga de
memória computacional durante a renderização. Ao encapsular lógicas complexas dentro de
uma <Sequence>, o modelo garante que os componentes React subjacentes só sejam
renderizados e avaliados no Virtual DOM durante os intervalos específicos da linha do tempo
em que são visíveis, otimizando drasticamente a performance de renderização tanto no cliente
quanto no servidor.7

 Conceito no Adobe After         Equivalente Funcional no        Descrição Técnica e
 Effects                         Remotion                        Comportamento para o
                                                                 Agente de IA

 Composition                     <Composition />                 Define a raiz do escopo de
                                                                 tempo, resolução, taxa de
                                                                 quadros (FPS) e aceita
                                                                 propriedades dinâmicas de
                                                                 entrada para renderização
                                                                 parametrizada.3

 Pre-composition / Layer         <Sequence />                    Define o ponto temporal de
 In-Out                                                          início relativo, a duração de
                                                                 uma cena e atua como uma
                                                                 barreira de renderização
                                                                 isolada para otimização de
                                                                 performance.3

 Null Object (Parenting          React Context / Wrapper de      Estabelece uma estrutura
 espacial)                       AbsoluteFill                    hierárquica no DOM onde

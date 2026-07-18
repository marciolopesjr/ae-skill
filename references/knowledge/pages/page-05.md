# Modalidade de                   Correspondência Lógica         Implicação Arquitetural

Source: base_de_conhecimento.pdf, page 5.

Modalidade de                   Correspondência Lógica         Implicação Arquitetural
 Extrapolação no                 em Motion Design               para o Agente de IA
 Remotion

 extend (Comportamento           Interpolação Linear sem        Útil para trajetórias vetoriais
 Padrão)                         Restrição                      que devem sair da tela
                                                                continuamente sem a
                                                                necessidade de definir um
                                                                quadro-chave de saída
                                                                exato.

 clamp                           Quadros-chave de Parada        Obrigatório para limitar o
                                 Absoluta (Hold/Stop)           crescimento escalar,
                                                                opacidade máxima (travada
                                                                em 1) ou rotações finais.
                                                                Previne anomalias visuais e
                                                                estouro de limites do
                                                                DOM.14

 wrap                            Expressão loopOut("cycle")     Estratégia principal para
                                                                gerar animações infinitas
                                                                baseadas em um conjunto
                                                                pequeno de quadros
                                                                pré-definidos.14

 identity                        Mapeamento de Valor            Retorna a entrada não
                                 Transparente                   processada; útil em
                                                                depuração ou quando
                                                                funções de tempo
                                                                complexas aninhadas
                                                                assumem o controle
                                                                matemático da
                                                                propriedade.14

Curvas de Bézier e Sensação Cinética (Easing)
No ambiente de trabalho do After Effects, a suavização de velocidade comumente referida
como "Easy Ease" é a ferramenta fundamental que cria a aceleração e desaceleração orgânicas
de elementos na tela, baseando-se estritamente na equação paramétrica cúbica de Bézier.18 O
agente de IA deve ser rigorosamente treinado para rejeitar interpolações lineares rudimentares
e robóticas em favor de transições polidas e naturais usando o utilitário embutido
Easing.bezier(x1, y1, x2, y2) alocado dentro do objeto de opções da função de interpolação.14

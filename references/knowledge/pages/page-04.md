# (Spring Physics)

Source: base_de_conhecimento.pdf, page 4.

(Spring Physics)
O coração e a alma do motion design profissional residem na manipulação rigorosa das curvas
de tempo e espaço. O After Effects utiliza quadros-chave estáticos acoplados a uma
interpolação de curvas de Bézier espaciais e temporais para ditar o ritmo visual.18 Para que o
agente de IA reproduza essa fluidez mecânica e estética orgânica através de código gerativo, a
compreensão profunda da função interpolate() e da função spring() fornecidas nativamente
pelo Remotion é obrigatória e inegociável.

A Função de Interpolação e Controle de Extrapolação Temporal
A função interpolate() do Remotion opera como o mecanismo programático primário para
traduzir o progresso do tempo linear em transformações visuais dinâmicas. O agente de
Inteligência Artificial deve ser programado para sempre estruturar a invocação desta função
fornecendo quatro argumentos críticos e indissociáveis: o valor de entrada absoluto
(frequentemente capturado pelo gancho useCurrentFrame()), um domínio de entrada
temporal (um array numérico representando os quadros-chave de origem), um contradomínio
de saída correspondente (os valores visuais estritos que a propriedade deve assumir nesses
quadros) e, finalmente, um objeto de opções de formatação que dita as leis de extrapolação e
suavização (easing) da curva.14

O comportamento matemático nas extremidades da curva de animação é categoricamente
ditado pelas opções extrapolateLeft e extrapolateRight.14 A compreensão precisa destas
modalidades é o que permite ao agente de IA replicar as expressões avançadas de repetição e
continuação inercial comumente aplicadas no After Effects. A modalidade extend atua como o
padrão do sistema, onde a animação simplesmente continua linearmente na mesma trajetória
matemática mesmo após ultrapassar os limites do domínio de entrada temporal estipulado.14
Em contrapartida, a modalidade clamp estabiliza e trava o valor exatamente na fronteira do
domínio estabelecido. O uso do clamp é absolutamente imperativo nas heurísticas do agente
de IA para evitar distorções visuais não intencionais, como um elemento tipográfico que
deveria parar de crescer aos 100% de escala geométrica, mas que continuaria crescendo ao
infinito após o quadro final da animação se deixado sob a regra padrão.14

Adicionalmente, a opção wrap cria um comportamento de repetição idêntico à clássica
expressão loopOut("cycle") do After Effects. Quando o quadro atual do motor de renderização
excede o domínio de entrada mapeado, o valor calculado retorna abruptamente ao início do
ciclo.14 O agente de IA deve empregar o wrap sistematicamente ao projetar ciclos de
caminhada de personagens, animações de engrenagens industriais, cenários paralaxes
infinitos ou elementos de interface do usuário pulsantes. Por fim, a opção identity dita que o
valor retorna sua própria entrada original caso saia dos limites estritos de interpolação, sendo
útil em mapeamentos de tempo diretos.14

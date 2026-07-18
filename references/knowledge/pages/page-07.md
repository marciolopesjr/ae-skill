# historicamente alicerçada em ExtendScript e modernizada para padrões ECMAScript mais

Source: base_de_conhecimento.pdf, page 7.

historicamente alicerçada em ExtendScript e modernizada para padrões ECMAScript mais
recentes, para criar animações procedurais complexas através do uso de Expressões.22 Para
que um agente autônomo consiga construir e orquestrar uma biblioteca de habilidades ("skills")
verdadeiramente profissional e indistinguível de um artista humano, o mapeamento exato
destas expressões matemáticas para os padrões arquitetônicos nativos do React e Remotion é
de suma importância.

Expressão Wiggle e a Implementação de Algoritmos de Ruído (Noise)
A expressão wiggle(frequência, amplitude) no After Effects representa indiscutivelmente uma
das ferramentas mais ubíquas no arsenal de qualquer motion designer. Ela gera um
deslocamento numérico suave, contínuo e pseudoaleatório, que é empregado massivamente
para emular o tremor orgânico de câmeras seguradas à mão, a flutuação natural de objetos
celestes, a cintilação estocástica da opacidade de luzes de neon e toda sorte de
comportamentos visivelmente caóticos.22

O equivalente direto e arquiteturalmente superior no ecossistema Remotion é a biblioteca
dedicada @remotion/noise.15 O agente LLM deve incorporar a premissa de que as funções
utilitárias como noise2D e noise3D não geram meros números aleatórios que causariam saltos
desordenados e intermitentes a cada quadro. Em vez disso, elas baseiam-se em algoritmos
matemáticos contínuos de ruído de gradiente (tipicamente o ruído Simplex ou Perlin). Estes
algoritmos são a fundação matemática que garante a exata coerência interpolada e a
suavidade tátil que a expressão wiggle nativa do After Effects proporciona ao espectador.16

Para que a IA implemente um comportamento de wiggle perfeitamente funcional nos eixos
espaciais X e Y de um componente React animado, a lógica gerativa deve alimentar o
referencial de tempo contínuo como um dos eixos de ruído. Especificamente, o quadro atual
capturado pelo gancho (useCurrentFrame()) deve ser imperativamente dividido pelo FPS da
composição para normalizar a velocidade da flutuação, tornando-a agnóstica em relação à
cadência da renderização final.

A equação lógica rigorosa que o agente gerador de código deve transcrever obedece à
fórmula paramétrica estrutural:

O emprego desta abordagem produz uma oscilação ininterrupta no elemento, garantindo

matematicamente que a diferença de posição ou escala no quadro         seja suavemente

adjacente ao estado no quadro          , eliminando completamente artefatos visuais bruscos.15
Em implementações mais avançadas requeridas por descrições complexas do usuário (como
"crie um oceano de pontos flutuantes"), o agente deve utilizar o noise3D. Neste contexto triplo,
os primeiros dois eixos representam a geometria da malha dimensional (x e y espaciais do
componente), enquanto a terceira dimensão fornecida à função representa o avanço do
tempo, resultando em superfícies animadas, ondas em superfícies de líquidos simuladas por

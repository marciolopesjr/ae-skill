# Base de conhecimento pesquisável

Este diretório substitui a leitura direta do PDF em tarefas normais. Use `rg` primeiro, leia apenas as páginas relevantes e volte ao PDF somente quando precisar conferir layout original.

## Como pesquisar

```bash
rg -n "termo|outro termo" references/knowledge
sed -n '1,160p' references/knowledge/pages/page-01.md
```

## Índice por tópico

- After Effects para Remotion: [p.1](pages/page-01.md), [p.2](pages/page-02.md), [p.4](pages/page-04.md), [p.5](pages/page-05.md), [p.6](pages/page-06.md), [p.7](pages/page-07.md), [p.8](pages/page-08.md), [p.11](pages/page-11.md), [p.13](pages/page-13.md), [p.15](pages/page-15.md), [p.19](pages/page-19.md), [p.22](pages/page-22.md), [p.32](pages/page-32.md), [p.36](pages/page-36.md), [p.37](pages/page-37.md), [p.38](pages/page-38.md)
- Interpolação, easing e keyframes: [p.1](pages/page-01.md), [p.3](pages/page-03.md), [p.4](pages/page-04.md), [p.5](pages/page-05.md), [p.6](pages/page-06.md), [p.8](pages/page-08.md), [p.14](pages/page-14.md), [p.15](pages/page-15.md), [p.16](pages/page-16.md), [p.37](pages/page-37.md), [p.38](pages/page-38.md)
- Wiggle, noise e expressões: [p.3](pages/page-03.md), [p.4](pages/page-04.md), [p.5](pages/page-05.md), [p.6](pages/page-06.md), [p.7](pages/page-07.md), [p.8](pages/page-08.md), [p.37](pages/page-37.md)
- Compositing, imagens e anti-flicker: [p.3](pages/page-03.md), [p.9](pages/page-09.md), [p.10](pages/page-10.md), [p.35](pages/page-35.md), [p.36](pages/page-36.md), [p.38](pages/page-38.md)
- 3D, WebGL e React Three Fiber: [p.1](pages/page-01.md), [p.3](pages/page-03.md), [p.7](pages/page-07.md), [p.8](pages/page-08.md), [p.11](pages/page-11.md), [p.12](pages/page-12.md), [p.18](pages/page-18.md), [p.19](pages/page-19.md), [p.21](pages/page-21.md), [p.31](pages/page-31.md), [p.36](pages/page-36.md), [p.38](pages/page-38.md)
- Áudio e visualização sonora: [p.14](pages/page-14.md), [p.15](pages/page-15.md), [p.16](pages/page-16.md), [p.17](pages/page-17.md), [p.23](pages/page-23.md), [p.38](pages/page-38.md)
- JSON, prompts e parametrização: [p.1](pages/page-01.md), [p.2](pages/page-02.md), [p.6](pages/page-06.md), [p.8](pages/page-08.md), [p.13](pages/page-13.md), [p.14](pages/page-14.md), [p.15](pages/page-15.md), [p.16](pages/page-16.md), [p.17](pages/page-17.md), [p.18](pages/page-18.md), [p.19](pages/page-19.md), [p.20](pages/page-20.md), [p.21](pages/page-21.md), [p.22](pages/page-22.md), [p.23](pages/page-23.md), [p.24](pages/page-24.md), [p.25](pages/page-25.md), [p.26](pages/page-26.md), [p.27](pages/page-27.md), [p.28](pages/page-28.md), [p.29](pages/page-29.md), [p.30](pages/page-30.md), [p.31](pages/page-31.md), [p.32](pages/page-32.md), [p.33](pages/page-33.md), [p.34](pages/page-34.md), [p.35](pages/page-35.md), [p.36](pages/page-36.md), [p.38](pages/page-38.md), [p.39](pages/page-39.md)
- Renderização, Lambda e infraestrutura: [p.1](pages/page-01.md), [p.2](pages/page-02.md), [p.4](pages/page-04.md), [p.7](pages/page-07.md), [p.9](pages/page-09.md), [p.10](pages/page-10.md), [p.12](pages/page-12.md), [p.13](pages/page-13.md), [p.14](pages/page-14.md), [p.17](pages/page-17.md), [p.18](pages/page-18.md), [p.19](pages/page-19.md), [p.20](pages/page-20.md), [p.21](pages/page-21.md), [p.22](pages/page-22.md), [p.23](pages/page-23.md), [p.24](pages/page-24.md), [p.25](pages/page-25.md), [p.26](pages/page-26.md), [p.27](pages/page-27.md), [p.28](pages/page-28.md), [p.29](pages/page-29.md), [p.31](pages/page-31.md), [p.32](pages/page-32.md), [p.33](pages/page-33.md), [p.34](pages/page-34.md), [p.35](pages/page-35.md), [p.36](pages/page-36.md)
- Validação e antipadrões: [p.1](pages/page-01.md), [p.4](pages/page-04.md), [p.6](pages/page-06.md), [p.7](pages/page-07.md), [p.9](pages/page-09.md), [p.10](pages/page-10.md), [p.11](pages/page-11.md), [p.13](pages/page-13.md), [p.14](pages/page-14.md), [p.15](pages/page-15.md), [p.16](pages/page-16.md), [p.17](pages/page-17.md), [p.18](pages/page-18.md), [p.19](pages/page-19.md), [p.20](pages/page-20.md), [p.21](pages/page-21.md), [p.22](pages/page-22.md), [p.23](pages/page-23.md), [p.24](pages/page-24.md), [p.25](pages/page-25.md), [p.26](pages/page-26.md), [p.28](pages/page-28.md), [p.29](pages/page-29.md), [p.33](pages/page-33.md), [p.34](pages/page-34.md), [p.35](pages/page-35.md)
- Fontes e bibliografia: [p.36](pages/page-36.md), [p.37](pages/page-37.md), [p.38](pages/page-38.md), [p.39](pages/page-39.md)

## Páginas

- [p.1 Base de Conhecimento Ontológica para](pages/page-01.md)
- [p.2 identificação única (id), a taxa de quadros por segundo (fps), a duração total expressa em](pages/page-02.md)
- [p.3 as transformações](pages/page-03.md)
- [p.4 (Spring Physics)](pages/page-04.md)
- [p.5 Modalidade de                   Correspondência Lógica         Implicação Arquitetural](pages/page-05.md)
- [p.6 Para emular perfeitamente o clássico comportamento de "Ease In e Ease Out" (aceleração](pages/page-06.md)
- [p.7 historicamente alicerçada em ExtendScript e modernizada para padrões ECMAScript mais](pages/page-07.md)
- [p.8 vetores matriciais ou padrões visuais de fundo flutuantes altamente densos esteticamente.15](pages/page-08.md)
- [p.9 Compositing Avançado: Mascaramento, Luma Mattes](pages/page-09.md)
- [p.10 interno do Remotion é arquitetonicamente incapaz de calcular com precisão](pages/page-10.md)
- [p.11 calculada por                 .32](pages/page-11.md)
- [p.12 ambiente GUI requerem a transição metodológica de integração estrita da ponte de tecnologia](pages/page-12.md)
- [p.13 constante ao GLSL por meio numérico temporal alimentado a uma constante universal](pages/page-13.md)
- [p.14 de quantidades divergentes e pontos e vetores de aresta com métricas assimétricas ou](pages/page-14.md)
- [p.15 em andamento.51](pages/page-15.md)
- [p.16 temporizados à direita.51       externa ativada,](pages/page-16.md)
- [p.17 gancho procedimental visualizeAudio(). O maquinário cognitivo aciona o processo em](pages/page-17.md)
- [p.18 filtragem algorítmica anti-contaminação). Esta metodologia estruturada força o modelo neural](pages/page-18.md)
- [p.19 regras procedurais algorítmicas exclusivas ditando aos neurônios inferenciais as complexas](pages/page-19.md)
- [p.20 arquitetura que o modelo avaliador da interface gerativa subjacente LLM manipularia em fluxo](pages/page-20.md)
- [p.21 restritas da modelagem nas pontes do núcleo central WebGL base do provedor central](pages/page-21.md)
- [p.22 cognitiva atada e processada pelo gerador unificado LLM for solicitada ou forçado a atuar em](pages/page-22.md)
- [p.23 paralelamente para unificar harmonicamente as compilações contínuas sem perdas](pages/page-23.md)
- [p.24 paramétrico e procedimental nos orquestradores lógicos estruturados LLM dos dados sem as](pages/page-24.md)
- [p.25 altamente inteligente arquitetura distribuída nativa orgânica que utilizou sistematicamente as](pages/page-25.md)
- [p.26 perfeitamente atrelado o processo logístico procedimental do escalonamento de recursos](pages/page-26.md)
- [p.27 Database Locking pattern algorithm constraints). Esta contenção paramétrica arquitetural](pages/page-27.md)
- [p.28 saídas procedimentais atadas estritamente e na conclusão restrita logística unificada e nas](pages/page-28.md)
- [p.29 modelos unificados complexos atados isolados puramente processuais orquestrados nativos](pages/page-29.md)
- [p.30 base arquitetônica originada e das minuciosas rotinas limitantes algorítmicas das lógicas](pages/page-30.md)
- [p.31 complexas refrações atadas isoladamente nas manipulações ópticas base nativas na entrega](pages/page-31.md)
- [p.32 da paridade gráfica orgânica pura nativa idêntica em escala de pixels exata processual](pages/page-32.md)
- [p.33 contínuo ou na infraestrutura logística paramétrica contínua e massiva atada e puramente](pages/page-33.md)
- [p.34 baseado na lógica e a separação restritiva processual atrelada na inteligência da base da](pages/page-34.md)
- [p.35 lógicas e a exata verificação algorítmica paramétrica do empacotamento restrito de rede na](pages/page-35.md)
- [p.36 de maneira estritamente paramétrica ser na base puramente plenamente atada escalável e](pages/page-36.md)
- [p.37 14.​interpolate() | Remotion | Make videos programmatically, acessado em março 26,](pages/page-37.md)
- [p.38 https://github.com/orgs/remotion-dev/discussions/639](pages/page-38.md)
- [p.39 https://ai-pro.org/learn-ai/articles/json-prompt-for-ai-image-and-video-generati](pages/page-39.md)

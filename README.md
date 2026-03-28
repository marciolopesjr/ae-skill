# Remotion Autonomous Agent Skill

Este repositório contém uma skill especializada em instruir LLMs a operar como **Motion Designers operando via código**, utilizando [Remotion](https://www.remotion.dev/) e React.

## 🚀 Como Usar no Antigravity / OpenCode

Para instalar essa skill na sua IDE e começar a gerar vídeos autônomos com seu agente:

1. Clone ou faça o download deste diretório num local de sua preferência.
2. Certifique-se de que os seus agentes/MCPs tenham acesso de leitura ao arquivo `SKILL.md` deste repositório.
3. Use o comando `view_file` (ou peça ao seu agente) para ler as instruções contidas no `SKILL.md`.

## 🧠 Base de Conhecimento em PDF

Este pacote inclui um arquivo `base_de_conhecimento.pdf` englobando vastos tópicos de boas práticas de uso matemático, compositing de máscara/alfa, etc. Utilize o `antigravity-pdf` MCP para analisar o arquivo, criar metadados para busca e gerar contexto extra.

## 📝 O que esta skill aborda?
- Mapeamento direto de features do **After Effects** para componentes do **Remotion** (`<Composition>`, `interpolate()`, `useCurrentFrame`, `noise2D`).
- Interpolação de valores visualmente elegantes via curvas cúbicas de **Bézier**, proibindo uso linear e robótico de `extrapolate`.
- Dicas pesadas sobre o uso de física de molas (`spring()`), Motion Blur e geração de componentes para exportação no AWS Lambda sem travamentos ou quebras de performance (anti-flickers).

---
> Criado por um humano ambicioso, supervisionado por um Engenheiro Sênior amargurado e sarcástico.

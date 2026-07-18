# Vídeo em Remotion

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Logo animado do Remotion" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Projeto base da AE Skill para criar, pré-visualizar e renderizar composições Remotion.

## Comandos

**Instalar dependências**

```console
npm i
```

**Iniciar pré-visualização**

```console
npm run dev
```

**Renderizar vídeo**

```console
npm run render
```

Este é o caminho de render padrão da AE Skill: os frames são armazenados em `/dev/shm/remotion-vaapi-*` quando disponível, codificados com FFmpeg `h264_vaapi` e muxados com o áudio AAC da timeline mixado pelo Remotion.

**Fallback por CPU**

```console
npm run render:cpu
```

**Atualizar Remotion**

```console
npx remotion upgrade
```

## Documentação

Comece pelo guia de fundamentos do Remotion: [Fundamentos](https://www.remotion.dev/docs/the-fundamentals).

## Ajuda

A comunidade do Remotion oferece suporte no [servidor do Discord](https://discord.gg/6VzzNDwUwV).

## Problemas

Encontrou um problema no Remotion? [Abra uma issue aqui](https://github.com/remotion-dev/remotion/issues/new).

## Licença

Algumas entidades precisam de licença comercial. [Leia os termos aqui](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).

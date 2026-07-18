#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const {execFileSync, spawnSync} = require('node:child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const SOURCE_PDF = path.join(ROOT_DIR, 'base_de_conhecimento.pdf');
const OUTPUT_DIR = path.join(ROOT_DIR, 'references', 'knowledge');
const PAGES_DIR = path.join(OUTPUT_DIR, 'pages');
const PAGE_NUMBER_WIDTH = 2;

const TOPIC_GROUPS = [
  {
    title: 'After Effects para Remotion',
    keywords: ['After Effects', 'Composition', '<Composition', '<Sequence', 'Pre-composition', 'Null Object'],
  },
  {
    title: 'Interpolacao, easing e keyframes',
    keywords: ['interpolate', 'Easing', 'Bezier', 'keyframe', 'quadros-chave', 'extrapolate'],
  },
  {
    title: 'Wiggle, noise e expressoes',
    keywords: ['wiggle', 'noise2D', 'noise3D', 'loopOut', 'expressão', 'expressões'],
  },
  {
    title: 'Compositing, imagens e anti-flicker',
    keywords: ['mask', 'matte', 'Img', 'background-image', 'flicker', 'mask-image', 'track matte'],
  },
  {
    title: '3D, WebGL e React Three Fiber',
    keywords: ['3D', 'WebGL', 'Three', 'React Three Fiber', '@remotion/three', 'OffthreadVideo'],
  },
  {
    title: 'Audio e visualizacao sonora',
    keywords: ['Áudio', 'Audio', '<Audio', 'visualizeAudio', 'useAudioData', 'getAudioData'],
  },
  {
    title: 'JSON, prompts e parametrizacao',
    keywords: ['JSON', 'prompt', 'schema', 'defaultProps', 'parametrização', 'paramétrico'],
  },
  {
    title: 'Renderizacao, Lambda e infraestrutura',
    keywords: ['renderMedia', 'Lambda', 'renderização', 'concurrency', 'infraestrutura', 'servidor'],
  },
  {
    title: 'Validacao e anti-padroes',
    keywords: ['validação', 'anti', 'NUNCA', 'SEMPRE', 'falhas', 'determinística'],
  },
  {
    title: 'Fontes e bibliografia',
    keywords: ['acessado', 'https://', 'Remotion | Make videos', 'Adobe Help Center'],
  },
];

const ensureTool = (toolName) => {
  try {
    execFileSync('which', [toolName], {stdio: 'ignore'});
  } catch {
    throw new Error(`Missing required tool: ${toolName}`);
  }
};

const extractPdfText = () => {
  const result = spawnSync('pdftotext', ['-layout', '-enc', 'UTF-8', SOURCE_PDF, '-'], {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
  });

  if (result.stdout && result.stdout.trim().length > 0) {
    return result.stdout;
  }

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(result.stderr || `pdftotext failed with status ${result.status}`);
  }

  throw new Error('pdftotext produced no text');
};

const removeDirectory = (directoryPath) => {
  if (fs.existsSync(directoryPath)) {
    fs.rmSync(directoryPath, {recursive: true, force: true});
  }
};

const normalizePageText = (text) => {
  return text
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const pageFileName = (pageNumber) => {
  return `page-${String(pageNumber).padStart(PAGE_NUMBER_WIDTH, '0')}.md`;
};

const pageTitle = (text, pageNumber) => {
  const meaningfulLines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !/^\d+$/.test(line));

  return meaningfulLines[0] || `Pagina ${pageNumber}`;
};

const countKeywordHits = (text, keywords) => {
  const lowerText = text.toLowerCase();

  return keywords.reduce((total, keyword) => {
    const escapedKeyword = keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matches = lowerText.match(new RegExp(escapedKeyword, 'g'));

    return total + (matches ? matches.length : 0);
  }, 0);
};

const writePage = ({text, title, pageNumber}) => {
  const fileName = pageFileName(pageNumber);
  const pagePath = path.join(PAGES_DIR, fileName);
  const body = [
    `# ${title}`,
    '',
    `Source: base_de_conhecimento.pdf, page ${pageNumber}.`,
    '',
    text,
    '',
  ].join('\n');

  fs.writeFileSync(pagePath, body);
};

const buildTopicIndex = (pages) => {
  return TOPIC_GROUPS.map((topic) => {
    const matchingPages = pages
      .map((page) => ({
        ...page,
        hits: countKeywordHits(page.text, topic.keywords),
      }))
      .filter((page) => page.hits > 0)
      .sort((leftPage, rightPage) => leftPage.pageNumber - rightPage.pageNumber);

    return {
      ...topic,
      matchingPages,
    };
  });
};

const writeIndex = ({pages, topics}) => {
  const topicLines = topics.flatMap((topic) => {
    const pageLinks = topic.matchingPages
      .map((page) => `[p.${page.pageNumber}](pages/${page.fileName})`)
      .join(', ');

    return [`- ${topic.title}: ${pageLinks || 'sem ocorrencias diretas'}`];
  });

  const pageLines = pages.map((page) => {
    return `- [p.${page.pageNumber} ${page.title}](pages/${page.fileName})`;
  });

  const indexBody = [
    '# Base de conhecimento pesquisavel',
    '',
    'Este diretorio substitui a leitura direta do PDF em tarefas normais. Use `rg` primeiro, leia apenas as paginas relevantes e volte ao PDF somente quando precisar conferir layout original.',
    '',
    '## Como pesquisar',
    '',
    '```bash',
    'rg -n "termo|outro termo" references/knowledge',
    'sed -n \'1,160p\' references/knowledge/pages/page-01.md',
    '```',
    '',
    '## Indice por topico',
    '',
    ...topicLines,
    '',
    '## Paginas',
    '',
    ...pageLines,
    '',
  ].join('\n');

  fs.writeFileSync(path.join(OUTPUT_DIR, 'INDEX.md'), indexBody);
};

const main = () => {
  ensureTool('pdftotext');

  if (!fs.existsSync(SOURCE_PDF)) {
    throw new Error(`Missing source PDF: ${SOURCE_PDF}`);
  }

  const extractedText = extractPdfText();

  const pages = extractedText
    .split('\f')
    .map(normalizePageText)
    .filter((text) => text.length > 0)
    .map((text, index) => {
      const pageNumber = index + 1;
      const title = pageTitle(text, pageNumber);

      return {
        fileName: pageFileName(pageNumber),
        pageNumber,
        text,
        title,
      };
    });

  removeDirectory(OUTPUT_DIR);
  fs.mkdirSync(PAGES_DIR, {recursive: true});

  for (const page of pages) {
    writePage(page);
  }

  writeIndex({
    pages,
    topics: buildTopicIndex(pages),
  });

  console.log(`Wrote ${pages.length} pages to ${path.relative(ROOT_DIR, OUTPUT_DIR)}`);
};

main();

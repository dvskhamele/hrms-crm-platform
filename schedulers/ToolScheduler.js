const fs = require('fs');
const path = require('path');

const toolIdeasPath = path.join(__dirname, 'toolIdeas.json');

const readToolIdeas = () => {
  if (fs.existsSync(toolIdeasPath)) {
    const data = fs.readFileSync(toolIdeasPath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

const writeToolIdeas = (ideas) => {
  fs.writeFileSync(toolIdeasPath, JSON.stringify(ideas, null, 2));
};

const createTool = (tool) => {
  const toolDir = path.join(__dirname, `../frontend/src/app/tools/${tool.slug}`);
  if (!fs.existsSync(toolDir)) {
    fs.mkdirSync(toolDir, { recursive: true });
  }

  const toolPageContent = `
import React from 'react';

const ${tool.name.replace(/\s/g, '')} = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">${tool.name}</h1>
      {/* Add your tool's UI here */}
    </div>
  );
};

export default ${tool.name.replace(/\s/g, '')};
`;

  fs.writeFileSync(path.join(toolDir, 'page.tsx'), toolPageContent);

  const resultDir = path.join(__dirname, `../frontend/src/app/tools/results/${tool.slug}`);
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir, { recursive: true });
  }

  const resultPageContent = `
import React from 'react';

const ${tool.name.replace(/\s/g, '')}Result = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">${tool.name} Result</h1>
      {/* Add your tool's result UI here */}
    </div>
  );
};

export default ${tool.name.replace(/\s/g, '')}Result;
`;

  fs.writeFileSync(path.join(resultDir, 'page.tsx'), resultPageContent);

  const blogContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Blog: ${tool.name}</title>
</head>
<body>
  <h1>Audit Blog: ${tool.name}</h1>
  <p>${tool.description}</p>
  <h2>How to Use</h2>
  <ol>
    {/* Add instructions here */}
  </ol>
  <h2>Value for Target Audience</h2>
  <p>{/* Add value proposition here */}</p>
</body>
</html>
`;

  fs.writeFileSync(path.join(__dirname, `../blogs/audit-blog-${tool.slug}.html`), blogContent);

  // Add tool to tools page
  const toolsPagePath = path.join(__dirname, '../frontend/src/app/tools/page.tsx');
  let toolsPageContent = fs.readFileSync(toolsPagePath, 'utf-8');
  const newTool = `
  {
    name: '${tool.name}',
    href: '/tools/${tool.slug}',
    description: '${tool.description}',
  },`;
  toolsPageContent = toolsPageContent.replace('// Add other tools here', `${newTool}\n  // Add other tools here`);
  fs.writeFileSync(toolsPagePath, toolsPageContent);

  console.log(`Successfully created tool: ${tool.name}`);
};

const run = () => {
  const toolIdeas = readToolIdeas();
  const tool = toolIdeas.shift();
  if (tool) {
    createTool(tool);
    writeToolIdeas(toolIdeas);
  }
};

run();
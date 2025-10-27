const fs = require('fs');
const path = require('path');

const keywords = [
  'hr management',
  'recruitment software',
  'employee engagement',
  // Add more keywords here
];

const createPage = (keyword) => {
  const slug = keyword.replace(/\s/g, '-');
  const pageDir = path.join(__dirname, `../frontend/src/app/${slug}`);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  const pageContent = `
import React from 'react';

const ${keyword.replace(/\s/g, '')}Page = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">${keyword}</h1>
      {/* Add your page content here */}
    </div>
  );
};

export default ${keyword.replace(/\s/g, '')}Page;
`;

  fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent);

  console.log(`Successfully created page: ${keyword}`);
};

const run = () => {
  const keyword = keywords.shift();
  if (keyword) {
    createPage(keyword);
  }
};

run();
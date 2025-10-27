const fs = require('fs');
const path = require('path');

const seoImprovements = [
  {
    type: 'blog',
    target: 'audit-blog-time-to-fill-calculator.html',
    changes: [
      { type: 'add-heading', content: '### Understanding Time to Fill', after: '<h2>How to Use</h2>' },
      { type: 'add-paragraph', content: 'Time to fill is a crucial metric in recruitment, measuring the efficiency of your hiring process from job requisition to candidate acceptance. A shorter time to fill often indicates a more agile and effective recruitment strategy.', after: '### Understanding Time to Fill' },
      { type: 'add-keyword', keyword: 'recruitment metrics', targetElement: 'body' },
    ],
  },
  {
    type: 'homepage',
    target: 'frontend/src/app/page.tsx',
    changes: [
      { type: 'add-section', content: '<div className="mt-12 text-center"><h4 className="font-bold text-slate-800">Latest Insights</h4><p className="text-sm text-slate-500">Stay updated with our latest articles and tools.</p></div>', after: '</div>\n\n        <div className="mt-12 text-center">' },
      { type: 'add-keyword', keyword: 'HR software', targetElement: 'head' },
    ],
  },
  // Add more SEO improvement ideas here
];

const applyChanges = (filePath, changes) => {
  let content = fs.readFileSync(filePath, 'utf-8');

  changes.forEach(change => {
    if (change.type === 'add-heading') {
      content = content.replace(change.after, `${change.after}\n${change.content}`);
    } else if (change.type === 'add-paragraph') {
      content = content.replace(change.after, `${change.after}\n<p>${change.content}</p>`);
    } else if (change.type === 'add-keyword') {
      if (change.targetElement === 'body') {
        // For simplicity, just append to the end of body for now
        content = content.replace('</body>', `<span style="display:none;">${change.keyword}</span></body>`);
      } else if (change.targetElement === 'head') {
        content = content.replace('</head>', `<meta name="keywords" content="${change.keyword}" />\n</head>`);
      }
    } else if (change.type === 'add-section') {
      content = content.replace(change.after, `${change.after}\n${change.content}`);
    }
  });

  fs.writeFileSync(filePath, content);
};

const run = () => {
  const improvement = seoImprovements.shift();
  if (improvement) {
    if (improvement.type === 'blog') {
      const blogPath = path.join(__dirname, `../blogs/${improvement.target}`);
      applyChanges(blogPath, improvement.changes);
      console.log(`Applied SEO improvements to blog: ${improvement.target}`);
    } else if (improvement.type === 'homepage') {
      const homepagePath = path.join(__dirname, `../${improvement.target}`);
      applyChanges(homepagePath, improvement.changes);
      console.log(`Applied SEO improvements to homepage: ${improvement.target}`);
    }
  }
};

run();
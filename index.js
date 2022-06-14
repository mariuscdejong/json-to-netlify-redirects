const fs = require('fs');
const path = require('path');

async function generateNetlifyRedirects(redirects) {

	// Set _redirects file content variable
	let redirectFileContent = '';

	// Loop through fetched redirect rules and add to file content
	redirects.forEach(redirectRule => {
		redirectFileContent += `${redirectRule.from}\t\t`;
		redirectFileContent += `${redirectRule.to}\t\t`;
		redirectFileContent += `${redirectRule.code ? redirectRule.code : 301}\n`;
	});

	// Generate the _redirects file
  const redirectsOutputPath = path.resolve(__dirname, '_redirects');

	fs.appendFile(redirectsOutputPath, redirectFileContent, error => {
		if (error) throw error;
		console.log('✔ Netlify redirects generated');
	});
};

let redirects = fs.readFileSync('redirects.json');

generateNetlifyRedirects(JSON.parse(redirects));

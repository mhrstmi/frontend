import * as fs from 'fs';
import { EOL } from 'os';
import prettier from 'prettier';
import openapiTS from 'openapi-typescript';
import config from '../api-gen.config.js';

try {
  const root = process.cwd();
  const schemaUrl = `${process.env.REACT_APP_API_URL}/${config.jsonEndPoint}`;

  console.log('Please wait. this may take a few minutes' + EOL + `Connecting to: ${schemaUrl} ...`);

  let content =
    '//use npm run api-gen for update this file' +
    EOL +
    (await openapiTS(schemaUrl, {
      makePathsEnum: true,
      additionalProperties: false,
      prettierConfig: await prettier.resolveConfigFile(root),
    }));

  content = content.replace(new RegExp(`(['"])${config.removeApiPrefix}`, 'g'), '$1');

  // try {
  //   const methods =
  //     content
  //       .match(/export\s+?interface\s+?paths\s+?\{.*?}\s+/gms)[0]
  //       .replace(/interface\s+?paths/, 'enum ApiMethods')
  //       .replace(/\s(\w+?):\s+?operations\[["'](.+?)["']]/g, (_, m1, m2) => `${m2} = '${m1.toUpperCase()}'`)
  //       .replace(/;/g, ',')
  //       .replace(/readonly\s*?/g, '')
  //       .replace(/(?:["'].+?["']:\s+{)|(?:},?)/g, '')
  //       .replace(/^\s*$(?:\r\n?|\n)/gm, '')
  //       .trim() +
  //     EOL +
  //     '}';
  //   content = content + EOL + methods;
  // } catch (e) {}

  fs.writeFileSync(`${root}/${config.output}`, content);
  console.log(`File Successfully Generated: ${config.output}`);
} catch (err) {
  console.error(err);
}

/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

const mbValidator = require('@mapbox/mapbox-gl-style-spec');
const studySchema = require('./study-schema.json');
const validateSchema = require('yaml-schema-validator');

function printResult(fn, fileErrors) {
  if (fileErrors.length) {
    console.log(chalk.red(`✖ ${fn}`));
    fileErrors.forEach((err) => console.log(`    ${err.message}`));
  } else {
    console.log(chalk.green(`✔ ${fn}`));
  }
}

(async function main() {
  try {
    const studyFiles = fs.readdirSync(
      path.join(__dirname, '../content/study/posts/')
    );

    const ymlFiles = studyFiles
      .filter((fn) => path.extname(fn) === '.yml')
      .map((fn) => path.join(__dirname, `../content/study/posts/${fn}`));

    const mbStyleFiles = studyFiles
      .filter((fn) => path.extname(fn) === '.json')
      .map((fn) => path.join(__dirname, `../content/study/posts/${fn}`));

    let errors = false;

    console.log('\nValidating MB Styles\n===');
    mbStyleFiles.forEach((fn) => {
      const fileContent = fs.readJSONSync(fn);
      const fileErrors = mbValidator.validate(fileContent);

      if (fileErrors.length) {
        errors = true;
      }

      printResult(fn, fileErrors);
    });

    console.log('\nValidating YML\n===');
    ymlFiles.forEach((fn) => {
      const fileErrors = validateSchema(fn, {
        schema: studySchema,
        logLevel: 'none'
      });

      if (fileErrors.length) {
        errors = true;
      }

      printResult(fn, fileErrors);
    });

    if (errors) throw new Error();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
})();

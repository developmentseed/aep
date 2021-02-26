const validateSchema = require('yaml-schema-validator');
const fs = require('fs');
const path = require('path');

(async function main() {
  try {
    const ymlFiles = fs.readdirSync(
      path.join(__dirname, '../content/study/posts/')
    );

    const errors = ymlFiles.reduce((errors, ymlFn) => {
      console.log(`\nValidating ${ymlFn}`);
      const error = validateSchema(
        path.join(__dirname, `../content/study/posts/${ymlFn}`),
        {
          schemaPath: path.join(__dirname, './study-schema.json')
        }
      );
      if (error.length) return [...errors, error];
      return errors;
    }, []);

    if (errors.length) throw new Error(errors);
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}());

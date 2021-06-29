/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

const mbValidator = require('@mapbox/mapbox-gl-style-spec');
const Schema = require('validate');
const yml = require('js-yaml');

const studyFileExists = (val) =>
  fs.existsSync(path.join(__dirname, '../content/study/posts/', val));

const baseSchema = {
  title: { type: String, required: true },
  bbox: [
    [
      { type: Number, required: true },
      { type: Number, required: true }
    ],
    [
      { type: Number, required: true },
      { type: Number, required: true }
    ]
  ]
};

const externalStudySchema = new Schema({
  ...baseSchema,
  external: { type: String, match: /^https?:\/\// }
});

const studySchema = new Schema({
  ...baseSchema,
  zoomExtent: [{ type: Number }, { type: Number }],
  mapConfig: { type: String, use: { studyFileExists }, required: true },
  study: {
    consultant: { type: String, required: true },
    period: { required: true },
    content: { type: String, use: { studyFileExists }, required: true }
  },
  platform: {
    title: { type: String },
    url: { type: String }
  },
  charts: [
    {
      name: { type: String },
      type: { type: String, enum: ['donut', 'number'] },
      datum: {
        value: { type: Number },
        unit: { type: String }
      },
      data: [
        {
          name: { type: String },
          value: { type: Number, required: true }
        }
      ]
    }
  ],
  layers: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      category: {
        type: String,
        enum: ['input', 'outcome'],
        required: true
      },
      visible: { type: Boolean },
      disabled: { type: Boolean },
      mbLayer: { type: String, required: true },
      info: { type: String },
      source: {
        name: { type: String, required: true },
        url: { type: String, required: true }
      },
      legendData: {
        type: {
          type: String,
          enum: ['gradient', 'line', 'circle', 'symbol']
        },
        color: { type: String, match: /^#[0-9a-fA-F]{6}$/ },
        dashed: { type: Boolean },
        icon: { type: String },
        min: { type: String },
        max: { type: String },
        stops: [{ type: String, match: /^#[0-9a-fA-F]{6}$/ }]
      },
      displayData: [
        {
          value: { type: String },
          label: { type: String },
          valueProp: { type: String },
          labelProp: { type: String }
        }
      ]
    }
  ]
});

studySchema.message({
  fileExists: (path) => `${path} must point to a file that exists`
});

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
      const fileContent = yml.load(fs.readFileSync(fn));
      const schemaToUse = fileContent.external
        ? externalStudySchema
        : studySchema;
      const fileErrors = schemaToUse.validate(fileContent, { strip: false });

      if (fileErrors.length) {
        errors = true;
      }

      printResult(fn, fileErrors);
    });

    if (errors) throw new Error();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();

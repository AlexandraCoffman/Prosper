global.__ExpoImportMetaRegistry = {};

global.structuredClone =
  global.structuredClone || ((obj) => JSON.parse(JSON.stringify(obj)));

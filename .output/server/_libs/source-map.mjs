import require$$0 from "url";
import require$$0$1 from "fs";
import require$$2 from "path";
var sourceMap = {};
var sourceMapGenerator = {};
var base64Vlq = {};
var base64 = {};
var hasRequiredBase64;
function requireBase64() {
  if (hasRequiredBase64) return base64;
  hasRequiredBase64 = 1;
  const intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  base64.encode = function(number) {
    if (0 <= number && number < intToCharMap.length) {
      return intToCharMap[number];
    }
    throw new TypeError("Must be between 0 and 63: " + number);
  };
  return base64;
}
var hasRequiredBase64Vlq;
function requireBase64Vlq() {
  if (hasRequiredBase64Vlq) return base64Vlq;
  hasRequiredBase64Vlq = 1;
  const base642 = requireBase64();
  const VLQ_BASE_SHIFT = 5;
  const VLQ_BASE = 1 << VLQ_BASE_SHIFT;
  const VLQ_BASE_MASK = VLQ_BASE - 1;
  const VLQ_CONTINUATION_BIT = VLQ_BASE;
  function toVLQSigned(aValue) {
    return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
  }
  base64Vlq.encode = function base64VLQ_encode(aValue) {
    let encoded = "";
    let digit;
    let vlq = toVLQSigned(aValue);
    do {
      digit = vlq & VLQ_BASE_MASK;
      vlq >>>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base642.encode(digit);
    } while (vlq > 0);
    return encoded;
  };
  return base64Vlq;
}
var util = {};
var url;
var hasRequiredUrl;
function requireUrl() {
  if (hasRequiredUrl) return url;
  hasRequiredUrl = 1;
  url = typeof URL === "function" ? URL : require$$0.URL;
  return url;
}
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  const URL2 = requireUrl();
  function getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) {
      return aArgs[aName];
    } else if (arguments.length === 3) {
      return aDefaultValue;
    }
    throw new Error('"' + aName + '" is a required argument.');
  }
  util.getArg = getArg;
  const supportsNullProto = (function() {
    const obj = /* @__PURE__ */ Object.create(null);
    return !("__proto__" in obj);
  })();
  function identity(s) {
    return s;
  }
  function toSetString(aStr) {
    if (isProtoString(aStr)) {
      return "$" + aStr;
    }
    return aStr;
  }
  util.toSetString = supportsNullProto ? identity : toSetString;
  function fromSetString(aStr) {
    if (isProtoString(aStr)) {
      return aStr.slice(1);
    }
    return aStr;
  }
  util.fromSetString = supportsNullProto ? identity : fromSetString;
  function isProtoString(s) {
    if (!s) {
      return false;
    }
    const length = s.length;
    if (length < 9) {
      return false;
    }
    if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
      return false;
    }
    for (let i = length - 10; i >= 0; i--) {
      if (s.charCodeAt(i) !== 36) {
        return false;
      }
    }
    return true;
  }
  function strcmp(aStr1, aStr2) {
    if (aStr1 === aStr2) {
      return 0;
    }
    if (aStr1 === null) {
      return 1;
    }
    if (aStr2 === null) {
      return -1;
    }
    if (aStr1 > aStr2) {
      return 1;
    }
    return -1;
  }
  function compareByGeneratedPositionsInflated(mappingA, mappingB) {
    let cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) {
      return cmp;
    }
    return strcmp(mappingA.name, mappingB.name);
  }
  util.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
  function parseSourceMapInput(str) {
    return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
  }
  util.parseSourceMapInput = parseSourceMapInput;
  const PROTOCOL = "http:";
  const PROTOCOL_AND_HOST = `${PROTOCOL}//host`;
  function createSafeHandler(cb) {
    return (input) => {
      const type = getURLType(input);
      const base = buildSafeBase(input);
      const url2 = new URL2(input, base);
      cb(url2);
      const result = url2.toString();
      if (type === "absolute") {
        return result;
      } else if (type === "scheme-relative") {
        return result.slice(PROTOCOL.length);
      } else if (type === "path-absolute") {
        return result.slice(PROTOCOL_AND_HOST.length);
      }
      return computeRelativeURL(base, result);
    };
  }
  function withBase(url2, base) {
    return new URL2(url2, base).toString();
  }
  function buildUniqueSegment(prefix, str) {
    let id = 0;
    do {
      const ident = prefix + id++;
      if (str.indexOf(ident) === -1) return ident;
    } while (true);
  }
  function buildSafeBase(str) {
    const maxDotParts = str.split("..").length - 1;
    const segment = buildUniqueSegment("p", str);
    let base = `${PROTOCOL_AND_HOST}/`;
    for (let i = 0; i < maxDotParts; i++) {
      base += `${segment}/`;
    }
    return base;
  }
  const ABSOLUTE_SCHEME = /^[A-Za-z0-9\+\-\.]+:/;
  function getURLType(url2) {
    if (url2[0] === "/") {
      if (url2[1] === "/") return "scheme-relative";
      return "path-absolute";
    }
    return ABSOLUTE_SCHEME.test(url2) ? "absolute" : "path-relative";
  }
  function computeRelativeURL(rootURL, targetURL) {
    if (typeof rootURL === "string") rootURL = new URL2(rootURL);
    if (typeof targetURL === "string") targetURL = new URL2(targetURL);
    const targetParts = targetURL.pathname.split("/");
    const rootParts = rootURL.pathname.split("/");
    if (rootParts.length > 0 && !rootParts[rootParts.length - 1]) {
      rootParts.pop();
    }
    while (targetParts.length > 0 && rootParts.length > 0 && targetParts[0] === rootParts[0]) {
      targetParts.shift();
      rootParts.shift();
    }
    const relativePath = rootParts.map(() => "..").concat(targetParts).join("/");
    return relativePath + targetURL.search + targetURL.hash;
  }
  const ensureDirectory = createSafeHandler((url2) => {
    url2.pathname = url2.pathname.replace(/\/?$/, "/");
  });
  const trimFilename = createSafeHandler((url2) => {
    url2.href = new URL2(".", url2.toString()).toString();
  });
  const normalize = createSafeHandler((url2) => {
  });
  util.normalize = normalize;
  function join(aRoot, aPath) {
    const pathType = getURLType(aPath);
    const rootType = getURLType(aRoot);
    aRoot = ensureDirectory(aRoot);
    if (pathType === "absolute") {
      return withBase(aPath, void 0);
    }
    if (rootType === "absolute") {
      return withBase(aPath, aRoot);
    }
    if (pathType === "scheme-relative") {
      return normalize(aPath);
    }
    if (rootType === "scheme-relative") {
      return withBase(aPath, withBase(aRoot, PROTOCOL_AND_HOST)).slice(
        PROTOCOL.length
      );
    }
    if (pathType === "path-absolute") {
      return normalize(aPath);
    }
    if (rootType === "path-absolute") {
      return withBase(aPath, withBase(aRoot, PROTOCOL_AND_HOST)).slice(
        PROTOCOL_AND_HOST.length
      );
    }
    const base = buildSafeBase(aPath + aRoot);
    const newPath = withBase(aPath, withBase(aRoot, base));
    return computeRelativeURL(base, newPath);
  }
  util.join = join;
  function relative(rootURL, targetURL) {
    const result = relativeIfPossible(rootURL, targetURL);
    return typeof result === "string" ? result : normalize(targetURL);
  }
  util.relative = relative;
  function relativeIfPossible(rootURL, targetURL) {
    const urlType = getURLType(rootURL);
    if (urlType !== getURLType(targetURL)) {
      return null;
    }
    const base = buildSafeBase(rootURL + targetURL);
    const root = new URL2(rootURL, base);
    const target = new URL2(targetURL, base);
    try {
      new URL2("", target.toString());
    } catch (err) {
      return null;
    }
    if (target.protocol !== root.protocol || target.user !== root.user || target.password !== root.password || target.hostname !== root.hostname || target.port !== root.port) {
      return null;
    }
    return computeRelativeURL(root, target);
  }
  function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
    if (sourceRoot && getURLType(sourceURL) === "path-absolute") {
      sourceURL = sourceURL.replace(/^\//, "");
    }
    let url2 = normalize(sourceURL || "");
    if (sourceRoot) url2 = join(sourceRoot, url2);
    if (sourceMapURL) url2 = join(trimFilename(sourceMapURL), url2);
    return url2;
  }
  util.computeSourceURL = computeSourceURL;
  return util;
}
var arraySet = {};
var hasRequiredArraySet;
function requireArraySet() {
  if (hasRequiredArraySet) return arraySet;
  hasRequiredArraySet = 1;
  class ArraySet {
    constructor() {
      this._array = [];
      this._set = /* @__PURE__ */ new Map();
    }
    /**
     * Static method for creating ArraySet instances from an existing array.
     */
    static fromArray(aArray, aAllowDuplicates) {
      const set = new ArraySet();
      for (let i = 0, len = aArray.length; i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    }
    /**
     * Return how many unique items are in this ArraySet. If duplicates have been
     * added, than those do not count towards the size.
     *
     * @returns Number
     */
    size() {
      return this._set.size;
    }
    /**
     * Add the given string to this set.
     *
     * @param String aStr
     */
    add(aStr, aAllowDuplicates) {
      const isDuplicate = this.has(aStr);
      const idx = this._array.length;
      if (!isDuplicate || aAllowDuplicates) {
        this._array.push(aStr);
      }
      if (!isDuplicate) {
        this._set.set(aStr, idx);
      }
    }
    /**
     * Is the given string a member of this set?
     *
     * @param String aStr
     */
    has(aStr) {
      return this._set.has(aStr);
    }
    /**
     * What is the index of the given string in the array?
     *
     * @param String aStr
     */
    indexOf(aStr) {
      const idx = this._set.get(aStr);
      if (idx >= 0) {
        return idx;
      }
      throw new Error('"' + aStr + '" is not in the set.');
    }
    /**
     * What is the element at the given index?
     *
     * @param Number aIdx
     */
    at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error("No element indexed by " + aIdx);
    }
    /**
     * Returns the array representation of this set (which has the proper indices
     * indicated by indexOf). Note that this is a copy of the internal array used
     * for storing the members so that no one can mess with internal state.
     */
    toArray() {
      return this._array.slice();
    }
  }
  arraySet.ArraySet = ArraySet;
  return arraySet;
}
var mappingList = {};
var hasRequiredMappingList;
function requireMappingList() {
  if (hasRequiredMappingList) return mappingList;
  hasRequiredMappingList = 1;
  const util2 = requireUtil();
  function generatedPositionAfter(mappingA, mappingB) {
    const lineA = mappingA.generatedLine;
    const lineB = mappingB.generatedLine;
    const columnA = mappingA.generatedColumn;
    const columnB = mappingB.generatedColumn;
    return lineB > lineA || lineB == lineA && columnB >= columnA || util2.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
  }
  class MappingList {
    constructor() {
      this._array = [];
      this._sorted = true;
      this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    /**
     * Iterate through internal items. This method takes the same arguments that
     * `Array.prototype.forEach` takes.
     *
     * NOTE: The order of the mappings is NOT guaranteed.
     */
    unsortedForEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    }
    /**
     * Add the given source mapping.
     *
     * @param Object aMapping
     */
    add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    }
    /**
     * Returns the flat, sorted array of mappings. The mappings are sorted by
     * generated position.
     *
     * WARNING: This method returns internal data without copying, for
     * performance. The return value must NOT be mutated, and should be treated as
     * an immutable borrow. If you want to take ownership, you must make your own
     * copy.
     */
    toArray() {
      if (!this._sorted) {
        this._array.sort(util2.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    }
  }
  mappingList.MappingList = MappingList;
  return mappingList;
}
var hasRequiredSourceMapGenerator;
function requireSourceMapGenerator() {
  if (hasRequiredSourceMapGenerator) return sourceMapGenerator;
  hasRequiredSourceMapGenerator = 1;
  const base64VLQ = requireBase64Vlq();
  const util2 = requireUtil();
  const ArraySet = requireArraySet().ArraySet;
  const MappingList = requireMappingList().MappingList;
  class SourceMapGenerator {
    constructor(aArgs) {
      if (!aArgs) {
        aArgs = {};
      }
      this._file = util2.getArg(aArgs, "file", null);
      this._sourceRoot = util2.getArg(aArgs, "sourceRoot", null);
      this._skipValidation = util2.getArg(aArgs, "skipValidation", false);
      this._sources = new ArraySet();
      this._names = new ArraySet();
      this._mappings = new MappingList();
      this._sourcesContents = null;
    }
    /**
     * Creates a new SourceMapGenerator based on a SourceMapConsumer
     *
     * @param aSourceMapConsumer The SourceMap.
     */
    static fromSourceMap(aSourceMapConsumer) {
      const sourceRoot = aSourceMapConsumer.sourceRoot;
      const generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot
      });
      aSourceMapConsumer.eachMapping(function(mapping) {
        const newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };
        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util2.relative(sourceRoot, newMapping.source);
          }
          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };
          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }
        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        let sourceRelative = sourceFile;
        if (sourceRoot != null) {
          sourceRelative = util2.relative(sourceRoot, sourceFile);
        }
        if (!generator._sources.has(sourceRelative)) {
          generator._sources.add(sourceRelative);
        }
        const content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    }
    /**
     * Add a single mapping from original source line and column to the generated
     * source's line and column for this source map being created. The mapping
     * object should have the following properties:
     *
     *   - generated: An object with the generated line and column positions.
     *   - original: An object with the original line and column positions.
     *   - source: The original source file (relative to the sourceRoot).
     *   - name: An optional original token name for this mapping.
     */
    addMapping(aArgs) {
      const generated = util2.getArg(aArgs, "generated");
      const original = util2.getArg(aArgs, "original", null);
      let source = util2.getArg(aArgs, "source", null);
      let name = util2.getArg(aArgs, "name", null);
      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name);
      }
      if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) {
          this._sources.add(source);
        }
      }
      if (name != null) {
        name = String(name);
        if (!this._names.has(name)) {
          this._names.add(name);
        }
      }
      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original && original.line,
        originalColumn: original && original.column,
        source,
        name
      });
    }
    /**
     * Set the source content for a source file.
     */
    setSourceContent(aSourceFile, aSourceContent) {
      let source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util2.relative(this._sourceRoot, source);
      }
      if (aSourceContent != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = /* @__PURE__ */ Object.create(null);
        }
        this._sourcesContents[util2.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        delete this._sourcesContents[util2.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    }
    /**
     * Applies the mappings of a sub-source-map for a specific source file to the
     * source map being generated. Each mapping to the supplied source file is
     * rewritten using the supplied source map. Note: The resolution for the
     * resulting mappings is the minimium of this map and the supplied map.
     *
     * @param aSourceMapConsumer The source map to be applied.
     * @param aSourceFile Optional. The filename of the source file.
     *        If omitted, SourceMapConsumer's file property will be used.
     * @param aSourceMapPath Optional. The dirname of the path to the source map
     *        to be applied. If relative, it is relative to the SourceMapConsumer.
     *        This parameter is needed when the two source maps aren't in the same
     *        directory, and the source map to be applied contains relative source
     *        paths. If so, those relative source paths need to be rewritten
     *        relative to the SourceMapGenerator.
     */
    applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      let sourceFile = aSourceFile;
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      const sourceRoot = this._sourceRoot;
      if (sourceRoot != null) {
        sourceFile = util2.relative(sourceRoot, sourceFile);
      }
      const newSources = this._mappings.toArray().length > 0 ? new ArraySet() : this._sources;
      const newNames = new ArraySet();
      this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          const original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util2.join(aSourceMapPath, mapping.source);
            }
            if (sourceRoot != null) {
              mapping.source = util2.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }
        const source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }
        const name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }
      }, this);
      this._sources = newSources;
      this._names = newNames;
      aSourceMapConsumer.sources.forEach(function(srcFile) {
        const content = aSourceMapConsumer.sourceContentFor(srcFile);
        if (content != null) {
          if (aSourceMapPath != null) {
            srcFile = util2.join(aSourceMapPath, srcFile);
          }
          if (sourceRoot != null) {
            srcFile = util2.relative(sourceRoot, srcFile);
          }
          this.setSourceContent(srcFile, content);
        }
      }, this);
    }
    /**
     * A mapping can have one of the three levels of data:
     *
     *   1. Just the generated position.
     *   2. The Generated position, original position, and original source.
     *   3. Generated and original position, original source, as well as a name
     *      token.
     *
     * To maintain consistency, we validate that any new mapping being added falls
     * in to one of these categories.
     */
    _validateMapping(aGenerated, aOriginal, aSource, aName) {
      if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
        throw new Error(
          "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
        );
      }
      if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) ;
      else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) ;
      else {
        throw new Error(
          "Invalid mapping: " + JSON.stringify({
            generated: aGenerated,
            source: aSource,
            original: aOriginal,
            name: aName
          })
        );
      }
    }
    /**
     * Serialize the accumulated mappings in to the stream of base 64 VLQs
     * specified by the source map format.
     */
    _serializeMappings() {
      let previousGeneratedColumn = 0;
      let previousGeneratedLine = 1;
      let previousOriginalColumn = 0;
      let previousOriginalLine = 0;
      let previousName = 0;
      let previousSource = 0;
      let result = "";
      let next;
      let mapping;
      let nameIdx;
      let sourceIdx;
      const mappings = this._mappings.toArray();
      for (let i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];
        next = "";
        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ";";
            previousGeneratedLine++;
          }
        } else if (i > 0) {
          if (!util2.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ",";
        }
        next += base64VLQ.encode(
          mapping.generatedColumn - previousGeneratedColumn
        );
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64VLQ.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;
          next += base64VLQ.encode(
            mapping.originalLine - 1 - previousOriginalLine
          );
          previousOriginalLine = mapping.originalLine - 1;
          next += base64VLQ.encode(
            mapping.originalColumn - previousOriginalColumn
          );
          previousOriginalColumn = mapping.originalColumn;
          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            next += base64VLQ.encode(nameIdx - previousName);
            previousName = nameIdx;
          }
        }
        result += next;
      }
      return result;
    }
    _generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function(source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util2.relative(aSourceRoot, source);
        }
        const key = util2.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
      }, this);
    }
    /**
     * Externalize the source map.
     */
    toJSON() {
      const map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(
          map.sources,
          map.sourceRoot
        );
      }
      return map;
    }
    /**
     * Render the source map being generated to a string.
     */
    toString() {
      return JSON.stringify(this.toJSON());
    }
  }
  SourceMapGenerator.prototype._version = 3;
  sourceMapGenerator.SourceMapGenerator = SourceMapGenerator;
  return sourceMapGenerator;
}
var sourceMapConsumer = {};
var binarySearch = {};
var hasRequiredBinarySearch;
function requireBinarySearch() {
  if (hasRequiredBinarySearch) return binarySearch;
  hasRequiredBinarySearch = 1;
  (function(exports$1) {
    exports$1.GREATEST_LOWER_BOUND = 1;
    exports$1.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      const mid = Math.floor((aHigh - aLow) / 2) + aLow;
      const cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias === exports$1.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1;
        }
        return mid;
      }
      if (mid - aLow > 1) {
        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
      }
      if (aBias == exports$1.LEAST_UPPER_BOUND) {
        return mid;
      }
      return aLow < 0 ? -1 : aLow;
    }
    exports$1.search = function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1;
      }
      let index = recursiveSearch(
        -1,
        aHaystack.length,
        aNeedle,
        aHaystack,
        aCompare,
        aBias || exports$1.GREATEST_LOWER_BOUND
      );
      if (index < 0) {
        return -1;
      }
      while (index - 1 >= 0) {
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
          break;
        }
        --index;
      }
      return index;
    };
  })(binarySearch);
  return binarySearch;
}
var readWasm = { exports: {} };
var hasRequiredReadWasm;
function requireReadWasm() {
  if (hasRequiredReadWasm) return readWasm.exports;
  hasRequiredReadWasm = 1;
  const fs = require$$0$1;
  const path = require$$2;
  readWasm.exports = function readWasm2() {
    return new Promise((resolve, reject) => {
      const wasmPath = path.join(__dirname, "mappings.wasm");
      fs.readFile(wasmPath, null, (error, data) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(data.buffer);
      });
    });
  };
  readWasm.exports.initialize = (_) => {
    console.debug(
      "SourceMapConsumer.initialize is a no-op when running in node.js"
    );
  };
  return readWasm.exports;
}
var wasm;
var hasRequiredWasm;
function requireWasm() {
  if (hasRequiredWasm) return wasm;
  hasRequiredWasm = 1;
  const readWasm2 = requireReadWasm();
  function Mapping() {
    this.generatedLine = 0;
    this.generatedColumn = 0;
    this.lastGeneratedColumn = null;
    this.source = null;
    this.originalLine = null;
    this.originalColumn = null;
    this.name = null;
  }
  let cachedWasm = null;
  wasm = function wasm2() {
    if (cachedWasm) {
      return cachedWasm;
    }
    const callbackStack = [];
    cachedWasm = readWasm2().then((buffer) => {
      return WebAssembly.instantiate(buffer, {
        env: {
          mapping_callback(generatedLine, generatedColumn, hasLastGeneratedColumn, lastGeneratedColumn, hasOriginal, source, originalLine, originalColumn, hasName, name) {
            const mapping = new Mapping();
            mapping.generatedLine = generatedLine + 1;
            mapping.generatedColumn = generatedColumn;
            if (hasLastGeneratedColumn) {
              mapping.lastGeneratedColumn = lastGeneratedColumn - 1;
            }
            if (hasOriginal) {
              mapping.source = source;
              mapping.originalLine = originalLine + 1;
              mapping.originalColumn = originalColumn;
              if (hasName) {
                mapping.name = name;
              }
            }
            callbackStack[callbackStack.length - 1](mapping);
          },
          start_all_generated_locations_for() {
            console.time("all_generated_locations_for");
          },
          end_all_generated_locations_for() {
            console.timeEnd("all_generated_locations_for");
          },
          start_compute_column_spans() {
            console.time("compute_column_spans");
          },
          end_compute_column_spans() {
            console.timeEnd("compute_column_spans");
          },
          start_generated_location_for() {
            console.time("generated_location_for");
          },
          end_generated_location_for() {
            console.timeEnd("generated_location_for");
          },
          start_original_location_for() {
            console.time("original_location_for");
          },
          end_original_location_for() {
            console.timeEnd("original_location_for");
          },
          start_parse_mappings() {
            console.time("parse_mappings");
          },
          end_parse_mappings() {
            console.timeEnd("parse_mappings");
          },
          start_sort_by_generated_location() {
            console.time("sort_by_generated_location");
          },
          end_sort_by_generated_location() {
            console.timeEnd("sort_by_generated_location");
          },
          start_sort_by_original_location() {
            console.time("sort_by_original_location");
          },
          end_sort_by_original_location() {
            console.timeEnd("sort_by_original_location");
          }
        }
      });
    }).then((Wasm) => {
      return {
        exports: Wasm.instance.exports,
        withMappingCallback: (mappingCallback, f) => {
          callbackStack.push(mappingCallback);
          try {
            f();
          } finally {
            callbackStack.pop();
          }
        }
      };
    }).then(null, (e) => {
      cachedWasm = null;
      throw e;
    });
    return cachedWasm;
  };
  return wasm;
}
var hasRequiredSourceMapConsumer;
function requireSourceMapConsumer() {
  if (hasRequiredSourceMapConsumer) return sourceMapConsumer;
  hasRequiredSourceMapConsumer = 1;
  const util2 = requireUtil();
  const binarySearch2 = requireBinarySearch();
  const ArraySet = requireArraySet().ArraySet;
  requireBase64Vlq();
  const readWasm2 = requireReadWasm();
  const wasm2 = requireWasm();
  const INTERNAL = /* @__PURE__ */ Symbol("smcInternal");
  class SourceMapConsumer {
    constructor(aSourceMap, aSourceMapURL) {
      if (aSourceMap == INTERNAL) {
        return Promise.resolve(this);
      }
      return _factory(aSourceMap, aSourceMapURL);
    }
    static initialize(opts) {
      readWasm2.initialize(opts["lib/mappings.wasm"]);
    }
    static fromSourceMap(aSourceMap, aSourceMapURL) {
      return _factoryBSM(aSourceMap, aSourceMapURL);
    }
    /**
     * Construct a new `SourceMapConsumer` from `rawSourceMap` and `sourceMapUrl`
     * (see the `SourceMapConsumer` constructor for details. Then, invoke the `async
     * function f(SourceMapConsumer) -> T` with the newly constructed consumer, wait
     * for `f` to complete, call `destroy` on the consumer, and return `f`'s return
     * value.
     *
     * You must not use the consumer after `f` completes!
     *
     * By using `with`, you do not have to remember to manually call `destroy` on
     * the consumer, since it will be called automatically once `f` completes.
     *
     * ```js
     * const xSquared = await SourceMapConsumer.with(
     *   myRawSourceMap,
     *   null,
     *   async function (consumer) {
     *     // Use `consumer` inside here and don't worry about remembering
     *     // to call `destroy`.
     *
     *     const x = await whatever(consumer);
     *     return x * x;
     *   }
     * );
     *
     * // You may not use that `consumer` anymore out here; it has
     * // been destroyed. But you can use `xSquared`.
     * console.log(xSquared);
     * ```
     */
    static async with(rawSourceMap, sourceMapUrl, f) {
      const consumer = await new SourceMapConsumer(rawSourceMap, sourceMapUrl);
      try {
        return await f(consumer);
      } finally {
        consumer.destroy();
      }
    }
    /**
     * Iterate over each mapping between an original source/line/column and a
     * generated line/column in this source map.
     *
     * @param Function aCallback
     *        The function that is called with each mapping.
     * @param Object aContext
     *        Optional. If specified, this object will be the value of `this` every
     *        time that `aCallback` is called.
     * @param aOrder
     *        Either `SourceMapConsumer.GENERATED_ORDER` or
     *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
     *        iterate over the mappings sorted by the generated file's line/column
     *        order or the original's source/line/column order, respectively. Defaults to
     *        `SourceMapConsumer.GENERATED_ORDER`.
     */
    eachMapping(aCallback, aContext, aOrder) {
      throw new Error("Subclasses must implement eachMapping");
    }
    /**
     * Returns all generated line and column information for the original source,
     * line, and column provided. If no column is provided, returns all mappings
     * corresponding to a either the line we are searching for or the next
     * closest line that has any mappings. Otherwise, returns all mappings
     * corresponding to the given line and either the column we are searching for
     * or the next closest column that has any offsets.
     *
     * The only argument is an object with the following properties:
     *
     *   - source: The filename of the original source.
     *   - line: The line number in the original source.  The line number is 1-based.
     *   - column: Optional. the column number in the original source.
     *    The column number is 0-based.
     *
     * and an array of objects is returned, each with the following properties:
     *
     *   - line: The line number in the generated source, or null.  The
     *    line number is 1-based.
     *   - column: The column number in the generated source, or null.
     *    The column number is 0-based.
     */
    allGeneratedPositionsFor(aArgs) {
      throw new Error("Subclasses must implement allGeneratedPositionsFor");
    }
    destroy() {
      throw new Error("Subclasses must implement destroy");
    }
  }
  SourceMapConsumer.prototype._version = 3;
  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;
  SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
  SourceMapConsumer.LEAST_UPPER_BOUND = 2;
  sourceMapConsumer.SourceMapConsumer = SourceMapConsumer;
  class BasicSourceMapConsumer extends SourceMapConsumer {
    constructor(aSourceMap, aSourceMapURL) {
      return super(INTERNAL).then((that) => {
        let sourceMap2 = aSourceMap;
        if (typeof aSourceMap === "string") {
          sourceMap2 = util2.parseSourceMapInput(aSourceMap);
        }
        const version = util2.getArg(sourceMap2, "version");
        const sources = util2.getArg(sourceMap2, "sources").map(String);
        const names = util2.getArg(sourceMap2, "names", []);
        const sourceRoot = util2.getArg(sourceMap2, "sourceRoot", null);
        const sourcesContent = util2.getArg(sourceMap2, "sourcesContent", null);
        const mappings = util2.getArg(sourceMap2, "mappings");
        const file = util2.getArg(sourceMap2, "file", null);
        const x_google_ignoreList = util2.getArg(
          sourceMap2,
          "x_google_ignoreList",
          null
        );
        if (version != that._version) {
          throw new Error("Unsupported version: " + version);
        }
        that._sourceLookupCache = /* @__PURE__ */ new Map();
        that._names = ArraySet.fromArray(names.map(String), true);
        that._sources = ArraySet.fromArray(sources, true);
        that._absoluteSources = ArraySet.fromArray(
          that._sources.toArray().map(function(s) {
            return util2.computeSourceURL(sourceRoot, s, aSourceMapURL);
          }),
          true
        );
        that.sourceRoot = sourceRoot;
        that.sourcesContent = sourcesContent;
        that._mappings = mappings;
        that._sourceMapURL = aSourceMapURL;
        that.file = file;
        that.x_google_ignoreList = x_google_ignoreList;
        that._computedColumnSpans = false;
        that._mappingsPtr = 0;
        that._wasm = null;
        return wasm2().then((w) => {
          that._wasm = w;
          return that;
        });
      });
    }
    /**
     * Utility function to find the index of a source.  Returns -1 if not
     * found.
     */
    _findSourceIndex(aSource) {
      const cachedIndex = this._sourceLookupCache.get(aSource);
      if (typeof cachedIndex === "number") {
        return cachedIndex;
      }
      const sourceAsMapRelative = util2.computeSourceURL(
        null,
        aSource,
        this._sourceMapURL
      );
      if (this._absoluteSources.has(sourceAsMapRelative)) {
        const index = this._absoluteSources.indexOf(sourceAsMapRelative);
        this._sourceLookupCache.set(aSource, index);
        return index;
      }
      const sourceAsSourceRootRelative = util2.computeSourceURL(
        this.sourceRoot,
        aSource,
        this._sourceMapURL
      );
      if (this._absoluteSources.has(sourceAsSourceRootRelative)) {
        const index = this._absoluteSources.indexOf(sourceAsSourceRootRelative);
        this._sourceLookupCache.set(aSource, index);
        return index;
      }
      return -1;
    }
    /**
     * Create a BasicSourceMapConsumer from a SourceMapGenerator.
     *
     * @param SourceMapGenerator aSourceMap
     *        The source map that will be consumed.
     * @param String aSourceMapURL
     *        The URL at which the source map can be found (optional)
     * @returns BasicSourceMapConsumer
     */
    static fromSourceMap(aSourceMap, aSourceMapURL) {
      return new BasicSourceMapConsumer(aSourceMap.toString());
    }
    get sources() {
      return this._absoluteSources.toArray();
    }
    _getMappingsPtr() {
      if (this._mappingsPtr === 0) {
        this._parseMappings();
      }
      return this._mappingsPtr;
    }
    /**
     * Parse the mappings in a string in to a data structure which we can easily
     * query (the ordered arrays in the `this.__generatedMappings` and
     * `this.__originalMappings` properties).
     */
    _parseMappings() {
      const aStr = this._mappings;
      const size = aStr.length;
      const mappingsBufPtr = this._wasm.exports.allocate_mappings(size) >>> 0;
      const mappingsBuf = new Uint8Array(
        this._wasm.exports.memory.buffer,
        mappingsBufPtr,
        size
      );
      for (let i = 0; i < size; i++) {
        mappingsBuf[i] = aStr.charCodeAt(i);
      }
      const mappingsPtr = this._wasm.exports.parse_mappings(mappingsBufPtr);
      if (!mappingsPtr) {
        const error = this._wasm.exports.get_last_error();
        let msg = `Error parsing mappings (code ${error}): `;
        switch (error) {
          case 1:
            msg += "the mappings contained a negative line, column, source index, or name index";
            break;
          case 2:
            msg += "the mappings contained a number larger than 2**32";
            break;
          case 3:
            msg += "reached EOF while in the middle of parsing a VLQ";
            break;
          case 4:
            msg += "invalid base 64 character while parsing a VLQ";
            break;
          default:
            msg += "unknown error code";
            break;
        }
        throw new Error(msg);
      }
      this._mappingsPtr = mappingsPtr;
    }
    eachMapping(aCallback, aContext, aOrder) {
      const context = aContext || null;
      const order = aOrder || SourceMapConsumer.GENERATED_ORDER;
      this._wasm.withMappingCallback(
        (mapping) => {
          if (mapping.source !== null) {
            mapping.source = this._absoluteSources.at(mapping.source);
            if (mapping.name !== null) {
              mapping.name = this._names.at(mapping.name);
            }
          }
          if (this._computedColumnSpans && mapping.lastGeneratedColumn === null) {
            mapping.lastGeneratedColumn = Infinity;
          }
          aCallback.call(context, mapping);
        },
        () => {
          switch (order) {
            case SourceMapConsumer.GENERATED_ORDER:
              this._wasm.exports.by_generated_location(this._getMappingsPtr());
              break;
            case SourceMapConsumer.ORIGINAL_ORDER:
              this._wasm.exports.by_original_location(this._getMappingsPtr());
              break;
            default:
              throw new Error("Unknown order of iteration.");
          }
        }
      );
    }
    allGeneratedPositionsFor(aArgs) {
      let source = util2.getArg(aArgs, "source");
      const originalLine = util2.getArg(aArgs, "line");
      const originalColumn = aArgs.column || 0;
      source = this._findSourceIndex(source);
      if (source < 0) {
        return [];
      }
      if (originalLine < 1) {
        throw new Error("Line numbers must be >= 1");
      }
      if (originalColumn < 0) {
        throw new Error("Column numbers must be >= 0");
      }
      const mappings = [];
      this._wasm.withMappingCallback(
        (m) => {
          let lastColumn = m.lastGeneratedColumn;
          if (this._computedColumnSpans && lastColumn === null) {
            lastColumn = Infinity;
          }
          mappings.push({
            line: m.generatedLine,
            column: m.generatedColumn,
            lastColumn
          });
        },
        () => {
          this._wasm.exports.all_generated_locations_for(
            this._getMappingsPtr(),
            source,
            originalLine - 1,
            "column" in aArgs,
            originalColumn
          );
        }
      );
      return mappings;
    }
    destroy() {
      if (this._mappingsPtr !== 0) {
        this._wasm.exports.free_mappings(this._mappingsPtr);
        this._mappingsPtr = 0;
      }
    }
    /**
     * Compute the last column for each generated mapping. The last column is
     * inclusive.
     */
    computeColumnSpans() {
      if (this._computedColumnSpans) {
        return;
      }
      this._wasm.exports.compute_column_spans(this._getMappingsPtr());
      this._computedColumnSpans = true;
    }
    /**
     * Returns the original source, line, and column information for the generated
     * source's line and column positions provided. The only argument is an object
     * with the following properties:
     *
     *   - line: The line number in the generated source.  The line number
     *     is 1-based.
     *   - column: The column number in the generated source.  The column
     *     number is 0-based.
     *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
     *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
     *     closest element that is smaller than or greater than the one we are
     *     searching for, respectively, if the exact element cannot be found.
     *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
     *
     * and an object is returned with the following properties:
     *
     *   - source: The original source file, or null.
     *   - line: The line number in the original source, or null.  The
     *     line number is 1-based.
     *   - column: The column number in the original source, or null.  The
     *     column number is 0-based.
     *   - name: The original identifier, or null.
     */
    originalPositionFor(aArgs) {
      const needle = {
        generatedLine: util2.getArg(aArgs, "line"),
        generatedColumn: util2.getArg(aArgs, "column")
      };
      if (needle.generatedLine < 1) {
        throw new Error("Line numbers must be >= 1");
      }
      if (needle.generatedColumn < 0) {
        throw new Error("Column numbers must be >= 0");
      }
      let bias = util2.getArg(
        aArgs,
        "bias",
        SourceMapConsumer.GREATEST_LOWER_BOUND
      );
      if (bias == null) {
        bias = SourceMapConsumer.GREATEST_LOWER_BOUND;
      }
      let mapping;
      this._wasm.withMappingCallback(
        (m) => mapping = m,
        () => {
          this._wasm.exports.original_location_for(
            this._getMappingsPtr(),
            needle.generatedLine - 1,
            needle.generatedColumn,
            bias
          );
        }
      );
      if (mapping) {
        if (mapping.generatedLine === needle.generatedLine) {
          let source = util2.getArg(mapping, "source", null);
          if (source !== null) {
            source = this._absoluteSources.at(source);
          }
          let name = util2.getArg(mapping, "name", null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source,
            line: util2.getArg(mapping, "originalLine", null),
            column: util2.getArg(mapping, "originalColumn", null),
            name
          };
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }
    /**
     * Return true if we have the source content for every source in the source
     * map, false otherwise.
     */
    hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
      });
    }
    /**
     * Returns the original source content. The only argument is the url of the
     * original source file. Returns null if no original source content is
     * available.
     */
    sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }
      const index = this._findSourceIndex(aSource);
      if (index >= 0) {
        return this.sourcesContent[index];
      }
      if (nullOnMissing) {
        return null;
      }
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
    /**
     * Returns the generated line and column information for the original source,
     * line, and column positions provided. The only argument is an object with
     * the following properties:
     *
     *   - source: The filename of the original source.
     *   - line: The line number in the original source.  The line number
     *     is 1-based.
     *   - column: The column number in the original source.  The column
     *     number is 0-based.
     *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
     *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
     *     closest element that is smaller than or greater than the one we are
     *     searching for, respectively, if the exact element cannot be found.
     *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
     *
     * and an object is returned with the following properties:
     *
     *   - line: The line number in the generated source, or null.  The
     *     line number is 1-based.
     *   - column: The column number in the generated source, or null.
     *     The column number is 0-based.
     */
    generatedPositionFor(aArgs) {
      let source = util2.getArg(aArgs, "source");
      source = this._findSourceIndex(source);
      if (source < 0) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
      const needle = {
        source,
        originalLine: util2.getArg(aArgs, "line"),
        originalColumn: util2.getArg(aArgs, "column")
      };
      if (needle.originalLine < 1) {
        throw new Error("Line numbers must be >= 1");
      }
      if (needle.originalColumn < 0) {
        throw new Error("Column numbers must be >= 0");
      }
      let bias = util2.getArg(
        aArgs,
        "bias",
        SourceMapConsumer.GREATEST_LOWER_BOUND
      );
      if (bias == null) {
        bias = SourceMapConsumer.GREATEST_LOWER_BOUND;
      }
      let mapping;
      this._wasm.withMappingCallback(
        (m) => mapping = m,
        () => {
          this._wasm.exports.generated_location_for(
            this._getMappingsPtr(),
            needle.source,
            needle.originalLine - 1,
            needle.originalColumn,
            bias
          );
        }
      );
      if (mapping) {
        if (mapping.source === needle.source) {
          let lastColumn = mapping.lastGeneratedColumn;
          if (this._computedColumnSpans && lastColumn === null) {
            lastColumn = Infinity;
          }
          return {
            line: util2.getArg(mapping, "generatedLine", null),
            column: util2.getArg(mapping, "generatedColumn", null),
            lastColumn
          };
        }
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }
  }
  BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
  sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;
  class IndexedSourceMapConsumer extends SourceMapConsumer {
    constructor(aSourceMap, aSourceMapURL) {
      return super(INTERNAL).then((that) => {
        let sourceMap2 = aSourceMap;
        if (typeof aSourceMap === "string") {
          sourceMap2 = util2.parseSourceMapInput(aSourceMap);
        }
        const version = util2.getArg(sourceMap2, "version");
        const sections = util2.getArg(sourceMap2, "sections");
        if (version != that._version) {
          throw new Error("Unsupported version: " + version);
        }
        let lastOffset = {
          line: -1,
          column: 0
        };
        return Promise.all(
          sections.map((s) => {
            if (s.url) {
              throw new Error(
                "Support for url field in sections not implemented."
              );
            }
            const offset = util2.getArg(s, "offset");
            const offsetLine = util2.getArg(offset, "line");
            const offsetColumn = util2.getArg(offset, "column");
            if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
              throw new Error(
                "Section offsets must be ordered and non-overlapping."
              );
            }
            lastOffset = offset;
            const cons = new SourceMapConsumer(
              util2.getArg(s, "map"),
              aSourceMapURL
            );
            return cons.then((consumer) => {
              return {
                generatedOffset: {
                  // The offset fields are 0-based, but we use 1-based indices when
                  // encoding/decoding from VLQ.
                  generatedLine: offsetLine + 1,
                  generatedColumn: offsetColumn + 1
                },
                consumer
              };
            });
          })
        ).then((s) => {
          that._sections = s;
          return that;
        });
      });
    }
    /**
     * The list of original sources.
     */
    get sources() {
      const sources = [];
      for (let i = 0; i < this._sections.length; i++) {
        for (let j = 0; j < this._sections[i].consumer.sources.length; j++) {
          sources.push(this._sections[i].consumer.sources[j]);
        }
      }
      return sources;
    }
    /**
     * Returns the original source, line, and column information for the generated
     * source's line and column positions provided. The only argument is an object
     * with the following properties:
     *
     *   - line: The line number in the generated source.  The line number
     *     is 1-based.
     *   - column: The column number in the generated source.  The column
     *     number is 0-based.
     *
     * and an object is returned with the following properties:
     *
     *   - source: The original source file, or null.
     *   - line: The line number in the original source, or null.  The
     *     line number is 1-based.
     *   - column: The column number in the original source, or null.  The
     *     column number is 0-based.
     *   - name: The original identifier, or null.
     */
    originalPositionFor(aArgs) {
      const needle = {
        generatedLine: util2.getArg(aArgs, "line"),
        generatedColumn: util2.getArg(aArgs, "column")
      };
      const sectionIndex = binarySearch2.search(
        needle,
        this._sections,
        function(aNeedle, section2) {
          const cmp = aNeedle.generatedLine - section2.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }
          return aNeedle.generatedColumn - (section2.generatedOffset.generatedColumn - 1);
        }
      );
      const section = this._sections[sectionIndex];
      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }
      return section.consumer.originalPositionFor({
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
      });
    }
    /**
     * Return true if we have the source content for every source in the source
     * map, false otherwise.
     */
    hasContentsOfAllSources() {
      return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources();
      });
    }
    /**
     * Returns the original source content. The only argument is the url of the
     * original source file. Returns null if no original source content is
     * available.
     */
    sourceContentFor(aSource, nullOnMissing) {
      for (let i = 0; i < this._sections.length; i++) {
        const section = this._sections[i];
        const content = section.consumer.sourceContentFor(aSource, true);
        if (content) {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      }
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
    _findSectionIndex(source) {
      for (let i = 0; i < this._sections.length; i++) {
        const { consumer } = this._sections[i];
        if (consumer._findSourceIndex(source) !== -1) {
          return i;
        }
      }
      return -1;
    }
    /**
     * Returns the generated line and column information for the original source,
     * line, and column positions provided. The only argument is an object with
     * the following properties:
     *
     *   - source: The filename of the original source.
     *   - line: The line number in the original source.  The line number
     *     is 1-based.
     *   - column: The column number in the original source.  The column
     *     number is 0-based.
     *
     * and an object is returned with the following properties:
     *
     *   - line: The line number in the generated source, or null.  The
     *     line number is 1-based.
     *   - column: The column number in the generated source, or null.
     *     The column number is 0-based.
     */
    generatedPositionFor(aArgs) {
      const index = this._findSectionIndex(util2.getArg(aArgs, "source"));
      const section = index >= 0 ? this._sections[index] : null;
      const nextSection = index >= 0 && index + 1 < this._sections.length ? this._sections[index + 1] : null;
      const generatedPosition = section && section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition && generatedPosition.line !== null) {
        const lineShift = section.generatedOffset.generatedLine - 1;
        const columnShift = section.generatedOffset.generatedColumn - 1;
        if (generatedPosition.line === 1) {
          generatedPosition.column += columnShift;
          if (typeof generatedPosition.lastColumn === "number") {
            generatedPosition.lastColumn += columnShift;
          }
        }
        if (generatedPosition.lastColumn === Infinity && nextSection && generatedPosition.line === nextSection.generatedOffset.generatedLine) {
          generatedPosition.lastColumn = nextSection.generatedOffset.generatedColumn - 2;
        }
        generatedPosition.line += lineShift;
        return generatedPosition;
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }
    allGeneratedPositionsFor(aArgs) {
      const index = this._findSectionIndex(util2.getArg(aArgs, "source"));
      const section = index >= 0 ? this._sections[index] : null;
      const nextSection = index >= 0 && index + 1 < this._sections.length ? this._sections[index + 1] : null;
      if (!section) return [];
      return section.consumer.allGeneratedPositionsFor(aArgs).map((generatedPosition) => {
        const lineShift = section.generatedOffset.generatedLine - 1;
        const columnShift = section.generatedOffset.generatedColumn - 1;
        if (generatedPosition.line === 1) {
          generatedPosition.column += columnShift;
          if (typeof generatedPosition.lastColumn === "number") {
            generatedPosition.lastColumn += columnShift;
          }
        }
        if (generatedPosition.lastColumn === Infinity && nextSection && generatedPosition.line === nextSection.generatedOffset.generatedLine) {
          generatedPosition.lastColumn = nextSection.generatedOffset.generatedColumn - 2;
        }
        generatedPosition.line += lineShift;
        return generatedPosition;
      });
    }
    eachMapping(aCallback, aContext, aOrder) {
      this._sections.forEach((section, index) => {
        const nextSection = index + 1 < this._sections.length ? this._sections[index + 1] : null;
        const { generatedOffset } = section;
        const lineShift = generatedOffset.generatedLine - 1;
        const columnShift = generatedOffset.generatedColumn - 1;
        section.consumer.eachMapping(
          function(mapping) {
            if (mapping.generatedLine === 1) {
              mapping.generatedColumn += columnShift;
              if (typeof mapping.lastGeneratedColumn === "number") {
                mapping.lastGeneratedColumn += columnShift;
              }
            }
            if (mapping.lastGeneratedColumn === Infinity && nextSection && mapping.generatedLine === nextSection.generatedOffset.generatedLine) {
              mapping.lastGeneratedColumn = nextSection.generatedOffset.generatedColumn - 2;
            }
            mapping.generatedLine += lineShift;
            aCallback.call(this, mapping);
          },
          aContext,
          aOrder
        );
      });
    }
    computeColumnSpans() {
      for (let i = 0; i < this._sections.length; i++) {
        this._sections[i].consumer.computeColumnSpans();
      }
    }
    destroy() {
      for (let i = 0; i < this._sections.length; i++) {
        this._sections[i].consumer.destroy();
      }
    }
  }
  sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
  function _factory(aSourceMap, aSourceMapURL) {
    let sourceMap2 = aSourceMap;
    if (typeof aSourceMap === "string") {
      sourceMap2 = util2.parseSourceMapInput(aSourceMap);
    }
    const consumer = sourceMap2.sections != null ? new IndexedSourceMapConsumer(sourceMap2, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap2, aSourceMapURL);
    return Promise.resolve(consumer);
  }
  function _factoryBSM(aSourceMap, aSourceMapURL) {
    return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
  }
  return sourceMapConsumer;
}
var sourceNode = {};
var hasRequiredSourceNode;
function requireSourceNode() {
  if (hasRequiredSourceNode) return sourceNode;
  hasRequiredSourceNode = 1;
  const SourceMapGenerator = requireSourceMapGenerator().SourceMapGenerator;
  const util2 = requireUtil();
  const REGEX_NEWLINE = /(\r?\n)/;
  const NEWLINE_CODE = 10;
  const isSourceNode = "$$$isSourceNode$$$";
  class SourceNode {
    constructor(aLine, aColumn, aSource, aChunks, aName) {
      this.children = [];
      this.sourceContents = {};
      this.line = aLine == null ? null : aLine;
      this.column = aColumn == null ? null : aColumn;
      this.source = aSource == null ? null : aSource;
      this.name = aName == null ? null : aName;
      this[isSourceNode] = true;
      if (aChunks != null) this.add(aChunks);
    }
    /**
     * Creates a SourceNode from generated code and a SourceMapConsumer.
     *
     * @param aGeneratedCode The generated code
     * @param aSourceMapConsumer The SourceMap for the generated code
     * @param aRelativePath Optional. The path that relative sources in the
     *        SourceMapConsumer should be relative to.
     */
    static fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      const node = new SourceNode();
      const remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      let remainingLinesIndex = 0;
      const shiftNextLine = function() {
        const lineContents = getNextLine();
        const newLine = getNextLine() || "";
        return lineContents + newLine;
        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
        }
      };
      let lastGeneratedLine = 1, lastGeneratedColumn = 0;
      let lastMapping = null;
      let nextLine;
      aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
          if (lastGeneratedLine < mapping.generatedLine) {
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
          } else {
            nextLine = remainingLines[remainingLinesIndex] || "";
            const code = nextLine.substr(
              0,
              mapping.generatedColumn - lastGeneratedColumn
            );
            remainingLines[remainingLinesIndex] = nextLine.substr(
              mapping.generatedColumn - lastGeneratedColumn
            );
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            lastMapping = mapping;
            return;
          }
        }
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          nextLine = remainingLines[remainingLinesIndex] || "";
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(
            mapping.generatedColumn
          );
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
      }
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        const content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util2.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });
      return node;
      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === void 0) {
          node.add(code);
        } else {
          const source = aRelativePath ? util2.join(aRelativePath, mapping.source) : mapping.source;
          node.add(
            new SourceNode(
              mapping.originalLine,
              mapping.originalColumn,
              source,
              code,
              mapping.name
            )
          );
        }
      }
    }
    /**
     * Add a chunk of generated JS to this source node.
     *
     * @param aChunk A string snippet of generated JS code, another instance of
     *        SourceNode, or an array where each member is one of those things.
     */
    add(aChunk) {
      if (Array.isArray(aChunk)) {
        aChunk.forEach(function(chunk) {
          this.add(chunk);
        }, this);
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) {
          this.children.push(aChunk);
        }
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    }
    /**
     * Add a chunk of generated JS to the beginning of this source node.
     *
     * @param aChunk A string snippet of generated JS code, another instance of
     *        SourceNode, or an array where each member is one of those things.
     */
    prepend(aChunk) {
      if (Array.isArray(aChunk)) {
        for (let i = aChunk.length - 1; i >= 0; i--) {
          this.prepend(aChunk[i]);
        }
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        this.children.unshift(aChunk);
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    }
    /**
     * Walk over the tree of JS snippets in this node and its children. The
     * walking function is called once for each snippet of JS and is passed that
     * snippet and the its original associated source's line/column location.
     *
     * @param aFn The traversal function.
     */
    walk(aFn) {
      let chunk;
      for (let i = 0, len = this.children.length; i < len; i++) {
        chunk = this.children[i];
        if (chunk[isSourceNode]) {
          chunk.walk(aFn);
        } else if (chunk !== "") {
          aFn(chunk, {
            source: this.source,
            line: this.line,
            column: this.column,
            name: this.name
          });
        }
      }
    }
    /**
     * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
     * each of `this.children`.
     *
     * @param aSep The separator.
     */
    join(aSep) {
      let newChildren;
      let i;
      const len = this.children.length;
      if (len > 0) {
        newChildren = [];
        for (i = 0; i < len - 1; i++) {
          newChildren.push(this.children[i]);
          newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
      }
      return this;
    }
    /**
     * Call String.prototype.replace on the very right-most source snippet. Useful
     * for trimming whitespace from the end of a source node, etc.
     *
     * @param aPattern The pattern to replace.
     * @param aReplacement The thing to replace the pattern with.
     */
    replaceRight(aPattern, aReplacement) {
      const lastChild = this.children[this.children.length - 1];
      if (lastChild[isSourceNode]) {
        lastChild.replaceRight(aPattern, aReplacement);
      } else if (typeof lastChild === "string") {
        this.children[this.children.length - 1] = lastChild.replace(
          aPattern,
          aReplacement
        );
      } else {
        this.children.push("".replace(aPattern, aReplacement));
      }
      return this;
    }
    /**
     * Set the source content for a source file. This will be added to the SourceMapGenerator
     * in the sourcesContent field.
     *
     * @param aSourceFile The filename of the source file
     * @param aSourceContent The content of the source file
     */
    setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util2.toSetString(aSourceFile)] = aSourceContent;
    }
    /**
     * Walk over the tree of SourceNodes. The walking function is called for each
     * source file content and is passed the filename and source content.
     *
     * @param aFn The traversal function.
     */
    walkSourceContents(aFn) {
      for (let i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }
      const sources = Object.keys(this.sourceContents);
      for (let i = 0, len = sources.length; i < len; i++) {
        aFn(util2.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    }
    /**
     * Return the string representation of this source node. Walks over the tree
     * and concatenates all the various snippets together to one string.
     */
    toString() {
      let str = "";
      this.walk(function(chunk) {
        str += chunk;
      });
      return str;
    }
    /**
     * Returns the string representation of this source node along with a source
     * map.
     */
    toStringWithSourceMap(aArgs) {
      const generated = {
        code: "",
        line: 1,
        column: 0
      };
      const map = new SourceMapGenerator(aArgs);
      let sourceMappingActive = false;
      let lastOriginalSource = null;
      let lastOriginalLine = null;
      let lastOriginalColumn = null;
      let lastOriginalName = null;
      this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
          if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
          lastOriginalSource = original.source;
          lastOriginalLine = original.line;
          lastOriginalColumn = original.column;
          lastOriginalName = original.name;
          sourceMappingActive = true;
        } else if (sourceMappingActive) {
          map.addMapping({
            generated: {
              line: generated.line,
              column: generated.column
            }
          });
          lastOriginalSource = null;
          sourceMappingActive = false;
        }
        for (let idx = 0, length = chunk.length; idx < length; idx++) {
          if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            if (idx + 1 === length) {
              lastOriginalSource = null;
              sourceMappingActive = false;
            } else if (sourceMappingActive) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
          } else {
            generated.column++;
          }
        }
      });
      this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
      });
      return { code: generated.code, map };
    }
  }
  sourceNode.SourceNode = SourceNode;
  return sourceNode;
}
var hasRequiredSourceMap;
function requireSourceMap() {
  if (hasRequiredSourceMap) return sourceMap;
  hasRequiredSourceMap = 1;
  sourceMap.SourceMapGenerator = requireSourceMapGenerator().SourceMapGenerator;
  sourceMap.SourceMapConsumer = requireSourceMapConsumer().SourceMapConsumer;
  sourceMap.SourceNode = requireSourceNode().SourceNode;
  return sourceMap;
}
var sourceMapExports = requireSourceMap();
export {
  sourceMapExports as s
};

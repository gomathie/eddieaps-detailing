var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// ../node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
__name(PerformanceEntry, "PerformanceEntry");
var PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
}, "PerformanceMark");
var PerformanceMeasure = class extends PerformanceEntry {
  entryType = "measure";
};
__name(PerformanceMeasure, "PerformanceMeasure");
var PerformanceResourceTiming = class extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
__name(PerformanceResourceTiming, "PerformanceResourceTiming");
var PerformanceObserverEntryList = class {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
__name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
var Performance = class {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e2) => e2.name !== markName) : this._entries.filter((e2) => e2.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e2) => e2.name !== measureName) : this._entries.filter((e2) => e2.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e2) => e2.entryType !== "resource" || e2.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e2) => e2.name === name && (!type || e2.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e2) => e2.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
__name(Performance, "Performance");
var PerformanceObserver = class {
  __unenv__ = true;
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
__name(PerformanceObserver, "PerformanceObserver");
__publicField(PerformanceObserver, "supportedEntryTypes", []);
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream = class extends Socket {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  isRaw = false;
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
  isTTY = false;
};
__name(ReadStream, "ReadStream");

// ../node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream = class extends Socket2 {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  columns = 80;
  rows = 24;
  isTTY = false;
};
__name(WriteStream, "WriteStream");

// ../node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return "";
  }
  get versions() {
    return {};
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
__name(Process, "Process");

// ../node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// _worker.js/index.js
import { Buffer as t } from "node:buffer";
import { m as e, r as a, u as i } from "./chunks/_/nitro.mjs";
import { setImmediate as s, clearImmediate as p } from "node:timers";
import "node:events";
import "cloudflare:workers";
globalThis._importMeta_ = { url: "file:///_entry.js", env: {} };
"global" in globalThis || (globalThis.global = globalThis);
var m = globalThis.process;
globalThis.process = m ? new Proxy(m, { get: (t2, a2, i2) => Reflect.has(t2, a2) ? Reflect.get(t2, a2, i2) : Reflect.get(e, a2, i2) }) : e, globalThis.Buffer || (globalThis.Buffer = t), globalThis.setImmediate || (globalThis.setImmediate = s), globalThis.clearImmediate || (globalThis.clearImmediate = p);
var n = { "/favicon.ico": { type: "image/vnd.microsoft.icon", etag: '"47e-q0CQQlyEhCsf/YiMPpytpv09/4I"', mtime: "2026-07-23T20:54:55.677Z", size: 1150, path: "../favicon.ico" }, "/logo-dark.svg": { type: "image/svg+xml", etag: '"9f3d-T36uHfTh7lxn/3cLGkoKjOEFEpU"', mtime: "2026-08-19T17:55:39.576Z", size: 40765, path: "../logo-dark.svg" }, "/index.html": { type: "text/html;charset=utf-8", etag: '"a225-fQtfBGX03lCX9devWpJy/o71FWM"', mtime: "2026-08-19T18:23:07.087Z", size: 41509, path: "../index.html" }, "/logo-light.svg": { type: "image/svg+xml", etag: '"9f3e-PYqex1nQyoADrOgVlAmIWK9j9n0"', mtime: "2026-08-19T16:34:11.418Z", size: 40766, path: "../logo-light.svg" }, "/sitemap.xml": { type: "application/xml", etag: '"1d99-0zurOnQxITAtZ+EaZfCL7Dlg8Uo"', mtime: "2026-08-19T18:23:07.747Z", size: 7577, path: "../sitemap.xml" }, "/og-image.png": { type: "image/png", etag: '"13e56-M83waQQHmTnDGOjEzrMfJgNhonY"', mtime: "2026-08-19T17:54:35.713Z", size: 81494, path: "../og-image.png" }, "/logo-wordmark-dark.svg": { type: "image/svg+xml", etag: '"a7f6-7oeqxCQRZ1wlQubVbuVK8f42xq8"', mtime: "2026-08-19T17:56:00.665Z", size: 42998, path: "../logo-wordmark-dark.svg" }, "/logo-wordmark-light.svg": { type: "image/svg+xml", etag: '"a7f7-keY+yYu5UHy+H+40MDXwuhKzBko"', mtime: "2026-08-19T16:34:11.522Z", size: 42999, path: "../logo-wordmark-light.svg" }, "/_robots.txt": { type: "text/plain; charset=utf-8", etag: '"18-j8OIsL9qGDmNZ+lHhp2tyH4XtaE"', mtime: "2026-06-22T08:48:57.000Z", size: 24, path: "../_robots.txt" }, "/nitro.json": { type: "application/json", etag: '"f7-BD4/x/uLFwDQvq2aq3ufeqnvKrg"', mtime: "2026-08-19T18:23:05.744Z", size: 247, path: "../nitro.json" }, "/book/index.html": { type: "text/html;charset=utf-8", etag: '"4adb-hlp9oSpwwMi933Mvs6ReBeyvJJ4"', mtime: "2026-08-19T18:23:07.039Z", size: 19163, path: "../book/index.html" }, "/book/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-gRDGP8pBRBStqSlQPTmzFfZFTZY"', mtime: "2026-08-19T18:23:07.190Z", size: 69, path: "../book/_payload.json" }, "/_payload.json": { type: "application/json;charset=utf-8", etag: '"773-4ddr02mY5+zA7HGnzdO1XM3rqvo"', mtime: "2026-08-19T18:23:07.438Z", size: 1907, path: "../_payload.json" }, "/admin/index.html": { type: "text/html;charset=utf-8", etag: '"141f-HKwFtvlN7tlUYRpyAsP+dmzAtIA"', mtime: "2026-08-19T18:23:07.439Z", size: 5151, path: "../admin/index.html" }, "/blog/index.html": { type: "text/html;charset=utf-8", etag: '"5d89-P7O1zlPfIEhCXw4n4oGqS3hN+PA"', mtime: "2026-08-19T18:23:07.040Z", size: 23945, path: "../blog/index.html" }, "/contact/index.html": { type: "text/html;charset=utf-8", etag: '"6308-M4ATFhQhjm0kT7luDrrWtCKDGPg"', mtime: "2026-08-19T18:23:07.287Z", size: 25352, path: "../contact/index.html" }, "/contact/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-gRDGP8pBRBStqSlQPTmzFfZFTZY"', mtime: "2026-08-19T18:23:07.461Z", size: 69, path: "../contact/_payload.json" }, "/quote/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-gRDGP8pBRBStqSlQPTmzFfZFTZY"', mtime: "2026-08-19T18:23:07.287Z", size: 69, path: "../quote/_payload.json" }, "/blog/_payload.json": { type: "application/json;charset=utf-8", etag: '"77e-53X09e8UovTHX05H5MvkQqc3/4E"', mtime: "2026-08-19T18:23:07.287Z", size: 1918, path: "../blog/_payload.json" }, "/quote/index.html": { type: "text/html;charset=utf-8", etag: '"584d-cwO3pPtmxzSdcfSwUfOxoTKqFWU"', mtime: "2026-08-19T18:23:07.040Z", size: 22605, path: "../quote/index.html" }, "/about/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-gRDGP8pBRBStqSlQPTmzFfZFTZY"', mtime: "2026-08-19T18:23:07.461Z", size: 69, path: "../about/_payload.json" }, "/about/index.html": { type: "text/html;charset=utf-8", etag: '"592d-yEUJhIrjNkW3mi6Wh+Emlp6e+wI"', mtime: "2026-08-19T18:23:07.287Z", size: 22829, path: "../about/index.html" }, "/gallery/index.html": { type: "text/html;charset=utf-8", etag: '"7113-15bSTKani+p0v5WaPbnUlcFaGfY"', mtime: "2026-08-19T18:23:07.039Z", size: 28947, path: "../gallery/index.html" }, "/gallery/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-gRDGP8pBRBStqSlQPTmzFfZFTZY"', mtime: "2026-08-19T18:23:07.190Z", size: 69, path: "../gallery/_payload.json" }, "/services/index.html": { type: "text/html;charset=utf-8", etag: '"6114-ysa0L64rLvy/fsfrZ4netI1ADXs"', mtime: "2026-08-19T18:23:07.078Z", size: 24852, path: "../services/index.html" }, "/services/_payload.json": { type: "application/json;charset=utf-8", etag: '"773-9uAYFJm8jBKsii3pUYq8JPM6EMQ"', mtime: "2026-08-19T18:23:07.409Z", size: 1907, path: "../services/_payload.json" }, "/images/ceramic-coating.webp": { type: "image/webp", etag: '"19748-5UmwaJ8jHcwnPc0/+IsWAx18iTo"', mtime: "2026-07-10T09:40:07.659Z", size: 104264, path: "../images/ceramic-coating.webp" }, "/images/engine-bay.webp": { type: "image/webp", etag: '"14d52-CwJXpSmv8kj5Ema/vYTlHxKC4W0"', mtime: "2026-07-10T09:40:08.413Z", size: 85330, path: "../images/engine-bay.webp" }, "/images/complete-detailing.webp": { type: "image/webp", etag: '"19bc8-+/2gf56dIlkvmY7DlYuHYbS4BOc"', mtime: "2026-07-10T09:40:07.933Z", size: 105416, path: "../images/complete-detailing.webp" }, "/images/headlight-restoration.webp": { type: "image/webp", etag: '"3d9ac-RNBekzE4XHrIYQcAVTT0PKiZLFc"', mtime: "2026-07-10T09:40:09.315Z", size: 252332, path: "../images/headlight-restoration.webp" }, "/images/luxury-car.webp": { type: "image/webp", etag: '"f410-MgfISW29tkSMZgeGMmPAgIIGWtE"', mtime: "2026-07-10T09:40:09.614Z", size: 62480, path: "../images/luxury-car.webp" }, "/images/deep-interior.webp": { type: "image/webp", etag: '"177ae-s1mUBoW+DuL3g04lyb1dhZTVqcg"', mtime: "2026-07-10T09:40:08.176Z", size: 96174, path: "../images/deep-interior.webp" }, "/images/paint-polishing.webp": { type: "image/webp", etag: '"15fb8-1IMqUf8vxa/CUJ4KoP74W2eAW4Q"', mtime: "2026-07-10T09:40:09.822Z", size: 90040, path: "../images/paint-polishing.webp" }, "/images/wheel-detail.webp": { type: "image/webp", etag: '"18bb2-fAHS5LQuIFn/tg1NtOHwE4MLm4U"', mtime: "2026-07-10T09:40:10.057Z", size: 101298, path: "../images/wheel-detail.webp" }, "/images/hero-bmw.webp": { type: "image/webp", etag: '"37c54-tirGFb5zoztLZR2yT4O5Uzkgac0"', mtime: "2026-07-10T15:14:58.926Z", size: 228436, path: "../images/hero-bmw.webp" }, "/_nuxt/B8ga_iMR.js": { type: "text/javascript; charset=utf-8", etag: '"294e-OU6HjLLM5foa4xWm90gVvdT4YQk"', mtime: "2026-08-19T18:22:55.552Z", size: 10574, path: "../_nuxt/B8ga_iMR.js" }, "/_nuxt/B9hN82Sx.js": { type: "text/javascript; charset=utf-8", etag: '"192e-gNV08g6ch/YeD3dJ+UACU89JYoQ"', mtime: "2026-08-19T18:22:55.551Z", size: 6446, path: "../_nuxt/B9hN82Sx.js" }, "/_nuxt/B2N8IsgC.js": { type: "text/javascript; charset=utf-8", etag: '"1380-zv2p2mp8z5sxD0xdcCCbkD8hWHg"', mtime: "2026-08-19T18:22:55.553Z", size: 4992, path: "../_nuxt/B2N8IsgC.js" }, "/_nuxt/Bev7uUSu.js": { type: "text/javascript; charset=utf-8", etag: '"bf2-M/bXzxnHfZsek1P00zjX1sHZvSo"', mtime: "2026-08-19T18:22:55.551Z", size: 3058, path: "../_nuxt/Bev7uUSu.js" }, "/_nuxt/BkHJ_bdQ.js": { type: "text/javascript; charset=utf-8", etag: '"1bf-14v+A8HdiXVKrLHo1mo/t4fw+VU"', mtime: "2026-08-19T18:22:55.552Z", size: 447, path: "../_nuxt/BkHJ_bdQ.js" }, "/_nuxt/BPnrZwe-.js": { type: "text/javascript; charset=utf-8", etag: '"d2a-dnBnS6cVA8p/al//f+DbmG9UWZk"', mtime: "2026-08-19T18:22:55.551Z", size: 3370, path: "../_nuxt/BPnrZwe-.js" }, "/images/exterior-detailing.webp": { type: "image/webp", etag: '"5efda-WfYViBrGKcTWSXcpOK5WuABRckc"', mtime: "2026-07-10T09:40:08.649Z", size: 389082, path: "../images/exterior-detailing.webp" }, "/_nuxt/ByuXKEc4.js": { type: "text/javascript; charset=utf-8", etag: '"37ab-nVCaa0xbcGeTBF1+Z4pbbXTmufE"', mtime: "2026-08-19T18:22:55.553Z", size: 14251, path: "../_nuxt/ByuXKEc4.js" }, "/_nuxt/C-ChfC7P.js": { type: "text/javascript; charset=utf-8", etag: '"b8-KC3xEosfpWfBUaLN6DmEnFv1MpU"', mtime: "2026-08-19T18:22:55.552Z", size: 184, path: "../_nuxt/C-ChfC7P.js" }, "/_nuxt/Cp0l9mpl.js": { type: "text/javascript; charset=utf-8", etag: '"e97-R5wsSb46TvB07mV09I4gM8NWTNg"', mtime: "2026-08-19T18:22:55.549Z", size: 3735, path: "../_nuxt/Cp0l9mpl.js" }, "/_nuxt/Cq33dN8j.js": { type: "text/javascript; charset=utf-8", etag: '"1e19-IstbDw2GLafBB0fWIhLy2lcsoDU"', mtime: "2026-08-19T18:22:55.553Z", size: 7705, path: "../_nuxt/Cq33dN8j.js" }, "/_nuxt/Ccbd1242.js": { type: "text/javascript; charset=utf-8", etag: '"159c-sBgcX9+GTVygzn+kIpENa/O9JU8"', mtime: "2026-08-19T18:22:55.551Z", size: 5532, path: "../_nuxt/Ccbd1242.js" }, "/_nuxt/CNqeTFsH.js": { type: "text/javascript; charset=utf-8", etag: '"59d6-dxk/Yike4b89FNZRf1WWfL8dbNQ"', mtime: "2026-08-19T18:22:55.551Z", size: 22998, path: "../_nuxt/CNqeTFsH.js" }, "/_nuxt/CSOOBi3R.js": { type: "text/javascript; charset=utf-8", etag: '"1c87-H2AH45rHyfd1trOg+9RH7pKeadY"', mtime: "2026-08-19T18:22:55.552Z", size: 7303, path: "../_nuxt/CSOOBi3R.js" }, "/_nuxt/BMrz8ok4.js": { type: "text/javascript; charset=utf-8", etag: '"3a8bb-E8FlnpYxNxa2dWZ+y/kxtAtaCLw"', mtime: "2026-08-19T18:22:55.551Z", size: 239803, path: "../_nuxt/BMrz8ok4.js" }, "/_nuxt/CuU3-hKL.js": { type: "text/javascript; charset=utf-8", etag: '"a7f-e4AwbGANqIQCKqVqIRMSksQF4nM"', mtime: "2026-08-19T18:22:55.552Z", size: 2687, path: "../_nuxt/CuU3-hKL.js" }, "/_nuxt/default.CQZ9cSKp.css": { type: "text/css; charset=utf-8", etag: '"6e-loTF7dSu5F8DzKECMAdI3s5eP2U"', mtime: "2026-08-19T18:22:55.551Z", size: 110, path: "../_nuxt/default.CQZ9cSKp.css" }, "/_nuxt/DOGgC5aq.js": { type: "text/javascript; charset=utf-8", etag: '"3901-yyzTLagAwuePmvD+0+I0jBgBBJs"', mtime: "2026-08-19T18:22:55.553Z", size: 14593, path: "../_nuxt/DOGgC5aq.js" }, "/_nuxt/DZKQseVV.js": { type: "text/javascript; charset=utf-8", etag: '"178a-3EXFwl+dDfCe6CDvwX6Z3Mv7ZrY"', mtime: "2026-08-19T18:22:55.552Z", size: 6026, path: "../_nuxt/DZKQseVV.js" }, "/_nuxt/CyDa6fUg.js": { type: "text/javascript; charset=utf-8", etag: '"8f2-wB/uOVSXxkSZbJeBV7tKr9C5DJQ"', mtime: "2026-08-19T18:22:55.552Z", size: 2290, path: "../_nuxt/CyDa6fUg.js" }, "/_nuxt/DZNOjDxA.js": { type: "text/javascript; charset=utf-8", etag: '"2603-UaNAxUfL/StnQlK+eKMmPNXJjiA"', mtime: "2026-08-19T18:22:55.553Z", size: 9731, path: "../_nuxt/DZNOjDxA.js" }, "/_nuxt/error-404.o50T1Yh0.css": { type: "text/css; charset=utf-8", etag: '"dca-AkSnCW0tLiLk2m0Q0OHFrM7xFCI"', mtime: "2026-08-19T18:22:55.549Z", size: 3530, path: "../_nuxt/error-404.o50T1Yh0.css" }, "/_nuxt/error-500.DdcU-NLM.css": { type: "text/css; charset=utf-8", etag: '"75a-s3ZJsD9gCzxlAChPfK9f25Q6Zok"', mtime: "2026-08-19T18:22:55.542Z", size: 1882, path: "../_nuxt/error-500.DdcU-NLM.css" }, "/_nuxt/OuR-v_jm.js": { type: "text/javascript; charset=utf-8", etag: '"1bd-3xzOU5Lt1hqPQ/I4Uz8lGp346XU"', mtime: "2026-08-19T18:22:55.552Z", size: 445, path: "../_nuxt/OuR-v_jm.js" }, "/_nuxt/OFj9Vryw.js": { type: "text/javascript; charset=utf-8", etag: '"1620-VNZIQsYliZ/eRebK8oXaiSP3cP4"', mtime: "2026-08-19T18:22:55.553Z", size: 5664, path: "../_nuxt/OFj9Vryw.js" }, "/_nuxt/DXCExqDn.js": { type: "text/javascript; charset=utf-8", etag: '"1513-GUcqy3WMVeYhH/koAu7fH/+2cpc"', mtime: "2026-08-19T18:22:55.552Z", size: 5395, path: "../_nuxt/DXCExqDn.js" }, "/_nuxt/RK0ySuvf.js": { type: "text/javascript; charset=utf-8", etag: '"7372-SQEqxmZH/z7Rcx/9Jbtd63VXD0M"', mtime: "2026-08-19T18:22:55.552Z", size: 29554, path: "../_nuxt/RK0ySuvf.js" }, "/_nuxt/tk-KCgoa.js": { type: "text/javascript; charset=utf-8", etag: '"3905-IpzWX9t3ZQUEKqseCA3qMp6nLRg"', mtime: "2026-08-19T18:22:55.551Z", size: 14597, path: "../_nuxt/tk-KCgoa.js" }, "/_nuxt/entry.Dc04lp2W.css": { type: "text/css; charset=utf-8", etag: '"1ff0c-eisEFNw+VnVteCspLrHpYclLlZ4"', mtime: "2026-08-19T18:22:55.551Z", size: 130828, path: "../_nuxt/entry.Dc04lp2W.css" }, "/blog/ceramic-coating-benefits/index.html": { type: "text/html;charset=utf-8", etag: '"4e81-P1wEq8baegCUqyet/P1J7H/Y03Q"', mtime: "2026-08-19T18:23:07.604Z", size: 20097, path: "../blog/ceramic-coating-benefits/index.html" }, "/blog/ceramic-coating-benefits/_payload.json": { type: "application/json;charset=utf-8", etag: '"8f9-4cQSjdvPnylApK8KUhGUteBRmXA"', mtime: "2026-08-19T18:23:07.710Z", size: 2297, path: "../blog/ceramic-coating-benefits/_payload.json" }, "/blog/leather-seat-care-tips/index.html": { type: "text/html;charset=utf-8", etag: '"4cc0-MXGlmSHBz4zpDwU1U6TJ6r/RcgI"', mtime: "2026-08-19T18:23:07.657Z", size: 19648, path: "../blog/leather-seat-care-tips/index.html" }, "/blog/leather-seat-care-tips/_payload.json": { type: "application/json;charset=utf-8", etag: '"718-/FBJeuU/vqc3NZZsQR0Maic0NGo"', mtime: "2026-08-19T18:23:07.716Z", size: 1816, path: "../blog/leather-seat-care-tips/_payload.json" }, "/blog/mobile-detailing-checklist/index.html": { type: "text/html;charset=utf-8", etag: '"5134-bIJXHS3uAJEdSsALWF+q7sKVrS4"', mtime: "2026-08-19T18:23:07.604Z", size: 20788, path: "../blog/mobile-detailing-checklist/index.html" }, "/admin/login/index.html": { type: "text/html;charset=utf-8", etag: '"141f-ctPclC6nXcO8IChRnXVNGWlbzgw"', mtime: "2026-08-19T18:23:07.461Z", size: 5151, path: "../admin/login/index.html" }, "/blog/mobile-detailing-checklist/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-6COfBnwY4KTBJZ+eWZEmFDZmXqQ"', mtime: "2026-08-19T18:23:07.710Z", size: 69, path: "../blog/mobile-detailing-checklist/_payload.json" }, "/blog/engine-bay-safety-cleaning/index.html": { type: "text/html;charset=utf-8", etag: '"5134-UyJdAOfoZZbSofM8Pvwy145at40"', mtime: "2026-08-19T18:23:07.604Z", size: 20788, path: "../blog/engine-bay-safety-cleaning/index.html" }, "/services/complete-detailing/index.html": { type: "text/html;charset=utf-8", etag: '"54fc-ZeWwcztrenAVj2iFznO7c+OxrAE"', mtime: "2026-08-19T18:23:07.604Z", size: 21756, path: "../services/complete-detailing/index.html" }, "/services/complete-detailing/_payload.json": { type: "application/json;charset=utf-8", etag: '"625-OGNxhXw2ytwEuB0mkNUXCQgtGJs"', mtime: "2026-08-19T18:23:07.705Z", size: 1573, path: "../services/complete-detailing/_payload.json" }, "/blog/engine-bay-safety-cleaning/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-6COfBnwY4KTBJZ+eWZEmFDZmXqQ"', mtime: "2026-08-19T18:23:07.707Z", size: 69, path: "../blog/engine-bay-safety-cleaning/_payload.json" }, "/services/deep-interior/index.html": { type: "text/html;charset=utf-8", etag: '"54cd-+dGvTg0YJMgPZ+7AXz4gwMSxZh0"', mtime: "2026-08-19T18:23:07.604Z", size: 21709, path: "../services/deep-interior/index.html" }, "/services/deep-interior/_payload.json": { type: "application/json;charset=utf-8", etag: '"60a-pJV9lp+KhhQ/knDaVicGKUy6QEY"', mtime: "2026-08-19T18:23:07.710Z", size: 1546, path: "../services/deep-interior/_payload.json" }, "/services/exterior-detailing/_payload.json": { type: "application/json;charset=utf-8", etag: '"51c-v8+KwHy8bKiL4TOVKAV5lJxkjV0"', mtime: "2026-08-19T18:23:07.716Z", size: 1308, path: "../services/exterior-detailing/_payload.json" }, "/services/paint-polishing/_payload.json": { type: "application/json;charset=utf-8", etag: '"578-Q2rFD+hnAu7QPsbX12bEox0W2vc"', mtime: "2026-08-19T18:23:07.715Z", size: 1400, path: "../services/paint-polishing/_payload.json" }, "/services/exterior-detailing/index.html": { type: "text/html;charset=utf-8", etag: '"51e8-6WxFcyWPOUjwDmWutfk6V83noTU"', mtime: "2026-08-19T18:23:07.604Z", size: 20968, path: "../services/exterior-detailing/index.html" }, "/services/paint-protection/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-aBleu02kMnD3EJnHMqfSLC8CkZM"', mtime: "2026-08-19T18:23:07.705Z", size: 69, path: "../services/paint-protection/_payload.json" }, "/services/exterior/index.html": { type: "text/html;charset=utf-8", etag: '"5633-tXKbmGMZclVfV2ZKI5P6TXARtwY"', mtime: "2026-08-19T18:23:07.604Z", size: 22067, path: "../services/exterior/index.html" }, "/services/exterior/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-aBleu02kMnD3EJnHMqfSLC8CkZM"', mtime: "2026-08-19T18:23:07.705Z", size: 69, path: "../services/exterior/_payload.json" }, "/services/paint-polishing/index.html": { type: "text/html;charset=utf-8", etag: '"52ce-C8T+pl+5+Lq7ygSeDEOMj8zp6ek"', mtime: "2026-08-19T18:23:07.604Z", size: 21198, path: "../services/paint-polishing/index.html" }, "/services/paint-protection/index.html": { type: "text/html;charset=utf-8", etag: '"5663-oh36zFUO6b3/y6t7Bb8qJkmG2s0"', mtime: "2026-08-19T18:23:07.604Z", size: 22115, path: "../services/paint-protection/index.html" }, "/services/headlight-restoration/index.html": { type: "text/html;charset=utf-8", etag: '"5681-VsTQnLDNTvQTKuPrmsN4duvhT/k"', mtime: "2026-08-19T18:23:07.604Z", size: 22145, path: "../services/headlight-restoration/index.html" }, "/services/headlight-restoration/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-aBleu02kMnD3EJnHMqfSLC8CkZM"', mtime: "2026-08-19T18:23:07.705Z", size: 69, path: "../services/headlight-restoration/_payload.json" }, "/_nuxt/builds/meta/9bd89fbc-c038-48ee-87b0-ae36974da3dd.json": { type: "application/json", etag: '"1ed-qpIpJ17RyBnJBF0hqfCJIw5ZZTI"', mtime: "2026-08-19T18:23:08.832Z", size: 493, path: "../_nuxt/builds/meta/9bd89fbc-c038-48ee-87b0-ae36974da3dd.json" }, "/_nuxt/builds/latest.json": { type: "application/json", etag: '"47-dkf0mB+dYJRl0GAyV/sEjsl8rmA"', mtime: "2026-08-19T18:23:08.832Z", size: 71, path: "../_nuxt/builds/latest.json" } };
var o = { "/_nuxt/builds/meta/": { maxAge: 31536e3 }, "/_nuxt/builds/": { maxAge: 1 }, "/_nuxt/": { maxAge: 31536e3 } };
var l = i();
var h = { async fetch(e2, i2, s2) {
  const p2 = new URL(e2.url);
  if (i2.ASSETS && function(t2 = "") {
    if (n[t2])
      return true;
    for (const e3 in o)
      if (t2.startsWith(e3))
        return true;
    return false;
  }(p2.pathname))
    return i2.ASSETS.fetch(e2);
  let m2;
  return a(e2) && (m2 = t.from(await e2.arrayBuffer())), globalThis.__env__ = i2, l.localFetch(p2.pathname + p2.search, { context: { waitUntil: (t2) => s2.waitUntil(t2), _platform: { cf: e2.cf, cloudflare: { request: e2, env: i2, context: s2 } } }, host: p2.hostname, protocol: p2.protocol, method: e2.method, headers: e2.headers, body: m2 });
}, scheduled(t2, e2, a2) {
} };
export {
  h as default
};
//# sourceMappingURL=bundledWorker-0.8839020400351292.mjs.map

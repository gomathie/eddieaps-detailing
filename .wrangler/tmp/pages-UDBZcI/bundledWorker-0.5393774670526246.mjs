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
var o = { "/index.html": { type: "text/html;charset=utf-8", etag: '"a225-Ky/TQ6P3VqSbqz64yt/0VXbgIXg"', mtime: "2026-08-19T17:57:56.002Z", size: 41509, path: "../index.html" }, "/favicon.ico": { type: "image/vnd.microsoft.icon", etag: '"47e-q0CQQlyEhCsf/YiMPpytpv09/4I"', mtime: "2026-07-23T20:54:55.677Z", size: 1150, path: "../favicon.ico" }, "/logo-wordmark-dark.svg": { type: "image/svg+xml", etag: '"a7f6-7oeqxCQRZ1wlQubVbuVK8f42xq8"', mtime: "2026-08-19T17:56:00.665Z", size: 42998, path: "../logo-wordmark-dark.svg" }, "/logo-dark.svg": { type: "image/svg+xml", etag: '"9f3d-T36uHfTh7lxn/3cLGkoKjOEFEpU"', mtime: "2026-08-19T17:55:39.576Z", size: 40765, path: "../logo-dark.svg" }, "/logo-light.svg": { type: "image/svg+xml", etag: '"9f3e-PYqex1nQyoADrOgVlAmIWK9j9n0"', mtime: "2026-08-19T16:34:11.418Z", size: 40766, path: "../logo-light.svg" }, "/nitro.json": { type: "application/json", etag: '"f7-MvUbyQYTUi6OUJ3afRtI2dJIRhM"', mtime: "2026-08-19T17:57:54.496Z", size: 247, path: "../nitro.json" }, "/logo-wordmark-light.svg": { type: "image/svg+xml", etag: '"a7f7-keY+yYu5UHy+H+40MDXwuhKzBko"', mtime: "2026-08-19T16:34:11.522Z", size: 42999, path: "../logo-wordmark-light.svg" }, "/og-image.png": { type: "image/png", etag: '"13e56-M83waQQHmTnDGOjEzrMfJgNhonY"', mtime: "2026-08-19T17:54:35.713Z", size: 81494, path: "../og-image.png" }, "/_payload.json": { type: "application/json;charset=utf-8", etag: '"773-GXvd+BNu3RaPh9MZUHosTdrc1/o"', mtime: "2026-08-19T17:57:56.384Z", size: 1907, path: "../_payload.json" }, "/sitemap.xml": { type: "application/xml", etag: '"1d99-7ADRzWHGMykrodrh1E3php9q91s"', mtime: "2026-08-19T17:57:56.936Z", size: 7577, path: "../sitemap.xml" }, "/_robots.txt": { type: "text/plain; charset=utf-8", etag: '"18-j8OIsL9qGDmNZ+lHhp2tyH4XtaE"', mtime: "2026-06-22T08:48:57.000Z", size: 24, path: "../_robots.txt" }, "/about/index.html": { type: "text/html;charset=utf-8", etag: '"592d-9I0vLzXoeZJYeI/6Oh/97174Hns"', mtime: "2026-08-19T17:57:56.365Z", size: 22829, path: "../about/index.html" }, "/about/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-XVn/xZ+j2cpNxoPVG6ciYGh1dPc"', mtime: "2026-08-19T17:57:56.565Z", size: 69, path: "../about/_payload.json" }, "/contact/index.html": { type: "text/html;charset=utf-8", etag: '"6308-rkbCIiSXX8qNhH8pA6gY4LGjS94"', mtime: "2026-08-19T17:57:56.365Z", size: 25352, path: "../contact/index.html" }, "/contact/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-XVn/xZ+j2cpNxoPVG6ciYGh1dPc"', mtime: "2026-08-19T17:57:56.565Z", size: 69, path: "../contact/_payload.json" }, "/blog/_payload.json": { type: "application/json;charset=utf-8", etag: '"77e-w6PUlAD13HoI+BkjgEfNqUFhhrY"', mtime: "2026-08-19T17:57:56.427Z", size: 1918, path: "../blog/_payload.json" }, "/blog/index.html": { type: "text/html;charset=utf-8", etag: '"5d89-rOKlgV7CWAK5FWjuyMCeQbfJeUE"', mtime: "2026-08-19T17:57:56.008Z", size: 23945, path: "../blog/index.html" }, "/gallery/index.html": { type: "text/html;charset=utf-8", etag: '"7113-zaEegSLxyDpYUw2DlxpOIDyolbU"', mtime: "2026-08-19T17:57:56.008Z", size: 28947, path: "../gallery/index.html" }, "/gallery/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-XVn/xZ+j2cpNxoPVG6ciYGh1dPc"', mtime: "2026-08-19T17:57:56.427Z", size: 69, path: "../gallery/_payload.json" }, "/book/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-XVn/xZ+j2cpNxoPVG6ciYGh1dPc"', mtime: "2026-08-19T17:57:56.349Z", size: 69, path: "../book/_payload.json" }, "/book/index.html": { type: "text/html;charset=utf-8", etag: '"4adb-zTBlKWfzLX1RnbDUtAqcCG5jFN0"', mtime: "2026-08-19T17:57:55.914Z", size: 19163, path: "../book/index.html" }, "/images/ceramic-coating.webp": { type: "image/webp", etag: '"19748-5UmwaJ8jHcwnPc0/+IsWAx18iTo"', mtime: "2026-07-10T09:40:07.659Z", size: 104264, path: "../images/ceramic-coating.webp" }, "/images/deep-interior.webp": { type: "image/webp", etag: '"177ae-s1mUBoW+DuL3g04lyb1dhZTVqcg"', mtime: "2026-07-10T09:40:08.176Z", size: 96174, path: "../images/deep-interior.webp" }, "/images/engine-bay.webp": { type: "image/webp", etag: '"14d52-CwJXpSmv8kj5Ema/vYTlHxKC4W0"', mtime: "2026-07-10T09:40:08.413Z", size: 85330, path: "../images/engine-bay.webp" }, "/images/complete-detailing.webp": { type: "image/webp", etag: '"19bc8-+/2gf56dIlkvmY7DlYuHYbS4BOc"', mtime: "2026-07-10T09:40:07.933Z", size: 105416, path: "../images/complete-detailing.webp" }, "/images/luxury-car.webp": { type: "image/webp", etag: '"f410-MgfISW29tkSMZgeGMmPAgIIGWtE"', mtime: "2026-07-10T09:40:09.614Z", size: 62480, path: "../images/luxury-car.webp" }, "/images/hero-bmw.webp": { type: "image/webp", etag: '"37c54-tirGFb5zoztLZR2yT4O5Uzkgac0"', mtime: "2026-07-10T15:14:58.926Z", size: 228436, path: "../images/hero-bmw.webp" }, "/images/exterior-detailing.webp": { type: "image/webp", etag: '"5efda-WfYViBrGKcTWSXcpOK5WuABRckc"', mtime: "2026-07-10T09:40:08.649Z", size: 389082, path: "../images/exterior-detailing.webp" }, "/images/headlight-restoration.webp": { type: "image/webp", etag: '"3d9ac-RNBekzE4XHrIYQcAVTT0PKiZLFc"', mtime: "2026-07-10T09:40:09.315Z", size: 252332, path: "../images/headlight-restoration.webp" }, "/images/paint-polishing.webp": { type: "image/webp", etag: '"15fb8-1IMqUf8vxa/CUJ4KoP74W2eAW4Q"', mtime: "2026-07-10T09:40:09.822Z", size: 90040, path: "../images/paint-polishing.webp" }, "/_nuxt/B2N8IsgC.js": { type: "text/javascript; charset=utf-8", etag: '"1380-zv2p2mp8z5sxD0xdcCCbkD8hWHg"', mtime: "2026-08-19T17:57:45.228Z", size: 4992, path: "../_nuxt/B2N8IsgC.js" }, "/images/wheel-detail.webp": { type: "image/webp", etag: '"18bb2-fAHS5LQuIFn/tg1NtOHwE4MLm4U"', mtime: "2026-07-10T09:40:10.057Z", size: 101298, path: "../images/wheel-detail.webp" }, "/quote/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-XVn/xZ+j2cpNxoPVG6ciYGh1dPc"', mtime: "2026-08-19T17:57:56.372Z", size: 69, path: "../quote/_payload.json" }, "/quote/index.html": { type: "text/html;charset=utf-8", etag: '"584d-F4PQ8WTJLvPbdMnIxcL/vtTelOg"', mtime: "2026-08-19T17:57:55.953Z", size: 22605, path: "../quote/index.html" }, "/_nuxt/B8ga_iMR.js": { type: "text/javascript; charset=utf-8", etag: '"294e-OU6HjLLM5foa4xWm90gVvdT4YQk"', mtime: "2026-08-19T17:57:45.225Z", size: 10574, path: "../_nuxt/B8ga_iMR.js" }, "/_nuxt/B9hN82Sx.js": { type: "text/javascript; charset=utf-8", etag: '"192e-gNV08g6ch/YeD3dJ+UACU89JYoQ"', mtime: "2026-08-19T17:57:45.225Z", size: 6446, path: "../_nuxt/B9hN82Sx.js" }, "/_nuxt/Bev7uUSu.js": { type: "text/javascript; charset=utf-8", etag: '"bf2-M/bXzxnHfZsek1P00zjX1sHZvSo"', mtime: "2026-08-19T17:57:45.225Z", size: 3058, path: "../_nuxt/Bev7uUSu.js" }, "/_nuxt/BkHJ_bdQ.js": { type: "text/javascript; charset=utf-8", etag: '"1bf-14v+A8HdiXVKrLHo1mo/t4fw+VU"', mtime: "2026-08-19T17:57:45.225Z", size: 447, path: "../_nuxt/BkHJ_bdQ.js" }, "/_nuxt/BPnrZwe-.js": { type: "text/javascript; charset=utf-8", etag: '"d2a-dnBnS6cVA8p/al//f+DbmG9UWZk"', mtime: "2026-08-19T17:57:45.223Z", size: 3370, path: "../_nuxt/BPnrZwe-.js" }, "/_nuxt/C-ChfC7P.js": { type: "text/javascript; charset=utf-8", etag: '"b8-KC3xEosfpWfBUaLN6DmEnFv1MpU"', mtime: "2026-08-19T17:57:45.227Z", size: 184, path: "../_nuxt/C-ChfC7P.js" }, "/_nuxt/CNqeTFsH.js": { type: "text/javascript; charset=utf-8", etag: '"59d6-dxk/Yike4b89FNZRf1WWfL8dbNQ"', mtime: "2026-08-19T17:57:45.225Z", size: 22998, path: "../_nuxt/CNqeTFsH.js" }, "/_nuxt/Cp0l9mpl.js": { type: "text/javascript; charset=utf-8", etag: '"e97-R5wsSb46TvB07mV09I4gM8NWTNg"', mtime: "2026-08-19T17:57:45.223Z", size: 3735, path: "../_nuxt/Cp0l9mpl.js" }, "/_nuxt/Cq33dN8j.js": { type: "text/javascript; charset=utf-8", etag: '"1e19-IstbDw2GLafBB0fWIhLy2lcsoDU"', mtime: "2026-08-19T17:57:45.228Z", size: 7705, path: "../_nuxt/Cq33dN8j.js" }, "/_nuxt/ByuXKEc4.js": { type: "text/javascript; charset=utf-8", etag: '"37ab-nVCaa0xbcGeTBF1+Z4pbbXTmufE"', mtime: "2026-08-19T17:57:45.230Z", size: 14251, path: "../_nuxt/ByuXKEc4.js" }, "/_nuxt/CSOOBi3R.js": { type: "text/javascript; charset=utf-8", etag: '"1c87-H2AH45rHyfd1trOg+9RH7pKeadY"', mtime: "2026-08-19T17:57:45.228Z", size: 7303, path: "../_nuxt/CSOOBi3R.js" }, "/_nuxt/Ccbd1242.js": { type: "text/javascript; charset=utf-8", etag: '"159c-sBgcX9+GTVygzn+kIpENa/O9JU8"', mtime: "2026-08-19T17:57:45.226Z", size: 5532, path: "../_nuxt/Ccbd1242.js" }, "/_nuxt/CuU3-hKL.js": { type: "text/javascript; charset=utf-8", etag: '"a7f-e4AwbGANqIQCKqVqIRMSksQF4nM"', mtime: "2026-08-19T17:57:45.225Z", size: 2687, path: "../_nuxt/CuU3-hKL.js" }, "/_nuxt/default.CQZ9cSKp.css": { type: "text/css; charset=utf-8", etag: '"6e-loTF7dSu5F8DzKECMAdI3s5eP2U"', mtime: "2026-08-19T17:57:45.223Z", size: 110, path: "../_nuxt/default.CQZ9cSKp.css" }, "/_nuxt/BMrz8ok4.js": { type: "text/javascript; charset=utf-8", etag: '"3a8bb-E8FlnpYxNxa2dWZ+y/kxtAtaCLw"', mtime: "2026-08-19T17:57:45.225Z", size: 239803, path: "../_nuxt/BMrz8ok4.js" }, "/_nuxt/CyDa6fUg.js": { type: "text/javascript; charset=utf-8", etag: '"8f2-wB/uOVSXxkSZbJeBV7tKr9C5DJQ"', mtime: "2026-08-19T17:57:45.226Z", size: 2290, path: "../_nuxt/CyDa6fUg.js" }, "/_nuxt/DZNOjDxA.js": { type: "text/javascript; charset=utf-8", etag: '"2603-UaNAxUfL/StnQlK+eKMmPNXJjiA"', mtime: "2026-08-19T17:57:45.227Z", size: 9731, path: "../_nuxt/DZNOjDxA.js" }, "/_nuxt/DOGgC5aq.js": { type: "text/javascript; charset=utf-8", etag: '"3901-yyzTLagAwuePmvD+0+I0jBgBBJs"', mtime: "2026-08-19T17:57:45.230Z", size: 14593, path: "../_nuxt/DOGgC5aq.js" }, "/_nuxt/error-500.DdcU-NLM.css": { type: "text/css; charset=utf-8", etag: '"75a-s3ZJsD9gCzxlAChPfK9f25Q6Zok"', mtime: "2026-08-19T17:57:45.223Z", size: 1882, path: "../_nuxt/error-500.DdcU-NLM.css" }, "/_nuxt/DXCExqDn.js": { type: "text/javascript; charset=utf-8", etag: '"1513-GUcqy3WMVeYhH/koAu7fH/+2cpc"', mtime: "2026-08-19T17:57:45.225Z", size: 5395, path: "../_nuxt/DXCExqDn.js" }, "/_nuxt/error-404.o50T1Yh0.css": { type: "text/css; charset=utf-8", etag: '"dca-AkSnCW0tLiLk2m0Q0OHFrM7xFCI"', mtime: "2026-08-19T17:57:45.213Z", size: 3530, path: "../_nuxt/error-404.o50T1Yh0.css" }, "/_nuxt/OFj9Vryw.js": { type: "text/javascript; charset=utf-8", etag: '"1620-VNZIQsYliZ/eRebK8oXaiSP3cP4"', mtime: "2026-08-19T17:57:45.230Z", size: 5664, path: "../_nuxt/OFj9Vryw.js" }, "/_nuxt/DZKQseVV.js": { type: "text/javascript; charset=utf-8", etag: '"178a-3EXFwl+dDfCe6CDvwX6Z3Mv7ZrY"', mtime: "2026-08-19T17:57:45.226Z", size: 6026, path: "../_nuxt/DZKQseVV.js" }, "/_nuxt/OuR-v_jm.js": { type: "text/javascript; charset=utf-8", etag: '"1bd-3xzOU5Lt1hqPQ/I4Uz8lGp346XU"', mtime: "2026-08-19T17:57:45.227Z", size: 445, path: "../_nuxt/OuR-v_jm.js" }, "/_nuxt/RK0ySuvf.js": { type: "text/javascript; charset=utf-8", etag: '"7372-SQEqxmZH/z7Rcx/9Jbtd63VXD0M"', mtime: "2026-08-19T17:57:45.226Z", size: 29554, path: "../_nuxt/RK0ySuvf.js" }, "/_nuxt/tk-KCgoa.js": { type: "text/javascript; charset=utf-8", etag: '"3905-IpzWX9t3ZQUEKqseCA3qMp6nLRg"', mtime: "2026-08-19T17:57:45.223Z", size: 14597, path: "../_nuxt/tk-KCgoa.js" }, "/_nuxt/entry.Dc04lp2W.css": { type: "text/css; charset=utf-8", etag: '"1ff0c-eisEFNw+VnVteCspLrHpYclLlZ4"', mtime: "2026-08-19T17:57:45.223Z", size: 130828, path: "../_nuxt/entry.Dc04lp2W.css" }, "/services/_payload.json": { type: "application/json;charset=utf-8", etag: '"773-3pS67dxdQVMIXxmHlQ+FviqyfLo"', mtime: "2026-08-19T17:57:56.543Z", size: 1907, path: "../services/_payload.json" }, "/services/index.html": { type: "text/html;charset=utf-8", etag: '"6114-NxwlBZd4+CySIghG4EbaCMlMTrM"', mtime: "2026-08-19T17:57:56.009Z", size: 24852, path: "../services/index.html" }, "/admin/index.html": { type: "text/html;charset=utf-8", etag: '"141f-3pNDUYul3eRwahmEwqUnvo8eGJk"', mtime: "2026-08-19T17:57:56.543Z", size: 5151, path: "../admin/index.html" }, "/blog/engine-bay-safety-cleaning/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-79VT7lQOxfJgz3oLWi+t2ZYA6Ug"', mtime: "2026-08-19T17:57:56.888Z", size: 69, path: "../blog/engine-bay-safety-cleaning/_payload.json" }, "/blog/engine-bay-safety-cleaning/index.html": { type: "text/html;charset=utf-8", etag: '"5134-VS9YeoUHIk7wPOa7Xf1UghOgtrQ"', mtime: "2026-08-19T17:57:56.758Z", size: 20788, path: "../blog/engine-bay-safety-cleaning/index.html" }, "/blog/ceramic-coating-benefits/_payload.json": { type: "application/json;charset=utf-8", etag: '"8f9-cd/M9hJr9fKWrpFId5sqRm9T/o4"', mtime: "2026-08-19T17:57:56.895Z", size: 2297, path: "../blog/ceramic-coating-benefits/_payload.json" }, "/blog/ceramic-coating-benefits/index.html": { type: "text/html;charset=utf-8", etag: '"4e81-6OVaRJER/muyk1eko1uSz9b8DqU"', mtime: "2026-08-19T17:57:56.759Z", size: 20097, path: "../blog/ceramic-coating-benefits/index.html" }, "/blog/leather-seat-care-tips/index.html": { type: "text/html;charset=utf-8", etag: '"4cc0-UIV1FabgAePI6xBNrVZDCHkDrKA"', mtime: "2026-08-19T17:57:56.835Z", size: 19648, path: "../blog/leather-seat-care-tips/index.html" }, "/blog/leather-seat-care-tips/_payload.json": { type: "application/json;charset=utf-8", etag: '"718-zUrFtNfdZXNlEpG9fMZCHlTFT98"', mtime: "2026-08-19T17:57:56.900Z", size: 1816, path: "../blog/leather-seat-care-tips/_payload.json" }, "/blog/mobile-detailing-checklist/index.html": { type: "text/html;charset=utf-8", etag: '"5134-c+7CQQIRcRe12aPQwxakU580Y94"', mtime: "2026-08-19T17:57:56.758Z", size: 20788, path: "../blog/mobile-detailing-checklist/index.html" }, "/blog/mobile-detailing-checklist/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-79VT7lQOxfJgz3oLWi+t2ZYA6Ug"', mtime: "2026-08-19T17:57:56.888Z", size: 69, path: "../blog/mobile-detailing-checklist/_payload.json" }, "/_nuxt/builds/latest.json": { type: "application/json", etag: '"47-n1kMrH6+DriB6Ug+5FSFDJP1UiM"', mtime: "2026-08-19T17:57:58.240Z", size: 71, path: "../_nuxt/builds/latest.json" }, "/services/deep-interior/index.html": { type: "text/html;charset=utf-8", etag: '"54cd-MUUUQr3seJ2lMKzdd8ZyMRID+lk"', mtime: "2026-08-19T17:57:56.759Z", size: 21709, path: "../services/deep-interior/index.html" }, "/services/deep-interior/_payload.json": { type: "application/json;charset=utf-8", etag: '"60a-zKiZtDbNmOpjkArZ2S5URVXJtg8"', mtime: "2026-08-19T17:57:56.888Z", size: 1546, path: "../services/deep-interior/_payload.json" }, "/services/headlight-restoration/index.html": { type: "text/html;charset=utf-8", etag: '"5681-j4lYWYnoYmuTWiYCBbORVGUBIu0"', mtime: "2026-08-19T17:57:56.758Z", size: 22145, path: "../services/headlight-restoration/index.html" }, "/services/exterior/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-HgI6Q+IpyNuNst1R0aezphR3gQ0"', mtime: "2026-08-19T17:57:56.888Z", size: 69, path: "../services/exterior/_payload.json" }, "/services/headlight-restoration/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-HgI6Q+IpyNuNst1R0aezphR3gQ0"', mtime: "2026-08-19T17:57:56.887Z", size: 69, path: "../services/headlight-restoration/_payload.json" }, "/services/exterior-detailing/_payload.json": { type: "application/json;charset=utf-8", etag: '"51c-Peb1AAd+0VLR6IC+TXNJ/lUNKvg"', mtime: "2026-08-19T17:57:56.899Z", size: 1308, path: "../services/exterior-detailing/_payload.json" }, "/services/exterior-detailing/index.html": { type: "text/html;charset=utf-8", etag: '"51e8-4HePJj9BvQvxQEFpSez+3T0Xyk8"', mtime: "2026-08-19T17:57:56.759Z", size: 20968, path: "../services/exterior-detailing/index.html" }, "/services/exterior/index.html": { type: "text/html;charset=utf-8", etag: '"5633-WpoVbsMLUE6unOI40UjTK2cSoFY"', mtime: "2026-08-19T17:57:56.758Z", size: 22067, path: "../services/exterior/index.html" }, "/services/paint-polishing/_payload.json": { type: "application/json;charset=utf-8", etag: '"578-sHg3ip1e1usOrnUZfNVZOApNP9w"', mtime: "2026-08-19T17:57:56.888Z", size: 1400, path: "../services/paint-polishing/_payload.json" }, "/services/paint-protection/index.html": { type: "text/html;charset=utf-8", etag: '"5663-e4slLlE4kErwMmbt4ZOko7NvuUk"', mtime: "2026-08-19T17:57:56.758Z", size: 22115, path: "../services/paint-protection/index.html" }, "/services/paint-polishing/index.html": { type: "text/html;charset=utf-8", etag: '"52ce-7cYjIzFAlu3zf55sx0WItTnX1/I"', mtime: "2026-08-19T17:57:56.758Z", size: 21198, path: "../services/paint-polishing/index.html" }, "/services/paint-protection/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-HgI6Q+IpyNuNst1R0aezphR3gQ0"', mtime: "2026-08-19T17:57:56.888Z", size: 69, path: "../services/paint-protection/_payload.json" }, "/services/complete-detailing/_payload.json": { type: "application/json;charset=utf-8", etag: '"625-u8QPyTNmTfSM24Ceryvsq6iUOXA"', mtime: "2026-08-19T17:57:56.888Z", size: 1573, path: "../services/complete-detailing/_payload.json" }, "/services/complete-detailing/index.html": { type: "text/html;charset=utf-8", etag: '"54fc-KyKkjt+t1dIUWCw2VtE5slsMIPM"', mtime: "2026-08-19T17:57:56.759Z", size: 21756, path: "../services/complete-detailing/index.html" }, "/admin/login/index.html": { type: "text/html;charset=utf-8", etag: '"141f-C00VPQeYFkeRiaGYl+NhUJViI0c"', mtime: "2026-08-19T17:57:56.565Z", size: 5151, path: "../admin/login/index.html" }, "/_nuxt/builds/meta/231f12bf-b3d7-4610-ae71-e63fd6cdc9a3.json": { type: "application/json", etag: '"1ed-146FDsf1qMcymWa/unWqx2G1x1M"', mtime: "2026-08-19T17:57:58.242Z", size: 493, path: "../_nuxt/builds/meta/231f12bf-b3d7-4610-ae71-e63fd6cdc9a3.json" } };
var n = { "/_nuxt/builds/meta/": { maxAge: 31536e3 }, "/_nuxt/builds/": { maxAge: 1 }, "/_nuxt/": { maxAge: 31536e3 } };
var l = i();
var c = { async fetch(e2, i2, s2) {
  const p2 = new URL(e2.url);
  if (i2.ASSETS && function(t2 = "") {
    if (o[t2])
      return true;
    for (const e3 in n)
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
  c as default
};
//# sourceMappingURL=bundledWorker-0.5393774670526246.mjs.map

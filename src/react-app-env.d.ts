/// <reference types="react-scripts" />

interface WebpackRequireContext {
  keys: () => string[];
  (id: string): string | { default: string };
}

interface NodeRequire {
  context: (
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp
  ) => WebpackRequireContext;
}

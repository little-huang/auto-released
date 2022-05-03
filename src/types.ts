
export type PowerPartial<T> = {
  [U in keyof T]?: T[U] extends object ? PowerPartial<T[U]> : T[U];
}

export type WebhookOptionsBodyFunctionType = (changeLog: string, newVersion: string) => Record<string, any>

export interface GitOptions {
  // Whether to open git tag
  tag: boolean;
  // Whether to open git push
  push: boolean;
  // Whether to open check git workspace clean
  checkClean: boolean;
}

export interface NpmOptions {
  // npm build command, If it is empty, it will not be built
  buildCommand: '',
  // Whether to open npm build command
  build: boolean;
  // Whether to open publish npm package
  publish: boolean;
  // Upgrade Version type, Only CI mode is supported, default is 'patch',
  versionType: 'patch' | 'minor' | 'major' | 'prepatch' | 'preminor' | 'premajor' | 'prerelease'
}

export interface WebhookOptions {
  // Whether to open webhook
  enabled: boolean;
  // Webhook url
  url: string;
  // Webhook body
  body: Record<string, any> | WebhookOptionsBodyFunctionType;
}

export interface Options {
  /**
   * The project and path are used to execute commands. 
   * The default is the directory where js is currently executed
   */
  projectRootPath: string;
  /** 
   * The git options
  */
  git: GitOptions;
  /** 
   * The npm options
  */
  npm: NpmOptions;
  /**
   * The webhook options
  */
  webhook: WebhookOptions;
}

interface IProcess {
  env: {
    NODE_ENV: 'development' | 'production'
  }
}

declare module '*module.scss'
declare module '*.geojson'

declare const process: IProcess

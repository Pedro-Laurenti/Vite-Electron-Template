/// <reference types="vite-electron-plugin/electron-env" />

declare namespace NodeJS {
    interface ProcessEnv {
        VSCODE_DEBUG?: 'false'
        APP_ROOT: string
        VITE_PUBLIC: string
    }
}

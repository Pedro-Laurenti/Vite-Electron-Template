import { app, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import type { ProgressInfo, UpdateDownloadedEvent, UpdateInfo} from 'electron-updater'
const { autoUpdater } = createRequire(import.meta.url)('electron-updater');

export function update(win: Electron.BrowserWindow) {
    // Quando definido como false, o download da atualização será acionado através da API
    autoUpdater.autoDownload = false
    autoUpdater.disableWebInstaller = false
    autoUpdater.allowDowngrade = false

    // Iniciar verificação
    autoUpdater.on('checking-for-update', function () { })
    // Atualização disponível
    autoUpdater.on('update-available', (arg: UpdateInfo) => {
        win.webContents.send('update-can-available', { update: true, version: app.getVersion(), newVersion: arg?.version })
    })

    // Atualização não disponível
    autoUpdater.on('update-not-available', (arg: UpdateInfo) => {
        win.webContents.send('update-can-available', { update: false, version: app.getVersion(), newVersion: arg?.version })
    })

    // Verificando por atualizações
    ipcMain.handle('check-update', async () => {
        if (!app.isPackaged) {
            const error = new Error('O recurso de atualização está disponível apenas após o empacotamento.')
            return { message: error.message, error }
        }

        try {
            return await autoUpdater.checkForUpdatesAndNotify()
        } catch (error) {
            return { message: 'Erro de rede', error }
        }
    })

    // Iniciar download e fornecer feedback sobre o progresso
    ipcMain.handle('start-download', (event: Electron.IpcMainInvokeEvent) => {
        startDownload(
            (error, progressInfo) => {
                if (error) {
                    // Feedback de mensagem de erro no download
                    event.sender.send('update-error', { message: error.message, error })
                } else {
                    // Feedback de mensagem de progresso da atualização
                    event.sender.send('download-progress', progressInfo)
                }
            },
            () => {
                // Feedback de mensagem de download concluído
                event.sender.send('update-downloaded')
            }
        )
    })

    // Instalar agora
    ipcMain.handle('quit-and-install', () => {
        autoUpdater.quitAndInstall(false, true)
    })
}

function startDownload(
    callback: (error: Error | null, info: ProgressInfo | null) => void,
    complete: (event: UpdateDownloadedEvent) => void,
) {
    autoUpdater.on('download-progress', (info: ProgressInfo) => callback(null, info))
    autoUpdater.on('error', (error: Error) => callback(error, null))
    autoUpdater.on('update-downloaded', complete)
    autoUpdater.downloadUpdate()
}

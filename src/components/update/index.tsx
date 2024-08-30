import type { ProgressInfo } from 'electron-updater';
import { useCallback, useEffect, useState } from 'react';
import Progress from '@/components/update/Progress';
import './update.css';

interface VersionInfo {
    update: boolean;
    version: string;
    newVersion?: string;
}

interface ErrorType {
    message: string;
}

const Update = () => {
    const [verificando, setVerificando] = useState(false);
    const [atualizacaoDisponivel, setAtualizacaoDisponivel] = useState(false);
    const [informacoesVersao, setInformacoesVersao] = useState<VersionInfo>();
    const [erroAtualizacao, setErroAtualizacao] = useState<ErrorType>();
    const [informacoesProgresso, setInformacoesProgresso] = useState<Partial<ProgressInfo>>();
    const [botoesModal, setBotoesModal] = useState<{
        textoCancelar?: string;
        textoConfirmar?: string;
        aoCancelar?: () => void;
        aoConfirmar?: () => void;
    }>({
        aoCancelar: () => {
            const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
            if (modal) modal.close();
        },
        aoConfirmar: () => window.ipcRenderer.invoke('start-download'),
    });

    const verificarAtualizacao = async () => {
        setVerificando(true);
        const resultado = await window.ipcRenderer.invoke('check-update');
        setInformacoesProgresso({ percent: 0 });
        setVerificando(false);
        
        const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
        if (modal) modal.showModal();

        if (resultado?.error) {
            setAtualizacaoDisponivel(false);
            setErroAtualizacao(resultado?.error);
        }
    };

    const aoAtualizacaoDisponivel = useCallback((_event: Electron.IpcRendererEvent, arg1: VersionInfo) => {
        setInformacoesVersao(arg1);
        setErroAtualizacao(undefined);
        if (arg1.update) {
            setBotoesModal(estado => ({
                ...estado,
                textoCancelar: 'Cancelar',
                textoConfirmar: 'Atualizar',
                aoConfirmar: () => window.ipcRenderer.invoke('start-download'),
            }));
            setAtualizacaoDisponivel(true);
        } else {
            setAtualizacaoDisponivel(false);
        }
    }, []);

    const aoErroAtualizacao = useCallback((_event: Electron.IpcRendererEvent, arg1: ErrorType) => {
        setAtualizacaoDisponivel(false);
        setErroAtualizacao(arg1);
    }, []);

    const aoProgressoDownload = useCallback((_event: Electron.IpcRendererEvent, arg1: ProgressInfo) => {
        setInformacoesProgresso(arg1);
    }, []);

    const aoAtualizacaoBaixada = useCallback(() => {
        setInformacoesProgresso({ percent: 100 });
        setBotoesModal(estado => ({
            ...estado,
            textoCancelar: 'Depois',
            textoConfirmar: 'Instalar agora',
            aoConfirmar: () => window.ipcRenderer.invoke('quit-and-install'),
        }));
    }, []);

    useEffect(() => {
        window.ipcRenderer.on('update-can-available', aoAtualizacaoDisponivel);
        window.ipcRenderer.on('update-error', aoErroAtualizacao);
        window.ipcRenderer.on('download-progress', aoProgressoDownload);
        window.ipcRenderer.on('update-downloaded', aoAtualizacaoBaixada);

        return () => {
            window.ipcRenderer.off('update-can-available', aoAtualizacaoDisponivel);
            window.ipcRenderer.off('update-error', aoErroAtualizacao);
            window.ipcRenderer.off('download-progress', aoProgressoDownload);
            window.ipcRenderer.off('update-downloaded', aoAtualizacaoBaixada);
        };
    }, []);

    return (
        <>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {erroAtualizacao ? (
                        <div>
                            <h3 className="font-bold text-lg">Erro</h3>
                            <p className="py-4">Erro ao baixar a última versão.</p>
                            <p>{erroAtualizacao.message}</p>
                        </div>
                    ) : atualizacaoDisponivel ? (
                        <div>
                            <h3 className="font-bold text-lg">Atualização Disponível</h3>
                            <div>
                                <p className="py-4">A última versão é: v{informacoesVersao?.newVersion}</p>
                                <p className="new-version__target">
                                    v{informacoesVersao?.version} -&gt; v{informacoesVersao?.newVersion}
                                </p>
                                <div className="update__progress">
                                    <div className="progress__title">Progresso da atualização:</div>
                                    <div className="progress__bar">
                                        <Progress percent={informacoesProgresso?.percent}></Progress>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3 className="font-bold text-lg">Nenhuma Atualização Disponível</h3>
                            <p className="py-4">{JSON.stringify(informacoesVersao ?? {}, null, 2)}</p>
                        </div>
                    )}
                    <div className="modal-action">
                        <button className="btn" onClick={botoesModal.aoCancelar}>{botoesModal.textoCancelar || 'Fechar'}</button>
                        {atualizacaoDisponivel && (
                            <button className="btn" onClick={botoesModal.aoConfirmar}>{botoesModal.textoConfirmar || 'Ok'}</button>
                        )}
                    </div>
                </div>
            </dialog>
            <button disabled={verificando} onClick={verificarAtualizacao}>
                {verificando ? 'Verificando...' : 'Verificar atualização'}
            </button>
        </>
    );
};

export default Update;
import React, { ReactNode } from 'react';
import { FaCopy } from "react-icons/fa6";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorTitle: string | null;
    errorLocation: string | null;
    errorStage: 'Inicialização' | 'Renderização' | 'Utilização' | null;
    showToast: boolean; 
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { 
            hasError: false, 
            errorTitle: null, 
            errorLocation: null, 
            errorStage: null,
            showToast: false // Inicialize o estado showToast
        };
    }

    static getDerivedStateFromError(_: any): ErrorBoundaryState {
        return { hasError: true, errorTitle: null, errorLocation: null, errorStage: null, showToast: false };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    
        const errorTitle = error?.message || "Erro desconhecido";
        const errorLocation = errorInfo?.componentStack
            ? errorInfo.componentStack.split('\n')[1]?.trim() || "Localização desconhecida"
            : "Nenhuma informação de stack disponível.";
    
        let errorStage: 'Inicialização' | 'Renderização' | 'Utilização' | null = null;
    
        if (errorLocation.includes('componentWillMount') || errorLocation.includes('constructor')) {
            errorStage = 'Inicialização';
        } else if (errorLocation.includes('render') || errorLocation.includes('mount')) {
            errorStage = 'Renderização';
        } else {
            errorStage = 'Utilização';
        }
    
        this.setState({ hasError: true, errorTitle, errorLocation, errorStage });
    }

    handleReload = () => {
        window.location.reload();
    };

    handleCopyToClipboard = () => {
        const { errorTitle, errorLocation } = this.state;
        if (errorTitle && errorLocation) {
            const errorDetails = `Erro: ${errorTitle}\nLocal: ${errorLocation}`;
            navigator.clipboard.writeText(errorDetails).then(() => {
                this.setState({ showToast: true });
                setTimeout(() => this.setState({ showToast: false }), 3000);
            }, () => {
                alert('Falha ao copiar para a área de transferência.');
            });
        }
    };

    render() {
        const { hasError, errorTitle, errorLocation, errorStage, showToast } = this.state;

        if (hasError) {
            return (
                <div className='w-screen h-screen'>
                    {showToast && (
                        <div className="toast">
                            <div className="alert alert-info">
                                <span>Detalhes do erro copiados para a área de transferência.</span>
                            </div>
                        </div>
                    )}
                    {hasError ? (
                        <div className='mx-10 h-full flex flex-col items-center justify-center'>
                            <article className="prose">
                                <h1 className='text-8xl mb-8'>:(</h1>
                                <h1>Ops... Ocorreu um erro na renderização do aplicativo</h1>
                                <p></p>
                                <p>Caso o problema persista mesmo depois de atualizar, recomendamos que copie o código de erro abaixo e encaminhe para o setor responsável:</p>
                            </article>

                            <div className='hidden md:flex w-full mt-10'>
                                <ul className="steps w-full mt-10">
                                    <li className={`step ${errorStage === 'Inicialização' ? 'step-error' : 'step-primary'}`}>Inicialização</li>
                                    <li className={`step ${errorStage === 'Renderização' ? 'step-error' : 'step-primary'}`}>Renderização</li>
                                    <li className={`step ${errorStage === 'Utilização' ? 'step-error' : 'step-neutral'}`} data-content={errorStage === 'Utilização' ? '✕' : ''}>Utilização</li>
                                </ul>
                            </div>

                            <div className='flex md:hidden flex-col items-center w-full mt-10'>
                                <ul className="steps steps-vertical mt-10">
                                    <li className={`step ${errorStage === 'Inicialização' ? 'step-error' : 'step-primary'}`}>Inicialização</li>
                                    <li className={`step ${errorStage === 'Renderização' ? 'step-error' : 'step-primary'}`}>Renderização</li>
                                    <li className={`step ${errorStage === 'Utilização' ? 'step-error' : 'step-neutral'}`} data-content={errorStage === 'Utilização' ? '✕' : ''}>Utilização</li>
                                </ul>
                            </div>

                            <div className="mockup-code relative w-full my-10">
                                <pre data-prefix="1"><code>Erro: {errorTitle}</code></pre>
                                <pre data-prefix="2"><code>Local: {errorLocation}</code></pre>
                                <FaCopy className='absolute z-10 top-4 right-4 cursor-pointer' onClick={this.handleCopyToClipboard} />
                            </div>

                            <button 
                                onClick={this.handleReload} 
                                className="btn btn-primary"
                            >
                                Atualizar
                            </button>
                        </div>
                    ) : this.props.children}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
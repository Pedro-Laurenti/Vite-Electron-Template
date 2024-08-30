import { ipcRenderer, contextBridge } from 'electron';

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
    on(...args: Parameters<typeof ipcRenderer.on>) {
        const [channel, listener] = args;
        return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
    },
    off(...args: Parameters<typeof ipcRenderer.off>) {
        const [channel, ...omit] = args;
        return ipcRenderer.off(channel, ...omit);
    },
    send(...args: Parameters<typeof ipcRenderer.send>) {
        const [channel, ...omit] = args;
        return ipcRenderer.send(channel, ...omit);
    },
    invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
        const [channel, ...omit] = args;
        return ipcRenderer.invoke(channel, ...omit);
    },
});

// --------- Preload scripts loading ---------

function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
    return new Promise(resolve => {
        if (condition.includes(document.readyState)) {
            resolve(true);
        } else {
            document.addEventListener('readystatechange', () => {
                if (condition.includes(document.readyState)) {
                    resolve(true);
                }
            });
        }
    });
}

const safeDOM = {
    append(parent: HTMLElement, child: HTMLElement) {
        if (!Array.from(parent.children).find(e => e === child)) {
            return parent.appendChild(child);
        }
    },
    remove(parent: HTMLElement, child: HTMLElement) {
        if (Array.from(parent.children).find(e => e === child)) {
            return parent.removeChild(child);
        }
    },
};

function useLoading() {
    const className = `loaders-svg__circle-animation`;
    const styleContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        .app-loading-wrap {
            position: fixed;
            display: flex;
            flex-direction: column-reverse;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.7);
            z-index: 500;
            opacity: 1;
            bottom: 0;
            width: 100%;
            height: 100%;
            transition: opacity 0.3s;
        }
        .APPCONTEUDO {
            opacity: 0;
            transition: opacity 0.3s;
        }
        .fade-in {
            opacity: 1 !important;
        }

        .fade-out {
            opacity: 0;
            animation: fadeOut 0.3s forwards;
        }

        .success-message {
            color: #fff;
            font-size: 1rem;
            opacity: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            transition: opacity 0.3s;
            margin-top: 10px;
        }

        .message-visible {
            opacity: 1;
        }

        .iconloading svg {
            aspect-ratio: 1 / 1;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: spin 1.5s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    const oStyle = document.createElement('style');
    const oDiv = document.createElement('div');
    const oIcon = document.createElement('div');
    const oMessage = document.createElement('div');

    oStyle.id = 'app-loading-style';
    oStyle.innerHTML = styleContent;
    oDiv.className = 'app-loading-wrap';
    oIcon.className = className;
    oIcon.innerHTML = `
        <div class="iconloading">
            <svg viewBox="0 0 230 230" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <path id="move-path" d="M102.546 83.5C109.859 70.8333 128.141 70.8333 135.454 83.5L157.971 122.5C165.284 135.167 156.143 151 141.517 151H96.4833C81.8571 151 72.7158 135.167 80.0289 122.5L102.546 83.5Z" fill="#F8F8F8"/>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -32"/>
                    </filter>
                </defs>
                <g filter="url(#goo)">
                    <circle cx="119" cy="74" r="20" stroke="#6f8191" stroke-width="8"/>
                    <circle cx="79" cy="141" r="20" stroke="#6f8191" stroke-width="8"/>
                    <circle cx="157" cy="141" r="20" stroke="#6f8191" stroke-width="8"/>
                    <circle cx="0" cy="0" r="14" fill="#F8F8F8">
                        <animateMotion path="M102.546 83.5C109.859 70.8333 128.141 70.8333 135.454 83.5L157.971 122.5C165.284 135.167 156.143 151 141.517 151H96.4833C81.8571 151 72.7158 135.167 80.0289 122.5L102.546 83.5Z" dur="2s" repeatCount="indefinite" />
                    </circle> 
                </g>
            </svg>
        </div>
    `;
    oMessage.className = 'success-message';
    oMessage.textContent = 'Conteúdo carregado com sucesso';

    return {
        appendLoading() {
            safeDOM.append(document.head, oStyle);
            safeDOM.append(document.body, oDiv);
            safeDOM.append(oDiv, oMessage);
            safeDOM.append(oDiv, oIcon);
        },
        removeLoading() {
            const appLoadingWrap = document.querySelector('.app-loading-wrap') as HTMLElement;
            const successMessage = document.querySelector('.success-message') as HTMLElement;
            if (appLoadingWrap && successMessage) {
                setTimeout(() => {
                    successMessage.classList.add('message-visible');
                    setTimeout(() => {
                        appLoadingWrap.classList.add('fade-out');
                        setTimeout(() => {
                            safeDOM.remove(document.body, appLoadingWrap);
                        }, 300);
                    }, 1500);
                }, 1000);
            }
        },
    };
}

const { appendLoading, removeLoading } = useLoading();
domReady().then(() => {
    appendLoading();
    setTimeout(() => {
        removeLoading();
        setTimeout(() => {
            const content = document.querySelector('.APPCONTEUDO') as HTMLElement;
            if (content) {
                content.classList.add('fade-in');
                content.classList.remove('hidden');
            }
        }, 300);
    }, 1000);
});

window.onmessage = (ev) => {
    if (ev.data.payload === 'removeLoading') {
        removeLoading();
        setTimeout(() => {
            const content = document.querySelector('.APPCONTEUDO') as HTMLElement;
            if (content) {
                content.classList.add('fade-in');
                content.classList.remove('hidden');
            }
        }, 1000);
    }
};
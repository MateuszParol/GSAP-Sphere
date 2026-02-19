import React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            // eslint-disable-next-line no-console
            console.log('SW Registered: ' + r)
        },
        onRegisterError(error) {
            // eslint-disable-next-line no-console
            console.log('SW registration error', error)
        },
    })

    const close = () => {
        setOfflineReady(false)
        setNeedRefresh(false)
    }

    return (
        <div className="ReloadPrompt-container">
            {(offlineReady || needRefresh) && (
                <div className="ReloadPrompt-toast">
                    <div className="ReloadPrompt-message">
                        {offlineReady
                            ? <span>App ready to work offline</span>
                            : <span>New content available, click on reload button to update.</span>
                        }
                    </div>
                    {needRefresh && (
                        <button className="ReloadPrompt-toast-button" onClick={() => updateServiceWorker(true)}>
                            Reload
                        </button>
                    )}
                    <button className="ReloadPrompt-toast-button" onClick={() => close()}>
                        Close
                    </button>
                </div>
            )}
            <style>{`
        .ReloadPrompt-container {
          padding: 0;
          margin: 0;
          width: 0;
          height: 0;
        }
        .ReloadPrompt-toast {
          position: fixed;
          right: 0;
          bottom: 0;
          margin: 16px;
          padding: 12px;
          border: 1px solid #00ffff;
          border-radius: 4px;
          z-index: 999999;
          text-align: left;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
          background-color: rgba(0, 0, 0, 0.9);
          color: #fff;
          font-family: 'VT323', monospace;
        }
        .ReloadPrompt-message {
          margin-bottom: 8px;
        }
        .ReloadPrompt-toast-button {
          border: 1px solid #d946ef;
          outline: none;
          margin-right: 5px;
          border-radius: 2px;
          padding: 3px 10px;
          cursor: pointer;
          background: transparent;
          color: #d946ef;
          font-family: 'Rajdhani', sans-serif;
          text-transform: uppercase;
        }
        .ReloadPrompt-toast-button:hover {
            background: #d946ef;
            color: #000;
        }
      `}</style>
        </div>
    )
}

export default ReloadPrompt

import { useEffect, useState } from 'react';
import { useTour } from './Tour/TourProvider';

const STORAGE_KEY = 'valhalla:demo-notice-cerrado';

// El navegador puede bloquear el almacenamiento (modo privado, cookies desactivadas): nunca debe romper la app
const yaCerrado = (): boolean => {
    try {
        return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
        return false;
    }
};

/**
 * Aviso flotante: la demo corre en servicios gratuitos, así que algunas funciones
 * pueden tardar. Se puede cerrar y no vuelve a salir durante esa visita; también se
 * cierra solo al empezar un tutorial, porque si no tapa elementos que el tutorial señala.
 */
export const DemoNotice = () => {
    const [visible, setVisible] = useState(() => !yaCerrado());
    const { isActive: tutorialActivo } = useTour();

    const cerrar = () => {
        setVisible(false);
        try {
            sessionStorage.setItem(STORAGE_KEY, '1');
        } catch {
            /* sin almacenamiento, el aviso simplemente volverá a salir en la próxima visita */
        }
    };

    useEffect(() => {
        if (tutorialActivo) cerrar();
    }, [tutorialActivo]);

    if (!visible) return null;

    return (
        <div
            role="status"
            className="print:hidden fixed z-[60] bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm flex items-start gap-3 px-4 py-3 border border-amber-500/40 bg-white/95 dark:bg-[#0f1115]/95 backdrop-blur text-slate-700 dark:text-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
        >
            <span className="mt-1 inline-block w-1 self-stretch bg-amber-500 shrink-0" aria-hidden="true" />
            <div className="flex-1 text-sm leading-snug">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 mb-1">
                    Versión demo
                </p>
                <p>
                    Esta web es una demo alojada en servicios gratuitos, así que algunas funciones
                    (como la ejecución de código) pueden ir ralentizadas o tardar unos segundos en responder.
                </p>
            </div>
            <button
                type="button"
                onClick={cerrar}
                aria-label="Cerrar aviso"
                className="shrink-0 -mr-1 -mt-1 w-7 h-7 grid place-items-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
            >
                ✕
            </button>
        </div>
    );
};

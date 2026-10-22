import React, { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

// 1. DEFINIR TIPO LOCAL
// No usamos el de Monaco porque este estado controla toda la app, no solo el editor.
export type AppTheme = 'light' | 'dark';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    // 2. ESTADO INICIAL
    // Oscuro por defecto. Solo se abre en claro si el usuario lo eligió con el selector de la web
    // (queda guardado). Se ignora la preferencia del sistema: casi todos los navegadores
    // declaran "claro" por defecto aunque nadie lo haya elegido.
    const [theme, setTheme] = useState<AppTheme>(() => {
        try {
            return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
        } catch {
            // Almacenamiento bloqueado (modo privado, cookies desactivadas)
            return 'dark';
        }
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme: AppTheme = prevTheme === 'dark' ? 'light' : 'dark';
            try {
                localStorage.setItem('theme', newTheme);
            } catch { /* sin almacenamiento, el cambio dura solo esta visita */ }
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode: theme === 'dark' }}>
            {children}
        </ThemeContext.Provider>
    );
};
/**
 * Cliente de IA compatible con la API de OpenAI (chat/completions), sin SDK.
 * Por defecto usa el nivel gratuito de Google Gemini, pero sirve cualquier proveedor
 * compatible cambiando variables de entorno:
 *   AI_API_KEY       clave del proveedor (también se acepta GEMINI_API_KEY)
 *   AI_BASE_URL      por defecto https://generativelanguage.googleapis.com/v1beta/openai
 *   AI_MODEL_RAPIDO  por defecto gemini-2.5-flash-lite
 *   AI_MODEL_POTENTE por defecto gemini-2.5-flash
 */
const BASE_URL = (process.env.AI_BASE_URL ?? 'https://generativelanguage.googleapis.com/v1beta/openai').replace(/\/$/, '');
const API_KEY = () => process.env.AI_API_KEY ?? process.env.GEMINI_API_KEY ?? '';

/** Selección de modelo según la tarea. */
export const MODELO = {
    rapido: process.env.AI_MODEL_RAPIDO ?? 'gemini-2.5-flash-lite',  // tareas rutinarias (resúmenes, perfil)
    potente: process.env.AI_MODEL_POTENTE ?? 'gemini-2.5-flash',     // generación/revisión exigente
} as const;

const TIMEOUT_MS = 30_000;

export interface MensajeIA {
    role: 'user' | 'assistant';
    content: string;
}

interface OpcionesChat {
    system: string;
    messages: MensajeIA[];
    modelo?: string;
    temperature?: number;
    maxTokens?: number;
}

interface OpcionesJSON<T> extends OpcionesChat {
    /** Validador opcional de la forma del JSON devuelto. */
    validar?: (x: any) => x is T;
}

async function completar(body: Record<string, unknown>): Promise<string> {
    const key = API_KEY();
    if (!key) throw new Error('Falta AI_API_KEY: la IA no está configurada');

    const r = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!r.ok) {
        const detalle = (await r.text().catch(() => '')).slice(0, 200);
        throw new Error(`El proveedor de IA respondió ${r.status}: ${detalle}`);
    }
    const data: any = await r.json();
    return data.choices?.[0]?.message?.content ?? '';
}

/** Algunos modelos envuelven el JSON en ```json ... ```; lo limpiamos antes de parsear. */
function extraerJSON(raw: string): any {
    const limpio = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    return JSON.parse(limpio || '{}');
}

/**
 * Acceso centralizado a la IA. Reutilizable por todas las funciones de IA.
 */
export class ServicioIA {
    /** Respuesta en texto libre (chat). */
    static async chat(o: OpcionesChat): Promise<string> {
        return completar({
            model: o.modelo ?? MODELO.rapido,
            temperature: o.temperature ?? 0.5,
            max_tokens: o.maxTokens ?? 1024,
            messages: [{ role: 'system', content: o.system }, ...o.messages],
        });
    }

    /**
     * Respuesta forzada a JSON. Reintenta una vez si el parseo o la validación fallan.
     */
    static async json<T = any>(o: OpcionesJSON<T>): Promise<T> {
        const intentar = async (): Promise<T> => {
            const raw = await completar({
                model: o.modelo ?? MODELO.potente,
                temperature: o.temperature ?? 0.3,
                max_tokens: o.maxTokens ?? 2048,
                response_format: { type: 'json_object' },
                messages: [{ role: 'system', content: o.system }, ...o.messages],
            });
            const parsed = extraerJSON(raw);
            if (o.validar && !o.validar(parsed)) {
                throw new Error('La IA devolvió un JSON con forma inválida');
            }
            return parsed as T;
        };

        try {
            return await intentar();
        } catch {
            // Reintento único
            return await intentar();
        }
    }
}

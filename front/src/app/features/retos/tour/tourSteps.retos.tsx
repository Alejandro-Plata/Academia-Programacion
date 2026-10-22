import type { TourStep } from '../../../components/Tour/tourTypes';

const RETOS_ROUTE = '/dashboard/challenges';

export const RETOS_TOUR_ID = 'retos';
export const RETOS_MOBILE_TOUR_ID = 'retos-mobile';

/** Tutorial de escritorio: lista, guía, editor, terminal y herramientas de la cabecera. */
export const retosTourSteps: TourStep[] = [
    {
        id: 'welcome',
        route: RETOS_ROUTE,
        title: '¡Bienvenido a las misiones!',
        body: (
            <>
                Las misiones son retos de programación con <strong>tests automáticos</strong>.
                Este tutorial te enseña a moverte por la sección en <strong>un minuto</strong>;
                puedes cerrarlo cuando quieras.
            </>
        ),
        placement: 'auto',
    },
    {
        id: 'list',
        route: RETOS_ROUTE,
        target: 'retos-list',
        title: 'Tu lista de misiones',
        body: 'Aquí aparecen todas las misiones disponibles, con su dificultad y los lenguajes en los que puedes resolverlas. Pulsa una para abrirla.',
        placement: 'right',
    },
    {
        id: 'search',
        route: RETOS_ROUTE,
        target: 'retos-search',
        title: 'Busca por nombre',
        body: 'Escribe parte del título para filtrar la lista al instante.',
        placement: 'right',
    },
    {
        id: 'filters',
        route: RETOS_ROUTE,
        target: 'retos-filters',
        title: 'Filtra por lenguaje y etiquetas',
        body: 'Despliega los filtros para quedarte solo con las misiones de un lenguaje o de un tema concreto.',
        placement: 'right',
    },
    {
        id: 'guide-tabs',
        route: RETOS_ROUTE,
        target: 'retos-guide-tabs',
        title: 'Guía y solución',
        body: (
            <>
                En <strong>Guía</strong> tienes el enunciado, los ejemplos y las pistas. La pestaña{' '}
                <strong>Solución</strong> se desbloquea cuando completas la misión, para que compares
                tu enfoque con el de referencia.
            </>
        ),
        placement: 'right',
    },
    {
        id: 'editor',
        route: RETOS_ROUTE,
        target: 'retos-editor',
        title: 'Escribe tu código',
        body: 'Este es tu editor. Parte de un código inicial y tu trabajo es completarlo hasta que pasen todos los tests.',
        placement: 'left',
    },
    {
        id: 'language',
        route: RETOS_ROUTE,
        target: 'retos-language',
        title: 'Elige el lenguaje',
        body: 'Si la misión admite varios lenguajes, cámbialo desde aquí. El editor carga el código inicial de cada versión.',
        placement: 'bottom',
    },
    {
        id: 'run',
        route: RETOS_ROUTE,
        target: 'retos-run',
        title: 'Ejecuta los tests',
        body: (
            <>
                Pulsa <strong>Ejecutar</strong> para lanzar los tests contra tu código. Si pasan todos,
                completas la misión y ganas <strong>experiencia</strong> (y quizá un logro).
            </>
        ),
        placement: 'bottom',
    },
    {
        id: 'terminal',
        route: RETOS_ROUTE,
        target: 'retos-terminal',
        title: 'Resultado de los tests',
        body: 'La terminal muestra qué tests han pasado y cuáles no, con el mensaje de error. Léela con calma: casi siempre te dice dónde está el fallo.',
        placement: 'top',
    },
    {
        id: 'freya',
        route: RETOS_ROUTE,
        target: 'retos-freya',
        title: 'Pide ayuda a Freya',
        body: 'Si te atascas, Freya, la asistente de IA, ve tu código y el enunciado y puede orientarte sin destripar la solución.',
        placement: 'bottom',
    },
    {
        id: 'propose',
        route: RETOS_ROUTE,
        target: 'retos-propose',
        title: 'Propón tu propia misión',
        body: 'Con el botón "+" puedes enviar una misión nueva. Los moderadores la revisan y, si la aprueban, se publica para todos.',
        placement: 'bottom',
    },
    {
        id: 'sidebar-toggle',
        route: RETOS_ROUTE,
        target: 'retos-sidebar-toggle',
        title: 'Más espacio para programar',
        body: 'Oculta o muestra la lista de misiones para trabajar con el editor a pantalla más ancha.',
        placement: 'bottom',
    },
    {
        id: 'help',
        route: RETOS_ROUTE,
        target: 'retos-help',
        title: 'Vuelve a ver este tutorial',
        body: 'Pulsa el botón "?" en cualquier momento para relanzar esta guía desde el principio.',
        placement: 'bottom',
    },
];

/** Tutorial móvil: la lista y el espacio de trabajo son vistas distintas, así que el segundo se explica sin señalar. */
export const retosMobileTourSteps: TourStep[] = [
    {
        id: 'welcome',
        route: RETOS_ROUTE,
        title: '¡Bienvenido a las misiones!',
        body: (
            <>
                Las misiones son retos de programación con <strong>tests automáticos</strong>.
                Este tutorial dura <strong>un minuto</strong> y puedes cerrarlo cuando quieras.
            </>
        ),
        placement: 'auto',
    },
    {
        id: 'search',
        route: RETOS_ROUTE,
        target: 'retos-search',
        title: 'Busca por nombre',
        body: 'Escribe parte del título para filtrar las misiones al instante.',
        placement: 'bottom',
    },
    {
        id: 'filters',
        route: RETOS_ROUTE,
        target: 'retos-filters',
        title: 'Filtra por lenguaje y etiquetas',
        body: 'Pulsa el icono de filtros para quedarte con las misiones de un lenguaje o de un tema.',
        placement: 'bottom',
    },
    {
        id: 'list',
        route: RETOS_ROUTE,
        target: 'retos-list',
        title: 'Elige una misión',
        body: 'Cada tarjeta muestra la dificultad y los lenguajes disponibles. Tócala para abrirla.',
        placement: 'top',
    },
    {
        id: 'workspace',
        route: RETOS_ROUTE,
        title: 'Dentro de una misión',
        body: (
            <>
                Verás tres pestañas: <strong>Misión</strong> (el enunciado), <strong>Código</strong> (tu editor)
                y <strong>Solución</strong>, que se desbloquea al completarla. Pulsa <strong>RUN</strong> para
                lanzar los tests; la terminal de abajo muestra el resultado. Si te atascas, el botón de Freya te echa una mano.
            </>
        ),
        placement: 'auto',
    },
    {
        id: 'propose',
        route: RETOS_ROUTE,
        target: 'retos-propose',
        title: 'Propón tu propia misión',
        body: 'El botón "+" te deja enviar una misión nueva. Si los moderadores la aprueban, se publica para todos.',
        placement: 'top',
    },
    {
        id: 'help',
        route: RETOS_ROUTE,
        target: 'retos-help',
        title: 'Vuelve a ver este tutorial',
        body: 'Pulsa el botón "?" en cualquier momento para relanzar esta guía.',
        placement: 'bottom',
    },
];

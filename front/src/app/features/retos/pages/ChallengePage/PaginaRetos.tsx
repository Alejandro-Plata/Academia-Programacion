import { useEffect } from 'react';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import { useUser } from '../../../../context/UserContext';
import { useTour } from '../../../../components/Tour/TourProvider';
import { RETOS_TOUR_ID, RETOS_MOBILE_TOUR_ID } from '../../tour/tourSteps.retos';
import { RetosDesktop } from './RetosDesktop';
import { RetosMobile } from './RetosMobile';

const TOUR_SEEN_KEY = (userId: string) => `valhalla:tour:retos:v1:${userId}`;

export const PaginaRetos = () => {
    const isMobile = useIsMobile();
    const { user } = useUser();
    const { start, isActive } = useTour();
    const tourId = isMobile ? RETOS_MOBILE_TOUR_ID : RETOS_TOUR_ID;

    // Primera visita: lanza el tutorial una sola vez por usuario
    useEffect(() => {
        if (!user?.user_id || isActive) return;
        const key = TOUR_SEEN_KEY(user.user_id);
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, '1');
            start(tourId);
        }
    // Solo al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.user_id]);

    const handleStartTour = () => start(tourId);

    return isMobile
        ? <RetosMobile onStartTour={handleStartTour} />
        : <RetosDesktop onStartTour={handleStartTour} />;
};

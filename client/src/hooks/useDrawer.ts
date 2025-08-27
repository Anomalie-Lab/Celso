import { useEffect } from 'react';

export const useDrawer = (isOpen: boolean) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('drawer-open');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.classList.remove('drawer-open');
            document.body.style.overflow = 'auto';
        }  
        return () => {
            document.body.classList.remove('drawer-open');
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);
};

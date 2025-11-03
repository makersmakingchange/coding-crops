import { FarmManager } from './FarmManager';

declare global {
    interface Window {
        farmManager: FarmManager;
    }
}

const farmManager = new FarmManager();

if (typeof window !== 'undefined') {
    window.farmManager = farmManager;
}

export default farmManager;

import store from "@/store";

export const checkTokenExpiration = () => {
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (expirationTime) {
        const currentTime = Date.now();
        const timeUntilExpiration = parseInt(expirationTime) - currentTime;

        if (timeUntilExpiration > 0) {
            setTimeout(() => {
                store.dispatch('logout');
                store.commit('SET_ALERT', {
                    type: 'warning',
                    message: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.'
                });
            }, timeUntilExpiration);
        } else {
            store.dispatch('logout');
            store.commit('SET_ALERT', {
                type: 'warning',
                message: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.'
            });
        }
    }
};

export const setTokenExpiration = (expirationInSeconds) => {
    const expirationTime = Date.now() + expirationInSeconds * 1000;
    localStorage.setItem('tokenExpiration', expirationTime.toString());
};
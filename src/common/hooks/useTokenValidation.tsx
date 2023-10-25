import { checkToken } from 'common/auth.service';
import { useMemo } from 'react';

export const useTokenValidation = (token: string): Promise<boolean> | null => {
    const isTokenValid = useMemo(() => {
        if (!!token) {
            const result = checkToken(token)
                .then(() => true)
                .catch(() => false);
            return result;
        }
        return null;
    }, [token]);

    return isTokenValid;
};

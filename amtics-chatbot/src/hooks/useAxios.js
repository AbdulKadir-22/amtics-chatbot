import { useState, useCallback } from 'react';
import api from '../api/api';

export const useAxios = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (config) => {
        setLoading(true);
        setError(null);
        try {
            const result = await api(config);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, request };
};

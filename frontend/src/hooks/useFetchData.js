import { useEffect, useState, useCallback } from "react";

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const authToken = localStorage.getItem("token");
            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to fetch data");
            }

            setData(result.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = () => {
        fetchData();
    };

    return {
        data,
        loading,
        error,
        refetch,
    };
};

export default useFetchData;

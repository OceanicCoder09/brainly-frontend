// src/hooks/useContent.jsx
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const useContent = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContent = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found in localStorage.");
        return;
      }

      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContents(response.data?.content || []);
    } catch (err) {
      console.error("Error fetching content:", err);
      setContents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { contents, refresh: fetchContent, loading };
};

export default useContent;

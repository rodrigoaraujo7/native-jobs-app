import { useState, useEffect } from 'react';
import axios from 'axios';

const useFecth = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': '4d1d3527ccmsh1abab9b03ee72e2p14f4dajsn19e4ff502a2d',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false)
    } catch(error) {
      setError(error);
      // console.log(error);
      alert('There is an error')
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch };
}

export default useFecth;
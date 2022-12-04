import {useQuery} from '@apollo/client';
import {getProfiles} from 'graphql/queries';
import React, {useState, useEffect} from 'react';

const useGetHandle = () => {
  if (loading) return 'Loading..';
  if (error) return `Error! ${error.message}`;

  useEffect(() => {
    const {loading, error, data: profileData} = useQuery(getProfiles);
  }, []);

  return {loading, error, profileData};
};

export default useGetHandle;

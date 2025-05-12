import Constants from 'expo-constants';

const {
  userApiBaseUrl,
  adminApiBaseUrl,
  googleMapsApiKey,
} = Constants.expoConfig.extra;

export const API = {
  USER: userApiBaseUrl,
  ADMIN: adminApiBaseUrl,
};

export const GOOGLE_MAPS_KEY = googleMapsApiKey;

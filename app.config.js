import 'dotenv/config';

export default {
  expo: {
    name: "notetest-app",
    slug: "notetest-app",
    scheme: "acme",
    version: "1.0.0",
    newArchEnabled: true,
    owner: "kimjammin",
    extra: {
      // JS 코드에서 사용할 환경변수들
      userApiBaseUrl: process.env.USER_API_BASE_URL,
      adminApiBaseUrl: process.env.ADMIN_API_BASE_URL,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      router: {
        origin: false,
      },
      eas: {
        projectId: "a9d5641f-a6a1-4273-8e59-9b34a35c354f",
      },
    },
    android: {
      package: "com.anonymous.notetestapp",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
        "android.permission.CAMERA",
        "WRITE_EXTERNAL_STORAGE",
        "VIBRATE",
        "android.permission.RECORD_AUDIO",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_BACKGROUND_LOCATION",
        "android.permission.FOREGROUND_SERVICE",
        "android.permission.FOREGROUND_SERVICE_LOCATION"
      ],
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      bundler: "metro",
    },
    plugins: [
      "expo-router",
      "expo-camera",
      [
        "expo-location",
        {
          isAndroidBackgroundLocationEnabled: true,
        }
      ],
      "expo-apple-authentication",
      [
        "expo-build-properties",
        {
          android: {
            useCleartextTraffic: true,
          },
        }
      ]
    ]
  }
};

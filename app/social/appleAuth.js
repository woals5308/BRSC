// app/social/appleAuth.js
import * as AppleAuthentication from 'expo-apple-authentication';


//apple 소셜 로그인

export const appleSignIn = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    return credential; // 인증된 정보를 반환
  } catch (e) {
    if (e.code === 'ERR_REQUEST_CANCELED') {
      console.log('User cancelled the sign-in flow');
    } else {
      console.error('Apple Authentication Error:', e);
    }
  }
};

export interface NaverLoginInitParams {
    consumerKey: string;
    consumerSecret: string;
    appName: string;
    /** (iOS) 네이버앱을 사용하는 인증을 비활성화 한다. (default: false) */
    disableNaverAppAuthIOS?: boolean;
    /** (iOS) Info.plist의 서비스에서 설정한 URL Type의 Schemes */
    serviceUrlSchemeIOS?: string;
}
export interface NaverLoginResponse {
    isSuccess: boolean;
    /** isSuccess가 true일 때 존재합니다. */
    successResponse?: {
        accessToken: string;
        refreshToken: string;
        expiresAtUnixSecondString: string;
        tokenType: string;
    };
    /** isSuccess가 false일 때 존재합니다. */
    failureResponse?: {
        message: string;
        isCancel: boolean;
        /** Android Only */
        lastErrorCodeFromNaverSDK?: string;
        /** Android Only */
        lastErrorDescriptionFromNaverSDK?: string;
    };
}
export interface GetProfileResponse {
    resultcode: string;
    message: string;
    response: {
        id: string;
        profile_image: string | null;
        email: string;
        name: string;
        birthday: string | null;
        age: string | null;
        birthyear: number | null;
        gender: string | null;
        mobile: string | null;
        mobile_e164: string | null;
        nickname: string | null;
    };
}
declare const NaverLogin: {
    initialize: ({ appName, consumerKey, consumerSecret, disableNaverAppAuthIOS, serviceUrlSchemeIOS, }: NaverLoginInitParams) => void;
    login: () => Promise<NaverLoginResponse>;
    logout: () => Promise<void>;
    deleteToken: () => Promise<void>;
    getProfile: (token: string) => Promise<GetProfileResponse>;
};
export default NaverLogin;

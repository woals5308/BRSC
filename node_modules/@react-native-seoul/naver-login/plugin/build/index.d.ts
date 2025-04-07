import type { ConfigPlugin } from '@expo/config-plugins';
interface NaverLoginPluginProps {
    urlScheme: string;
}
declare const withNaverLogin: ConfigPlugin<NaverLoginPluginProps>;
export default withNaverLogin;

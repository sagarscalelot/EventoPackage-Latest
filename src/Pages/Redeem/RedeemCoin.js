import React from 'react'
// import Advertisement from '../Advertisement';
import { useIntl } from "react-intl";

const RedeemCoin = () => {
  const intl = useIntl();
  return (
    <div className="wrapper min-h-full">
      <div className="space-y-7 h-full">
        {/* <!-- title-holder  --> */}
        <div className="flex justify-between items-center">
          <h1><span>{intl.formatMessage({ id: "REFER TO EARN" })}</span>
          </h1>
          <button type="button" className="btn-primary text-base"><span>{intl.formatMessage({ id: "REDEEM" })}</span>
          </button>
        </div>
        <div className="py-3.5 px-5 rounded-lg bg-spiroDiscoBall flex items-center justify-between">
          <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44.7295 16.7127V22.4561C44.7295 24.0224 43.4598 25.2921 41.8935 25.2921H7.92976C6.36342 25.2921 5.09375 24.0224 5.09375 22.4561V16.7127C5.09375 15.1476 6.36342 13.8779 7.92976 13.8779H41.8934C43.4598 13.8779 44.7295 15.1476 44.7295 16.7127Z" fill="#DD9F3A" />
            <path d="M39.6357 28.1278V33.8711C39.6357 35.4375 38.3661 36.7071 36.7997 36.7071H2.83601C1.26967 36.7071 0 35.4375 0 33.8711V28.1278C0 26.5626 1.26967 25.293 2.83601 25.293H36.7996C38.3661 25.293 39.6357 26.5626 39.6357 28.1278Z" fill="#DD9F3A" />
            <path d="M41.5459 39.5428V45.2862C41.5459 46.8525 40.2762 48.1222 38.7099 48.1222H4.74617C3.17982 48.1222 1.91016 46.8525 1.91016 45.2862V39.5428C1.91016 37.9777 3.17982 36.708 4.74617 36.708H38.7098C40.2762 36.708 41.5459 37.9777 41.5459 39.5428Z" fill="#DD9F3A" />
            <path d="M39.6357 50.9578V56.7012C39.6357 58.2675 38.3661 59.5372 36.7997 59.5372H2.83601C1.26967 59.5372 0 58.2675 0 56.7012V50.9578C0 49.3927 1.26967 48.123 2.83601 48.123H36.7996C38.3661 48.123 39.6357 49.3927 39.6357 50.9578Z" fill="#DD9F3A" />
            <path d="M39.636 50.9578V54.9183C39.636 56.3828 38.5256 57.5888 37.1006 57.7391C37.0013 57.7493 36.9018 57.7543 36.8 57.7543H9.81625C8.25111 57.7543 6.98145 56.4847 6.98145 54.9183V50.9578C6.98145 49.3927 8.25111 48.123 9.81625 48.123H36.8C38.3664 48.123 39.636 49.3927 39.636 50.9578Z" fill="#F4B74A" />
            <path d="M39.636 50.9578V54.9183C39.636 56.3828 38.5256 57.5888 37.1006 57.7391C37.0013 57.7493 36.9018 57.7543 36.8 57.7543H9.81625C8.25111 57.7543 6.98145 56.4847 6.98145 54.9183V50.9578C6.98145 49.3927 8.25111 48.123 9.81625 48.123H36.8C38.3664 48.123 39.636 49.3927 39.636 50.9578Z" fill="#F4B74A" />
            <path d="M39.6355 39.5423V43.5028C39.6355 44.9673 38.5251 46.1733 37.1001 46.3236C37.0008 46.3337 36.9013 46.3388 36.7995 46.3388H9.81575C8.25062 46.3388 6.98096 45.0691 6.98096 43.5028V39.5423C6.98096 37.9772 8.25062 36.7075 9.81575 36.7075H36.7995C38.366 36.7074 39.6355 37.9771 39.6355 39.5423Z" fill="#F4B74A" />
            <path d="M39.6355 28.1283V32.0887C39.6355 33.5532 38.5251 34.7592 37.1001 34.9095C37.0008 34.9197 36.9013 34.9248 36.7995 34.9248H9.81575C8.25062 34.9248 6.98096 33.6551 6.98096 32.0887V28.1283C6.98096 26.5631 8.25062 25.2935 9.81575 25.2935H36.7995C38.366 25.2935 39.6355 26.5631 39.6355 28.1283Z" fill="#F4B74A" />
            <path d="M44.7293 16.7127V20.6732C44.7293 22.1377 43.6188 23.3437 42.1938 23.494C42.0945 23.5041 41.9951 23.5092 41.8933 23.5092H14.9095C13.3444 23.5092 12.0747 22.2396 12.0747 20.6732V16.7127C12.0747 15.1476 13.3444 13.8779 14.9095 13.8779H41.8933C43.4597 13.8779 44.7293 15.1476 44.7293 16.7127Z" fill="#F4B74A" />
            <path d="M39.6361 50.9583V56.7017C39.6361 58.1662 38.5257 59.3722 37.1006 59.5224C36.8421 59.5326 36.5836 59.5377 36.325 59.5377C33.5846 59.5377 30.844 58.9735 28.2919 57.8427C26.5791 57.0851 24.9541 56.0714 23.4693 54.8043C23.072 54.4656 22.6874 54.1089 22.3117 53.7345C20.6346 52.0574 19.3216 50.1548 18.3716 48.1235H36.8001C38.3664 48.1235 39.6361 49.3932 39.6361 50.9583Z" fill="#DD9F3A" />
            <path d="M39.6363 39.5428V45.2861C39.6363 46.8525 38.3666 48.1222 36.8003 48.1222H20.2795C18.6023 44.5373 18.0573 40.5526 18.6455 36.708H36.8003C38.3666 36.7079 39.6363 37.9777 39.6363 39.5428Z" fill="#DD9F3A" />
            <path d="M39.6357 5.29769V11.041C39.6357 12.6074 38.3661 13.877 36.7997 13.877H2.83601C1.26967 13.8772 0 12.6075 0 11.0412V5.29769C0 3.73256 1.26967 2.46289 2.83601 2.46289H36.7996C38.3661 2.46301 39.6357 3.73268 39.6357 5.29769Z" fill="#DD9F3A" />
            <path d="M39.636 5.2972V9.25769C39.636 10.7222 38.5256 11.9282 37.1006 12.0784C37.0013 12.0886 36.9018 12.0937 36.8 12.0937H9.81625C8.25111 12.0937 6.98145 10.824 6.98145 9.25769V5.2972C6.98145 3.73207 8.25111 2.4624 9.81625 2.4624H36.8C38.3664 2.46252 39.636 3.73219 39.636 5.2972Z" fill="#F4B74A" />
            <path d="M34.9737 2.4624H30.8145V12.0937H34.9737V2.4624Z" fill="#F9C662" />
            <path d="M27.7578 2.4624H25.6782V12.0937H27.7578V2.4624Z" fill="#F9C662" />
            <path d="M39.9839 13.8784H35.8242V25.2939H39.9839V13.8784Z" fill="#F9C662" />
            <path d="M32.7669 13.8784H30.687V25.2939H32.7669V13.8784Z" fill="#F9C662" />
            <path d="M44.7297 20.6008V22.4563C44.7297 24.0227 43.46 25.2923 41.8936 25.2923H25.9229C31.1047 20.407 38.2744 18.8434 44.7297 20.6008Z" fill="#DD9F3A" />
            <path d="M39.6358 28.1283V33.8716C39.6358 35.4379 38.3662 36.7076 36.7998 36.7076H16.7349C17.3499 32.6809 19.2093 28.8082 22.3101 25.7074C22.4514 25.566 22.5941 25.4285 22.7381 25.2935H36.7998C38.3662 25.2935 39.6358 26.5631 39.6358 28.1283Z" fill="#DD9F3A" />
            <path d="M56.1959 53.7334C50.2347 59.6936 41.4223 61.0637 34.1501 57.842C32.4373 57.0841 30.8115 56.0714 29.3274 54.804C28.93 54.4656 28.5444 54.108 28.1689 53.7334C20.43 45.9936 20.43 33.4463 28.1689 25.7065C35.9087 17.9676 48.4561 17.9676 56.1959 25.7065C56.5714 26.082 56.9279 26.4675 57.2665 26.865C58.5338 28.348 59.5465 29.9748 60.3045 31.6876C63.5262 38.9589 62.156 47.7724 56.1959 53.7334Z" fill="#F4B74A" />
            <path d="M60.3046 31.6874L34.1503 57.8418C32.4376 57.0839 30.8118 56.0712 29.3276 54.8038L57.2667 26.8647C58.5339 28.3478 59.5466 29.9747 60.3046 31.6874Z" fill="#F9C662" />
            <path d="M56.196 39.7198C56.196 47.4592 49.9219 53.7332 42.1827 53.7332C37.814 53.7332 33.9129 51.7347 31.3424 48.6012C29.3589 46.1837 28.1694 43.0906 28.1694 39.7198C28.1694 31.9805 34.4435 25.7065 42.1827 25.7065C45.5542 25.7065 48.6474 26.8977 51.0648 28.8814C54.1975 31.4507 56.196 35.3521 56.196 39.7198Z" fill="#FFD488" />
            <path d="M51.065 28.8814L31.3443 48.6021L31.3424 48.6012C30.7635 47.8959 30.2522 47.1324 29.8192 46.3215C29.3255 45.4 28.9329 44.4179 28.6544 43.3874C28.3382 42.2183 28.1694 40.9883 28.1694 39.7199C28.1694 31.9805 34.4435 25.7065 42.1827 25.7065C43.4522 25.7065 44.682 25.8751 45.8503 26.1915C46.8808 26.47 47.8629 26.8636 48.7844 27.3573C49.5954 27.7904 50.3587 28.3025 51.065 28.8814Z" fill="#F9C662" />
            <path d="M48.7843 27.3572L29.8191 46.3215C29.3254 45.4 28.9328 44.4179 28.6543 43.3874L45.8503 26.1914C46.8806 26.4699 47.8628 26.8635 48.7843 27.3572Z" fill="#FFD488" />
            <path d="M43.138 38.8413V33.5815C44.5305 33.906 45.5495 34.9203 45.5495 36.1187C45.5495 36.6462 45.977 37.0738 46.5046 37.0738C47.0322 37.0738 47.4597 36.6462 47.4597 36.1187C47.4597 33.8878 45.593 32.0277 43.1378 31.6384V31.0766C43.1378 30.5492 42.7104 30.1216 42.1828 30.1216C41.6552 30.1216 41.2277 30.5492 41.2277 31.0766V31.6384C38.7725 32.0278 36.9058 33.888 36.9058 36.1187C36.9058 38.3495 38.7725 40.2098 41.2277 40.5991V45.8589C39.8351 45.5344 38.816 44.5201 38.816 43.3216C38.816 42.7941 38.3886 42.3666 37.8609 42.3666C37.3333 42.3666 36.9059 42.7941 36.9059 43.3216C36.9059 45.5525 38.7727 47.4127 41.2278 47.802V48.3637C41.2278 48.8912 41.6553 49.3188 42.1829 49.3188C42.7105 49.3188 43.138 48.8912 43.138 48.3637V47.802C45.5931 47.4127 47.4598 45.5524 47.4598 43.3216C47.4598 41.0908 45.5931 39.2307 43.138 38.8413ZM38.8161 36.1186C38.8161 34.9202 39.8351 33.9059 41.2278 33.5813V38.6559C39.8353 38.3315 38.8161 37.3171 38.8161 36.1186ZM43.138 45.8589V40.7844C44.5305 41.1089 45.5495 42.1232 45.5495 43.3216C45.5495 44.5201 44.5305 45.5344 43.138 45.8589Z" fill="#E0A33F" />
            <path d="M42.1828 54.6885C37.6819 54.6885 33.4617 52.6907 30.604 49.207C28.4183 46.5431 27.2144 43.1738 27.2144 39.72C27.2144 31.4663 33.9292 24.7515 42.1828 24.7515C45.6357 24.7515 49.0053 25.956 51.6709 28.1429C55.1538 30.9998 57.1512 35.2194 57.1512 39.7198C57.1511 47.9736 50.4365 54.6885 42.1828 54.6885ZM42.1828 26.6617C34.9825 26.6617 29.1246 32.5196 29.1246 39.72C29.1246 42.733 30.1745 45.6721 32.0809 47.9954C34.5742 51.0349 38.2561 52.7782 42.1828 52.7782C49.3831 52.7782 55.241 46.9203 55.241 39.72C55.241 35.7939 53.4981 32.1125 50.4592 29.6199C48.1345 27.7122 45.195 26.6617 42.1828 26.6617Z" fill="#E0A33F" />
          </svg>
          <h1 className="text-white"><span className="font-normal"><span>{intl.formatMessage({ id: "YOU HAVE :" })}</span>
          </span><span>{intl.formatMessage({ id: "250 F-COINS" })}</span>
          </h1>
          <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44.7295 16.7127V22.4561C44.7295 24.0224 43.4598 25.2921 41.8935 25.2921H7.92976C6.36342 25.2921 5.09375 24.0224 5.09375 22.4561V16.7127C5.09375 15.1476 6.36342 13.8779 7.92976 13.8779H41.8934C43.4598 13.8779 44.7295 15.1476 44.7295 16.7127Z" fill="#DD9F3A" />
            <path d="M39.6357 28.1278V33.8711C39.6357 35.4375 38.3661 36.7071 36.7997 36.7071H2.83601C1.26967 36.7071 0 35.4375 0 33.8711V28.1278C0 26.5626 1.26967 25.293 2.83601 25.293H36.7996C38.3661 25.293 39.6357 26.5626 39.6357 28.1278Z" fill="#DD9F3A" />
            <path d="M41.5459 39.5428V45.2862C41.5459 46.8525 40.2762 48.1222 38.7099 48.1222H4.74617C3.17982 48.1222 1.91016 46.8525 1.91016 45.2862V39.5428C1.91016 37.9777 3.17982 36.708 4.74617 36.708H38.7098C40.2762 36.708 41.5459 37.9777 41.5459 39.5428Z" fill="#DD9F3A" />
            <path d="M39.6357 50.9578V56.7012C39.6357 58.2675 38.3661 59.5372 36.7997 59.5372H2.83601C1.26967 59.5372 0 58.2675 0 56.7012V50.9578C0 49.3927 1.26967 48.123 2.83601 48.123H36.7996C38.3661 48.123 39.6357 49.3927 39.6357 50.9578Z" fill="#DD9F3A" />
            <path d="M39.636 50.9578V54.9183C39.636 56.3828 38.5256 57.5888 37.1006 57.7391C37.0013 57.7493 36.9018 57.7543 36.8 57.7543H9.81625C8.25111 57.7543 6.98145 56.4847 6.98145 54.9183V50.9578C6.98145 49.3927 8.25111 48.123 9.81625 48.123H36.8C38.3664 48.123 39.636 49.3927 39.636 50.9578Z" fill="#F4B74A" />
            <path d="M39.636 50.9578V54.9183C39.636 56.3828 38.5256 57.5888 37.1006 57.7391C37.0013 57.7493 36.9018 57.7543 36.8 57.7543H9.81625C8.25111 57.7543 6.98145 56.4847 6.98145 54.9183V50.9578C6.98145 49.3927 8.25111 48.123 9.81625 48.123H36.8C38.3664 48.123 39.636 49.3927 39.636 50.9578Z" fill="#F4B74A" />
            <path d="M39.6355 39.5423V43.5028C39.6355 44.9673 38.5251 46.1733 37.1001 46.3236C37.0008 46.3337 36.9013 46.3388 36.7995 46.3388H9.81575C8.25062 46.3388 6.98096 45.0691 6.98096 43.5028V39.5423C6.98096 37.9772 8.25062 36.7075 9.81575 36.7075H36.7995C38.366 36.7074 39.6355 37.9771 39.6355 39.5423Z" fill="#F4B74A" />
            <path d="M39.6355 28.1283V32.0887C39.6355 33.5532 38.5251 34.7592 37.1001 34.9095C37.0008 34.9197 36.9013 34.9248 36.7995 34.9248H9.81575C8.25062 34.9248 6.98096 33.6551 6.98096 32.0887V28.1283C6.98096 26.5631 8.25062 25.2935 9.81575 25.2935H36.7995C38.366 25.2935 39.6355 26.5631 39.6355 28.1283Z" fill="#F4B74A" />
            <path d="M44.7293 16.7127V20.6732C44.7293 22.1377 43.6188 23.3437 42.1938 23.494C42.0945 23.5041 41.9951 23.5092 41.8933 23.5092H14.9095C13.3444 23.5092 12.0747 22.2396 12.0747 20.6732V16.7127C12.0747 15.1476 13.3444 13.8779 14.9095 13.8779H41.8933C43.4597 13.8779 44.7293 15.1476 44.7293 16.7127Z" fill="#F4B74A" />
            <path d="M39.6361 50.9583V56.7017C39.6361 58.1662 38.5257 59.3722 37.1006 59.5224C36.8421 59.5326 36.5836 59.5377 36.325 59.5377C33.5846 59.5377 30.844 58.9735 28.2919 57.8427C26.5791 57.0851 24.9541 56.0714 23.4693 54.8043C23.072 54.4656 22.6874 54.1089 22.3117 53.7345C20.6346 52.0574 19.3216 50.1548 18.3716 48.1235H36.8001C38.3664 48.1235 39.6361 49.3932 39.6361 50.9583Z" fill="#DD9F3A" />
            <path d="M39.6363 39.5428V45.2861C39.6363 46.8525 38.3666 48.1222 36.8003 48.1222H20.2795C18.6023 44.5373 18.0573 40.5526 18.6455 36.708H36.8003C38.3666 36.7079 39.6363 37.9777 39.6363 39.5428Z" fill="#DD9F3A" />
            <path d="M39.6357 5.29769V11.041C39.6357 12.6074 38.3661 13.877 36.7997 13.877H2.83601C1.26967 13.8772 0 12.6075 0 11.0412V5.29769C0 3.73256 1.26967 2.46289 2.83601 2.46289H36.7996C38.3661 2.46301 39.6357 3.73268 39.6357 5.29769Z" fill="#DD9F3A" />
            <path d="M39.636 5.2972V9.25769C39.636 10.7222 38.5256 11.9282 37.1006 12.0784C37.0013 12.0886 36.9018 12.0937 36.8 12.0937H9.81625C8.25111 12.0937 6.98145 10.824 6.98145 9.25769V5.2972C6.98145 3.73207 8.25111 2.4624 9.81625 2.4624H36.8C38.3664 2.46252 39.636 3.73219 39.636 5.2972Z" fill="#F4B74A" />
            <path d="M34.9737 2.4624H30.8145V12.0937H34.9737V2.4624Z" fill="#F9C662" />
            <path d="M27.7578 2.4624H25.6782V12.0937H27.7578V2.4624Z" fill="#F9C662" />
            <path d="M39.9839 13.8784H35.8242V25.2939H39.9839V13.8784Z" fill="#F9C662" />
            <path d="M32.7669 13.8784H30.687V25.2939H32.7669V13.8784Z" fill="#F9C662" />
            <path d="M44.7297 20.6008V22.4563C44.7297 24.0227 43.46 25.2923 41.8936 25.2923H25.9229C31.1047 20.407 38.2744 18.8434 44.7297 20.6008Z" fill="#DD9F3A" />
            <path d="M39.6358 28.1283V33.8716C39.6358 35.4379 38.3662 36.7076 36.7998 36.7076H16.7349C17.3499 32.6809 19.2093 28.8082 22.3101 25.7074C22.4514 25.566 22.5941 25.4285 22.7381 25.2935H36.7998C38.3662 25.2935 39.6358 26.5631 39.6358 28.1283Z" fill="#DD9F3A" />
            <path d="M56.1959 53.7334C50.2347 59.6936 41.4223 61.0637 34.1501 57.842C32.4373 57.0841 30.8115 56.0714 29.3274 54.804C28.93 54.4656 28.5444 54.108 28.1689 53.7334C20.43 45.9936 20.43 33.4463 28.1689 25.7065C35.9087 17.9676 48.4561 17.9676 56.1959 25.7065C56.5714 26.082 56.9279 26.4675 57.2665 26.865C58.5338 28.348 59.5465 29.9748 60.3045 31.6876C63.5262 38.9589 62.156 47.7724 56.1959 53.7334Z" fill="#F4B74A" />
            <path d="M60.3046 31.6874L34.1503 57.8418C32.4376 57.0839 30.8118 56.0712 29.3276 54.8038L57.2667 26.8647C58.5339 28.3478 59.5466 29.9747 60.3046 31.6874Z" fill="#F9C662" />
            <path d="M56.196 39.7198C56.196 47.4592 49.9219 53.7332 42.1827 53.7332C37.814 53.7332 33.9129 51.7347 31.3424 48.6012C29.3589 46.1837 28.1694 43.0906 28.1694 39.7198C28.1694 31.9805 34.4435 25.7065 42.1827 25.7065C45.5542 25.7065 48.6474 26.8977 51.0648 28.8814C54.1975 31.4507 56.196 35.3521 56.196 39.7198Z" fill="#FFD488" />
            <path d="M51.065 28.8814L31.3443 48.6021L31.3424 48.6012C30.7635 47.8959 30.2522 47.1324 29.8192 46.3215C29.3255 45.4 28.9329 44.4179 28.6544 43.3874C28.3382 42.2183 28.1694 40.9883 28.1694 39.7199C28.1694 31.9805 34.4435 25.7065 42.1827 25.7065C43.4522 25.7065 44.682 25.8751 45.8503 26.1915C46.8808 26.47 47.8629 26.8636 48.7844 27.3573C49.5954 27.7904 50.3587 28.3025 51.065 28.8814Z" fill="#F9C662" />
            <path d="M48.7843 27.3572L29.8191 46.3215C29.3254 45.4 28.9328 44.4179 28.6543 43.3874L45.8503 26.1914C46.8806 26.4699 47.8628 26.8635 48.7843 27.3572Z" fill="#FFD488" />
            <path d="M43.138 38.8413V33.5815C44.5305 33.906 45.5495 34.9203 45.5495 36.1187C45.5495 36.6462 45.977 37.0738 46.5046 37.0738C47.0322 37.0738 47.4597 36.6462 47.4597 36.1187C47.4597 33.8878 45.593 32.0277 43.1378 31.6384V31.0766C43.1378 30.5492 42.7104 30.1216 42.1828 30.1216C41.6552 30.1216 41.2277 30.5492 41.2277 31.0766V31.6384C38.7725 32.0278 36.9058 33.888 36.9058 36.1187C36.9058 38.3495 38.7725 40.2098 41.2277 40.5991V45.8589C39.8351 45.5344 38.816 44.5201 38.816 43.3216C38.816 42.7941 38.3886 42.3666 37.8609 42.3666C37.3333 42.3666 36.9059 42.7941 36.9059 43.3216C36.9059 45.5525 38.7727 47.4127 41.2278 47.802V48.3637C41.2278 48.8912 41.6553 49.3188 42.1829 49.3188C42.7105 49.3188 43.138 48.8912 43.138 48.3637V47.802C45.5931 47.4127 47.4598 45.5524 47.4598 43.3216C47.4598 41.0908 45.5931 39.2307 43.138 38.8413ZM38.8161 36.1186C38.8161 34.9202 39.8351 33.9059 41.2278 33.5813V38.6559C39.8353 38.3315 38.8161 37.3171 38.8161 36.1186ZM43.138 45.8589V40.7844C44.5305 41.1089 45.5495 42.1232 45.5495 43.3216C45.5495 44.5201 44.5305 45.5344 43.138 45.8589Z" fill="#E0A33F" />
            <path d="M42.1828 54.6885C37.6819 54.6885 33.4617 52.6907 30.604 49.207C28.4183 46.5431 27.2144 43.1738 27.2144 39.72C27.2144 31.4663 33.9292 24.7515 42.1828 24.7515C45.6357 24.7515 49.0053 25.956 51.6709 28.1429C55.1538 30.9998 57.1512 35.2194 57.1512 39.7198C57.1511 47.9736 50.4365 54.6885 42.1828 54.6885ZM42.1828 26.6617C34.9825 26.6617 29.1246 32.5196 29.1246 39.72C29.1246 42.733 30.1745 45.6721 32.0809 47.9954C34.5742 51.0349 38.2561 52.7782 42.1828 52.7782C49.3831 52.7782 55.241 46.9203 55.241 39.72C55.241 35.7939 53.4981 32.1125 50.4592 29.6199C48.1345 27.7122 45.195 26.6617 42.1828 26.6617Z" fill="#E0A33F" />
          </svg>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between p-2.5 bg-white rounded-md">
            <div className="flex items-center space-x-4">
              <div className="rounded bg-[#D5DBFF] text-4xl w-14 h-14 flex items-center justify-center">
                <i className="icon-reward"></i>
              </div>
              <div>
                <h3 className="text-base"><span>{intl.formatMessage({ id: "COIN REDEEM" })}</span></h3>
                <span className="input-titel">{intl.formatMessage({ id: "PROCESSING" })}</span>
              </div>
            </div>
            <div className="flex items-center">
              <p className="pr-5 border-r-2 border-quicksilver"><span>{intl.formatMessage({ id: "JAN 18, 2021" })}</span></p><h3 className="pl-5 pr-3 text-red-500">{intl.formatMessage({ id: "-325" })}</h3>
            </div>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-white rounded-md">
            <div className="flex items-center space-x-4">
              <div className="rounded bg-[#FFF0C8] text-3xl w-14 h-14 flex items-center justify-center">
                <i className="icon-users"></i>
              </div>
              <div>
                <h3 className="text-base"><span>{intl.formatMessage({ id: "LOGIN REFER" })}</span></h3>
                <span className="input-titel">{intl.formatMessage({ id: "REFER BY MARK JECNO" })}</span>
              </div>
            </div>
            <div className="flex items-center">
              <p className="pr-5 border-r-2 border-quicksilver"><span>{intl.formatMessage({ id: "JAN 18, 2021" })}</span></p><h3 className="pl-5 pr-3 text-ufoGreen">{intl.formatMessage({ id: "+250" })}</h3>
            </div>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-white rounded-md">
            <div className="flex items-center space-x-4">
              <div className="rounded bg-[#C8FFF2] text-4xl w-14 h-14 flex items-center justify-center">
                <i className="icon-send1"></i>
              </div>
              <div>
                <h3 className="text-base"><span>{intl.formatMessage({ id: "COIN SEND" })}</span></h3>
                <span className="input-titel">{intl.formatMessage({ id: "REFER BY MARK JECNO" })}</span>
              </div>
            </div>
            <div className="flex items-center">
              <p className="pr-5 border-r-2 border-quicksilver"><span>{intl.formatMessage({ id: "JAN 18, 2021" })}</span></p><h3 className="pl-5 pr-3 text-red-500">{intl.formatMessage({ id: "-14" })}</h3>
            </div>
          </div>
        </div>
        {/* <!-- advisement --> */}
        {/* <Advertisement /> */}
      </div>
    </div>
  )
}

export default RedeemCoin;

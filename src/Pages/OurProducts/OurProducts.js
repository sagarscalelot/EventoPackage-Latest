import React from 'react';
import facebookIcon from "../../assest/images/facebook-icon.png"
import linkedIcon from "../../assest/images/linked-icon.png";
import InstIcon from "../../assest/images/instagram-icon.png";
import playStoreIcon from "../../assest/images/play-store-icon.png";
import appleIcon from "../../assest/images/apple-icon.png";
import webIcon from "../../assest/images/web-icon.png";
import fcoin from "../../assest/images/landing-page/festumcoin.png";
import festumLogo from "../../assest/images/landing-page/FE.png";
import ffLogo from "../../assest/images/landing-page/FF.png";
import festumAds from "../../assest/images/landing-page/festumadvertising.jpg";
import { useIntl } from 'react-intl';

const OurProducts = () => {
  const intl = useIntl();

  return (
    <div className="wrapper min-h-full">
      <div className="space-y-8 h-full">
        {/* <!-- title-holder  --> */}
        <div className="flex justify-between items-center">
          <a href="#">
            <h2>{intl.formatMessage({ id: "OUR PRODUCTS" })}</h2>
          </a>
        </div>
        {/* <!-- main-content  --> */}
        <div className="space-y-5">

          <div className="w-full bg-white flex flex-wrap items-center lg:flex-nowrap p-2.5 rounded-md">
            <div className="max-w-[205px] w-full h-[205px]">
              <div className="bg-[#E9EAEE] h-full flex justify-center items-center px-5 py-7">
                <img src={festumLogo} alt="Festum Evento" className="w-full h-full p-5" />
              </div>
            </div>
            <div className="w-full px-3">
              <div className="flex justify-between items-center py-2">
                <h5>{intl.formatMessage({ id: "FESTUMEVENTO APP" })}</h5>
              </div>
              <div className="flex items-center space-x-2 pb-2">
                <p className="text-sm text-quicksilver font-normal pt-2">{intl.formatMessage({ id: "THERE ARE MANY VARIATIONS OF PASSAGES OF LOREM IPSUM AVAILABLE, BUT THE MAJORITY HAVE SUFFERED ALTERATION IN SOME FORM, BY INJECTED HUMOUR, OR RANDOMISED WORDS WHICH DON'T LOOK EVEN SLIGHTLY BELIEVABLE" })}</p>
              </div>
              <div className="flex space-x-7 pt-3">
                <div className="">
                  <span className="text-sm text-japaneseIndigo font-bold capitalize pb-3">{intl.formatMessage({ id: "SOCIAL MEDIA" })}</span>
                  <div className="flex space-x-5 border-r-2 pr-5 pt-3">
                    <div className="">
                      <a href="https://www.facebook.com/EventoPackage" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={facebookIcon} alt="Facebook" /></span></a>
                    </div>
                    <div className="">
                      <a href="https://www.instagram.com/EventoPackage/" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={InstIcon} alt="Instagram" /></span></a>
                    </div>
                    <div className="">
                      <a href="https://www.linkedin.com/company/eventopackage" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={linkedIcon} alt="Linked" /></span></a>
                    </div>
                  </div>
                </div>
                <div className="">
                  <span className="text-sm text-japaneseIndigo font-bold capitalize pb-3">{intl.formatMessage({ id: "LINKS" })}</span>
                  <div className="flex space-x-5 pt-3">
                    <div className="">
                      <div className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={playStoreIcon} alt="Play Store" /></span></div>
                    </div>
                    <div className="">
                      <div className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={appleIcon} alt="Apple" /></span></div>
                    </div>
                    <div className="">
                      <a href="https://www.festumevento.com" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={webIcon} alt="Web" /></span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white flex flex-wrap items-center lg:flex-nowrap p-2.5 rounded-md">
            <div className="max-w-[205px] w-full h-[205px]">
              <div className="bg-[#E9EAEE] h-full flex justify-center items-center px-5 py-7">
                <img src={ffLogo} alt="Friends Fields" className="w-full h-full p-5" />
              </div>
            </div>
            <div className="w-full px-3">
              <div className="flex justify-between items-center py-2">
                <h5>{intl.formatMessage({ id: "FRIENDS FIELDS" })}</h5>
              </div>
              <div className="flex items-center space-x-2 pb-2">
                <p className="text-sm text-quicksilver font-normal pt-2">{intl.formatMessage({ id: "THERE ARE MANY VARIATIONS OF PASSAGES OF LOREM IPSUM AVAILABLE, BUT THE MAJORITY HAVE SUFFERED ALTERATION IN SOME FORM, BY INJECTED HUMOUR, OR RANDOMISED WORDS WHICH DON'T LOOK EVEN SLIGHTLY BELIEVABLE" })}</p>
              </div>
              <div className="flex space-x-7 pt-3">
                <div className="">
                  <span className="text-sm text-japaneseIndigo font-bold capitalize pb-3">{intl.formatMessage({ id: "SOCIAL MEDIA" })}</span>
                  <div className="flex space-x-5 border-r-2 pr-5 pt-3">
                    <div className="">
                      <a href="https://www.facebook.com/EventoPackage" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={facebookIcon} alt="Facebook" /></span></a>
                    </div>
                    <div className="">
                      <a href="https://www.instagram.com/EventoPackage/" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={InstIcon} alt="Instagram" /></span></a>
                    </div>
                    <div className="">
                      <a href="https://www.linkedin.com/company/eventopackage" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={linkedIcon} alt="Linked" /></span></a>
                    </div>
                  </div>
                </div>
                <div className="">
                  <span className="text-sm text-japaneseIndigo font-bold capitalize pb-3">{intl.formatMessage({ id: "LINKS" })}</span>
                  <div className="flex space-x-5 pt-3">
                    <div className="">
                      <div className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={playStoreIcon} alt="Play Store" /></span></div>
                    </div>
                    <div className="">
                      <div className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={appleIcon} alt="Apple" /></span></div>
                    </div>
                    <div className="">
                      <a href="https://friendsfield.in/" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={webIcon} alt="Web" /></span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white flex flex-wrap items-center lg:flex-nowrap p-2.5 rounded-md">
            <div className="max-w-[205px] w-full h-[205px]">
              <div className="bg-[#E9EAEE] h-full flex justify-center items-center px-5 py-7">
                <img src={fcoin} alt="sweet-love-catering-2" className="w-full h-full p-5" />
              </div>
            </div>
            <div className="w-full px-3 md:pl-5">
              <div className="flex justify-between items-center py-2">
                <h5>{intl.formatMessage({ id: "F-COIN" })}</h5>
              </div>
              <div className="flex items-center space-x-2 pb-2">
                <p className="text-sm text-quicksilver font-normal pt-2">{intl.formatMessage({ id: "THERE ARE MANY VARIATIONS OF PASSAGES OF LOREM IPSUM AVAILABLE, BUT THE MAJORITY HAVE SUFFERED ALTERATION IN SOME FORM, BY INJECTED HUMOUR, OR RANDOMISED WORDS WHICH DON'T LOOK EVEN SLIGHTLY BELIEVABLE" })}</p>
              </div>
              <div className="flex space-x-7 pt-3">
                <div className="">
                  <span className="text-sm text-japaneseIndigo font-bold capitalize pb-3">{intl.formatMessage({ id: "SOCIAL MEDIA" })}</span>
                  <div className="flex space-x-5 border-r-2 pr-5 pt-3">
                    <div className="">
                      <a href="https://www.facebook.com/EventoPackage" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={facebookIcon} alt="Facebook" /></span></a>
                    </div>
                    <div className="">
                      <a href="https://www.instagram.com/EventoPackage/" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={InstIcon} alt="Instagram" /></span></a>
                    </div>
                    <div className="">
                      <a href="https://www.linkedin.com/company/eventopackage" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={linkedIcon} alt="Linked" /></span></a>
                    </div>
                  </div>
                </div>
                <div className="">
                  <span className="text-sm text-japaneseIndigo font-bold capitalize pb-3">{intl.formatMessage({ id: "LINKS" })}</span>
                  <div className="flex space-x-5 pt-3">
                    <div className="">
                      <div className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={playStoreIcon} alt="Play Store" /></span></div>
                    </div>
                    <div className="">
                      <div className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={appleIcon} alt="Apple" /></span></div>
                    </div>
                    <div className="">
                      <a href="https://eventopackage.com/" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={webIcon} alt="Web" /></span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white flex flex-wrap items-center lg:flex-nowrap p-2.5 rounded-md">
            <div className="max-w-[205px] w-full h-[205px]">
              <div className="bg-[#E9EAEE] h-full flex justify-center items-center px-5 py-7">
                <img src={festumAds} alt="sweet-love-catering-2" className="w-full h-full p-5" />
              </div>
            </div>
            <div className="w-full px-3 md:pl-5">
              <div className="flex justify-between items-center py-2">
                <h5>{intl.formatMessage({ id: "FESTUM ADVERTISING MEDIA" })}</h5>
              </div>
              <div className="flex items-center space-x-2 pb-2">
                <p className="text-sm text-quicksilver font-normal pt-2">{intl.formatMessage({ id: "THERE ARE MANY VARIATIONS OF PASSAGES OF LOREM IPSUM AVAILABLE, BUT THE MAJORITY HAVE SUFFERED ALTERATION IN SOME FORM, BY INJECTED HUMOUR, OR RANDOMISED WORDS WHICH DON'T LOOK EVEN SLIGHTLY BELIEVABLE" })}</p>
              </div>
              <div className="flex space-x-7 pt-3">
                <div className="">
                  <span className="text-sm text-japaneseIndigo font-bold capitalize pb-3">{intl.formatMessage({ id: "OUR PRODUCTS" })}</span>
                  <div className="flex space-x-5 border-r-2 pr-5 pt-3">
                    <div className="">
                      <a href="https://www.facebook.com/EventoPackage" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={facebookIcon} alt="Facebook" /></span></a>
                    </div>
                    <div className="">
                      <a href="https://www.instagram.com/EventoPackage/" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={InstIcon} alt="Instagram" /></span></a>
                    </div>
                    <div className="">
                      <a href="https://www.linkedin.com/company/eventopackage" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={linkedIcon} alt="Linked" /></span></a>
                    </div>
                  </div>
                </div>
                <div className="">
                  <span className="text-sm text-japaneseIndigo font-bold capitalize pb-3">{intl.formatMessage({ id: "LINKS" })}</span>
                  <div className="flex space-x-5 pt-3">
                    <div className="">
                      <div className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={playStoreIcon} alt="Play Store" /></span></div>
                    </div>
                    <div className="">
                      <div className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={appleIcon} alt="Apple" /></span></div>
                    </div>
                    <div className="">
                      <a href="https://eventopackage.com/" target="blank" className="bg-white w-9 h-9 rounded-full shadow flex justify-center items-center"><span><img src={webIcon} alt="Web" /></span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurProducts

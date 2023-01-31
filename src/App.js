import React from "react";
import AllRoutes from "./routes/allRoutes";
import LanguageProvider from "./Common/LanguageSelector/LanguageSelector";
import enTranslationMessages from "./Common/translations/en.json";
import hiTranslationMessages from "./Common/translations/hi.json";

const App = () => {
  
  return (
    <React.Fragment>
      <LanguageProvider
        messages={{ en: enTranslationMessages, hi: hiTranslationMessages }}
      >
        <AllRoutes />
      </LanguageProvider>
    </React.Fragment>
  );
};

export default App;

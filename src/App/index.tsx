import { FC } from 'react';
import './app.css';
import PdfToText from 'modules/PdfToText';
import StyledThemeProvider from 'contextProviders/StyledThemeProvider';
import ApiRestUtilsProvider from 'contextProviders/ApiRequestUtils';

const App: FC<{}> = () => {
  return (
    <StyledThemeProvider>
      <ApiRestUtilsProvider>
        <div className="app-content-container">
          <PdfToText />
        </div>
      </ApiRestUtilsProvider>
    </StyledThemeProvider>
  );
};

export default App;

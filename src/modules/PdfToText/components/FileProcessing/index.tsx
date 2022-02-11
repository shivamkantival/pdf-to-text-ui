import { useEffect } from 'react';
import { useApiRestUtils } from 'contextProviders/ApiRequestUtils';
import { usePdfToTextStore } from '../../contextProviders/PdfToTextStoreProvider';
import { Spin } from 'antd';
import { PDF_TO_TEXT_SERVICE_TRANSPILE_FILE } from 'constants/apiRoutes';

const FileProcessing: React.FC<{}> = () => {
  const { uploadedMediaObject, setParsedPdfText } = usePdfToTextStore();
  const { post } = useApiRestUtils();

  useEffect(() => {
    (async () => {
      setParsedPdfText(
        (
          await post<{ text: string }>(PDF_TO_TEXT_SERVICE_TRANSPILE_FILE, {
            pdfToTranspile: uploadedMediaObject,
          })
        ).text
      );
    })();
  }, [uploadedMediaObject, post, setParsedPdfText]);

  return <Spin />;
};

export default FileProcessing;

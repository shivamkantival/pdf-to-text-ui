import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ProcessSteps } from '../../constants/processSteps';
import { MediaObject } from 'typeDefs/platformEntities/mediaObject';

interface PdfToTextStoreInterface {
  currentProcessStep: ProcessSteps;
  uploadedMediaObject?: MediaObject;
  parsedPdfText?: string;
  setMediaObject: (mediaObject: MediaObject) => void;
  setParsedPdfText: (parsedText: string) => void;
  startNewProcess: () => void;
}

// @ts-ignore
const PdfToTextStoreContext = createContext<PdfToTextStoreInterface>(null);

export function usePdfToTextStore(): PdfToTextStoreInterface {
  return useContext(PdfToTextStoreContext);
}

const PdfToTextStoreProvider: FC<{}> = ({ children }) => {
  const [currentProcessStep, setCurrentProcessStep] = useState<ProcessSteps>(
    ProcessSteps.UPLOAD_FILE
  );

  const [uploadedMediaObject, setUploadedMediaObject] = useState<MediaObject>();

  const [parsedPdfText, setParsedPdfText] = useState<string>();

  const setMediaObject = useCallback<PdfToTextStoreInterface['setMediaObject']>(
    mediaObject => {
      setUploadedMediaObject(mediaObject);
      setCurrentProcessStep(ProcessSteps.PROCESSING);
    },
    []
  );

  const setParsedPdfTextForContext = useCallback<
    PdfToTextStoreInterface['setParsedPdfText']
  >(parsedText => {
    setParsedPdfText(parsedText);
    setCurrentProcessStep(ProcessSteps.DISPLAY_RESULT);
  }, []);

  const startNewProcess = useCallback<
    PdfToTextStoreInterface['startNewProcess']
  >(() => {
    // @ts-ignore
    setParsedPdfText(undefined);
    // @ts-ignore
    setUploadedMediaObject(undefined);
    setCurrentProcessStep(ProcessSteps.UPLOAD_FILE);
  }, []);

  const contextValue = useMemo<PdfToTextStoreInterface>(
    () => ({
      currentProcessStep,
      parsedPdfText,
      uploadedMediaObject,
      setParsedPdfText: setParsedPdfTextForContext,
      setMediaObject,
      startNewProcess,
    }),
    [
      currentProcessStep,
      parsedPdfText,
      setMediaObject,
      startNewProcess,
      uploadedMediaObject,
      setParsedPdfTextForContext,
    ]
  );

  return (
    <PdfToTextStoreContext.Provider value={contextValue}>
      {children}
    </PdfToTextStoreContext.Provider>
  );
};

export default PdfToTextStoreProvider;

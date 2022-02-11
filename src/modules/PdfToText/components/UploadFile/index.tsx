import { FC } from 'react';
import FileUploader from 'components/FileUploader';
import { PLATFORM_MEDIA_TYPES } from 'typeDefs/platformEntities/mediaObject';
import { usePdfToTextStore } from '../../contextProviders/PdfToTextStoreProvider';

const UploadFile: FC<{}> = () => {
  const { setMediaObject } = usePdfToTextStore();

  return (
    <FileUploader
      onUpload={setMediaObject}
      fileFormats={[PLATFORM_MEDIA_TYPES.PDF]}
    />
  );
};

export default UploadFile;

import { FC, useCallback } from 'react';
import { Upload, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import useStyles from './styles';
import { MEDIA_SERVICE_FILE_UPLOAD } from 'constants/apiRoutes';
import { MediaObject } from 'typeDefs/platformEntities/mediaObject';

const FileUploader: FC<{
  fileFormats?: ReadonlyArray<string>;
  onUpload: (file: MediaObject) => void;
}> = ({ fileFormats, onUpload }) => {
  const classes = useStyles();

  const customOnFileUpload = useCallback<
    NonNullable<UploadProps['customRequest']>
  >(
    ({ onSuccess, onError, file, onProgress }) => {
      const data = new FormData();
      data.append('file', file);

      const request = new XMLHttpRequest();
      request.responseType = 'json';
      request.open('POST', MEDIA_SERVICE_FILE_UPLOAD);

      // upload progress event
      onProgress &&
        request.upload.addEventListener('progress', function (e) {
          onProgress({ percent: (e.loaded / e.total) * 100 });
        });

      // request finished event
      request.addEventListener('load', function (e) {
        if (request.status === 200 && onSuccess) {
          onSuccess(request.response);
          onUpload(request.response);
        } else {
          onError && onError(request.response);
        }
      });

      request.send(data);
    },
    [onUpload]
  );

  return (
    <Upload.Dragger
      className={classes.uploaderContainer}
      accept={fileFormats ? fileFormats.join(',') : undefined}
      customRequest={customOnFileUpload}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
    </Upload.Dragger>
  );
};

export default FileUploader;

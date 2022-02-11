import { Alert, Button, Input } from 'antd';
import {
  ChangeEventHandler,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { usePdfToTextStore } from '../../contextProviders/PdfToTextStoreProvider';
import useStyles from './styles';
import { CopyOutlined } from '@ant-design/icons';

const DisplayResult: FC<{}> = () => {
  const { parsedPdfText, startNewProcess } = usePdfToTextStore();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const classes = useStyles();
  const [localText, setLocalText] = useState(parsedPdfText);

  const copyToClipboard = useCallback(() => {
    if (localText) {
      navigator.clipboard.writeText(localText);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  }, [localText]);

  // to copy to clipboard automatically with initial parsedText
  useEffect(() => {
    copyToClipboard();
  }, []);

  const updateText = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    event => {
      setLocalText(event.target.value);
    },
    []
  );

  return (
    <>
      <Input.TextArea
        value={localText}
        showCount
        rows={8}
        onChange={updateText}
      />
      <div className={classes.actionsArea}>
        {showAlert ? (
          <Alert
            closable
            type="success"
            afterClose={() => setShowAlert(false)}
            message="Successfully copied text to clipboard"
          />
        ) : null}
        <div className={classes.buttonsGroup}>
          <Button
            type="primary"
            onClick={copyToClipboard}
            icon={<CopyOutlined />}
            shape="circle"
          />
          <Button type="default" onClick={startNewProcess}>
            Start New Upload
          </Button>
        </div>
      </div>
    </>
  );
};

export default DisplayResult;

import React, { FC } from 'react';
import useStyles from './styles';
import { Typography } from 'antd';
import StatusBar from './components/StatusBar';
import { ProcessSteps } from './constants/processSteps';
import FileProcessing from './components/FileProcessing';
import PdfToTextStoreProvider, {
  usePdfToTextStore,
} from './contextProviders/PdfToTextStoreProvider';
import UploadFile from './components/UploadFile';
import DisplayResult from './components/DisplayResult';

const { Title, Text } = Typography;

const ProcessStepToComponent: Record<ProcessSteps, FC<{}>> = {
  [ProcessSteps.PROCESSING]: FileProcessing,
  [ProcessSteps.UPLOAD_FILE]: UploadFile,
  [ProcessSteps.DISPLAY_RESULT]: DisplayResult,
};

const PdfToText: FC<{}> = () => {
  const classes = useStyles();
  const { currentProcessStep } = usePdfToTextStore();

  const ComponentToRender = ProcessStepToComponent[currentProcessStep];

  return (
    <div className={classes.moduleContainer}>
      <Title level={2}>
        <Text type="secondary" underline>
          PDF 2 Text
        </Text>
      </Title>
      <StatusBar className={classes.statusBarContainer} />
      <section className={classes.dynamicProcessSection}>
        {<ComponentToRender />}
      </section>
    </div>
  );
};

export default function PdfToTextContainer() {
  return (
    <PdfToTextStoreProvider>
      <PdfToText />
    </PdfToTextStoreProvider>
  );
}

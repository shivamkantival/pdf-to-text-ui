import {
  CloudUploadOutlined,
  FileTextOutlined,
  Loading3QuartersOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

export enum ProcessSteps {
  UPLOAD_FILE,
  PROCESSING,
  DISPLAY_RESULT,
}

export const ORDERED_PROCESS_STEPS: ReadonlyArray<ProcessSteps> = [
  ProcessSteps.UPLOAD_FILE,
  ProcessSteps.PROCESSING,
  ProcessSteps.DISPLAY_RESULT,
];

export const processKeyToStepConfig: Record<
  ProcessSteps,
  { title: string; icon: React.ReactNode; activeIcon?: React.ReactNode }
> = {
  [ProcessSteps.UPLOAD_FILE]: {
    title: 'Upload',
    icon: <CloudUploadOutlined />,
  },
  [ProcessSteps.PROCESSING]: {
    title: 'Processing File',
    activeIcon: <LoadingOutlined />,
    icon: <Loading3QuartersOutlined />,
  },
  [ProcessSteps.DISPLAY_RESULT]: {
    title: 'Result',
    icon: <FileTextOutlined />,
  },
};

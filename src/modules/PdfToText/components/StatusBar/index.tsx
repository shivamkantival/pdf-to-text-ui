import { Steps } from 'antd';
import {
  ORDERED_PROCESS_STEPS,
  processKeyToStepConfig,
} from '../../constants/processSteps';
import { FC, useMemo } from 'react';
import { usePdfToTextStore } from '../../contextProviders/PdfToTextStoreProvider';

const StatusBar: FC<{
  className?: string;
}> = ({ className }) => {
  const { currentProcessStep } = usePdfToTextStore();
  const currentStepIndex = useMemo(
    () => ORDERED_PROCESS_STEPS.findIndex(step => step === currentProcessStep),
    [currentProcessStep]
  );

  return (
    <Steps className={className}>
      <>
        {ORDERED_PROCESS_STEPS.map(stepKey => {
          const { title, activeIcon, icon } = processKeyToStepConfig[stepKey];
          const isActive = currentProcessStep === stepKey;
          const isWaiting =
            ORDERED_PROCESS_STEPS.findIndex(key => key === stepKey) >
            currentStepIndex;

          return (
            <Steps.Step
              key={stepKey}
              title={title}
              icon={isActive && activeIcon ? activeIcon : icon}
              status={isActive ? 'process' : isWaiting ? 'wait' : 'finish'}
            />
          );
        })}
      </>
    </Steps>
  );
};

export default StatusBar;

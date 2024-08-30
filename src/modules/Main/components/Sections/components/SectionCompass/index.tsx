import { FilterCompass } from '../../../Filters';
import Compass from './components/Compass';
import CompassIssues from './components/Issues';
import CompassZones from './components/Zones';

const SectionCompass = () => {
  const handleApply = () => {
    console.log('handleApply');
  };

  const handleReset = () => {
    console.log('handleReset');
  };

  return (
    <>
      <FilterCompass
        onApply={handleApply}
        onReset={handleReset}
        isLoading={false}
        isDisabled={false}
      />
      <Compass />
      <CompassIssues />
      <CompassZones />
    </>
  );
};

export default SectionCompass;

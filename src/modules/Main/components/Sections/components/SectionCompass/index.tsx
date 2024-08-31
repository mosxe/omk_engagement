import { FilterCompass } from '../../../Filters';
import Compass from './components/Compass';
import Results from './components/Results';

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
      <Results />
    </>
  );
};

export default SectionCompass;

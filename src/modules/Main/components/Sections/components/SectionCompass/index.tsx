import { FilterCompass } from '../../../Filters';

const SectionCompass = () => {
  const handleApply = () => {
    console.log('handleApply');
  };

  const handleReset = () => {
    console.log('handleReset');
  };

  return (
    <>
      <FilterCompass onApply={handleApply} onReset={handleReset} />
      <div>SectionCompass</div>
    </>
  );
};

export default SectionCompass;

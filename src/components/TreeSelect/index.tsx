import React from 'react';
import TreeSelect from 'rc-tree-select';
import './index.css';

// const bubblePath =
//   'M632 888H392c-4.4 0-8 3.6-8 8v32c0 ' +
//   '17.7 14.3 32 32 32h192c17.7 0 32-14.3 32-32v-3' +
//   '2c0-4.4-3.6-8-8-8zM512 64c-181.1 0-328 146.9-3' +
//   '28 328 0 121.4 66 227.4 164 284.1V792c0 17.7 1' +
//   '4.3 32 32 32h264c17.7 0 32-14.3 32-32V676.1c98' +
//   '-56.7 164-162.7 164-284.1 0-181.1-146.9-328-32' +
//   '8-328z m127.9 549.8L604 634.6V752H420V634.6l-3' +
//   '5.9-20.8C305.4 568.3 256 484.5 256 392c0-141.4' +
//   ' 114.6-256 256-256s256 114.6 256 256c0 92.5-49' +
//   '.4 176.3-128.1 221.8z';

const clearPath =
  'M793 242H366v-74c0-6.7-7.7-10.4-12.9' +
  '-6.3l-142 112c-4.1 3.2-4.1 9.4 0 12.6l142 112c' +
  '5.2 4.1 12.9 0.4 12.9-6.3v-74h415v470H175c-4.4' +
  ' 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h618c35.3 0 64-' +
  '28.7 64-64V306c0-35.3-28.7-64-64-64z';

const arrowPath =
  'M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z';

const getSvg = (path: any, iStyle = {}, style = {}) => (
  <i style={iStyle}>
    <svg
      viewBox='0 0 1024 1024'
      width='1em'
      height='1em'
      fill='currentColor'
      style={{ verticalAlign: '-.125em', ...style }}
    >
      <path d={path} />
    </svg>
  </i>
);

const switcherIcon = (obj: any) => {
  if (obj.isLeaf) {
    return null;
  }

  if (obj.expanded) {
    return (
      <svg
        width='6'
        height='8'
        viewBox='0 0 6 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{ transform: 'rotate: 90deg' }}
      >
        <path
          d='M5.5003 3.99981L1.96447 7.53564L0.786133 6.35648L3.14363 3.99981L0.786133 1.64314L1.96447 0.463978L5.5003 3.99981Z'
          fill='#6A6F75'
        />
      </svg>
    );
  }

  return (
    <svg
      width='6'
      height='8'
      viewBox='0 0 6 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ transform: 'rotate: 90deg' }}
    >
      <path
        d='M5.5003 3.99981L1.96447 7.53564L0.786133 6.35648L3.14363 3.99981L0.786133 1.64314L1.96447 0.463978L5.5003 3.99981Z'
        fill='#6A6F75'
      />
    </svg>
  );
  return getSvg(
    arrowPath
    // { cursor: 'pointer', backgroundColor: 'white' },
    // { transform: `rotate(${obj.expanded ? 90 : 0}deg)` }
  );
};

// const suffixIcon = getSvg(bubblePath);
// const clearIcon = getSvg(clearPath);
const removeIcon = getSvg(clearPath);

const iconProps = {
  // suffixIcon,
  // clearIcon,
  removeIcon,
  switcherIcon
};

export type Node = {
  value: string | number;
  title: string;
  // label: React.ReactNode;
  key: React.Key;
  children: Node[] | [];
  isLeaf: boolean;
};

type NoticeProps = {
  data: Node[];
  selectedValue: string | undefined;
  onLoad: (dataNode: any) => Promise<unknown>;
  onChange: (value: string | string[]) => void;
};

const SwitcherIcon = () => (
  <svg
    width='6'
    height='8'
    viewBox='0 0 6 8'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M5.5003 3.99981L1.96447 7.53564L0.786133 6.35648L3.14363 3.99981L0.786133 1.64314L1.96447 0.463978L5.5003 3.99981Z'
      fill='#6A6F75'
    />
  </svg>
);

class RCTreeSelect extends React.Component<NoticeProps> {
  render() {
    const { data, selectedValue, onLoad, onChange } = this.props;

    return (
      <TreeSelect
        style={{ width: 300 }}
        treeData={data}
        labelInValue={false}
        value={selectedValue}
        onChange={onChange}
        loadData={onLoad}
        treeCheckable
        treeCheckStrictly={false}
        multiple
        placeholder='Подразделение/БЕ'
        dropdownClassName='tree-select-dropdown'
        className='tree-select-container'
        showSearch={false}
        allowClear={false}
        notFoundContent='Данные отсутствуют'
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto',
          zIndex: 1500
        }}
        {...iconProps}
        removeIcon={() => removeIcon}
        suffixIcon={<SwitcherIcon />}
      />
    );
  }
}

export default RCTreeSelect;

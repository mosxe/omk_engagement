import React from 'react';
import TreeSelect from 'rc-tree-select';
import './index.css';

const clearPath =
  'M793 242H366v-74c0-6.7-7.7-10.4-12.9' +
  '-6.3l-142 112c-4.1 3.2-4.1 9.4 0 12.6l142 112c' +
  '5.2 4.1 12.9 0.4 12.9-6.3v-74h415v470H175c-4.4' +
  ' 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h618c35.3 0 64-' +
  '28.7 64-64V306c0-35.3-28.7-64-64-64z';

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
};

const removeIcon = getSvg(clearPath);

const iconProps = {
  removeIcon,
  switcherIcon
};

export type Node = {
  key: React.Key;
  value: string | number;
  title: string;
  parent_object_code: string;
  children: Node[] | [];
  isLeaf: boolean;
};

type NoticeProps = {
  data: Node[];
  selectedValue: any;
  onLoad: (dataNode: any) => Promise<unknown>;
  onChange: (value: string[]) => void;
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
        style={{ width: 400 }}
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
        allowClear={true}
        notFoundContent='Данные отсутствуют'
        dropdownStyle={{
          maxHeight: 600,
          width: 700,
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

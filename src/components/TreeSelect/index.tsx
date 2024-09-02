import React from 'react';
import TreeSelect from 'rc-tree-select';
import './index.css';

export function generateTreeNodes(treeNode) {
  const arr = [];
  const key = treeNode.key;
  for (let i = 0; i < 3; i++) {
    arr.push({
      label: `${key}-${i}-label`,
      value: `${key}-${i}-value`,
      key: `${key}-${i}-value`
    });
  }
  return arr;
}

export function getNewTreeData(treeData, curKey, child, level) {
  const loop = (data) => {
    if (level < 1 || curKey.length - 3 > level * 2) return;
    data.forEach((item) => {
      if (curKey.indexOf(item.key) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };
  loop(treeData);
  setLeaf(treeData, curKey, level);
}

function setLeaf(treeData, curKey, level) {
  const loopLeaf = (data, lev) => {
    const l = lev - 1;
    data.forEach((item) => {
      if (
        item.key.length > curKey.length
          ? item.key.indexOf(curKey) !== 0
          : curKey.indexOf(item.key) !== 0
      ) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children, l);
      } else if (l < 1) {
        item.isLeaf = true;
      }
    });
  };
  loopLeaf(treeData, level + 1);
}

function getTreeData() {
  return [
    { label: 'pNode 01', value: '0-0', key: '0-0', isSelected: true },
    { label: 'pNode 02', value: '0-1', key: '0-1' },
    { label: 'pNode 03', value: '0-2', key: '0-2', isLeaf: true }
  ];
}

const bubblePath =
  'M632 888H392c-4.4 0-8 3.6-8 8v32c0 ' +
  '17.7 14.3 32 32 32h192c17.7 0 32-14.3 32-32v-3' +
  '2c0-4.4-3.6-8-8-8zM512 64c-181.1 0-328 146.9-3' +
  '28 328 0 121.4 66 227.4 164 284.1V792c0 17.7 1' +
  '4.3 32 32 32h264c17.7 0 32-14.3 32-32V676.1c98' +
  '-56.7 164-162.7 164-284.1 0-181.1-146.9-328-32' +
  '8-328z m127.9 549.8L604 634.6V752H420V634.6l-3' +
  '5.9-20.8C305.4 568.3 256 484.5 256 392c0-141.4' +
  ' 114.6-256 256-256s256 114.6 256 256c0 92.5-49' +
  '.4 176.3-128.1 221.8z';

const clearPath =
  'M793 242H366v-74c0-6.7-7.7-10.4-12.9' +
  '-6.3l-142 112c-4.1 3.2-4.1 9.4 0 12.6l142 112c' +
  '5.2 4.1 12.9 0.4 12.9-6.3v-74h415v470H175c-4.4' +
  ' 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h618c35.3 0 64-' +
  '28.7 64-64V306c0-35.3-28.7-64-64-64z';

const arrowPath =
  'M765.7 486.8L314.9 134.7c-5.3-4.1' +
  '-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l36' +
  '0 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6' +
  '.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-3' +
  '7.6 0-50.4z';

const getSvg = (path, iStyle = {}, style = {}) => (
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

const switcherIcon = (obj) => {
  if (obj.isLeaf) {
    return getSvg(
      arrowPath,
      { cursor: 'pointer', backgroundColor: 'white' },
      { transform: 'rotate(270deg)' }
    );
  }
  return getSvg(
    arrowPath,
    { cursor: 'pointer', backgroundColor: 'white' },
    { transform: `rotate(${obj.expanded ? 90 : 0}deg)` }
  );
};

const suffixIcon = getSvg(bubblePath);
const clearIcon = getSvg(clearPath);
const removeIcon = getSvg(clearPath);

const iconProps = {
  suffixIcon,
  clearIcon,
  removeIcon,
  switcherIcon
};

const iconPropsFunction = {
  suffixIcon: () => suffixIcon,
  clearIcon: () => clearIcon,
  removeIcon: () => removeIcon,
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
  onLoad: (dataNode: LegacyDataNode) => Promise<unknown>;
  onChange: (value: string) => void;
};

class RCTreeSelect extends React.Component<NoticeProps> {
  // public static readonly defaultProps = {
  //   msg: `Done!`
  // };

  state = {
    treeData: getTreeData(),
    // value: '0-0',
    value: [],
    loadedKeys: []
  };

  render() {
    const { data, selectedValue, onLoad, onChange } = this.props;

    return (
      <div style={{ padding: '10px 30px' }}>
        <h2>dynamic render</h2>
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
          treeLine={false}
          treeIcon={false}
          {...iconPropsFunction}
        />
      </div>
    );
  }
}

export default RCTreeSelect;

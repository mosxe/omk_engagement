import { useState, useEffect } from 'react';
import TreeSelect, { Node } from 'components/TreeSelect';
import Select from 'components/Select';
import FilterContainer from '../FIlterContainer';
import { OptionChange } from 'components/Select/types';
import { FilterName, Filter } from 'types';
import { FilterProps } from '../index';
import {
  getFilterOptions,
  getValueSelect
  // transformDataFilters
} from 'helpers';
import { initialFiltersEngagement } from 'store/constants';
import {
  useLazyGetOrgTreeQuery,
  // useLazyGetFilterEngagementDataQuery,
  useGetAllFiltersEngagementDataQuery
} from 'store/apiSlice';
import { updateSelectedFilters } from 'store/filterSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

const FilterEngagement = ({
  onApply,
  onReset,
  // isLoading,
  isDisabled
}: FilterProps) => {
  // const [
  //   updateFiltersEngagement,
  //   { data = initialFiltersEngagement, isFetching }
  // ] = useLazyGetFilterEngagementDataQuery();
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.engagement
  );

  const [updateOrg, { isLoading: isLoadingOrg }] = useLazyGetOrgTreeQuery();

  const {
    data = initialFiltersEngagement,
    isLoading: isLoadingFilters
    // isError
  } = useGetAllFiltersEngagementDataQuery({ filters: [] });

  const [treeData, setTreeData] = useState<Node[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    updateOrg(null).then((data) => {
      if (data.data?.data) {
        setTreeData(data.data.data);
      }
    });
  }, []);

  const onChange = (options: OptionChange, filterName: FilterName) => {
    const filterValues = {
      name: filterName,
      value: options as Filter[]
    };
    console.log(filterValues);
    dispatch(updateSelectedFilters({ tab: 'engagement', data: filterValues }));
    // const dataFilters = transformDataFilters(selectedFilters, filterValues);
    // await updateFiltersEngagement({
    //   filters: dataFilters,
    //   is_starting: false
    // });
  };

  const onChangeTreeSelect = (value: string[] | string) => {
    console.log(value);
    setSelectedValue(value as string);
    const tempValue = value as string[];
    const tempValues = tempValue.map((val: any) => {
      return {
        value: val,
        label: ''
      };
    });
    const filterValues = {
      name: 'subs' as const,
      value: tempValues as Filter[]
    };
    console.log(filterValues);
    dispatch(updateSelectedFilters({ tab: 'engagement', data: filterValues }));
  };

  const loadData = async (treeNode: Node) => {
    try {
      const payload = await updateOrg(String(treeNode.value)).unwrap();
      console.log(payload.data);
      const tempTreeData = [...treeData];
      console.log(tempTreeData);

      const DataVelu = tempTreeData.map((node) => {
        console.log(node);
        const tempNode = { ...node };
        if (tempNode.value === treeNode.value) {
          tempNode.children = payload.data;
        }
        console.log(tempNode.children);
        // node = tempNode;
        return tempNode;
      });
      console.log(payload);
      console.log(tempTreeData);
      setTreeData(DataVelu);
    } catch (e) {
      console.log('CATCH:');
      console.log(e);
    }
  };
  // return await updateOrg(String(treeNode.value))
  //   .unwrap()
  // .then((data) => {
  //   const tempTreeData = treeData.slice();
  //   data.data.forEach((tree) => {
  //     const findNode = tempTreeData.find(
  //       (node) => node.value === tree.parent_object_code
  //     );
  //     console.log(findNode);
  //     if (findNode !== undefined) {
  //       findNode.children = [...findNode.children, tree];
  //     }
  //   });
  //   // console.log(tempTreeData);
  //   setTreeData(tempTreeData);
  //   return undefined;
  // });

  // return new Promise((resolve) => {
  //   const tempTreeData = treeData.slice();
  //   tempTreeData.forEach((tree) => {
  //     if (tree.value === treeNode.value) {
  //       tree.children = payload.data.data;
  //     }
  //     return tree;
  //   });
  //   setTreeData(tempTreeData);
  //   resolve([]);
  // });
  // return updateOrg(String(treeNode.value)).then((data) => {
  //   const tempTreeData = treeData.slice();
  //   tempTreeData.forEach((tree) => {
  //     if (tree.value === treeNode.value) {
  //       tree.children = data.data?.data;
  //     }
  //     return tree;
  //   });
  //   setTreeData(tempTreeData);
  //   return [];
  // });
  // // const payload = await updateOrg(String(treeNode.value));
  // const json = await payload.data?.data;
  // console.log(payload);

  // return new Promise((resolve) => {
  //   const tempTreeData = treeData.slice();
  //   tempTreeData.forEach((tree) => {
  //     if (tree.value === treeNode.value) {
  //       tree.children = payload.data.data;
  //     }
  //     return tree;
  //   });

  //   setTreeData(tempTreeData);
  // });

  // const tempTreeData = await treeData.slice();
  // tempTreeData.forEach((tree) => {
  //   if (tree.value === treeNode.value) {
  //     tree.children = payload.data.data;
  //   }
  //   return tree;
  // });

  // return tempTreeData;
  // console.log('seccues');
  // console.log(tempTreeData);
  // setTreeData(tempTreeData);

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     const treeDataTest = treeData.slice();

  //     treeDataTest.forEach((item: Node) => {
  //       if (item.key === treeNode.key) {
  //         item.children = [
  //           {
  //             key: 3,
  //             value: 3,
  //             title: 'Node 3',
  //             children: [],
  //             isLeaf: true
  //           },
  //           {
  //             key: 4,
  //             value: 4,
  //             title: 'Node 4',
  //             children: [],
  //             isLeaf: true
  //           }
  //         ];
  //       }
  //     });
  //     setTreeData(treeDataTest);
  //     resolve([]);
  //   }, 500);
  // });
  // };

  // const isLoadingFilter = isFetching || isLoading;
  const isLoadingFilter = isLoadingFilters || isLoadingOrg;

  return (
    <FilterContainer
      onApply={onApply}
      onReset={onReset}
      isLoading={isLoadingFilter}
      isDisabled={isDisabled}
      data={selectedFilters}
      text='Воспользуйтесь фильтром, чтобы посмотреть подборку материалов'
    >
      <Select
        options={getFilterOptions(data.data, 'group')}
        defaultValue={getValueSelect(selectedFilters, 'group')}
        onChange={(e) => onChange(e, 'group')}
        value={getValueSelect(selectedFilters, 'group')}
        placeholder='Группа'
        width={180}
        isDisabled={isLoadingFilter}
      />
      <TreeSelect
        data={treeData}
        selectedValue={selectedValue}
        onLoad={loadData}
        onChange={onChangeTreeSelect}
      />
      {/* <Select
        options={getFilterOptions(data.data, 'subs')}
        defaultValue={getValueSelect(selectedFilters, 'subs')}
        onChange={(e) => onChange(e, 'subs')}
        value={getValueSelect(selectedFilters, 'subs')}
        placeholder='Подразделение/БЕ'
        width={230}
        isDisabled={isLoadingFilter}
      /> */}
      <Select
        options={getFilterOptions(data.data, 'city')}
        defaultValue={getValueSelect(selectedFilters, 'city')}
        onChange={(e) => onChange(e, 'city')}
        value={getValueSelect(selectedFilters, 'city')}
        placeholder='Город'
        width={170}
        isDisabled={isLoadingFilter}
      />
    </FilterContainer>
  );
};

export default FilterEngagement;

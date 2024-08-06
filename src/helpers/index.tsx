import { FormData } from 'types';

const getLink = (link: string) => {
  if (link.startsWith('https://') || link.startsWith('http://')) {
    return link;
  }
  return window.origin + link;
};

const getLinkFile = (link: string) => {
  if (link.startsWith('https://') || link.startsWith('http://')) {
    return link;
  }
  const tempLink = link.startsWith('/') ? link : '/' + link;
  return window.origin + tempLink;
};

const transformData = (data: any): FormData[] => {
  const results = [];
  for (const value in data) {
    const obj = data[value];
    if (typeof obj === 'string') {
      results.push({
        id: value,
        value: obj
      });
    } else {
      if (Array.isArray(obj)) {
        const tempEntries = obj.map((item: any) => {
          const objectKeys = Object.keys(item);
          if (objectKeys[0] === 'value') {
            if (item.value !== undefined && item.value !== null) {
              return item.value.value;
            }
          } else {
            const objectValue = item[objectKeys[0]];
            const objectId = objectKeys[0].slice(1);

            if (objectValue) {
              return objectId;
            }
          }
        });
        const filteredtTempEntries = tempEntries.filter((i) => i !== undefined);
        const tempStr = filteredtTempEntries.join(';');
        results.push({
          id: value,
          value: tempStr
        });
      } else if (obj?.month !== undefined && obj?.year !== undefined) {
        const dateValue = `${obj.year.value}-${obj.month.value}-01`;
        results.push({
          id: value,
          value: dateValue
        });
      } else if (obj?.value !== undefined) {
        results.push({
          id: value,
          value: obj.value
        });
      }
    }
  }
  return results;
};

const formattingPhone = (phone: string): string => {
  const phoneWithoutSpaces = phone.replace(/\s/g, '');

  if (phoneWithoutSpaces.startsWith('9')) {
    const formatedPhone =
      '+7(' +
      phoneWithoutSpaces.slice(0, 3) +
      ')' +
      phoneWithoutSpaces.slice(3);
    return formatedPhone;
  }

  if (phoneWithoutSpaces.startsWith('+79')) {
    const formatedPhone =
      phoneWithoutSpaces.slice(0, 2) +
      '(' +
      phoneWithoutSpaces.slice(2, 5) +
      ')' +
      phoneWithoutSpaces.slice(5);
    return formatedPhone;
  }

  if (
    phoneWithoutSpaces.startsWith('89') ||
    phoneWithoutSpaces.startsWith('79')
  ) {
    const formatedPhone =
      '+7(' +
      phoneWithoutSpaces.slice(1, 4) +
      ')' +
      phoneWithoutSpaces.slice(4);
    return formatedPhone;
  }
  return '';
};

const formattingCode = (code: string): string => {
  let tempCode = '';
  if (!code.length) {
    return '';
  }

  for (let i = 0; i < code.length; i++) {
    if (code[i] === '0') {
      tempCode = code.slice(i + 1);
      continue;
    }
    break;
  }
  return tempCode !== '' ? tempCode : code;
};

export { getLink, getLinkFile, transformData, formattingPhone, formattingCode };

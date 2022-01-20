export const shortenAccountId = (id: string):string => {
  let start = id.slice(0, 4);
  let end = id.slice(id.length-4, id.length);

  return `${start}...${end}`;
}
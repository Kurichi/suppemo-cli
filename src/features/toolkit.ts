export const search = (id: number, right: number, contents: Content[]) => {
  var left = 0;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const content = contents[mid];
    if (content.id === id) return mid;
    else if(content.id < id) left = mid + 1;
    else right = mid;
  }

  return -1;
}
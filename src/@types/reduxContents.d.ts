interface Card {
  id: number = -1;
  name: string = '';
  uri: string = '';
  count: number = 0;
  createdDate: string = '';
  isDefault: boolean = false;
}

interface Sequence {
  id: number = -1;
  name: string = '';
  numOfItems: nubmer = 0;
  itemIds: Array<number> = [];
  backgroundColor: string = '',
}

type Content = Card | Sequence;
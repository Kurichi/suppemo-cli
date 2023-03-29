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
  backgroundColor: string = '';
}

interface CardFolder {
  id: number;
  name: string = '';
  iconName: string = 'star-o';
  iconType: string = 'font-awesome';
  backgroundColor: '#d43ba3';
  cardIds: Array<number> = [];
}

type Content = Card | Sequence;

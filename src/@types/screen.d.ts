// Screen props

interface ws_props {
  name: string;
  card_ids: number[];
  exists: boolean;
}

interface folder_interface {
  id: number;
  name: string;
  iconName: string;
  type: string;
  background_color: string;
  cards_ids: number[];
}

interface captureImage {
  uri: string = '';
  height: number = 168;
  width: number = 240;
}

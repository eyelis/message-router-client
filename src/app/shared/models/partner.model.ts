export interface Partner {
  id: number;
  type: string
  alias: string;
  direction: Direction;
  application: string;
  flow: Flow;
  description: string;
}

export enum Direction {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND'
}

export enum Flow {
  MESSAGE = 'MESSAGE',
  ALERTING = 'ALERTING',
  NOTIFICATION = 'NOTIFICATION',
}


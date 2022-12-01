export const MATCH_LIST = [567];

type tTEam = {
  [key: number]: string;
};

export const TEAM: tTEam = {
  0: "ARGENTINA",
  1: "BRAZIL",
  2: "PORTUGAL",
};

type tSTATUS = {
  [key: number]: string;
};

export const STATUS: tSTATUS = {
  1: "LIVE",
  2: "FINSIHED",
};

type tSTATUS_TEXT = {
  [key: string]: number;
};

export const STATUS_TEXT: tSTATUS_TEXT = {
  LIVE: 1,
  FINSIHED: 2,
};

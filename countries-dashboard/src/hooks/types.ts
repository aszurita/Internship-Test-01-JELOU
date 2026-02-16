export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  population: number;
  region: string;
  cca3: string;
  capital?: string[];
  subregion?: string;
  languages?: {
    [key: string]: string;
  };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  borders?: string[];
  tld?: string[];
  area?: number;
}

export type Theme = 'light' | 'dark';
export type Region = 'All Regions' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';
export type SortOption = 'name' | 'population' | 'area';
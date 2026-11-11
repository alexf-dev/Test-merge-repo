export interface NosologyTreeDto {
  id: number;
  name: string;
  children: MkbDto[];
  checked?: boolean;
  expanded?: boolean;
}

export interface MkbDto {
  id: number;
  code: string;
  name: string;
  checked?: boolean;
}

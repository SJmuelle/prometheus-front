export interface IOptionTable {
    name: string;
    text: string;
    typeField: 'text' | 'switch' | 'circleColor' | 'statusStyle' | 'checked';
    pipeName?: 'percentage' | 'date' | 'speed' | 'titleCase';
    defaultValue?: string;
    classTailwind?: string;
    styleCondition?: (data: any) => string;
  }
  
  export interface IButtonOptions<T> {
    icon: string;
    text: string;
    action: (data: T) => void;
  }
  
  export type PipeDataTable = {
    [key: string]: (value: any) => string;
  };
  
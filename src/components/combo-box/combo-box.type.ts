export type ComboBoxProps = {
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
  placeholder?: string;
};

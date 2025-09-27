declare namespace Ui {
  interface InputProps {
    type: string;
    placeholder?: string;
    className?: string;
    error?: string;
    name: string;
    maxLength?: number;
  }

  interface Order {
    sortOption: string;
    setSortOption: (value: string) => void;
  }
}

interface InputDefaultProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
}
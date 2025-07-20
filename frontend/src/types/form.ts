export type BlockType =
  | "SHORT_ANS"
  | "LONG_ANS"
  | "EMAIL"
  | "NUM"
  | "CHECKBOXES"
  | "MULT_CHOICE"
  | "DROPDOWN"
  | "PHONE_NUM"
  | "LINK"
  | "FILE_UPLOAD"
  | "DATE"
  |"RATING"
  |"DIVIDER"
  | "H3";
  export interface User {
  id: string;
  email: string;
  password: string;
  forms: Form[];
}

  export interface Form {
  id: string;
  title: string;
  description?: string;
  slug: string;
  responses: Response[];
  User: User;
  createdAt: Date;
  blocks: FormBlock[];
  isPublished: boolean;
  theme?: string;
  successText?: string;
  coverColor?: string;
}

export interface FormBlock {
  id: string;
  order: number;
  value: string;
  type?: BlockType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  coverColor?: string;
  
  
}

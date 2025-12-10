export type Repo = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
};

export type ApiResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: Repo[];
};

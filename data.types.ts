export type Item = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pinned: boolean;
  categoryId: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type Social = {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
};

export type Filter = {
  id: string;
  name: string;
};

export type Suggestion = {
  keyword: string;
  category: string;
};
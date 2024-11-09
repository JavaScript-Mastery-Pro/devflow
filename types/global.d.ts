type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T | null>;
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIResponse<T = null> = NextResponse<ActionResponse<T>>;

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

interface Tag {
  _id: string;
  name: string;
  questions?: number;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface Question {
  _id: string;
  title: string;
  tags: Tag[];
  author: Author;
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
}

type SuccessResponse = { success: boolean; data?: unknown };

type ErrorResponse = {
  success: boolean;
  status: number;
  error: { message: string; errors?: Record<string, string[]> };
};

type ActionSuccessResponse = SuccessResponse;
type ActionErrorResponse = ErrorResponse;

type APIErrorResponse = NextResponse<ErrorResponse>;
type APISuccessResponse = NextResponse<SuccessResponse>;

type ActionResponse = ActionSuccessResponse | ActionErrorResponse;
type APIResponse = APISuccessResponse | APIErrorResponse;

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

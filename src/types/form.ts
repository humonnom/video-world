import { FieldError } from '@/types/field';

export type FormError<TData extends FormData> = Record<keyof TData, FieldError>;
export type FormData = Record<string, any>;

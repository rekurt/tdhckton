export interface AppResponse<T = any> {
  message?: string;
  status?: number;
  data?: T;
  total?: number;
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface BaseSortingFields {
  createdAt?: SortDirection;
  updatedAt?: SortDirection;
}

export enum OfferStatuses {
  UNCONFIRMED= 'UNCONFIRMED',
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED'
}

export interface OrderFields {
  createdAt: Date,
  updatedAt: Date,
  id: string,
  customerName: string,
  catalog: string,
  orderQuantity: number,
  orderAmount: number,
  status: OrderStatuses,
}
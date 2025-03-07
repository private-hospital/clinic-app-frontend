import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  AbstractResponseDto,
  ApiError,
  ErrorResponseDto,
} from '../types/common';

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .get<AbstractResponseDto<T>>(url, config)
      .then((response) => {
        const data = response.data;
        if (data.payloadType === 'ErrorResponseDto') {
          throw new ApiError(data.payload as ErrorResponseDto);
        }
        return data.payload;
      })
      .catch((error) => this.handleError(error));
  }

  async post<T, D>(
    url: string,
    payload: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance
      .post<AbstractResponseDto<T>>(url, payload, config)
      .then((response) => {
        const data = response.data;
        if (data.payloadType === 'ErrorResponseDto') {
          throw new ApiError(data.payload as ErrorResponseDto);
        }
        return data.payload;
      })
      .catch((error) => this.handleError(error));
  }

  async put<T, D>(
    url: string,
    payload: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance
      .put<AbstractResponseDto<T>>(url, payload, config)
      .then((response) => {
        const data = response.data;
        if (data.payloadType === 'ErrorResponseDto') {
          throw new ApiError(data.payload as ErrorResponseDto);
        }
        return data.payload;
      })
      .catch((error) => this.handleError(error));
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .delete<AbstractResponseDto<T>>(url, config)
      .then((response) => {
        const data = response.data;
        if (data.payloadType === 'ErrorResponseDto') {
          throw new ApiError(data.payload as ErrorResponseDto);
        }
        return data.payload;
      })
      .catch((error) => this.handleError(error));
  }

  private handleError(error: any): never {
    console.error('API Error:', error);
    if (error.response?.data) {
      const errorData = error.response
        .data as AbstractResponseDto<ErrorResponseDto>;
      if (errorData.payloadType === 'ErrorResponseDto') {
        throw new ApiError(errorData.payload);
      }
    }
    throw new Error('Unexpected error');
  }
}

export default new ApiClient(import.meta.env.VITE_API_BASE_URL ?? '');

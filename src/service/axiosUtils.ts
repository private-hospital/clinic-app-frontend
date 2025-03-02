import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
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

    this.axiosInstance.interceptors.response.use(this.handleError);
  }

  private handleSuccess<T>(response: AxiosResponse<AbstractResponseDto<T>>): T {
    const data = response.data;

    if (data.payloadType === 'ErrorResponseDto') {
      throw new ApiError(data.payload as ErrorResponseDto);
    }

    return data.payload;
  }

  private handleError(error: any) {
    if (error.response) {
      const errorData: AbstractResponseDto<ErrorResponseDto> =
        error.response.data;

      if (errorData.payloadType === 'ErrorResponseDto') {
        return Promise.reject(new ApiError(errorData.payload));
      }
    }

    return Promise.reject(new Error('Unexpected error'));
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .get<AbstractResponseDto<T>>(url, config)
      .then(this.handleSuccess);
  }

  async post<T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance
      .post<AbstractResponseDto<T>>(url, data, config)
      .then(this.handleSuccess);
  }

  async put<T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance
      .put<AbstractResponseDto<T>>(url, data, config)
      .then(this.handleSuccess);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .delete<AbstractResponseDto<T>>(url, config)
      .then(this.handleSuccess);
  }
}

export default new ApiClient(import.meta.env.VITE_API_BASE_URL ?? '');

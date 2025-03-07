import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  AbstractResponseDto,
  ApiError,
  ErrorResponseDto,
} from '../types/common';

function getCookie(name: string): string | null {
  let cookieValue: string | null = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    const csrftoken = getCookie('csrftoken') || '';
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      xsrfCookieName: 'csrftoken',
      withCredentials: true,
      xsrfHeaderName: 'X-CSRFToken',
    });
  }

  async getBlob(url: string, config?: AxiosRequestConfig): Promise<Blob> {
    const finalConfig = {
      ...config,
      responseType: 'blob' as const,
      headers: { Accept: 'application/pdf' },
    };
    const response = await this.axiosInstance.get(url, finalConfig);
    return response.data;
  }

  async postToGetBlob(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<Blob> {
    const finalConfig = { ...config, responseType: 'blob' as const };
    const response = await this.axiosInstance.post(url, body, finalConfig);
    return response.data;
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

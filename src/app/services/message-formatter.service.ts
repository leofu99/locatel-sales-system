import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageFormatterService {
  constructor() {}

  serverError(error: any): string {
    const firstKey = Object.keys(error)[0];
    const firstErrorMessage = error[firstKey];
    return `${firstKey} error: ${
      Array.isArray(firstErrorMessage)
        ? firstErrorMessage.join(', ')
        : firstErrorMessage
    }`;
  }
}

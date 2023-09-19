import { Injectable } from '@angular/core';
/**
 * Service for collecting log messages.
 */
@Injectable({ providedIn: 'root' })
export class MessageService {
    messages: string[] = [];

    add(message: string) {
        this.messages.push(message);
    }

    clear() {
        this.messages = [];
    }
}
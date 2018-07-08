import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DocumentManagerService {
    searchObject: any = new EventEmitter();
    searchData = [];
    formTypes: any;
    constructor() { }

    setDocumentFormTypes(formTypes) {
        this.formTypes = formTypes;
    }

    getDocumentFormTypes(): Observable<any> {
        return this.formTypes;
    }

    setSearchObject(search) {
        this.searchData.push(search);
    }

    getSearchObject() {
        return this.searchData;
    }

    searchEvent() {
        this.searchObject.emit();
    }

    clearSearchObject() {
        this.searchData = [];
        return this.searchData;
    }
}
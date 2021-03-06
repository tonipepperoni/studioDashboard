import {Component, EventEmitter, ChangeDetectionStrategy, Input, Output} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {AppStore} from "angular2-redux-util";
import AdnetPaymentTemplate from "./AdnetPayment.html!text";
import AdnetPaymentStyle from "./AdnetPayment.css!text";
import {ModalComponent} from "../../../ng2-bs3-modal/components/modal";

export interface IAddPayment {
    userName:string;
    userPass:string;
    amount:string;
    comment:string;
}

@Component({
    selector: 'adnetPayment',
    moduleId: __moduleName,
    template: AdnetPaymentTemplate,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [AdnetPaymentStyle]
})

export class AdnetPayment {

    constructor(private appStore: AppStore, private fb: FormBuilder, private modal: ModalComponent) {
        this.notesForm = fb.group({
            userName: [''],
            userPass: [''],
            amount: [''],
            comment: ['']
        });
    }

    @Input()
    set showSubmit(i_showSubmit) {
        this._showSubmit = i_showSubmit;
    }

    @Output()
    onSubmit: EventEmitter<IAddPayment> = new EventEmitter<IAddPayment>();

    private notesForm: FormGroup;
    private _showSubmit: boolean = true;

    private onSubmitted(event) {
        this.onSubmit.emit(this.notesForm.value);
        this.modal.close();
    }
}


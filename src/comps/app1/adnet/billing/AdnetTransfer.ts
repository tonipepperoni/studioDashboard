import {Component, EventEmitter, ChangeDetectionStrategy, Input, Output} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {AppStore} from "angular2-redux-util";
import AdnetTransferTemplate from "./AdnetTransfer.html!text";
import AdnetTransferStyle from "./AdnetTransfer.css!text";
import {ModalComponent} from "../../../ng2-bs3-modal/components/modal";
import {List} from "immutable";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";

export interface ITransferPayment {
    userName: string;
    userPass: string;
    adnetPairModel: AdnetPairModel;
    amount: string;
    comment: string;
}

@Component({
    selector: 'adnetTransfer',
    moduleId: __moduleName,
    template: AdnetTransferTemplate,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [AdnetTransferStyle]
})

export class AdnetTransfer {

    constructor(private appStore: AppStore, private fb: FormBuilder, private modal: ModalComponent, private adnetActions: AdnetActions) {
        this.notesForm = fb.group({
            userName: [''],
            userPass: [''],
            adnetPairModel: [''],
            amount: [''],
            comment: ['']
        });
    }

    @Input()
    set showSubmit(i_showSubmit) {
        this._showSubmit = i_showSubmit;
    }

    @Input()
    set adnetPairs(i_pairs: List<AdnetPairModel>) {
        this.pairs = i_pairs;
    }

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        if (!i_adnetCustomerModel)
            return;
        this.adnetCustomerModel = i_adnetCustomerModel;
        this.customerId = String(this.adnetCustomerModel.customerId());
    }

    @Output()
    onSubmit: EventEmitter<ITransferPayment> = new EventEmitter<ITransferPayment>();

    private adnetCustomerModel: AdnetCustomerModel;
    private customerId: string = '';
    private pairs: List<AdnetPairModel> = List<AdnetPairModel>();
    private notesForm: FormGroup;
    private _showSubmit: boolean = true;

    private filterContent(i_pair: AdnetPairModel) {
        var c = String(i_pair.getCustomerId());
        return c;
    }

    private onSubmitted(event) {
        this.onSubmit.emit(this.notesForm.value);
        this.modal.close();
    }


}


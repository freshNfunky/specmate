import { Component } from '@angular/core';
import { ValidationResult } from '../../../../../../validation/validation-result';
import { ValidationService } from '../../../../../forms/modules/validation/services/validation.service';
import { AdditionalInformationService } from '../../links-actions/services/additional-information.service';


@Component({
    moduleId: module.id.toString(),
    selector: 'errors-warnings',
    templateUrl: 'errors-warnings.component.html',
    styleUrls: ['errors-warnings.component.css']
})
export class ErrorsWarings {
    private _isCollapsed = false;
    public set isCollapsed(collapsed: boolean) {
        this._isCollapsed = collapsed;
    }

    public get isCollapsed(): boolean {
        if (!this.warnings) {
            return true;
        }
        return this._isCollapsed;
    }


    public visible = true;
    constructor(private validationService: ValidationService,
                private additionalInformationService: AdditionalInformationService) { }


    private _currentWarningStringSet = new Set();
    private _currentWarnings: ValidationResult[][] = [];
    public get warnings(): ValidationResult[][] {
        /*
         * Returns a list of Validation Errors grouped by affected elements.
         * Every entry of warnings() is a list of errors that affect the same list of elements.
         * For each of those lists a warning component will be created, that lists those elements
         * as well as all error messages.
         * [[ Errors affecting Elements A,B,C], [Errors affecting Element D],...]
         */
        if (!this.additionalInformationService.element) {
            return;
        }
        // We want to avoid excessive UI updates so we cache the warnings and only change the list when they have changed.
        let invalidResults = this.validationService.findValidationResults(this.additionalInformationService.element, elem => !elem.isValid);
        let newWarnings: ValidationResult[][] = [];
        let newWarningStringSet = new Set();
        let changed = false;
        for (const key in invalidResults) {
            let list = invalidResults[key];
            let arrStr = ErrorsWarings.getArrayURLString(list);
            // We encounter an element we dont have in the cache
            if (!this._currentWarningStringSet.has(arrStr)) {
                changed = true;
            }
            newWarningStringSet.add(arrStr);
            newWarnings.push(list);
        }
        // THe number of warnings has changed.
        if (newWarnings.length != this._currentWarnings.length) {
            changed = true;
        }
        if (changed) {
            // Update the UI.
            Promise.resolve().then( () => {
                this._currentWarningStringSet = newWarningStringSet;
                this._currentWarnings = newWarnings;
            });
        }
        return this._currentWarnings;
    }

    private static getArrayURLString(array: ValidationResult[]): string {
        return array.map(res =>  {
            return res.elements.map(element  => element.url).sort().join(' ');
        }).sort(). join(',');
    }

}

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
import { __decorate, __param } from "tslib";
import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { ApmBase } from '@elastic/apm-rum';
import { APM } from './apm.module';
let ApmErrorHandler = class ApmErrorHandler extends ErrorHandler {
    constructor(apm) {
        super();
        this.apm = apm;
    }
    handleError(error) {
        this.apm.captureError(error.originalError || error);
        super.handleError(error);
    }
};
ApmErrorHandler.ctorParameters = () => [
    { type: ApmBase, decorators: [{ type: Inject, args: [APM,] }] }
];
ApmErrorHandler = __decorate([
    Injectable(),
    __param(0, Inject(APM))
], ApmErrorHandler);
export { ApmErrorHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BlbGFzdGljL2FwbS1ydW0tYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9lcnJvci1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRzs7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQzFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFHbEMsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxZQUFZO0lBQy9DLFlBQWdDLEdBQVk7UUFDMUMsS0FBSyxFQUFFLENBQUE7UUFEdUIsUUFBRyxHQUFILEdBQUcsQ0FBUztJQUU1QyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQyxDQUFBO1FBQ25ELEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDMUIsQ0FBQztDQUNGLENBQUE7O1lBUnNDLE9BQU8sdUJBQS9CLE1BQU0sU0FBQyxHQUFHOztBQURaLGVBQWU7SUFEM0IsVUFBVSxFQUFFO0lBRUUsV0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7R0FEYixlQUFlLENBUzNCO1NBVFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCwgRWxhc3RpY3NlYXJjaCBCVlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICovXG5cbmltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IEFwbUJhc2UgfSBmcm9tICdAZWxhc3RpYy9hcG0tcnVtJ1xuaW1wb3J0IHsgQVBNIH0gZnJvbSAnLi9hcG0ubW9kdWxlJ1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXBtRXJyb3JIYW5kbGVyIGV4dGVuZHMgRXJyb3JIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChBUE0pIHB1YmxpYyBhcG06IEFwbUJhc2UpIHtcbiAgICBzdXBlcigpXG4gIH1cblxuICBoYW5kbGVFcnJvcihlcnJvcikge1xuICAgIHRoaXMuYXBtLmNhcHR1cmVFcnJvcihlcnJvci5vcmlnaW5hbEVycm9yIHx8IGVycm9yKVxuICAgIHN1cGVyLmhhbmRsZUVycm9yKGVycm9yKVxuICB9XG59XG4iXX0=
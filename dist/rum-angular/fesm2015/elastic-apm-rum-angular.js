import { __decorate, __param } from 'tslib';
import { InjectionToken, NgModule, Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, ErrorHandler } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { apm, ApmBase } from '@elastic/apm-rum';
import { afterFrame } from '@elastic/apm-rum-core';

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
const APM = new InjectionToken('Base APM Client');
const ɵ0 = apm;
let ApmModule = class ApmModule {
};
ApmModule = __decorate([
    NgModule({
        imports: [RouterModule],
        providers: [{ provide: APM, useValue: ɵ0 }]
    })
], ApmModule);

let ApmService = class ApmService {
    constructor(apm, router) {
        this.apm = apm;
        this.router = router;
    }
    init(config) {
        const apmInstance = this.apm.init(config);
        const configService = this.apm.serviceFactory.getService('ConfigService');
        if (!configService.isActive()) {
            return apmInstance;
        }
        /**
         * Start listening to route change once we
         * intiailize to set the correct transaction names
         */
        this.observe();
        return apmInstance;
    }
    observe() {
        let transaction;
        this.router.events.subscribe(event => {
            const eventName = event.toString();
            if (eventName.indexOf('NavigationStart') >= 0) {
                const name = event.url;
                transaction = this.apm.startTransaction(name, 'route-change', {
                    managed: true,
                    canReuse: true
                });
            }
            else if (eventName.indexOf('NavigationError') >= 0) {
                transaction && transaction.detectFinish();
            }
            else if (eventName.indexOf('NavigationEnd') >= 0) {
                if (!transaction) {
                    return;
                }
                /**
                 * The below logic must be placed in NavigationEnd since
                 * the we depend on the current route state to get the path
                 *
                 * Even If there are any redirects, the router state path
                 * will be matched with the correct url on navigation end
                 *
                 * Traverse the activated route tree to figure out the nested
                 * route path
                 */
                const route = this.router.routerState.root.firstChild;
                if (route) {
                    let child = route;
                    let path = '/' + child.routeConfig.path;
                    while (child) {
                        child = child.firstChild;
                        if (child && child.routeConfig) {
                            const currentPath = child.routeConfig.path;
                            /**
                             * Ignore empty path's in the route config
                             */
                            if (currentPath) {
                                path += '/' + currentPath;
                            }
                        }
                    }
                    transaction.name = path;
                }
                afterFrame(() => transaction.detectFinish());
            }
        });
    }
};
ApmService.ctorParameters = () => [
    { type: ApmBase, decorators: [{ type: Inject, args: [APM,] }] },
    { type: Router }
];
ApmService.ɵprov = ɵɵdefineInjectable({ factory: function ApmService_Factory() { return new ApmService(ɵɵinject(APM), ɵɵinject(Router)); }, token: ApmService, providedIn: "root" });
ApmService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(APM))
], ApmService);

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

/**
 * Generated bundle index. Do not edit.
 */

export { APM, ApmErrorHandler, ApmModule, ApmService, ɵ0 };
//# sourceMappingURL=elastic-apm-rum-angular.js.map

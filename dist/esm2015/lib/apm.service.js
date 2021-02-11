import { __decorate, __param } from "tslib";
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
import { Inject, Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ApmBase } from '@elastic/apm-rum';
import { afterFrame } from '@elastic/apm-rum-core';
import { APM } from './apm.module';
import * as i0 from "@angular/core";
import * as i1 from "./apm.module";
import * as i2 from "@angular/router";
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
ApmService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ApmService_Factory() { return new ApmService(i0.ɵɵinject(i1.APM), i0.ɵɵinject(i2.Router)); }, token: ApmService, providedIn: "root" });
ApmService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(APM))
], ApmService);
export { ApmService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZWxhc3RpYy9hcG0tcnVtLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvYXBtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFDekQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTtBQUNsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sY0FBYyxDQUFBOzs7O0FBS2xDLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFDckIsWUFBZ0MsR0FBWSxFQUFTLE1BQWM7UUFBbkMsUUFBRyxHQUFILEdBQUcsQ0FBUztRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0lBRXZFLElBQUksQ0FBQyxNQUFNO1FBQ1QsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFekMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3pFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDN0IsT0FBTyxXQUFXLENBQUE7U0FDbkI7UUFFRDs7O1dBR0c7UUFDSCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDZCxPQUFPLFdBQVcsQ0FBQTtJQUNwQixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksV0FBVyxDQUFBO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25DLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUNsQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzdDLE1BQU0sSUFBSSxHQUFJLEtBQXlCLENBQUMsR0FBRyxDQUFBO2dCQUMzQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO29CQUM1RCxPQUFPLEVBQUUsSUFBSTtvQkFDYixRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUE7YUFDSDtpQkFBTSxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BELFdBQVcsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUE7YUFDMUM7aUJBQU0sSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDaEIsT0FBTTtpQkFDUDtnQkFFRDs7Ozs7Ozs7O21CQVNHO2dCQUNILE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUE7Z0JBRXJELElBQUksS0FBSyxFQUFFO29CQUNULElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQTtvQkFDakIsSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFBO29CQUN2QyxPQUFPLEtBQUssRUFBRTt3QkFDWixLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQTt3QkFDeEIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTs0QkFDOUIsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUE7NEJBQzFDOzsrQkFFRzs0QkFDSCxJQUFJLFdBQVcsRUFBRTtnQ0FDZixJQUFJLElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQTs2QkFDMUI7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7aUJBQ3hCO2dCQUVELFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQTthQUM3QztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUE7O1lBckVzQyxPQUFPLHVCQUEvQixNQUFNLFNBQUMsR0FBRztZQUFzQyxNQUFNOzs7QUFEeEQsVUFBVTtJQUh0QixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0lBRWEsV0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7R0FEYixVQUFVLENBc0V0QjtTQXRFWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNy1wcmVzZW50LCBFbGFzdGljc2VhcmNoIEJWXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvblN0YXJ0IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xuaW1wb3J0IHsgQXBtQmFzZSB9IGZyb20gJ0BlbGFzdGljL2FwbS1ydW0nXG5pbXBvcnQgeyBhZnRlckZyYW1lIH0gZnJvbSAnQGVsYXN0aWMvYXBtLXJ1bS1jb3JlJ1xuaW1wb3J0IHsgQVBNIH0gZnJvbSAnLi9hcG0ubW9kdWxlJ1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBcG1TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChBUE0pIHB1YmxpYyBhcG06IEFwbUJhc2UsIHB1YmxpYyByb3V0ZXI6IFJvdXRlcikge31cblxuICBpbml0KGNvbmZpZykge1xuICAgIGNvbnN0IGFwbUluc3RhbmNlID0gdGhpcy5hcG0uaW5pdChjb25maWcpXG5cbiAgICBjb25zdCBjb25maWdTZXJ2aWNlID0gdGhpcy5hcG0uc2VydmljZUZhY3RvcnkuZ2V0U2VydmljZSgnQ29uZmlnU2VydmljZScpXG4gICAgaWYgKCFjb25maWdTZXJ2aWNlLmlzQWN0aXZlKCkpIHtcbiAgICAgIHJldHVybiBhcG1JbnN0YW5jZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGxpc3RlbmluZyB0byByb3V0ZSBjaGFuZ2Ugb25jZSB3ZVxuICAgICAqIGludGlhaWxpemUgdG8gc2V0IHRoZSBjb3JyZWN0IHRyYW5zYWN0aW9uIG5hbWVzXG4gICAgICovXG4gICAgdGhpcy5vYnNlcnZlKClcbiAgICByZXR1cm4gYXBtSW5zdGFuY2VcbiAgfVxuXG4gIG9ic2VydmUoKSB7XG4gICAgbGV0IHRyYW5zYWN0aW9uXG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICBjb25zdCBldmVudE5hbWUgPSBldmVudC50b1N0cmluZygpXG4gICAgICBpZiAoZXZlbnROYW1lLmluZGV4T2YoJ05hdmlnYXRpb25TdGFydCcpID49IDApIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IChldmVudCBhcyBOYXZpZ2F0aW9uU3RhcnQpLnVybFxuICAgICAgICB0cmFuc2FjdGlvbiA9IHRoaXMuYXBtLnN0YXJ0VHJhbnNhY3Rpb24obmFtZSwgJ3JvdXRlLWNoYW5nZScsIHtcbiAgICAgICAgICBtYW5hZ2VkOiB0cnVlLFxuICAgICAgICAgIGNhblJldXNlOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50TmFtZS5pbmRleE9mKCdOYXZpZ2F0aW9uRXJyb3InKSA+PSAwKSB7XG4gICAgICAgIHRyYW5zYWN0aW9uICYmIHRyYW5zYWN0aW9uLmRldGVjdEZpbmlzaCgpXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50TmFtZS5pbmRleE9mKCdOYXZpZ2F0aW9uRW5kJykgPj0gMCkge1xuICAgICAgICBpZiAoIXRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGJlbG93IGxvZ2ljIG11c3QgYmUgcGxhY2VkIGluIE5hdmlnYXRpb25FbmQgc2luY2VcbiAgICAgICAgICogdGhlIHdlIGRlcGVuZCBvbiB0aGUgY3VycmVudCByb3V0ZSBzdGF0ZSB0byBnZXQgdGhlIHBhdGhcbiAgICAgICAgICpcbiAgICAgICAgICogRXZlbiBJZiB0aGVyZSBhcmUgYW55IHJlZGlyZWN0cywgdGhlIHJvdXRlciBzdGF0ZSBwYXRoXG4gICAgICAgICAqIHdpbGwgYmUgbWF0Y2hlZCB3aXRoIHRoZSBjb3JyZWN0IHVybCBvbiBuYXZpZ2F0aW9uIGVuZFxuICAgICAgICAgKlxuICAgICAgICAgKiBUcmF2ZXJzZSB0aGUgYWN0aXZhdGVkIHJvdXRlIHRyZWUgdG8gZmlndXJlIG91dCB0aGUgbmVzdGVkXG4gICAgICAgICAqIHJvdXRlIHBhdGhcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IHJvdXRlID0gdGhpcy5yb3V0ZXIucm91dGVyU3RhdGUucm9vdC5maXJzdENoaWxkXG5cbiAgICAgICAgaWYgKHJvdXRlKSB7XG4gICAgICAgICAgbGV0IGNoaWxkID0gcm91dGVcbiAgICAgICAgICBsZXQgcGF0aCA9ICcvJyArIGNoaWxkLnJvdXRlQ29uZmlnLnBhdGhcbiAgICAgICAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgICAgICAgIGNoaWxkID0gY2hpbGQuZmlyc3RDaGlsZFxuICAgICAgICAgICAgaWYgKGNoaWxkICYmIGNoaWxkLnJvdXRlQ29uZmlnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gY2hpbGQucm91dGVDb25maWcucGF0aFxuICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICogSWdub3JlIGVtcHR5IHBhdGgncyBpbiB0aGUgcm91dGUgY29uZmlnXG4gICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICBpZiAoY3VycmVudFBhdGgpIHtcbiAgICAgICAgICAgICAgICBwYXRoICs9ICcvJyArIGN1cnJlbnRQYXRoXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdHJhbnNhY3Rpb24ubmFtZSA9IHBhdGhcbiAgICAgICAgfVxuXG4gICAgICAgIGFmdGVyRnJhbWUoKCkgPT4gdHJhbnNhY3Rpb24uZGV0ZWN0RmluaXNoKCkpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIl19